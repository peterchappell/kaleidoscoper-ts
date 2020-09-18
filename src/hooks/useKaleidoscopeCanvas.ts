import { useEffect, useState } from "react";

import useCanvasPointerEventPosition from "./useCanvasPointerEventPosition";

type PhotoData = {
  element: HTMLImageElement | null;
  width: number;
  height: number;
};

type Segment = {
  line1EndCoords: {
    x: number;
    y: number;
  };
  line2EndCoords: {
    x: number;
    y: number;
  };
  transform: () => void;
};

function useKaleidoscopeCanvas(
  canvasEl: HTMLCanvasElement | null,
  photoSrc: string,
  width: number,
  height: number
): boolean {
  const [mousePosition, isMoving] = useCanvasPointerEventPosition(canvasEl);
  const [photoData, setPhotoData] = useState<PhotoData>({
    element: null,
    width: 0,
    height: 0,
  });
  const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>();

  useEffect(() => {
    const photoEl = new Image();
    photoEl.src = photoSrc;
    photoEl.addEventListener("load", (): void => {
      setPhotoData({
        element: photoEl,
        width: photoEl.width || 600,
        height: photoEl.height || 600,
      });
    });
  }, [photoSrc]);

  useEffect(() => {
    if (!canvasEl) {
      return;
    }

    setCtx(canvasEl.getContext("2d"));
  }, [canvasEl]);

  useEffect(() => {
    if (!canvasEl || !photoData.element || !ctx) {
      return;
    }

    // x and y co-ordinates of the photo are in the top left corner by default
    // But the x and y co-ordinates of the photo use the mouse co-ordinates
    const photoX = Math.abs(
      (mousePosition.x * photoData.width) / canvasEl.offsetWidth
    );
    const photoY = Math.abs(
      (mousePosition.y * photoData.height) / canvasEl.offsetHeight
    );

    // constrain/reduce the photo width in proportion to the x,y that we're using
    // (to prevent cutting the image/segement)
    const photoWidth = photoData.width - photoX;
    const photoHeight = photoData.height - photoY;
    const canvasCentreX = canvasEl.width / 2;
    const canvasCentreY = canvasEl.height / 2;
    const segmentWidth = canvasEl.width / 2;
    const segmentHeight = canvasEl.height / 2;

    const degreesToRadians = (degrees: number): number =>
      (degrees * Math.PI) / 180;

    const drawQuadrant = (segment: Segment): void => {
      if (!ctx || !photoData.element) {
        return;
      }

      ctx.save();
      // draw a segment (triangle) from center to top middle to top left and back
      ctx.beginPath();
      ctx.moveTo(canvasCentreX, canvasCentreY);
      ctx.lineTo(segment.line1EndCoords.x, segment.line1EndCoords.y);
      ctx.lineTo(segment.line2EndCoords.x, segment.line2EndCoords.y);
      ctx.closePath();
      // make the segment a clipping path
      ctx.clip();
      // make the center of the canvas the origin (0,0) point for placing the image
      ctx.translate(canvasCentreX, canvasCentreY);
      // use a transform to set reflection or rotation (according to kaleidoscope pattern)
      segment.transform();
      // draw the photo from the starting point (determined by pointer position) to the end corner of the photo
      // place it from 0,0 to the canvas corner
      // note for this segment, because it is rotated, we switch height and width for the destination drawing area
      // (this way it stretches better when the canvas is not square)
      ctx.drawImage(
        photoData.element,
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
    };

    const segments = [
      // UPPER HALF OF TOP LEFT QUARTER (rotated)
      {
        line1EndCoords: {
          x: canvasCentreX,
          y: canvasCentreY - segmentHeight,
        },
        line2EndCoords: {
          x: canvasCentreX - segmentWidth,
          y: canvasCentreY - segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.rotate(degreesToRadians(-90));
            ctx.scale(1, -1);
          }
        },
      },
      // LOWER HALF OF TOP LEFT QUARTER (mirrored)
      {
        line1EndCoords: {
          x: canvasCentreX - segmentWidth,
          y: canvasCentreY,
        },
        line2EndCoords: {
          x: canvasCentreX - segmentWidth,
          y: canvasCentreY - segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.scale(-1, -1);
          }
        },
      },
      // UPPER HALF OF TOP RIGHT QUARTER (rotated)
      {
        line1EndCoords: {
          x: canvasCentreX + segmentWidth,
          y: canvasCentreY - segmentHeight,
        },
        line2EndCoords: {
          x: canvasCentreX,
          y: canvasCentreY - segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.rotate(degreesToRadians(-90));
            ctx.scale(1, 1);
          }
        },
      },
      // LOWER HALF OF TOP RIGHT QUARTER (mirrored)
      {
        line1EndCoords: {
          x: canvasCentreX + segmentWidth,
          y: canvasCentreY - segmentHeight,
        },
        line2EndCoords: {
          x: canvasCentreX + segmentWidth,
          y: canvasCentreY,
        },
        transform: (): void => {
          if (ctx) {
            ctx.scale(1, -1);
          }
        },
      },
      // UPPER HALF OF BOTTOM RIGHT QUADRANT (mirrored)
      {
        line1EndCoords: {
          x: canvasCentreX + segmentWidth,
          y: canvasCentreY,
        },
        line2EndCoords: {
          x: canvasCentreX + segmentWidth,
          y: canvasCentreY + segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.scale(1, 1);
          }
        },
      },
      // LOWER HALF OF BOTTOM RIGHT QUADRANT (rotated)
      {
        line1EndCoords: {
          x: canvasCentreX + segmentWidth,
          y: canvasCentreY + segmentHeight,
        },
        line2EndCoords: {
          x: canvasCentreX,
          y: canvasCentreY + segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.rotate(degreesToRadians(-90));
            ctx.scale(-1, 1);
          }
        },
      },
      // UPPER HALF OF BOTTOM LEFT QUADRANT (mirrored)
      {
        line1EndCoords: {
          x: canvasCentreX - segmentWidth,
          y: canvasCentreY,
        },
        line2EndCoords: {
          x: canvasCentreX - segmentWidth,
          y: canvasCentreY + segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.scale(-1, 1);
          }
        },
      },
      // LOWER HALF OF BOTTOM LEFT QUADRANT (rotated)
      {
        line1EndCoords: {
          x: canvasCentreX - segmentWidth,
          y: canvasCentreY + segmentHeight,
        },
        line2EndCoords: {
          x: canvasCentreX,
          y: canvasCentreY + segmentHeight,
        },
        transform: (): void => {
          if (ctx) {
            ctx.rotate(degreesToRadians(-90));
            ctx.scale(-1, -1);
          }
        },
      },
    ];

    // clear first
    if (ctx) {
      ctx.clearRect(0, 0, canvasEl.offsetWidth, canvasEl.offsetHeight);
    }

    // draw quadrants
    segments.forEach((segment) => {
      drawQuadrant(segment);
    });
  }, [
    mousePosition.x,
    mousePosition.y,
    photoData.element,
    photoData.width,
    photoData.height,
    canvasEl,
    ctx,
    width,
    height,
  ]);

  return isMoving;
}

export default useKaleidoscopeCanvas;
