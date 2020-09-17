import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { ReactComponent as DownloadIcon } from "../images/download.svg";

type Props = {
  canvasRef: React.RefObject<HTMLCanvasElement>;
  isLoading: boolean;
};

const Download: React.FC<Props> = (props: Props) => {
  const { canvasRef, isLoading } = props;
  const [saveHref, setSaveHref] = useState("");
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const saveCanvas = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (canvasRef && canvasRef.current) {
      try {
        setSaveHref(canvasRef.current.toDataURL("image/jpeg"));
      } catch (error) {
        setSaveHref("");
      }
    }
  };

  useEffect(() => {
    if (downloadLinkRef.current && saveHref) {
      downloadLinkRef.current.click();
    }
  }, [saveHref]);

  return (
    <div
      className={`${
        isLoading ? "opacity-0" : "opacity-100"
      } transition-opacity duration-500 ease-in-out`}
    >
      <button
        type="button"
        className="p-3 text-xs focus:outline-none focus:bg-gray-800 flex items-center"
        onClick={saveCanvas}
      >
        Save
        <DownloadIcon className="text-white w-4 h-4 fill-current m-auto ml-2" />
      </button>
      <a
        ref={downloadLinkRef}
        className="sr-only"
        download={`kaleidoscoper-${Date.now()}.jpg`}
        href={saveHref}
        rel="noopener noreferrer"
      >
        Download
      </a>
    </div>
  );
};

export default Download;
