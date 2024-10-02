import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC } from "react";
import {
  Cropper,
  DefaultSettingsParams,
  DefaultSize,
} from "react-advanced-cropper";
import "react-advanced-cropper/dist/style.css";

const CropProcessImage: FC = () => {
  const { image, cropperRef } = useImageAdjustmentContext();

  return (
    <div className="select-none">
      <div className="relative [&>.advanced-cropper-wrapper]:max-h-[calc(100vh-var(--header-height))]">
        <Cropper
          ref={cropperRef}
          src={image.imgUrl}
          defaultSize={({ visibleArea, imageSize }) => ({
            width: (visibleArea || imageSize).width,
            height: (visibleArea || imageSize).height,
          })}
        />
      </div>
    </div>
  );
};

export default CropProcessImage;
