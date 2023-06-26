import { Swiper, SwiperRef, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { useRef, useState } from 'react';
import clsx from 'clsx';
import SimilarCard from '../similar-card/similar-card';
import { Cameras } from '../../types/catalog';

type SimilarProductsSliderProps = {
  cameras: Cameras;
}

export default function SimilarProductsSlider({ cameras }: SimilarProductsSliderProps) {
  const swiperRef = useRef<SwiperRef['swiper']>();
  const [{ isBeginning, isEnd }, setSliderState] = useState({
    isBeginning: true,
    isEnd: false
  });

  return (
    <div className="product-similar__slider">
      <Swiper
        onSwiper={(swiper) => { swiperRef.current = swiper; }}
        onSlideChange={(swiper) => {
          setSliderState({ isBeginning: swiper.isBeginning, isEnd: swiper.isEnd });
        }}
        slidesPerView={3}
        slidesPerGroup={3}
        spaceBetween={0}
        allowTouchMove={false}
        wrapperClass='product-similar__slider-list'

      >
        {cameras.map((camera) => (
          <SwiperSlide key={camera.id} className='product-card is-active'>
            <SimilarCard camera={camera} />
          </SwiperSlide>
        ))}
      </Swiper>
      <button
        style={{
          pointerEvents: isBeginning ? 'none' : 'auto',
          zIndex:'10'
        }}
        onClick={() => swiperRef.current?.slidePrev()}
        className={clsx('slider-controls slider-controls--prev', isBeginning && 'disabled')}
        type="button"
        aria-label="Предыдущий слайд"
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
      <button
        style={{
          pointerEvents: isEnd ? 'none' : 'auto',
          zIndex:'10'
        }}
        onClick={() => swiperRef.current?.slideNext()}
        className={clsx('slider-controls slider-controls--next', isEnd && 'disabled')}
        type="button"
        aria-label="Следующий слайд"
      >
        <svg width="7" height="12" aria-hidden="true">
          <use xlinkHref="#icon-arrow"></use>
        </svg>
      </button>
    </div>
  );
}
