import { useState, useEffect } from "react";

type Position = {
  x: number;
  y: number;
};

function useCanvasPointerEventPosition(
  canvasEl: HTMLCanvasElement | null
): [Position, boolean] {
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
    function startDrag(): void {
      setIsDragging(true);
    }
    function endDrag(): void {
      setIsDragging(false);
    }
    function handleMouseEnterEvent(event: MouseEvent): void {
      if (event.buttons) {
        setIsDragging(true);
      }
    }

    if (canvasEl) {
      canvasEl.addEventListener("mousedown", startDrag);
      canvasEl.addEventListener("touchstart", startDrag);
      canvasEl.addEventListener("mouseup", endDrag);
      canvasEl.addEventListener("touchend", endDrag);
      canvasEl.addEventListener("mouseleave", endDrag);
      canvasEl.addEventListener("touchcancel", endDrag);
      canvasEl.addEventListener("mouseenter", handleMouseEnterEvent);
      canvasEl.addEventListener("mousemove", handleMouseEvent);
      canvasEl.addEventListener("touchmove", handleTouchEvent);
    }

    return (): void => {
      if (canvasEl) {
        canvasEl.removeEventListener("touchstart", startDrag);
        canvasEl.removeEventListener("mousedown", startDrag);
        canvasEl.removeEventListener("mouseup", endDrag);
        canvasEl.removeEventListener("touchend", endDrag);
        canvasEl.removeEventListener("mouseleave", endDrag);
        canvasEl.removeEventListener("touchcancel", endDrag);
        canvasEl.removeEventListener("mouseenter", handleMouseEnterEvent);
        canvasEl.removeEventListener("mousemove", handleMouseEvent);
        canvasEl.removeEventListener("touchmove", handleTouchEvent);
      }
    };
  }, [canvasEl, isDragging]);

  return [position, isDragging];
}

export default useCanvasPointerEventPosition;
