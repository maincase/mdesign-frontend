import clsx from 'clsx'
import RenderCard from '../RenderCard/RenderCard'
import { InteriorType } from '@/state/interior/InteriorState'

type Props = {
  innerActiveIndex: number
  interior: InteriorType
  interiorInd: number
  isActive: boolean
  onMouseEnter?: (index: number) => void
}

export default function SlideContent({ innerActiveIndex, interior, interiorInd, isActive, onMouseEnter }: Props) {
  return (
    <>
      {innerActiveIndex === 0 && (
        <RenderCard
          className="!rounded-none"
          imageClassName="!max-w-min !w-auto md:!w-full md:!max-w-full brightness-90"
          render={interior}
          interiorInd={interiorInd}
          fill
        />
      )}

      {!!innerActiveIndex && interior.renders?.[innerActiveIndex - 1] && (
        <RenderCard
          className="!rounded-none"
          imageClassName="!max-w-min !w-auto md:!w-full md:!max-w-full brightness-90"
          key={interior.id}
          render={interior.renders?.[innerActiveIndex - 1]}
          interiorInd={innerActiveIndex}
          objects={interior.renders?.[innerActiveIndex - 1].objects}
          objectsShown
          fill
        />
      )}

      <div className="absolute bottom-[150px] md:bottom-[200px] right-0 md:right-10 flex gap-3 px-5 md:px-0">
        <div onMouseEnter={() => onMouseEnter?.(0)}>
          <RenderCard
            className={clsx(
              "!rounded-none w-full md:w-[100px] transition-all shadow-lg cursor-pointer relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before-left-0 before:z-10 hover:before:bg-opacity-0 before:transition-all before:duration-500",
              {
                'before:bg-opacity-50 opacity-50': innerActiveIndex !== 0,
                'before:bg-opacity-0 opacity-100': innerActiveIndex === 0,
              }
            )}
            render={interior}
            interiorInd={interiorInd}
            imageClassName="brightness-90"
          />
        </div>
        {interior.renders?.map((render, index) => (
          <div key={render.id} onMouseEnter={() => onMouseEnter?.(index + 1)}>
            <RenderCard
              className={clsx(
                "!rounded-none w-full md:w-[100px] transition-all shadow-lg cursor-pointer relative before:content-[''] before:absolute before:w-full before:h-full before:bg-black before:top-0 before-left-0 before:z-10 hover:before:bg-opacity-0 before:transition-all before:duration-500",
                {
                  'before:bg-opacity-50 opacity-50': innerActiveIndex !== index + 1,
                  'before:bg-opacity-0 opacity-100': innerActiveIndex === index + 1,
                }
              )}
              render={render}
              interiorInd={index}
              imageClassName="brightness-90"
            />
          </div>
        ))}
      </div>

      <div className="absolute bottom-[250px] md:bottom-[200px] left-0 px-5 md-px-0 md:left-10">
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
