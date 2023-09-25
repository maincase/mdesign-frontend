import { MutableRefObject, useEffect, useRef, useState } from 'react'
import { useElementSize, useOnClickOutside } from 'usehooks-ts'
import { useSetObjectColor } from '../../state/interior/useSetObjectColor'
import calculateCenterPosition from '@/utils/getCenterPositioin'
import clsx from 'clsx'

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
  onObjectHover?: (object: RenderObjectType) => void
}

export default function RenderObject({
  object,
  isSingleObject,
  interiorInd = -1,
  renderInd = -1,
  objectInd,
  mouse,
  ratio,
  objectHoverTimeoutRef,
  onObjectHover,
}: Props) {
  const setObjectColor = useSetObjectColor()
  const [selectObject, setSelectObject] = useState(false)

  const objectColor = useRef(Math.floor(Math.random() * 16777215).toString(16))

  const [objectNameRef, { width: objectNameWidth, height: objectNameHeight }] = useElementSize()

  const objectSelectionRef = useRef(null)

  const objectName = object[0] ?? ''
  const objectShape = object[2] as number[]

  // Actual object rect.
  const objectX = objectShape[0] ?? 0
  const objectY = objectShape[1] ?? 0
  const objectWidth = (objectShape[2] ?? 0) - (objectShape[0] ?? 0)
  const objectHeight = (objectShape[3] ?? 0) - (objectShape[1] ?? 0)

  const objectNameVisible =
    (!!mouse?.x &&
      !!mouse?.y &&
      mouse?.x > objectX &&
      mouse?.y > objectY &&
      mouse?.x < objectX + objectWidth &&
      mouse?.y < objectY + objectHeight) ||
    isSingleObject // If we have single object then we always show object name.

  useEffect(() => {
    if (
      !!objectColor.current &&
      typeof object?.[3] !== 'string' &&
      interiorInd !== -1 &&
      renderInd !== -1 &&
      objectInd !== -1
    ) {
      setObjectColor(interiorInd, renderInd, objectInd, objectColor.current)
    }
  }, [])

  // If some name is visible, we need to clear out timeout for setting undefined.
  if (objectNameVisible) {
    clearTimeout(objectHoverTimeoutRef.current)
  }

  useEffect(() => {
    // If object name is visible then mouse cursor is on that object.
    if (objectNameVisible && !isSingleObject) {
      onObjectHover?.({ object })
    } else {
      objectHoverTimeoutRef.current = setTimeout(() => {
        onObjectHover?.({ object: undefined })
      }, 750)
    }
  }, [objectNameVisible])

  useOnClickOutside(objectSelectionRef, () => setSelectObject(false))

  if (!ratio.x || !ratio.y) {
    return null
  }

  // Ratio object rect.
  const ratioX = objectX * ratio.x
  const ratioY = objectY * ratio.y
  const ratioWidth = objectWidth * ratio.x
  const ratioHeight = objectHeight * ratio.y

  const { x, y } = calculateCenterPosition(ratioWidth, ratioHeight, ratioX ?? 0, ratioY ?? 0)

  return (
    <>
      {selectObject && (
        <div
          onClick={() => setSelectObject(false)}
          className="absolute w-full h-full top-0 left-0 z-10"
          ref={objectSelectionRef}
        ></div>
      )}
      <div
        className={clsx('absolute rounded-lg border-2 z-0 transition-all ease-linear duration-300 shadow-full', {
          'opacity-0 invisible': !selectObject,
        })}
        style={{
          top: ratioY,
          left: ratioX,
          width: selectObject ? ratioWidth : 0,
          height: selectObject ? ratioHeight : 0,
        }}
      ></div>
      <div
        className={clsx('absolute items-center justify-center group/popover hidden lg:flex transition-opacity z-20', {
          'opacity-0 invisible': selectObject,
        })}
        onClick={() => setSelectObject(true)}
        style={{
          left: x ?? 0,
          top: y ?? 0,
        }}
        ref={objectNameRef}
      >
        <div className="relative">
          <div className="pl-1 pb-1 transition-all opacity-0 group-hover/popover:opacity-100 absolute bottom-4 -translate-x-1/2 ml-1">
            <div className="bg-white px-3 py-1 shadow-xl whitespace-nowrap pointer-events-none capitalize">
              {objectName}
            </div>
            <div className="h-0 w-0 border-x-4 border-x-transparent border-t-[5px] border-t-white shadow-xl mx-auto" />
          </div>
          <button className="w-[15px] h-[15px] bg-white block rounded-full shadow-lg group-hover/popover:scale-125 transition-all" />
        </div>
      </div>
    </>
  )
}
