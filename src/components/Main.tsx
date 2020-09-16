import React, { useEffect, useRef } from "react";

import useMaxSizeStyle from "../hooks/useMaxSizeStyle";
import useCanvasPointerEventPosition from "../hooks/useCanvasPointerEventPosition";

type MainProps = {
  photo: string;
};

const Main: React.FC<MainProps> = ({ photo }: MainProps) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const maxSizeStyle = useMaxSizeStyle();
  const mousePosition = useCanvasPointerEventPosition(canvasRef.current);

  useEffect(() => {
    console.log("mouse position", mousePosition.x, mousePosition.y);
  }, [mousePosition.x, mousePosition.y]);

  useEffect(() => {
    const photoEl = new Image();
    photoEl.src = photo;

    const degToRad = Math.PI / 180;
    if (!canvasRef.current) {
      return;
    }
    const ctx = canvasRef.current.getContext("2d");
    if (!ctx) {
      return;
    }
    const centreX = canvasRef.current.width / 2;
    const centreY = canvasRef.current.height / 2;
    const segmentHeight = canvasRef.current.height / 2;
    const segmentWidth = canvasRef.current.width / 2;

    // x and y co-ordinates of the photo are in the top left corner by default
    // But the x and y co-ordinates of the photo using the mouse co-ordinates
    const photoX = 100;
    const photoY = 100;
    // const photoX = Math.abs((mouseX * photoEl.width) / canvasRef.current.width);
    // const photoY = Math.abs((mouseY * photoEl.height) / canvasRef.current.height);

    // constrain/reduce the photo width in proportion to the x,y that we're using
    // (to prevent cutting the image/segement)
    const photoWidth = 800;
    const photoHeight = 800;
    // const photoWidth = photoEl.width - photoX;
    // const photoHeight = photoEl.height - photoY;

    // clear first
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);

    // UPPER HALF OF TOP LEFT QUARTER (rotated)
    ctx.save();
    // draw a segment (triangle) from center to top middle to top left and back
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX, centreY - segmentHeight);
    ctx.lineTo(centreX - segmentWidth, centreY - segmentHeight);
    ctx.closePath();
    // make the segment a clipping path
    ctx.clip();
    // make the center of the canvas the origin (0,0) point for placing the image
    ctx.translate(centreX, centreY);
    // rotate the canvas before for placing the image (according to kaleidoscope pattern)
    ctx.rotate(-90 * degToRad);
    // use scale to set reflection (according to kaleidoscope pattern)
    ctx.scale(1, -1);
    // draw the photo from the starting point (determined by pointer position) to the end corner of the photo
    // place it from 0,0 to the canvas corner
    // note for this segment, because it is rotated, we switch height and width for the destination drawing area
    // (this way it stretches better when the canvas is not square)
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentHeight,
      segmentWidth
    );
    // restore for next segment
    ctx.restore();

    // LOWER HALF OF TOP LEFT QUARTER (mirrored)
    ctx.save();
    // draw a segment from center to middle left to top left and back
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX - segmentWidth, centreY);
    ctx.lineTo(centreX - segmentWidth, centreY - segmentHeight);
    ctx.closePath();
    // make the segment a clipping path
    ctx.clip();
    // make the center of the canvas the origin (0,0) point for placing the image
    ctx.translate(centreX, centreY);
    // use scale to set reflection (according to kaleidoscope pattern)
    ctx.scale(-1, -1);
    // draw the photo from the starting point (determined by pointer position) to the end corner of the photo
    // place it from 0,0 to the canvas corner
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentWidth,
      segmentHeight
    );
    // restore for next segment
    ctx.restore();

    // UPPER HALF OF TOP RIGHT QUARTER (rotated)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX + segmentWidth, centreY - segmentHeight);
    ctx.lineTo(centreX, centreY - segmentHeight);
    ctx.closePath();
    ctx.clip();
    ctx.translate(centreX, centreY);
    ctx.rotate(-90 * degToRad);
    ctx.scale(1, 1);
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentHeight,
      segmentWidth
    );
    ctx.restore();

    // LOWER HALF OF TOP RIGHT QUARTER (mirrored)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX + segmentWidth, centreY - segmentHeight);
    ctx.lineTo(centreX + segmentWidth, centreY);
    ctx.closePath();
    ctx.clip();
    ctx.translate(centreX, centreY);
    ctx.scale(1, -1);
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentWidth,
      segmentHeight
    );
    ctx.restore();

    // UPPER HALF OF BOTTOM RIGHT QUADRANT (mirrored)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX + segmentWidth, centreY);
    ctx.lineTo(centreX + segmentWidth, centreY + segmentHeight);
    ctx.closePath();
    ctx.clip();
    ctx.translate(centreX, centreY);
    ctx.scale(1, 1);
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentWidth,
      segmentHeight
    );
    ctx.restore();

    // LOWER HALF OF BOTTOM RIGHT QUADRANT (rotated)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX + segmentWidth, centreY + segmentHeight);
    ctx.lineTo(centreX, centreY + segmentHeight);
    ctx.closePath();
    ctx.clip();
    ctx.translate(centreX, centreY);
    ctx.rotate(-90 * degToRad);
    ctx.scale(-1, 1);
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentHeight,
      segmentWidth
    );
    ctx.restore();

    // UPPER HALF OF BOTTOM LEFT QUADRANT (mirrored)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX - segmentWidth, centreY);
    ctx.lineTo(centreX - segmentWidth, centreY + segmentHeight);
    ctx.closePath();
    ctx.clip();
    ctx.translate(centreX, centreY);
    ctx.scale(-1, 1);
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentWidth,
      segmentHeight
    );
    ctx.restore();

    // LOWER HALF OF BOTTOM LEFT QUADRANT (rotated)
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(centreX, centreY);
    ctx.lineTo(centreX - segmentWidth, centreY + segmentHeight);
    ctx.lineTo(centreX, centreY + segmentHeight);
    ctx.closePath();
    ctx.clip();
    ctx.translate(centreX, centreY);
    ctx.rotate(-90 * degToRad);
    ctx.scale(-1, -1);
    ctx.drawImage(
      photoEl,
      photoX,
      photoY,
      photoWidth,
      photoHeight,
      0,
      0,
      segmentHeight,
      segmentWidth
    );
    ctx.restore();
  }, [photo]);

  return (
    <main className="flex justify-center items-center flex-grow overflow-hidden relative">
      {photo && <img src={photo} alt="" className="hidden" />}
      <canvas
        height={300}
        width={300}
        ref={canvasRef}
        style={maxSizeStyle}
        className="absolute"
      />
    </main>
  );
};

export default Main;
