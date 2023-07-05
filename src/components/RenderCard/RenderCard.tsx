import { Card } from '@mui/material'
import clsx from 'clsx'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import { Render } from '../InteriorManager/InteriorManager'
import RenderObject, { RenderObjectType } from '../RenderObject/RenderObject'

type Props = ComponentPropsWithoutRef<typeof Card> & {
  render: Render
  objects?: Array<Array<number[] | number | string | Array<string>>>
  objectsShown?: boolean
  showCursor?: boolean
  interiorInd?: number
  renderInd?: number
  onObjectHover?: (object: RenderObjectType) => void
}

export default function RenderCard({
  render,
  objects,
  raised = false,
  onClick,
  objectsShown = false,
  showCursor,
  interiorInd,
  renderInd,
  onObjectHover,
}: Props) {
  const cardRef = useRef<HTMLDivElement>(null)

  const imgRef = useRef<HTMLImageElement>(null)

  const objectHoverTimeoutRef = useRef<NodeJS.Timeout>()

  const [showObjects, setShowObjects] = useState<boolean>(objectsShown)

  const [isRaised, setIsRaised] = useState<boolean>(raised)

  const [mouseCoords, setMouseCoords] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const [ratio, setRatio] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const onImageLoad = (e: any) => {
    const { naturalHeight: imgHeight, naturalWidth: imgWidth } = e.target

    if (cardRef.current) {
      const width = cardRef.current.offsetWidth
      const height = cardRef.current.offsetHeight

      setRatio({
        x: width / imgWidth,
        y: height / imgHeight,
      })
    }
  }

  useEffect(() => {
    if (imgRef.current?.complete) {
      onImageLoad({ target: imgRef.current })
    }
  }, [])

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
      ref={cardRef}
      className={clsx('relative flex', {
        'cursor-pointer': showCursor,
      })}
      sx={{
        // width: '100%',
        // height: '100%',
        backgroundPosition: 'left top',
        backgroundSize: 'contain',
      }}
    >
      {!!render?.image && (
        // <Image
        //   ref={imgRef}
        //   onLoad={onImageLoad}
        //   src={`${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${render.image}`}
        //   fill
        //   placeholder="blur"
        //   /* alt={image.description} */ className="flex max-h-full object-contain"
        //   alt=""
        //   sizes="100vw"
        // />

        // eslint-disable-next-line @next/next/no-img-element
        <img
          ref={imgRef}
          onLoad={onImageLoad}
          src={`${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${render.image}`}
          /* alt={image.description} */ className="flex max-h-full object-contain"
          alt=""
        />
      )}
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
        {objects?.map(
          (obj, ind) =>
            ((obj?.[1] as number) ?? 0) > 0.8 && (
              <RenderObject
                key={`${(obj?.[0] as string).replace(' ', '')}+${ind}`}
                interiorInd={interiorInd}
                renderInd={renderInd}
                objectInd={ind}
                object={obj}
                isSingleObject={objects?.length === 1}
                mouse={{
                  x: mouseCoords.x ?? 0,
                  y: mouseCoords.y ?? 0,
                }}
                ratio={ratio}
                onObjectHover={onObjectHover}
                objectHoverTimeoutRef={objectHoverTimeoutRef}
              />
            )
        )}
      </div>
    </Card>
  )
}
