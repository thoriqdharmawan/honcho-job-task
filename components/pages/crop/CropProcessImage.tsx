import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC } from "react";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const CropProcessImage: FC = () => {
  const { image, cropperRef } = useImageAdjustmentContext();

  return (
    <div className="select-none bg-black">
      <div className="flex h-[calc(100vh-var(--header-height)-200px)] w-full items-center justify-center md:h-[calc(100vh-var(--header-height))]">
        <Cropper
          ref={cropperRef}
          src={image.imgUrl}
          defaultSize={({ visibleArea, imageSize }) => ({
            width: (visibleArea || imageSize).width - 200,
            height: (visibleArea || imageSize).height - 200,
          })}
        />
      </div>
    </div>
  );
};

export default CropProcessImage;
