import { useEffect, useState } from "react";

import useWindowSize from "./useWindowSize";

type SizeStyle = {
  width: string;
  height: string;
};

function useMaxSizeStyle(): SizeStyle {
  const size = useWindowSize();
  const [maxStyle, setMaxStyle] = useState({ width: "100vw", height: "100vw" });

  useEffect(() => {
    if (!size.width || !size.height || size.width > size.height) {
      setMaxStyle({ width: "100vw", height: "100vw" });
      // setMaxStyle({ width: `${size.width}px`, height: `${size.width}px` });
    } else {
      setMaxStyle({ width: "100vh", height: "100vh" });
      // setMaxStyle({ width: `${size.height}px`, height: `${size.height}px` });
    }
  }, [size.width, size.height]);

  return maxStyle;
}

export default useMaxSizeStyle;
