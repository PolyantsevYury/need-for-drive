import React, {useEffect, useState} from "react";
import {Button} from "../../common/Button";
import './Slide.scss';
import classNames from 'classnames';

export const Slide = ({slide, currentSlide, previousSlide, index}) => {
  const isCurrent = (currentSlide === index);
  const [render, setRender] = useState(isCurrent);

  useEffect(() => {
    if (isCurrent) setRender(true);
  }, [isCurrent]);

  const onAnimationEnd = () => {
    if (!isCurrent) {
      setRender(false)
    }
  };
  const backgroundStyles = classNames('slide__background',
      {'slide__background--is-prev': previousSlide > currentSlide},
      {'slide__background--is-next': previousSlide < currentSlide});

  return (
      render && (
          <div className={'slide'} style={{animation: `${isCurrent ? "fadeIn" : "fadeOut"} 0.5s`}}
               onAnimationEnd={onAnimationEnd}>
            <img className='slide__background-preload' src={slide.image} alt=''/>
            <div className={backgroundStyles}
                 style={{backgroundImage: `url(${slide.image})`}}/>
            <div className='slide__content'>
              <h2 className='slide__content-title'>{slide.title}</h2>
              <p className='slide__content-info'>{slide.info}</p>
              <div className='slide__button'>
                <Button additionalStyles={slide.buttonStyle}>Подробнее</Button>
              </div>
            </div>
          </div>
      )
  )
}