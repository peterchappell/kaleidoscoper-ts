import React from "react";

import useMaxSizeStyle from "../hooks/useMaxSizeStyle";
import useKaleidoscopeCanvas from "../hooks/useKaleidoscopeCanvas";

export type PhotoData = {
  src: string;
  url?: string;
};

type MainProps = {
  photoData: PhotoData;
};

const Main = React.forwardRef<React.RefObject<HTMLCanvasElement>, MainProps>(
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  (props: MainProps, ref: any) => {
    const { photoData } = props;
    const maxSizeStyle = useMaxSizeStyle();
    useKaleidoscopeCanvas(ref.current, photoData.src);

    return (
      <main className="flex justify-center items-center flex-grow overflow-hidden relative">
        {photoData.src && <img src={photoData.src} alt="" className="hidden" />}
        <canvas
          height={2400}
          width={2400}
          ref={ref}
          style={maxSizeStyle}
          className="absolute"
        />
      </main>
    );
  }
);

export default Main;
