import { useEffect } from "react";
import cv from "@techstark/opencv-js";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

const ProcessImage: React.FC = () => {
  const { image, inputImgRef } = useImageAdjustmentContext();
  const { imgUrl } = image;

  useEffect(() => {
    // @ts-ignore
    window.cv = cv;
  }, []);

  return (
    <div className="flex h-full items-center justify-center bg-black">
      <div className="flex h-[calc(100vh-var(--header-height)-var(--config-bottom-height)-var(--action-bottom-height))] w-full items-center justify-center md:h-[calc(100vh-var(--header-height))]">
        <img
          ref={inputImgRef}
          alt="Processed image"
          className="h-auto max-h-full"
          src={imgUrl || ""}
        />
      </div>
    </div>
  );
};

export default ProcessImage;
