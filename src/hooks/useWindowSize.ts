import { useLayoutEffect, useState } from "react";

const useViewPort = () => {
  const [size] = useWindowSize();
  let viewPort = "desktop";
  if (size < 1024) {
    viewPort = "tablet";
  }
  if (size < 768) {
    viewPort = "mobile";
  }
  return viewPort;
};

function useWindowSize() {
  const [size, setSize] = useState([0, 0]);
  useLayoutEffect(() => {
    function updateSize() {
      setSize([window.innerWidth, window.innerHeight]);
    }
    window.addEventListener("resize", updateSize);
    updateSize();
    return () => window.removeEventListener("resize", updateSize);
  }, []);
  return size;
}

export { useWindowSize, useViewPort };
