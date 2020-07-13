import React from "react";
import '../styles/mainPage/Slider.scss'
import arrowLeft from '../assets/images/icons/arrow_left_icon.svg'
import arrowRight from '../assets/images/icons/arrow_right_icon.svg'

export const Slider = () => {
  return (
      <section className='slider'>
        <button className='slider__control slider__control-prev'>
          <img src={arrowLeft} alt=""/>
        </button>
        <div className='slider__content'>
          <div className='slider__item'>
            <h2 className='slider__item-title'>Бесплатная парковка</h2>
            <p className='slider__item-info'>Оставляйте машину на платных городских
              парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.</p>
            <button className='slider__item-button'>Подробнее</button>
          </div>
          <div className='slider__dots'>
            <span className='slider__dot' key="dot-1"> </span>
            <span className='slider__dot slider__dot--active' key="dot-2"/>
            <span className='slider__dot' key="radio-3"/>
            <span className='slider__dot' key="radio-4"/>
          </div>
        </div>
        <button className='slider__control slider__control-next'>
          <img src={arrowRight} alt=""/>
        </button>
      </section>
  )
};