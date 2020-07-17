import * as React from "react";
import useInterval from "./useInterval";

function useSlider({
                     total = 0,
                     enabled = false,
                     speed = 5000,
                   }) {
  const [currentSlide, setCurrentSlide] = React.useState(0);

  function nextSlide() {
    (currentSlide === total - 1) ? setCurrentSlide(0)
                                 : setCurrentSlide(currentSlide + 1);
  }

  useInterval(() => {
    if (enabled && currentSlide < total) {
      nextSlide();
    }
  }, speed);

  return { currentSlide, setCurrentSlide };
}

export default useSlider;
