import * as React from "react";
import useInterval from "./useInterval";

function useSlider({
                     total = 0,
                     enabled = false,
                     speed = 5000,
                   }) {
  // const offset = React.useRef(0);
  const [slide, setSlide] = React.useState(0);

  function incrementSlide() {
    (slide === total - 1) ? setSlide(0)
        : setSlide(slide + 1);
  }

  useInterval(() => {
    if (enabled && slide < total) {
      incrementSlide();
    }
  }, speed);

  return { slide, setSlide };
}

export default useSlider;
