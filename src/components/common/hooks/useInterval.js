import * as React from "react";

// from https://overreacted.io/making-setinterval-declarative-with-react-hooks/

function useInterval(callback, delay) {
  const savedCallback = React.useRef(null);

  // Remember the latest callback.
  React.useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  // eslint-disable-next-line consistent-return
  React.useEffect(() => {
    function tick() {
      // eslint-disable-next-line no-unused-expressions
      savedCallback && savedCallback.current();
    }
    if (delay !== null) {
      const id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default useInterval;
