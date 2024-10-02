import { Button } from "@/components/ui/button";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC } from "react";

const CropConfig: FC = () => {
  const { cropperRef, setImage } = useImageAdjustmentContext();

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        setImage((prev) => ({
          ...prev,
          imgUrl: canvas.toDataURL("image/png"),
        }));
      }
    }
  };


  return (
    <div className="flex flex-col gap-6 px-4">
      <Button onClick={handleCrop} className="mt-6">
        Crop
      </Button>
    </div>
  );
};

export default CropConfig;
