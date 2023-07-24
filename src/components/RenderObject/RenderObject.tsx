import { MutableRefObject, useEffect, useRef } from 'react'
import { useElementSize } from 'usehooks-ts'
import { useSetObjectColor } from '../../state/interior/useSetObjectColor'

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

  const objectColor = useRef(Math.floor(Math.random() * 16777215).toString(16))

  const [objectNameRef, { width: objectNameWidth, height: objectNameHeight }] = useElementSize()

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

  if (!ratio.x || !ratio.y) {
    return null
  }

  // Ratio object rect.
  const ratioX = objectX * ratio.x
  const ratioY = objectY * ratio.y
  const ratioWidth = objectWidth * ratio.x
  const ratioHeight = objectHeight * ratio.y

  return (
    <>
      {!!objectNameVisible ? (
        <div
          className="absolute capitalize font-bold text-sm"
          style={{
            left: !!ratioX ? ratioX + (ratioWidth ?? 0) / 2 - (objectNameWidth ?? 0) / 2 : 0,
            top: !!ratioX ? ratioY - (objectNameHeight ?? 0) : 0,
            color: `#${object?.[3] ?? objectColor.current}`,
          }}
          ref={objectNameRef}
        >
          {objectName}
        </div>
      ) : null}
      <div
        className="absolute border-2"
        style={{
          left: ratioX ?? 0,
          top: ratioY ?? 0,
          width: ratioWidth,
          height: ratioHeight,
          borderColor: `#${object?.[3] ?? objectColor.current}`,
        }}
      ></div>
    </>
  )
}
