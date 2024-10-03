import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import React, { FC } from "react";

const ConfigurationAction: FC = () => {
  const { action, setAction, setImage, adjustmentRef, handleResetAdjustment } =
    useImageAdjustmentContext();

  const handleDiscard = () => {
    handleResetAdjustment();
    setImage((prev) => ({ ...prev, imgUrl: prev.processedImg }));
    setAction("IDLE");
  };

  const handleSave = () => {
    setAction("IDLE");

    if (action === "ADJUSTMENT") {
      handleApplyAdjustment();
      return;
    }

    setImage((prev) => ({ ...prev, processedImg: prev.imgUrl }));
  };

  const handleApplyAdjustment = () => {
    const canvasAdjustment = adjustmentRef.current;

    if (canvasAdjustment) {
      const image = canvasAdjustment.toDataURL("image/png");
      setImage((prev) => ({ ...prev, processedImg: image, imgUrl: image }));
      handleResetAdjustment();
    }
  };

  return (
    <div
      className={cn(
        "flex items-center justify-between bg-white px-4 md:p-4",
        "h-[--action-bottom-height] md:h-auto",
      )}
    >
      <Button variant="ghost" onClick={handleDiscard}>
        Discard
      </Button>
      <Button onClick={handleSave}>Save</Button>
    </div>
  );
};

export default ConfigurationAction;
