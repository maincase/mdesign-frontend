import { MutableRefObject, useRef, useState } from 'react'
import calculateCenterPosition from '@/utils/getCenterPositioin'
import clsx from 'clsx'
import { useUpdateEffect } from 'usehooks-ts'

export type RenderObjectType = {
  isReferral?: boolean
  object?: Array<number[] | number | string | Array<string>>
}

type Props = {
  object: Array<number[] | number | string | Array<string>>
  isSingleObject: boolean
  mouse?: {
    x: number
    y: number
  }
  ratio: {
    x?: number
    y?: number
  }
  interiorInd?: number
  renderInd?: number
  objectInd: number

  objectHoverTimeoutRef: MutableRefObject<NodeJS.Timeout | undefined>
  onObjectHover?: (object: any) => void
  onClick?: () => void
  isActive?: boolean
}

export default function RenderObject({ object, objectInd, ratio, isActive, onObjectHover, onClick }: Props) {
  const objectShape = object[2] as number[]
  // Actual object rect.
  const objectX = objectShape[0] ?? 0
  const objectY = objectShape[1] ?? 0
  const objectWidth = (objectShape[2] ?? 0) - (objectShape[0] ?? 0)
  const objectHeight = (objectShape[3] ?? 0) - (objectShape[1] ?? 0)
  const canActivate = useRef<boolean>(true)
  const [applyBg, setApplyBg] = useState(true)

  useUpdateEffect(() => {
    if (!isActive) {
      canActivate.current = false

      setTimeout(() => {
        canActivate.current = true
      }, 500)
    }
  }, [isActive])

  if (!ratio.x || !ratio.y) {
    return null
  }

  // Ratio object rect.
  const ratioX = objectX * ratio.x
  const ratioY = objectY * ratio.y
  const ratioWidth = objectWidth * ratio.x
  const ratioHeight = objectHeight * ratio.y

  const { x, y } = calculateCenterPosition(ratioWidth, ratioHeight, ratioX ?? 0, ratioY ?? 0)

  const handleClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    onClick?.()
  }

  return (
    <button
      onClick={handleClick}
      onMouseEnter={() => {
        if (canActivate.current) {
          onObjectHover?.(object)
        }
      }}
      className={clsx('absolute block', {
        'bg-white shadow-lg group-hover/popover:scale-125 rounded-full z-20': !isActive,
        'border-2 rounded-lg shadow-full z-10 transition-position-size duration-500': isActive,
      })}
      style={{
        top: isActive ? ratioY : y,
        left: isActive ? ratioX : x,
        width: isActive ? ratioWidth : 15,
        height: isActive ? ratioHeight : 15,
      }}
    />
  )
}
