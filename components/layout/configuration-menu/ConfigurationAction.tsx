import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import React, { FC } from "react";

const ConfigurationAction: FC = () => {
  const { setAction, setImage } = useImageAdjustmentContext();

  const handleDiscard = () => {
    setImage((prev) => ({ ...prev, imgUrl: prev.processedImg }));
    setAction("IDLE");
  };

  const handleSave = () => {
    setImage((prev) => ({ ...prev, processedImg: prev.imgUrl }));
    setAction("IDLE");
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
