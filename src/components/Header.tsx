import React, { useState, useEffect } from "react";

import Download from "./Download";

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
      <h1 className="font-bold">Kaleidoscoper</h1>
      {hasDownloadSupport && (
        <Download canvasRef={canvasRef} isLoading={isLoading} />
      )}
    </header>
  );
};

export default Header;
