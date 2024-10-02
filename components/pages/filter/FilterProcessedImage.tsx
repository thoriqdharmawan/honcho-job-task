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

    if (imgElement && canvasElement && imgElement.complete) {
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
    const imgElement = inputImgRef.current;

    const handleImageLoad = () => {
      renderCanvas();

      if (imgElement) {
        imgElement.removeEventListener("load", handleImageLoad);
      }
    };

    if (imgElement && !imgElement.complete) {
      imgElement.addEventListener("load", handleImageLoad);
    } else if (imgElement && imgElement.complete) {
      // If the image is already loaded, render immediately
      renderCanvas();
    }

    return () => {
      if (imgElement) {
        imgElement.removeEventListener("load", handleImageLoad);
      }
    };
  }, [renderCanvas, inputImgRef]);

  const handleSelectFilter = (canvas: HTMLCanvasElement | null) => {
    if (canvas) {
      const image = canvas.toDataURL("image/png");
      setImage((prev) => ({ ...prev, imgUrl: image }));
    }
  };

  return (
    <div className="flex w-fit items-center justify-center md:max-h-60">
      <canvas
        ref={canvasRef}
        onClick={() => handleSelectFilter(canvasRef.current)}
        className="max-h-[--config-bottom-height] w-auto cursor-pointer p-4 md:h-auto md:max-h-60 md:w-full md:p-0 md:py-3"
      />
    </div>
  );
};

export default ProcessedImage;
