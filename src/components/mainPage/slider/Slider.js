import React from "react";
import './Slider.scss'
import arrowLeft from '../../../assets/images/icons/arrow_left_icon.svg'
import arrowRight from '../../../assets/images/icons/arrow_right_icon.svg'
import {Button} from "../../common/Button";
import Image1 from '../../../assets/images/slide_1.png';
import Image2 from '../../../assets/images/slide_2.png';
import Image3 from '../../../assets/images/slide_3.png';
import Image4 from '../../../assets/images/slide_4.png';

export const Slider = () => {
  const slides = [
    {
      image: Image1,
      title: 'Бесплатная парковка',
      info: 'Оставляйте машину на платных городских' +
          ' парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.',
      buttonStyle: 'button__slide-1',
    },
    {
      image: Image2,
      title: 'Страховка',
      info: 'Полная страховка страховка автомобиля',
      buttonStyle: 'button__slide-2',
    },
    {
      image: Image3,
      title: 'Бензин',
      info: 'Полный бак на любой заправке города за наш счёт',
      buttonStyle: 'button__slide-3',
    },
    {
      image: Image4,
      title: 'Обслуживание',
      info: 'Автомобиль проходит еженедельное ТО',
      buttonStyle: 'button__slide-4',
    },
  ]

  const {image, title, info, buttonStyle} = slides[0];

  return (
      <section className='slider' style={{backgroundImage: `url(${image})`}}>
        <button className='slider__control slider__control-prev'>
          <img src={arrowLeft} alt=""/>
        </button>
        <div className='slider__content'>
          <div className='slider__item'>
            <h2 className='slider__item-title'>{title}</h2>
            <p className='slider__item-info'>{info}</p>
            <Button additionalStyles={buttonStyle}>Подробнее</Button>
          </div>
          <div className='slider__dots'>
            <span className='slider__dot' key="dot-1"/>
            <span className='slider__dot slider__dot--active' key="dot-2"/>
            <span className='slider__dot' key="dot-3"/>
            <span className='slider__dot' key="dot-4"/>
          </div>
        </div>
        <button className='slider__control slider__control-next'>
          <img src={arrowRight} alt=""/>
        </button>
      </section>
  )
};