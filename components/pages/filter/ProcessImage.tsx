import React, { useEffect } from "react";
import cv from "@techstark/opencv-js";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

const ProcessImage: React.FC = () => {
  const { image, inputImgRef, setImage } = useImageAdjustmentContext();
  const { imgUrl, processedImg } = image;

  useEffect(() => {
    // @ts-ignore
    window.cv = cv;
  }, []);

  const downloadImage = () => {
    const imgElement = inputImgRef.current;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (imgElement && context) {
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;

      context.drawImage(imgElement, 0, 0);

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "original-image.png";
      link.click();
    }
  };

  return (
    <div className="flex flex-col gap-5">
      {imgUrl && (
        <div className="flex items-center justify-center bg-black">
          <img
            ref={inputImgRef}
            alt="Processed image"
            className="h-[calc(100vh-var(--header-height))]"
            src={imgUrl}
          />
        </div>
      )}
    </div>
  );
};

export default ProcessImage;
