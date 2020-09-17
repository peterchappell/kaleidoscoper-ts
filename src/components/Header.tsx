import React, { useState, useEffect } from "react";

import Download from "./Download";
import { ReactComponent as KaleidoscoperLogo } from "../images/kaleidoscoper-logo.svg";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isLoading: boolean;
};

const Header: React.FC<Props> = (props: Props) => {
  const { canvasRef, isLoading } = props;
  const [hasDownloadSupport, setHasDownloadSupport] = useState(true);

  useEffect(() => {
    const a = document.createElement("a");
    setHasDownloadSupport(typeof a.download !== "undefined");
  }, []);

  return (
    <header className="p-3 bg-black flex justify-between items-center">
      <div className="flex items-center">
        <KaleidoscoperLogo className="w-10 h-10 mr-2" />
        <h1 className="font-bold text-xl">Kaleidoscoper</h1>
      </div>
      {hasDownloadSupport && (
        <Download canvasRef={canvasRef} isLoading={isLoading} />
      )}
    </header>
  );
};

export default Header;
