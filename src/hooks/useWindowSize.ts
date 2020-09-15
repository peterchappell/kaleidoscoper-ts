import { useState, useEffect, useCallback } from "react";

type WindowSize = {
  width: number | undefined;
  height: number | undefined;
};

function useWindowSize(): WindowSize {
  const getSize = useCallback(
    (): WindowSize => ({
      width: window.innerWidth,
      height: window.innerHeight,
    }),
    []
  );

  const [windowSize, setWindowSize] = useState<WindowSize>(getSize);

  useEffect(() => {
    function handleResize(): void {
      setWindowSize(getSize());
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return (): void => window.removeEventListener("resize", handleResize);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return windowSize;
}

export default useWindowSize;
