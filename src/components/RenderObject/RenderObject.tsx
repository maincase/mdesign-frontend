import getCenterPosition from '@/utils/getCenterPositioin'
import clsx from 'clsx'
import { useRef } from 'react'
import { useElementSize, useUpdateEffect } from 'usehooks-ts'

export const ignoreObjects = Object.freeze(['book', 'bottle'])

export type RenderObjectType = {
  isReferral?: boolean
  object?: Array<number[] | number | string | Array<string>>
}

type Props = {
  object: Array<number[] | number | string | Array<string>>
  // isSingleObject: boolean
  // mouse?: {
  //   x: number
  //   y: number
  // }
  ratio: {
    x?: number
    y?: number
  }
  // interiorInd?: number
  // renderInd?: number
  // objectInd: number

  // objectHoverTimeoutRef: MutableRefObject<NodeJS.Timeout | undefined>
  onObjectHover?: (object: any) => void
  onClick?: () => void
  isActive?: boolean
}

export default function RenderObject({ object, /* objectInd, */ ratio, isActive, onObjectHover, onClick }: Props) {
  // Object params
  const objectName = object[0] ?? ''
  const objectShape = object[2] as number[]

  const [objectNameRef, { width: objectNameWidth, height: objectNameHeight }] = useElementSize()

  // Actual object rect.
  const objectX = objectShape[0] ?? 0
  const objectY = objectShape[1] ?? 0
  const objectWidth = (objectShape[2] ?? 0) - (objectShape[0] ?? 0)
  const objectHeight = (objectShape[3] ?? 0) - (objectShape[1] ?? 0)
  const canActivate = useRef<boolean>(true)
  // const [applyBg, setApplyBg] = useState(true)

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

  const { x, y } = getCenterPosition(ratioWidth, ratioHeight, ratioX ?? 0, ratioY ?? 0)

  const handleClick = (e: any) => {
    e.stopPropagation()
    e.preventDefault()

    onClick?.()
  }

  const mouseEnter = (e: any) => {
    e.preventDefault()
    e.stopPropagation()

    if (canActivate.current) {
      onObjectHover?.(object)
    }
  }

  return (
    <>
      <button
        onClick={handleClick}
        onMouseEnter={mouseEnter}
        className={clsx('absolute block overflow-visible', {
          'bg-white shadow-lg group-hover/popover:scale-125 -translate-x-2/4 -translate-y-2/4 rounded-full z-20 before:content-[""] before:absolute before:inset-0 before:w-full before:h-full before:rounded-full before:shadow-3d':
            !isActive,
          'border-2 rounded-lg shadow-full z-10 transition-position-size duration-200 ease-[cubic-bezier(.84,1.34,1,1)]':
            isActive,
        })}
        style={{
          top: isActive ? ratioY : y,
          left: isActive ? ratioX : x,
          width: isActive ? ratioWidth : 15,
          height: isActive ? ratioHeight : 15,
        }}
      >
        {!!isActive && (
          <p
            className="absolute block capitalize break-all whitespace-nowrap font-bold text-md text-white font-['montserrat']"
            style={{
              left: (ratioWidth ?? 0) / 2 - (objectNameWidth ?? 0) / 2 - 5,
              top: -(objectNameHeight ?? 0) - 10,
            }}
            ref={objectNameRef}
          >
            {objectName}
          </p>
        )}
      </button>
    </>
  )
}
