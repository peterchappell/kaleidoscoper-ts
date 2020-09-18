import React, { useEffect, useState, useRef } from "react";

import Download from "./Download";
import PhotoInfo from "./PhotoInfo";
import useWindowSize from "../hooks/useWindowSize";
import useKaleidoscopeCanvas from "../hooks/useKaleidoscopeCanvas";

export type PhotoData = {
  src: string;
  url?: string;
  author?: string;
  type?: string;
};

type MainProps = {
  photoData: PhotoData;
  isLoading: boolean;
};

type SizeStyle = {
  width: string;
  height: string;
};

const Main: React.FC<MainProps> = (props: MainProps) => {
  const { photoData, isLoading } = props;

  const [maxStyle, setMaxStyle] = useState<SizeStyle>({
    width: "100vw",
    height: "100vw",
  });
  const [hasDownloadSupport, setHasDownloadSupport] = useState(true);
  const size = useWindowSize();
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isMoving = useKaleidoscopeCanvas(
    canvasRef.current,
    photoData.src,
    size.width,
    size.height
  );

  useEffect(() => {
    if (!size.width || !size.height || size.width > size.height) {
      setMaxStyle({ width: "100vw", height: "100vw" });
    } else {
      setMaxStyle({ width: "100vh", height: "100vh" });
    }
  }, [size.width, size.height]);

  useEffect(() => {
    const a = document.createElement("a");
    setHasDownloadSupport(typeof a.download !== "undefined");
  }, []);

  return (
    <main className="flex-grow">
      {photoData.src && (
        <img src={photoData.src} alt="" className="hidden" aria-hidden="true" />
      )}
      <figure className="h-full w-full relative flex justify-center items-center overflow-hidden">
        <canvas
          height={Math.max(size.width, size.height)}
          width={Math.max(size.width, size.height)}
          ref={canvasRef}
          style={maxStyle}
          className="absolute z-10"
        />
        <figcaption
          className={`absolute right-0 top-0 z-20 flex mt-2 mr-2 ${
            isLoading || isMoving ? "opacity-0" : "opacity-100"
          } transition-opacity duration-500 ease-in-out`}
        >
          <PhotoInfo photoData={photoData} />
          {hasDownloadSupport && <Download canvasEl={canvasRef.current} />}
        </figcaption>
      </figure>
    </main>
  );
};

export default Main;
