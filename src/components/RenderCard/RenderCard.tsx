import useImageSize from '@/hooks/useImageSize'
import { preventDefault } from '@/utils/rxPreventDefault'
import { Card } from '@mui/material'
import clsx from 'clsx'
import Image from 'next/image'
import { ComponentPropsWithoutRef, useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { fromEvent, tap } from 'rxjs'
import { SwiperClass } from 'swiper/react'
import { Render } from '../../state/interior/InteriorState'
import RenderObject, { ignoreObjects } from '../RenderObject/RenderObject'

type Props = ComponentPropsWithoutRef<typeof Card> & {
  interiorId: string
  render: Render
  objects?: Array<Array<number[] | number | string | Array<string>>>
  objectsShown?: boolean
  showCursor?: boolean
  // interiorInd?: number
  // renderInd?: number
  hasOverlay?: boolean
  hasZoom?: boolean
  className?: string
  fill?: boolean
  imageClassName?: string
  onObjectHover?: (object: any) => void
  sliderRef?: SwiperClass
}

export default function RenderCard({
  interiorId,
  render,
  objects,
  raised = false,
  onClick,
  objectsShown = false,
  showCursor,
  // interiorInd,
  // renderInd,
  hasOverlay,
  hasZoom,
  fill,
  className,
  imageClassName,
  onObjectHover,
  sliderRef,
}: Props) {
  const cardRef = useRef(null)
  const imgRef = useRef<HTMLImageElement>(null)

  const objContainerRef = useRef(null)

  // const objectHoverTimeoutRef = useRef<NodeJS.Timeout>()

  const [showObjects, setShowObjects] = useState<boolean>(objectsShown)

  const [isRaised, setIsRaised] = useState<boolean>(raised)

  // const [mouseCoords, setMouseCoords] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const [ratio, setRatio] = useState<{ x?: number; y?: number }>({ x: undefined, y: undefined })

  const [activeObjectInd, setActiveObjectInd] = useState<number>()

  const [imgWidth, imgHeight] = useImageSize(
    !!render?.image ? `${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${interiorId}-${render.image}` : undefined
  )

  // Setup card events
  useEffect(() => {
    if (!!cardRef.current) {
      const mouseEnterSub = fromEvent<Event>(cardRef.current, 'mouseenter')
        .pipe(preventDefault())
        .subscribe(() => {
          setIsRaised(raised ?? true)

          if (!objectsShown) {
            setShowObjects(true)
          }
        })

      const mouseLeaveSub = fromEvent<Event>(cardRef.current, 'mouseleave')
        .pipe(preventDefault())
        .subscribe(() => {
          setIsRaised(raised ?? false)

          if (!objectsShown) {
            setShowObjects(false)
          }
        })

      const mouseClickSub = fromEvent<React.MouseEvent<HTMLDivElement>>(cardRef.current, 'click')
        .pipe(tap(onClick))
        .subscribe()

      return () => {
        mouseEnterSub.unsubscribe()
        mouseLeaveSub.unsubscribe()
        mouseClickSub.unsubscribe()
      }
    }
  }, [])

  useEffect(() => {
    if (!!objContainerRef.current) {
      const containerClickSub = fromEvent<React.MouseEvent<HTMLDivElement>>(objContainerRef.current, 'click').subscribe(
        () => {
          setActiveObjectInd(undefined)
        }
      )

      return () => {
        containerClickSub.unsubscribe()
      }
    }
  }, [])

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

  const handleObjectHover = useCallback(
    (index: number) => (object: any) => {
      sliderRef?.autoplay.stop()

      setActiveObjectInd(index)

      onObjectHover?.(object)
    },
    [onObjectHover, sliderRef?.autoplay]
  )

  const deactivate = useCallback(
    (ind: number) => () => {
      if (activeObjectInd === ind) {
        setActiveObjectInd(undefined)
      }

      sliderRef?.autoplay.start()
    },
    [activeObjectInd, sliderRef?.autoplay]
  )

  const handleObjectClick = useCallback(
    (obj: any) => () => {
      if (Array.isArray(obj?.[3]) && obj[3][0]) {
        window.open(obj?.[3][0] as string, '_blank')
      }
    },
    []
  )

  const renderObjects = useMemo(
    () =>
      objects?.filter(
        (obj) => ((obj?.[1] as number) ?? 0) > 0.8 && !!obj?.[0] && !ignoreObjects.includes(obj?.[0] as string)
      ),
    [objects]
  )

  return (
    <Card
      ref={cardRef}
      raised={isRaised}
      className={clsx(
        'relative flex flex-grow group h-full',
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
            src={`${process.env.NEXT_PUBLIC_CDN_URL}/interiors/${interiorId}-${render.image}`}
            width={fill ? undefined : 2000}
            height={fill ? undefined : 1000}
            quality={100}
            loading="eager"
            alt=""
            className={clsx('block !relative', imageClassName)}
            fill={fill}
          />
        )}

        {showObjects && (
          <div
            ref={objContainerRef}
            className="absolute top-0 left-0 w-full h-full"
            // {...(objectsShown
            //   ? {
            //       onMouseMove: (e) => {
            //         const rect = (e.currentTarget as HTMLElement)?.getBoundingClientRect()
            //         const x = e.pageX - rect.x
            //         const y = e.pageY - rect.top
            //         setMouseCoords({ x, y })
            //       },
            //     }
            //   : {})}
          >
            {renderObjects?.map((obj, ind) => (
              <RenderObject
                key={ind}
                // interiorInd={interiorInd}
                // renderInd={renderInd}
                // objectInd={ind}
                object={obj}
                // isSingleObject={objects?.length === 1}
                // mouse={{
                //   x: mouseCoords.x ?? 0,
                //   y: mouseCoords.y ?? 0,
                // }}
                ratio={ratio}
                onObjectHover={handleObjectHover(ind)}
                deactivate={deactivate(ind)}
                index={ind}
                activeIndex={activeObjectInd}
                // objectHoverTimeoutRef={objectHoverTimeoutRef}
                isActive={activeObjectInd === ind}
                onClick={handleObjectClick(obj)}
              />
            ))}
          </div>
        )}
      </div>
    </Card>
  )
}
