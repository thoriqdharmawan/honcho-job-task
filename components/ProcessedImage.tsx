import React, { useRef, useEffect } from "react";
import cv from "@techstark/opencv-js";

interface ProcessedImageProps {
  imgElement: HTMLImageElement | null;
  filter: number;
  onSelectFilter: (canvas: HTMLCanvasElement | null) => void;
}

const ProcessedImage: React.FC<ProcessedImageProps> = ({
  imgElement,
  filter,
  onSelectFilter,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (imgElement) {
      const img = cv.imread(imgElement);
      const imgProcessed = new cv.Mat();
      cv.cvtColor(img, imgProcessed, filter);
      // @ts-ignore
      cv.imshow(canvasRef.current, imgProcessed);
      imgProcessed.delete();
    }
  }, [imgElement, filter]);

  return (
    <canvas
      ref={canvasRef}
      onClick={() => onSelectFilter(canvasRef.current)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default ProcessedImage;
