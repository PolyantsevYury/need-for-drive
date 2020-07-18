import React from "react";
import './Slider.scss'
import arrowLeft from '../../../assets/images/icons/arrow_left_icon.svg'
import arrowRight from '../../../assets/images/icons/arrow_right_icon.svg'
import Image1 from '../../../assets/images/slide1.jpg';
import Image2 from '../../../assets/images/slide2.jpg';
import Image3 from '../../../assets/images/slide3.jpg';
import Image4 from '../../../assets/images/slide4.jpg';
import useSlider from "../../common/hooks/useSlider";
import {Slide} from "./Slide";
import usePrevious from "../../common/hooks/usePrevious";

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

export const Slider = () => {
  const {currentSlide, setCurrentSlide} = useSlider({
    total: slides.length,
    enabled: true,
    speed: 4500,
  });
  const previousSlide = usePrevious(currentSlide);
  const showPrevSlide = () => {
    (currentSlide === 0) ? setCurrentSlide(slides.length - 1)
                         : setCurrentSlide(currentSlide - 1)
  }
  const showNextSlide = () => {
    (currentSlide === slides.length - 1) ? setCurrentSlide(0)
                                         : setCurrentSlide(currentSlide + 1)
  }

  return (
      <section className='slider'>
        <div className='img-preload'>
          {slides.forEach(slide => {
            const img = new Image();
            img.src = slide.image;
          })}
        </div>
        <button className='slider__control slider__control-prev'
                onClick={() => showPrevSlide()}>
          <img src={arrowLeft} alt=""/>
        </button>
        <div className='slider__content-wrapper'>
          {slides.map((slide, index) => (
              <Slide key={index}
                     totalSlides={slides.length - 1}
                     slide={slide}
                     currentSlide={currentSlide}
                     previousSlide={previousSlide}
                     index={index}/>
          ))}
        </div>
        <div className='slider__dots'>
          {slides.map((slideInfo, index) => (
              <span className={'slider__dot' + (currentSlide === index ? ' slider__dot--active' : '')}
                    key={index} onClick={() => setCurrentSlide(index)}/>
          ))}
        </div>
        <button className='slider__control slider__control-next'
                onClick={() => showNextSlide()}>
          <img src={arrowRight} alt=""/>
        </button>
      </section>
  )
};