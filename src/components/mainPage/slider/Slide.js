import React from "react";
import {Button} from "../../common/Button";
import './Slide.scss';
import classNames from 'classnames';

export const Slide = ({slide, currentSlide, index}) => {
  const isCurrent = (currentSlide === index);
  // const isPrev = (currentSlide - 1 === index);
  // const isNext = (currentSlide + 1 === index);
  const slideStyles = classNames('slide', {'slide--active': isCurrent});
  const backgroundStyles = classNames('slide__background', {'slide__background--is-next': isCurrent});

  return (
      <div className={slideStyles}>
        <img className='slide__background-preload' src={slide.image} alt=''/>
        <div className={backgroundStyles}
             style={{backgroundImage: `url(${slide.image})`}}/>
        <div className='slide__content'>
          <h2 className='slide__content-title'>{slide.title}</h2>
          <p className='slide__content-info'>{slide.info}</p>
        </div>
        <div className='slide__button'>
          <Button additionalStyles={slide.buttonStyle}>Подробнее</Button>
        </div>
      </div>
  )
}