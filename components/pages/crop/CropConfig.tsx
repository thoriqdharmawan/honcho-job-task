import ConfigWrapper from "@/components/shared/ConfigWrapper";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC } from "react";

const CropConfig: FC = () => {
  const { cropperRef, setImage, setCropOffset } = useImageAdjustmentContext();

  const handleCrop = () => {
    const cropper = cropperRef.current;
    if (cropper) {
      const canvas = cropper.getCanvas();
      if (canvas) {
        setCropOffset(0);
        setImage((prev) => ({
          ...prev,
          imgUrl: canvas.toDataURL("image/png"),
        }));
      }
    }
  };

  return (
    <ConfigWrapper>
      <Button onClick={handleCrop} className="w-full">
        Crop
      </Button>
    </ConfigWrapper>
  );
};

export default CropConfig;
