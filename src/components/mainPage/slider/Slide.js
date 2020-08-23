import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { Button } from "../../common/buttons/Buttons";
import "./Slide.scss";

const Slide = ({ totalSlides, slide, currentSlide, previousSlide, index }) => {
  const [isVisible, setIsVisible] = useState(currentSlide === index);

  useEffect(() => {
    if (currentSlide === index) {
      setIsVisible(true);
    } else {
      setTimeout(() => setIsVisible(false), 500);
    }
  }, [currentSlide, index]);

  // const onAnimationEnd = () => {
  //   if (currentSlide !== index) {
  //     setIsVisible(false);
  //   }
  // };

  const previousClass = classNames({
    "is-prev":
      (previousSlide === 0 && currentSlide === totalSlides) ||
      (previousSlide > currentSlide &&
        !(previousSlide === totalSlides && currentSlide === 0)),
  });
  const slideClass = classNames({
    slide: true,
    "slide--active": isVisible,
  });

  return (
    <div className={slideClass}>
      <div
        className={`slide__background ${previousClass}`}
        style={{ backgroundImage: `url(${slide.image})` }}
      />
      <div className={`slide__content ${previousClass}`}>
        <h2 className="slide__content-title">{slide.title}</h2>
        <p className="slide__content-info">{slide.info}</p>
        <div className={`slide__button ${previousClass}`}>
          <Button additionalStyles={slide.buttonStyle}>Подробнее</Button>
        </div>
      </div>
    </div>
  );
};

export default Slide;
