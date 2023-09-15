import RenderCard from '@/components/RenderCard/RenderCard'
import { InteriorType } from '@/state/interior/InteriorState'
import clsx from 'clsx'
import { useRef, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/thumbs'
import { Autoplay, EffectFade, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import SlideContent from './SlideContent'

type Props = {
  className?: string
  interiorItems: InteriorType[]
}

export default function MainSlider({ className, interiorItems = [] }: Props) {
  const mainSliderRef = useRef<any>(null)

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState<any>(0)
  const [innerActiveIndex, setInnerActiveIndex] = useState<any>(0)

  const handleMouseEnter = (index: number) => setInnerActiveIndex(index)

  const interiors = interiorItems.filter((interior) => !!interior.renders?.length)

  return (
    <div className={clsx('relative', className)}>
      {thumbsSwiper && (
        <Swiper
          ref={mainSliderRef}
          speed={800}
          spaceBetween={0}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={true}
          autoplay={{
            delay: 7000,
            disableOnInteraction: true,
          }}
          modules={[EffectFade, Thumbs, Autoplay]}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setInnerActiveIndex(0)
          }}
          breakpoints={{
            0: {
              thumbs: { autoScrollOffset: 0 },
            },
            640: {
              thumbs: { autoScrollOffset: 1 },
            },
          }}
        >
          {interiors.map((interior, ind) => (
            <SwiperSlide key={interior.id} className="!h-[100vh] relative">
              {({ isActive }) => (
                <SlideContent
                  interior={interior}
                  isActive={isActive}
                  interiorInd={ind}
                  innerActiveIndex={innerActiveIndex}
                  onMouseEnter={handleMouseEnter}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="absolute w-full bottom-0 left-0 bg-black bg-opacity-80 z-10 p-3">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          breakpoints={{
            0: {
              slidesPerView: 3,
              thumbs: { autoScrollOffset: 0 },
            },
            640: {
              slidesPerView: 5,
              thumbs: { autoScrollOffset: 1 },
            },
            768: {
              slidesPerView: 8,
            },
            1024: {
              slidesPerView: 15,
            },
          }}
        >
          {interiors.map((interior, ind) => (
            <SwiperSlide
              key={interior.id}
              className={clsx(
                'cursor-pointer relative before:content-[""] before:absolute before:w-full before:h-full before:bg-black before:top-0 before-left-0 before:z-10 hover:before:bg-opacity-0 before:transition-all before:duration-500',
                {
                  'before:bg-opacity-0': ind === activeIndex,
                  'before:bg-opacity-50': ind !== activeIndex,
                }
              )}
            >
              <RenderCard className="!rounded-none" render={interior} interiorInd={ind} showCursor />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
