import React, { useEffect, useState } from "react";

import useWindowSize from "../hooks/useWindowSize";
import useKaleidoscopeCanvas from "../hooks/useKaleidoscopeCanvas";

export type PhotoData = {
  src: string;
  url?: string;
};

type MainProps = {
  photoData: PhotoData;
};

type SizeStyle = {
  width: string;
  height: string;
};

const Main = React.forwardRef<React.RefObject<HTMLCanvasElement>, MainProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: MainProps, ref: any) => {
    const { photoData } = props;

    const [maxStyle, setMaxStyle] = useState<SizeStyle>({
      width: "100vw",
      height: "100vw",
    });
    const size = useWindowSize();
    useKaleidoscopeCanvas(ref.current, photoData.src, size.width, size.height);

    useEffect(() => {
      if (!size.width || !size.height || size.width > size.height) {
        setMaxStyle({ width: "100vw", height: "100vw" });
      } else {
        setMaxStyle({ width: "100vh", height: "100vh" });
      }
    }, [size.width, size.height]);

    return (
      <main className="flex justify-center items-center flex-grow overflow-hidden relative">
        {photoData.src && <img src={photoData.src} alt="" className="hidden" />}
        <canvas
          height={Math.max(size.width, size.height)}
          width={Math.max(size.width, size.height)}
          ref={ref}
          style={maxStyle}
          className="absolute"
        />
      </main>
    );
  }
);

export default Main;
