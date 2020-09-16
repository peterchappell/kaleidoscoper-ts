import { useState, useEffect } from "react";

type Position = {
  x: number | undefined;
  y: number | undefined;
};

function useCanvasPointerEventPosition(
  canvasEl: HTMLCanvasElement | null
): Position {
  const [position, setPosition] = useState<Position>({
    x: 0,
    y: 0,
  });
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    function handleTouchEvent(event: TouchEvent): void {
      if (isDragging) {
        setPosition({
          x: event.touches[0].pageX,
          y: event.touches[0].pageY,
        });
      }
    }
    function handleMouseEvent(event: MouseEvent): void {
      if (isDragging) {
        setPosition({
          x: event.pageX,
          y: event.pageY,
        });
      }
    }
    function startDrag() {
      setIsDragging(true);
    }
    function endDrag() {
      setIsDragging(false);
    }

    if (canvasEl) {
      canvasEl.addEventListener("mousedown", startDrag);
      canvasEl.addEventListener("touchstart", startDrag);
      canvasEl.addEventListener("mouseUp", endDrag);
      canvasEl.addEventListener("touchend", endDrag);
      canvasEl.addEventListener("mousemove", handleMouseEvent);
      canvasEl.addEventListener("touchmove", handleTouchEvent);
    }

    return (): void => {
      if (canvasEl) {
        canvasEl.removeEventListener("touchstart", startDrag);
        canvasEl.removeEventListener("mousedown", startDrag);
        canvasEl.removeEventListener("mouseUp", endDrag);
        canvasEl.removeEventListener("touchend", endDrag);
        canvasEl.removeEventListener("mousemove", handleMouseEvent);
        canvasEl.removeEventListener("touchmove", handleTouchEvent);
      }
    };
  }, [canvasEl, isDragging]);

  return position;
}

export default useCanvasPointerEventPosition;
