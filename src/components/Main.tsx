import React, { useRef } from "react";

import useMaxSizeStyle from "../hooks/useMaxSizeStyle";
import useKaleidoscopeCanvas from "../hooks/useKaleidoscopeCanvas";

export type PhotoData = {
  src: string;
  url?: string;
};

type MainProps = {
  photoData: PhotoData;
};

const Main: React.FC<MainProps> = ({ photoData }: MainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maxSizeStyle = useMaxSizeStyle();
  useKaleidoscopeCanvas(canvasRef.current, photoData.src);

  return (
    <main className="flex justify-center items-center flex-grow overflow-hidden relative">
      {photoData.src && <img src={photoData.src} alt="" className="hidden" />}
      <canvas
        height={2400}
        width={2400}
        ref={canvasRef}
        style={maxSizeStyle}
        className="absolute"
      />
    </main>
  );
};

export default Main;
