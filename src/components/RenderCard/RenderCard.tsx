import useImageSize from '@/hooks/useImageSize'
import { Card } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { ComponentPropsWithoutRef, useEffect, useRef, useState } from 'react'
import { Render } from '../../state/interior/InteriorState'
import RenderObject from '../RenderObject/RenderObject'

type Props = ComponentPropsWithoutRef<typeof Card> & {
  render: Render
  objects?: Array<Array<number[] | number | string | Array<string>>>
  objectsShown?: boolean
  showCursor?: boolean
  interiorInd?: number
  renderInd?: number
  hasOverlay?: boolean
  hasZoom?: boolean
  className?: string
  fill?: boolean
  imageClassName?: string
  onObjectHover?: (object: any) => void
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
  hasOverlay,
  hasZoom,
  fill,
  className,
  imageClassName,
  onObjectHover,
}: Props) {
  const imgRef = useRef<HTMLImageElement>(null)

  const objectHoverTimeoutRef = useRef<NodeJS.Timeout>()

  const [showObjects, setShowObjects] = useState<boolean>(objectsShown)

  const [isRaised, setIsRaised] = useState<boolean>(raised)

  const [mouseCoords, setMouseCoords] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const [ratio, setRatio] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const [activeObject, setActiveObject] = useState<number>()

  const [imgWidth, imgHeight] = useImageSize(
    !!render?.image ? `${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${render.image}` : undefined
  )

  useEffect(() => {
    if (!ratio.x && !ratio.y) {
      if (imgWidth > 0 && imgHeight > 0 && !!imgRef.current?.complete) {
        const width = imgRef.current.clientWidth
        const height = imgRef.current.clientHeight

        setRatio({
          x: width / imgWidth,
          y: height / imgHeight,
        })
      }
    }
  }, [imgWidth, imgHeight, !!imgRef.current?.complete])

  const handleObjectHover = (object: any, index: number) => {
    setActiveObject(index)

    onObjectHover?.(object)
  }

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
      className={clsx(
        'relative flex group h-full',
        {
          'cursor-pointer': showCursor,
          'before:transition-opacity before:duration-300 before:content-[""] before:block before:w-full before:h-full before:absolute before:top-0 before:left-0 before:bg-black before:opacity-0 hover:before:opacity-30 before:z-20':
            hasOverlay,
        },
        className
      )}
      sx={{
        backgroundPosition: 'left top',
        backgroundSize: 'contain',
      }}
    >
      <div
        className={clsx({
          'ease-in-out group-hover:scale-105 scale-100 transition-scale duration-300': hasZoom,
          'relative w-full h-full': fill,
        })}
      >
        {!!render?.image && (
          <Image
            priority
            ref={imgRef}
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${render.image}`}
            width={fill ? undefined : 2000}
            height={fill ? undefined : 1000}
            alt=""
            className={clsx('block', imageClassName)}
            fill={fill}
            style={{}}
          />
        )}

        {showObjects && (
          <div
            onClick={() => setActiveObject(undefined)}
            className="absolute top-0 left-0 w-full h-full"
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
                    onObjectHover={(object) => handleObjectHover(object, ind)}
                    objectHoverTimeoutRef={objectHoverTimeoutRef}
                    isActive={activeObject === ind}
                    onClick={() => {
                      if (Array.isArray(obj?.[3]) && obj[3][0]) {
                        window.open(obj?.[3][0] as string, '_blank')
                      }
                    }}
                  />
                )
            )}
          </div>
        )}
      </div>
    </Card>
  )
}
