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
    <ScrollArea
      className={cn(
        "overflow-x-auto md:overflow-y-hidden",
        "w-full md:w-[var(--sidebar-width)]",
        "h-[--config-bottom-height] md:h-[calc(100vh-var(--header-height))]",
      )}
    >
      <div className="flex w-full p-4 md:flex-col md:items-center">
        <Button onClick={handleCrop} className="w-full">
          Crop
        </Button>
      </div>
    </ScrollArea>
  );
};

export default CropConfig;
