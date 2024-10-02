import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC } from "react";
import { Cropper } from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const CropProcessImage: FC = () => {
  const { image, cropperRef, cropOffset } = useImageAdjustmentContext();

  return (
    <div className="flex h-full select-none items-center justify-center bg-black">
      <div className="flex h-[calc(100vh-var(--header-height)-var(--config-bottom-height)-var(--action-bottom-height))] w-full items-center justify-center md:h-[calc(100vh-var(--header-height))]">
        <Cropper
          ref={cropperRef}
          src={image.imgUrl}
          defaultSize={({ visibleArea, imageSize }) => ({
            width: (visibleArea || imageSize).width - cropOffset,
            height: (visibleArea || imageSize).height - cropOffset,
          })}
        />
      </div>
    </div>
  );
};

export default CropProcessImage;
