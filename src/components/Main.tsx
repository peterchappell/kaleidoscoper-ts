import React, { useRef } from "react";

import useMaxSizeStyle from "../hooks/useMaxSizeStyle";
import useKaleidoscopeCanvas from "../hooks/useKaleidoscopeCanvas";

type MainProps = {
  photo: string;
};

const Main: React.FC<MainProps> = ({ photo }: MainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maxSizeStyle = useMaxSizeStyle();
  useKaleidoscopeCanvas(canvasRef.current, photo);

  return (
    <main className="flex justify-center items-center flex-grow overflow-hidden relative">
      {photo && <img src={photo} alt="" className="hidden" />}
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
