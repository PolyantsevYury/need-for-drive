import React from "react";
import './Slider.scss'
import arrowLeft from '../../../assets/images/icons/arrow_left_icon.svg'
import arrowRight from '../../../assets/images/icons/arrow_right_icon.svg'
import {Button} from "../../common/Button";
import Image1 from '../../../assets/images/slide_1.png';
import Image2 from '../../../assets/images/slide_2.png';
import Image3 from '../../../assets/images/slide_3.png';
import Image4 from '../../../assets/images/slide_4.png';
import useSlider from "../../common/hooks/useSlider";

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

  const {currentSlide, setCurrentSlide} = useSlider({
    total: slides.length,
    enabled: true,
    speed: 4000,
  });

  return (
      <section className='slider'>
        <button className='slider__control slider__control-prev'
                onClick={() => (currentSlide === 0) ? setCurrentSlide(slides.length - 1)
                                             : setCurrentSlide(currentSlide - 1)}>
          <img src={arrowLeft} alt=""/>
        </button>
        <div className='slider__content-wrapper'>
          {slides.map((slideContent, index) => (
              <div className={'slider__content' + (currentSlide === index ? ' slider__content--active' : '')}>
                <img className='slider__background-preload' src={slideContent.image}/>
                <div className='slider__background' style={{backgroundImage: `url(${slideContent.image})`}}/>
                <h2 className='slider__content-title'>{slideContent.title}</h2>
                <p className='slider__content-info'>{slideContent.info}</p>
                <Button additionalStyles={slideContent.buttonStyle}>Подробнее</Button>
              </div>
          ))}
        </div>
        <div className='slider__dots'>
          {slides.map((slideInfo, index) => (
              <span className={'slider__dot' + (currentSlide === index ? ' slider__dot--active' : '')}
                    key={index}
                    onClick={() => setCurrentSlide(index)}/>
          ))}
        </div>
        <button className='slider__control slider__control-next'
                onClick={() => (currentSlide === slides.length - 1) ? setCurrentSlide(0)
                                                             : setCurrentSlide(currentSlide + 1)}>
          <img src={arrowRight} alt=""/>
        </button>
      </section>
  )
};