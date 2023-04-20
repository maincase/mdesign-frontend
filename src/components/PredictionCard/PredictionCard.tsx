import useImageSize from '@/hooks/useImageSize'
import { Card } from '@mui/material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useState } from 'react'
import { useElementSize } from 'usehooks-ts'
import PredictionObject, { PredictionObjectType } from '../PredictionObject/PredictionObject'

type Props = ComponentPropsWithoutRef<typeof Card> & {
  image: {
    img: string
    description: string
  }
  prediction?: Array<Array<number[] | number | string | Array<string>>>
  objectsShown?: boolean
  showCursor?: boolean
  onObjectHover?: (object?: PredictionObjectType) => void
}

export default function PredictionCard({
  image,
  prediction,
  raised = false,
  onClick,
  objectsShown = false,
  showCursor,
  onObjectHover,
}: Props) {
  const [showObjects, setShowObjects] = useState<boolean>(objectsShown)

  const [isRaised, setIsRaised] = useState<boolean>(raised)

  const [mouseCoords, setMouseCoords] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const [squareRef, { width, height }] = useElementSize()

  const [imgWidth, imgHeight] = useImageSize(image?.img)

  const ratioX = width === 0 ? undefined : width / imgWidth
  const ratioY = height === 0 ? undefined : height / imgHeight

  console.log(squareRef, 'this is the square ref', width, height)

  return (
    <Card
      onMouseEnter={() => {
        setIsRaised(raised ?? true)

        if (!objectsShown) {
          setShowObjects(true)
        }
      }}
      onMouseLeave={() => {
        setIsRaised(raised ?? false)

        if (!objectsShown) {
          setShowObjects(false)
        }
      }}
      onClick={onClick}
      raised={isRaised}
      ref={squareRef}
      className={clsx('relative inline-flex items-center justify-center', {
        'cursor-pointer': showCursor,
      })}
      sx={{
        // width: '100%',
        // height: '100%',
        backgroundPosition: 'left top',
        backgroundSize: 'contain',
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
      {!!image?.img && <img src={image.img} /* alt={image.description} */ className="flex object-contain" />}

      <div
        className={clsx('absolute top-0 left-0 w-full h-full', showObjects ? 'visible' : 'hidden')}
        {...(objectsShown
          ? {
              onMouseMove: (e) => {
                const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect()
                const x = e.pageX - rect.x
                const y = e.pageY - rect.top

                setMouseCoords({ x, y })
              },
            }
          : {})}
      >
        {prediction?.map(
          (prediction, ind) =>
            ((prediction?.[1] as number) ?? 0) > 0.8 && (
              <PredictionObject
                key={`${(prediction?.[0] as string).replace(' ', '')}+${ind}`}
                prediction={prediction}
                mouse={{
                  x: mouseCoords.x ?? 0,
                  y: mouseCoords.y ?? 0,
                }}
                ratio={{
                  x: ratioX,
                  y: ratioY,
                }}
                onObjectHover={onObjectHover}
              />
            )
        )}
      </div>
    </Card>
  )
}
