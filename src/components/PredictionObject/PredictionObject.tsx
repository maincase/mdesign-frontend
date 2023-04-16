import { useEffect, useState } from 'react'
import { useElementSize } from 'usehooks-ts'

export type PredictionObjectType = {
  prediction: Array<number[] | number | string>
}

export default function PredictionObject({
  prediction,
  mouse,
  ratio,
  onObjectHover,
}: {
  prediction: Array<number[] | number | string>
  mouse?: {
    x: number
    y: number
  }
  ratio: {
    x: number
    y: number
  }
  onObjectHover?: (object?: PredictionObjectType) => void
}) {
  const [objectColor] = useState(Math.floor(Math.random() * 16777215).toString(16))

  const [objectNameRef, { width: objectNameWidth, height: objectNameHeight }] = useElementSize()

  const objectName = prediction[0] ?? ''
  const objectShape = prediction[2] as number[]

  // Actual object rect.
  const objectX = objectShape[0] ?? 0
  const objectY = objectShape[1] ?? 0
  const objectWidth = (objectShape[2] ?? 0) - (objectShape[0] ?? 0)
  const objectHeight = (objectShape[3] ?? 0) - (objectShape[1] ?? 0)

  // Ratio object rect.
  const ratioX = objectX * ratio.x
  const ratioY = objectY * ratio.y
  const ratioWidth = objectWidth * ratio.x
  const ratioHeight = objectHeight * ratio.y

  const objectNameVisible =
    !!mouse?.x &&
    !!mouse?.y &&
    mouse?.x > objectX &&
    mouse?.y > objectY &&
    mouse?.x < objectX + objectWidth &&
    mouse?.y < objectY + objectHeight

  useEffect(() => {
    if (objectNameVisible) {
      onObjectHover?.({ prediction })
    } else {
      onObjectHover?.(undefined)
    }
  }, [objectNameVisible])

  console.log('This is test')

  return (
    <>
      {!!objectNameVisible ? (
        <div
          className="absolute capitalize font-bold text-sm"
          style={{
            left: !!ratioX ? ratioX + (ratioWidth ?? 0) / 2 - (objectNameWidth ?? 0) / 2 : 0,
            top: !!ratioX ? ratioY - (objectNameHeight ?? 0) : 0,
            color: `#${objectColor}`,
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
          borderColor: `#${objectColor}`,
        }}
      ></div>
    </>
  )
}
