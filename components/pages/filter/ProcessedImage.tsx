import React, { useRef, useEffect, useCallback } from "react";
import cv from "@techstark/opencv-js";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

interface ProcessedImageProps {
  filter: number;
}

const ProcessedImage: React.FC<ProcessedImageProps> = ({ filter }) => {
  const { inputImgRef, setImage } = useImageAdjustmentContext();
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const renderCanvas = useCallback(() => {
    const imgElement = inputImgRef.current;
    const canvasElement = canvasRef.current;

    if (imgElement && canvasElement) {
      // Resize canvas based on parent width
      const parentWidth = canvasElement.parentElement?.offsetWidth || 300;
      const aspectRatio = imgElement.naturalWidth / imgElement.naturalHeight;

      canvasElement.width = parentWidth;
      canvasElement.height = parentWidth / aspectRatio;

      const img = cv.imread(imgElement);
      const imgProcessed = new cv.Mat();
      cv.cvtColor(img, imgProcessed, filter);
      // @ts-ignore
      cv.imshow(canvasElement, imgProcessed);
      imgProcessed.delete();
    }
  }, [inputImgRef, filter]);

  useEffect(() => {
    renderCanvas();

    // Handle window resize
    const handleResize = () => {
      renderCanvas();
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [renderCanvas]);

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
      className="w-full cursor-pointer"
    />
  );
};

export default ProcessedImage;
