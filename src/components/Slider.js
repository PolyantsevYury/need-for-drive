import React from "react";
import '../styles/mainPage/Slider.scss'

export const Slider = () => {
  return (
      <section className='slider'>
        <button className='slider__control slider__control-prev'>
        </button>
        <div className='slider__content'>
          <div className='slider__item'>
            <h2 className='slider__item-title'>Бесплатная парковка</h2>
            <p className='slider__item-info'>Оставляйте машину на платных городских
              парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.</p>
            <button className='slider__item-button'>Подробнее</button>
          </div>
          <div className='slider__nav'>
            <button className='slider__nav-item'> </button>
            <button className='slider__nav-item slider__nav-item--active'> </button>
            <button className='slider__nav-item'> </button>
            <button className='slider__nav-item'> </button>
          </div>
        </div>
        <button className='slider__control slider__control-next'>
        </button>
      </section>
  )
};