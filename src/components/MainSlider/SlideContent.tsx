import { InteriorType } from '@/state/interior/InteriorState'
import clsx from 'clsx'
import { useCallback } from 'react'
import { SwiperClass } from 'swiper/react'
import RenderCard from '../RenderCard/RenderCard'

type Props = {
  innerActiveIndex: number
  interior: InteriorType
  // interiorInd: number
  isActive: boolean
  slideRef?: SwiperClass
  onMouseEnter?: (index: number) => void
}

export default function SlideContent({
  innerActiveIndex,
  interior,
  /* interiorInd, */ slideRef,
  isActive,
  onMouseEnter,
}: Props) {
  const itemMouseEnter = useCallback((ind: number) => () => onMouseEnter?.(ind), [onMouseEnter])

  return (
    <>
      <RenderCard
        className={clsx('!rounded-none', { hidden: innerActiveIndex !== 0 })}
        imageClassName="!max-w-min !w-auto lg:!w-full lg:!max-w-full brightness-90 object-cover lg:object-fill"
        render={interior}
        // interiorInd={interiorInd}
        fill
      />

      {!!interior?.renders && interior?.renders?.length > 0 && (
        <RenderCard
          className={clsx('!rounded-none', {
            hidden: innerActiveIndex === 0 || !interior.renders?.[innerActiveIndex - 1],
          })}
          imageClassName="!max-w-min !w-auto lg:!w-full lg:!max-w-full brightness-90 object-cover lg:object-fill"
          render={interior.renders?.[innerActiveIndex - 1]}
          // interiorInd={innerActiveIndex}
          objects={interior.renders?.[innerActiveIndex - 1]?.objects}
          objectsShown
          fill
        />
      )}

      <div
        onMouseMove={() => slideRef?.autoplay?.pause()}
        onMouseLeave={() => slideRef?.autoplay?.resume()}
        className="absolute bottom-[10px] md:bottom-[10px] right-0 flex gap-3 bg-black bg-opacity-80 p-3"
      >
        <div onMouseEnter={itemMouseEnter(0)}>
          <RenderCard
            className={clsx(
              "!rounded-none w-full md:w-[100px] transition-all shadow-lg cursor-pointer relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before-left-0 before:z-10 hover:before:bg-opacity-0 before:transition-all before:duration-500",
              {
                'before:bg-opacity-50 opacity-50': innerActiveIndex !== 0,
                'before:bg-opacity-0 opacity-100': innerActiveIndex === 0,
              }
            )}
            render={interior}
            // interiorInd={interiorInd}
            imageClassName="brightness-90"
            fill
          />
        </div>
        {interior.renders?.map((render, index) => (
          <div key={render.id} onMouseEnter={itemMouseEnter(index + 1)}>
            <RenderCard
              className={clsx(
                "!rounded-none w-full md:w-[100px] transition-all shadow-lg cursor-pointer relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before-left-0 before:z-10 hover:before:bg-opacity-0 before:transition-all before:duration-500",
                {
                  'before:bg-opacity-50 opacity-50': innerActiveIndex !== index + 1,
                  'before:bg-opacity-0 opacity-100': innerActiveIndex === index + 1,
                }
              )}
              render={render}
              // interiorInd={index}
              imageClassName="brightness-90"
            />
          </div>
        ))}
      </div>
      <div className="absolute bottom-[120px] md:bottom-[50px] z-30 left-0 px-5 md-px-0 md:left-10">
        <h2
          className={clsx(
            'text-white md:text-4xl text-2xl font-[Montserrat] mb-3 md:mb-4 transition-all duration-700 uppercase',
            {
              'opacity-100 translate-x-0': isActive,
              'opacity-0 translate-x-[100px]': !isActive,
            }
          )}
        >
          {interior.style}
        </h2>
        <h6
          className={clsx('text-white font-medium font-[Alegreya] transform transition-all duration-700 delay-300', {
            'opacity-100 translate-x-0': isActive,
            'opacity-0 translate-x-[50px]': !isActive,
          })}
        >
          {interior.room}
        </h6>
      </div>
    </>
  )
}
