import React from "react";

type FooterProps = {
  setPhotoHandler: (photo: string) => void;
};

const Footer: React.FC<FooterProps> = (props: FooterProps) => {
  const { setPhotoHandler } = props;

  const selectRandomPhoto = (): void => {
    const photoEl = new Image();
    photoEl.crossOrigin = "Anonymous";
    photoEl.onload = (): void => {
      const canvasEl: HTMLCanvasElement = document.createElement("canvas");
      canvasEl.height = photoEl.naturalHeight;
      canvasEl.width = photoEl.naturalWidth;
      const ctx: CanvasRenderingContext2D | null = canvasEl.getContext("2d");
      if (ctx) {
        ctx.drawImage(photoEl, 0, 0);
        setPhotoHandler(canvasEl.toDataURL());
      }
    };
    photoEl.src = "https://source.unsplash.com/random/2400x2400";
  };

  return (
    <footer className="p-3 sm:p-6 bg-black flex justify-center">
      <button type="button" onClick={selectRandomPhoto}>
        Select random photo
      </button>
    </footer>
  );
};

export default Footer;
