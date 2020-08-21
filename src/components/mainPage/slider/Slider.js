import React from "react";
import "./Slider.scss";
import arrowLeft from "../../../assets/images/icons/arrow_left_icon.svg";
import arrowRight from "../../../assets/images/icons/arrow_right_icon.svg";
import Image1 from "../../../assets/images/slide1.jpg";
import Image2 from "../../../assets/images/slide2.jpg";
import Image3 from "../../../assets/images/slide3.jpg";
import Image4 from "../../../assets/images/slide4.jpg";
import useSlider from "../../common/hooks/useSlider";
import Slide from "./Slide";
import usePrevious from "../../common/hooks/usePrevious";

const slides = [
  {
    image: Image1,
    title: "Бесплатная парковка",
    info:
      "Оставляйте машину на платных городских" +
      " парковках и разрешенных местах, не нарушая ПДД, а также в аэропортах.",
    buttonStyle: "button__slide-1",
  },
  {
    image: Image2,
    title: "Страховка",
    info: "Полная страховка страховка автомобиля",
    buttonStyle: "button__slide-2",
  },
  {
    image: Image3,
    title: "Бензин",
    info: "Полный бак на любой заправке города за наш счёт",
    buttonStyle: "button__slide-3",
  },
  {
    image: Image4,
    title: "Обслуживание",
    info: "Автомобиль проходит еженедельное ТО",
    buttonStyle: "button__slide-4",
  },
];

const Slider = () => {
  const [isSliderEnabled, setSliderEnabled] = React.useState(true);
  const { currentSlide, setCurrentSlide } = useSlider({
    total: slides.length,
    enabled: isSliderEnabled,
    speed: 4500,
  });
  const previousSlide = usePrevious(currentSlide);
  const showPrevSlide = () => {
    if (currentSlide === 0) {
      setCurrentSlide(slides.length - 1);
    } else {
      setCurrentSlide(currentSlide - 1);
    }
    setSliderEnabled(false);
  };
  const showNextSlide = () => {
    if (currentSlide === slides.length - 1) {
      setCurrentSlide(0);
    } else {
      setCurrentSlide(currentSlide + 1);
    }
    setSliderEnabled(false);
  };

  return (
    <section className="slider">
      <div className="img-preload">
        {slides.forEach((slide) => {
          const img = new Image();
          img.src = slide.image;
        })}
      </div>
      <button
        type="button"
        className="slider__control slider__control-prev"
        onClick={() => showPrevSlide()}
      >
        <img src={arrowLeft} alt="" />
      </button>
      <div className="slider__content-wrapper">
        {slides.map((slide, index) => (
          <Slide
            key={slide.buttonStyle}
            totalSlides={slides.length - 1}
            slide={slide}
            currentSlide={currentSlide}
            previousSlide={previousSlide}
            index={index}
          />
        ))}
      </div>
      <div className="slider__dots">
        {slides.map((slide, index) => (
          <span
            role="button"
            tabIndex={index}
            onKeyPress={() => {
              setCurrentSlide(index);
              setSliderEnabled(false);
            }}
            className={`slider__dot${
              currentSlide === index ? " slider__dot--active" : ""
            }`}
            key={slide.title}
            onClick={() => setCurrentSlide(index)}
          />
        ))}
      </div>
      <button
        type="button"
        className="slider__control slider__control-next"
        onClick={() => showNextSlide()}
      >
        <img src={arrowRight} alt="" />
      </button>
    </section>
  );
};

export default Slider;
