import RenderCard from '@/components/RenderCard/RenderCard'
import { InteriorType } from '@/state/interior/InteriorState'
import clsx from 'clsx'
import { useCallback, useState } from 'react'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/thumbs'
import { Autoplay, EffectFade, Navigation, Thumbs } from 'swiper/modules'
import { Swiper, SwiperClass, SwiperSlide } from 'swiper/react'
import SlideContent from './SlideContent'

type Props = {
  className?: string
  interiorItems: InteriorType[]
}

export default function MainSlider({ className, interiorItems = [] }: Props) {
  const [mainSliderRef, setMainSliderRef] = useState<SwiperClass>()

  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null)
  const [activeIndex, setActiveIndex] = useState<any>(0)
  const [innerActiveIndex, setInnerActiveIndex] = useState<any>(0)

  const handleMouseEnter = useCallback((index: number) => setInnerActiveIndex(index), [])

  const interiors = interiorItems.filter((interior) => !!interior.renders?.length)

  return (
    <div className={clsx('flex flex-grow flex-col md:!h-[calc(100vh-74px)] !h-[calc(100vh-58px)]', className)}>
      {thumbsSwiper && (
        <Swiper
          onSwiper={setMainSliderRef}
          className="h-full w-full"
          // centeredSlides={true}
          speed={800}
          spaceBetween={0}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          navigation={true}
          preventClicks={false}
          preventClicksPropagation={false}
          autoplay={{
            delay: 10000,
            disableOnInteraction: true,
          }}
          slidesPerView={1}
          modules={[EffectFade, Thumbs, Autoplay]}
          thumbs={{ swiper: thumbsSwiper }}
          onSlideChange={({ activeIndex }) => {
            setActiveIndex(activeIndex)
            setInnerActiveIndex(0)
          }}
          breakpoints={{
            0: {},
            640: {},
          }}
        >
          {interiors.map((interior) => (
            <SwiperSlide key={interior.id} className="w-full relative h-full">
              {({ isActive }) => (
                <SlideContent
                  interior={interior}
                  isActive={isActive}
                  // interiorInd={ind}
                  innerActiveIndex={innerActiveIndex}
                  onMouseEnter={handleMouseEnter}
                  sliderRef={mainSliderRef}
                />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      )}

      <div className="flex w-full bg-black p-3 h-[100px]">
        <Swiper
          onSwiper={setThumbsSwiper}
          spaceBetween={12}
          watchSlidesProgress={true}
          modules={[Navigation, Thumbs]}
          className="flex flex-grow"
          // allowTouchMove={false}
          // pagination={{
          //   clickable: true,
          // }}
          breakpoints={{
            0: {
              slidesPerView: 3,
            },
            640: {
              slidesPerView: 5,
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
              <RenderCard className="!rounded-none" render={interior} /* interiorInd={ind} */ fill showCursor />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  )
}
