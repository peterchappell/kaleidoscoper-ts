import React, { useEffect, useRef, useState } from "react";

import useMaxSizeStyle from "../hooks/useMaxSizeStyle";
import useCanvasPointerEventPosition from "../hooks/useCanvasPointerEventPosition";

type MainProps = {
  photo: string;
};

type PhotoData = {
  element: HTMLImageElement | null;
  width: number;
  height: number;
};

type CanvasData = {
  ctx: CanvasRenderingContext2D | null;
  centreX: number;
  centreY: number;
  segmentWidth: number;
  segmentHeight: number;
};

const Main: React.FC<MainProps> = ({ photo }: MainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maxSizeStyle = useMaxSizeStyle();
  const mousePosition = useCanvasPointerEventPosition(canvasRef.current);
  const [photoData, setPhotoData] = useState<PhotoData>({
    element: null,
    width: 0,
    height: 0,
  });
  const [canvasData, setCanvasData] = useState<CanvasData>({
    ctx: null,
    centreX: 0,
    centreY: 0,
    segmentHeight: 0,
    segmentWidth: 0,
  });

  useEffect(() => {
    const photoEl = new Image();
    photoEl.src = photo;
    setPhotoData({
      element: photoEl,
      width: photoEl.width,
      height: photoEl.height,
    });
    if (canvasRef.current) {
      setCanvasData({
        ctx: canvasRef.current.getContext("2d"),
        centreX: canvasRef.current.width / 2,
        centreY: canvasRef.current.height / 2,
        segmentWidth: canvasRef.current.width / 2,
        segmentHeight: canvasRef.current.height / 2,
      });
    }
  }, [photo]);

  useEffect(() => {
    const degToRad = Math.PI / 180;
    if (!canvasRef.current || !canvasData.ctx || !photoData.element) {
      return;
    }

    // x and y co-ordinates of the photo are in the top left corner by default
    // But the x and y co-ordinates of the photo using the mouse co-ordinates
    // const photoX = 100;
    // const photoY = 100;
    const photoX = Math.abs(
      (mousePosition.x * photoData.element.width) /
        canvasRef.current.offsetWidth
    );
    const photoY = Math.abs(
      (mousePosition.y * photoData.element.height) /
        canvasRef.current.offsetHeight
    );

    // constrain/reduce the photo width in proportion to the x,y that we're using
    // (to prevent cutting the image/segement)
    // const photoWidth = 800;
    // const photoHeight = 800;
    const photoWidth = photoData.element.width - photoX;
    const photoHeight = photoData.element.height - photoY;

    // clear first
    canvasData.ctx.clearRect(
      0,
      0,
      canvasRef.current.offsetWidth,
      canvasRef.current.offsetHeight
    );

    // UPPER HALF OF TOP LEFT QUARTER (rotated)
    canvasData.ctx.save();
    // draw a segment (triangle) from center to top middle to top left and back
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX,
      canvasData.centreY - canvasData.segmentHeight
    );
    canvasData.ctx.lineTo(
      canvasData.centreX - canvasData.segmentWidth,
      canvasData.centreY - canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    // make the segment a clipping path
    canvasData.ctx.clip();
    // make the center of the canvas the origin (0,0) point for placing the image
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    // rotate the canvas before for placing the image (according to kaleidoscope pattern)
    canvasData.ctx.rotate(-90 * degToRad);
    // use scale to set reflection (according to kaleidoscope pattern)
    canvasData.ctx.scale(1, -1);
    // draw the photo from the starting point (determined by pointer position) to the end corner of the photo
    // place it from 0,0 to the canvas corner
    // note for this segment, because it is rotated, we switch height and width for the destination drawing area
    // (this way it stretches better when the canvas is not square)
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentHeight,
      canvasData.segmentWidth
    );
    // restore for next segment
    canvasData.ctx.restore();

    // LOWER HALF OF TOP LEFT QUARTER (mirrored)
    canvasData.ctx.save();
    // draw a segment from center to middle left to top left and back
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX - canvasData.segmentWidth,
      canvasData.centreY
    );
    canvasData.ctx.lineTo(
      canvasData.centreX - canvasData.segmentWidth,
      canvasData.centreY - canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    // make the segment a clipping path
    canvasData.ctx.clip();
    // make the center of the canvas the origin (0,0) point for placing the image
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    // use scale to set reflection (according to kaleidoscope pattern)
    canvasData.ctx.scale(-1, -1);
    // draw the photo from the starting point (determined by pointer position) to the end corner of the photo
    // place it from 0,0 to the canvas corner
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentWidth,
      canvasData.segmentHeight
    );
    // restore for next segment
    canvasData.ctx.restore();

    // UPPER HALF OF TOP RIGHT QUARTER (rotated)
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX + canvasData.segmentWidth,
      canvasData.centreY - canvasData.segmentHeight
    );
    canvasData.ctx.lineTo(
      canvasData.centreX,
      canvasData.centreY - canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    canvasData.ctx.clip();
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.rotate(-90 * degToRad);
    canvasData.ctx.scale(1, 1);
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentHeight,
      canvasData.segmentWidth
    );
    canvasData.ctx.restore();

    // LOWER HALF OF TOP RIGHT QUARTER (mirrored)
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX + canvasData.segmentWidth,
      canvasData.centreY - canvasData.segmentHeight
    );
    canvasData.ctx.lineTo(
      canvasData.centreX + canvasData.segmentWidth,
      canvasData.centreY
    );
    canvasData.ctx.closePath();
    canvasData.ctx.clip();
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.scale(1, -1);
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentWidth,
      canvasData.segmentHeight
    );
    canvasData.ctx.restore();

    // UPPER HALF OF BOTTOM RIGHT QUADRANT (mirrored)
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX + canvasData.segmentWidth,
      canvasData.centreY
    );
    canvasData.ctx.lineTo(
      canvasData.centreX + canvasData.segmentWidth,
      canvasData.centreY + canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    canvasData.ctx.clip();
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.scale(1, 1);
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentWidth,
      canvasData.segmentHeight
    );
    canvasData.ctx.restore();

    // LOWER HALF OF BOTTOM RIGHT QUADRANT (rotated)
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX + canvasData.segmentWidth,
      canvasData.centreY + canvasData.segmentHeight
    );
    canvasData.ctx.lineTo(
      canvasData.centreX,
      canvasData.centreY + canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    canvasData.ctx.clip();
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.rotate(-90 * degToRad);
    canvasData.ctx.scale(-1, 1);
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentHeight,
      canvasData.segmentWidth
    );
    canvasData.ctx.restore();

    // UPPER HALF OF BOTTOM LEFT QUADRANT (mirrored)
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX - canvasData.segmentWidth,
      canvasData.centreY
    );
    canvasData.ctx.lineTo(
      canvasData.centreX - canvasData.segmentWidth,
      canvasData.centreY + canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    canvasData.ctx.clip();
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.scale(-1, 1);
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentWidth,
      canvasData.segmentHeight
    );
    canvasData.ctx.restore();

    // LOWER HALF OF BOTTOM LEFT QUADRANT (rotated)
    canvasData.ctx.save();
    canvasData.ctx.beginPath();
    canvasData.ctx.moveTo(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.lineTo(
      canvasData.centreX - canvasData.segmentWidth,
      canvasData.centreY + canvasData.segmentHeight
    );
    canvasData.ctx.lineTo(
      canvasData.centreX,
      canvasData.centreY + canvasData.segmentHeight
    );
    canvasData.ctx.closePath();
    canvasData.ctx.clip();
    canvasData.ctx.translate(canvasData.centreX, canvasData.centreY);
    canvasData.ctx.rotate(-90 * degToRad);
    canvasData.ctx.scale(-1, -1);
    canvasData.ctx.drawImage(
      photoData.element,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      canvasData.segmentHeight,
      canvasData.segmentWidth
    );
    canvasData.ctx.restore();
  }, [
    photo,
    mousePosition.x,
    mousePosition.y,
    canvasData.ctx,
    canvasData.centreX,
    canvasData.centreY,
    canvasData.segmentHeight,
    canvasData.segmentWidth,
    photoData.element,
  ]);

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
