import useImageSize from '@/hooks/useImageSize'
import { Card } from '@mui/material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useState } from 'react'
import { useElementSize } from 'usehooks-ts'

type Props = ComponentPropsWithoutRef<typeof Card> & {
  image: {
    img: string
    description: string
  }
  prediction?: Array<Array<number[] | number | string>>
  showCursor?: boolean
}

function PredictionObject({
  prediction,
  ratioX,
  ratioY,
}: {
  prediction: Array<number[] | number | string>
  ratioX: number
  ratioY: number
}) {
  const [objectColor] = useState(Math.floor(Math.random() * 16777215).toString(16))

  const objectShape = prediction[2] as number[]

  const objectX = (objectShape[0] ?? 0) * ratioX
  const objectY = (objectShape[1] ?? 0) * ratioY
  const objectWidth = ((objectShape[2] ?? 0) - (objectShape[0] ?? 0)) * ratioX
  const objectHeight = ((objectShape[3] ?? 0) - (objectShape[1] ?? 0)) * ratioY

  return (
    <div
      className="absolute border-2"
      style={{
        left: objectX,
        top: objectY,
        width: objectWidth,
        height: objectHeight,
        borderColor: `#${objectColor}`,
      }}
    ></div>
  )
}

export default function PredictionCard({ image, prediction, raised, onClick, showCursor }: Props) {
  const [showObjects, setShowObjects] = useState<boolean>(false)

  const [isRaised, setIsRaised] = useState<boolean>(raised ?? false)

  const [squareRef, { width, height }] = useElementSize()

  const [imgWidth, imgHeight] = useImageSize(image.img)

  // console.log(imgWidth, imgHeight, 'this is the image size', width, height, 'this is the square size', image.img)

  if (imgWidth === 0 || imgHeight === 0) {
    return null
  }

  const ratioX = width / imgWidth
  const ratioY = height / imgHeight

  return (
    <Card
      onMouseEnter={() => {
        setIsRaised(raised ?? true)

        setShowObjects(true)
      }}
      onMouseLeave={() => {
        setIsRaised(raised ?? false)

        setShowObjects(false)
      }}
      onClick={onClick}
      raised={isRaised}
      ref={squareRef}
      className={clsx('relative flex items-center justify-center', {
        'cursor-pointer': showCursor,
      })}
      sx={{
        width: '100%',
        // height: '100%',
        backgroundPosition: 'left top',
        backgroundSize: 'contain',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={image.img} alt={image.description} className="flex object-contain" />

      <div className={clsx('absolute top-0 left-0 w-full h-full', showObjects ? 'visible' : 'hidden')}>
        {prediction?.map(
          (prediction, ind) =>
            ((prediction?.[1] as number) ?? 0) > 0.8 && (
              <PredictionObject
                key={`${(prediction?.[0] as string).replace(' ', '')}+${ind}`}
                prediction={prediction}
                ratioX={ratioX}
                ratioY={ratioY}
              />
            )
        )}
      </div>
    </Card>
  )
}
