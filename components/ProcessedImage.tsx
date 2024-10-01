import React, { useRef, useEffect } from "react";
import cv from "@techstark/opencv-js";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

interface ProcessedImageProps {
  filter: number;
}

const ProcessedImage: React.FC<ProcessedImageProps> = ({ filter }) => {
  const { inputImgRef, setImage } = useImageAdjustmentContext();

  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (inputImgRef.current) {
      const img = cv.imread(inputImgRef.current);
      const imgProcessed = new cv.Mat();
      cv.cvtColor(img, imgProcessed, filter);
      // @ts-ignore
      cv.imshow(canvasRef.current, imgProcessed);
      imgProcessed.delete();
    }
  }, [inputImgRef, filter]);

  const handleSelectFilter = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      setImage((prev) => ({ ...prev, imgUrl: image }));
    }
  };

  return (
    <canvas
      ref={canvasRef}
      onClick={() => handleSelectFilter(canvasRef.current)}
      style={{ cursor: "pointer" }}
    />
  );
};

export default ProcessedImage;
