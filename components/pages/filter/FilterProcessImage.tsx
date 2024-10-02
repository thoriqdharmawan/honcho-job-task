import { useEffect } from "react";
import cv from "@techstark/opencv-js";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import Image from "next/image";

const ProcessImage: React.FC = () => {
  const { image, inputImgRef } = useImageAdjustmentContext();
  const { imgUrl } = image;

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    window.cv = cv;
  }, []);

  return (
    <div className="flex h-full items-center justify-center bg-black">
      <div className="flex h-[calc(100vh-var(--header-height)-var(--config-bottom-height)-var(--action-bottom-height))] w-full items-center justify-center md:h-[calc(100vh-var(--header-height))]">
        <Image
          ref={inputImgRef}
          alt="Processed image"
          className="h-auto max-h-full w-auto"
          src={imgUrl || ""}
          width={400}
          height={400}
        />
      </div>
    </div>
  );
};

export default ProcessImage;
