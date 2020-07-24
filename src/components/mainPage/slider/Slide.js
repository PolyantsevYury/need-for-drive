import React, { useEffect, useState } from "react";
import classNames from "classnames";
import PropTypes from "prop-types";
import { Button } from "../../common/buttons/Buttons";
import "./Slide.scss";

const Slide = ({ totalSlides, slide, currentSlide, previousSlide, index }) => {
  const isCurrent = currentSlide === index;
  const [render, setRender] = useState(isCurrent);

  useEffect(() => {
    if (isCurrent) setRender(true);
  }, [isCurrent]);

  const onAnimationEnd = () => {
    if (!isCurrent) {
      setRender(false);
    }
  };

  const previousClass = classNames({
    "is-prev":
      (previousSlide === 0 && currentSlide === totalSlides) ||
      (previousSlide > currentSlide &&
        !(previousSlide === totalSlides && currentSlide === 0)),
  });

  return (
    render && (
      <div
        className="slide"
        style={{ animation: `${isCurrent ? "fadeIn" : "fadeOut"} 0.5s` }}
        onAnimationEnd={onAnimationEnd}
      >
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
    )
  );
};

Slide.propTypes = {
  totalSlides: PropTypes.number.isRequired,
  slide: PropTypes.shape({
    image: PropTypes.string,
    title: PropTypes.string,
    info: PropTypes.string,
    buttonStyle: PropTypes.string,
  }).isRequired,
  currentSlide: PropTypes.number.isRequired,
  previousSlide: PropTypes.number,
  index: PropTypes.number.isRequired,
};

Slide.defaultProps = {
  previousSlide: 0,
};

export default Slide;
