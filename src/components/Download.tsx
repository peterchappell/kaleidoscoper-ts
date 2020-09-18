import React, { useState, useRef, useEffect, MouseEvent } from "react";
import { ReactComponent as DownloadIcon } from "../images/download.svg";

type Props = {
  canvasEl: HTMLCanvasElement | null;
};

const Download: React.FC<Props> = (props: Props) => {
  const { canvasEl } = props;
  const [saveHref, setSaveHref] = useState("");
  const downloadLinkRef = useRef<HTMLAnchorElement>(null);

  const saveCanvas = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    if (canvasEl) {
      try {
        setSaveHref(canvasEl.toDataURL("image/jpeg"));
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
    <div>
      <button
        type="button"
        className="w-12 h-12 rounded-full bg-black bg-opacity-50 focus:outline-none focus:bg-opacity-75 flex items-center justify-center"
        onClick={saveCanvas}
      >
        <DownloadIcon
          className="text-white w-6 h-6 fill-current m-auto"
          title="Save"
        />
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
