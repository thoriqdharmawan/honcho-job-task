import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { Button } from "@/components/ui/button";
import { DEFAULT_DIALOG_CONFIRMATION } from "@/constant/global";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC, useState } from "react";

const ConfigurationAction: FC = () => {
  const { action, setAction, setImage, adjustmentRef, handleResetAdjustment } =
    useImageAdjustmentContext();

  const [openDiscard, setOpenDiscard] = useState<boolean>(false);

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
      <Button variant="ghost" onClick={() => setOpenDiscard(true)}>
        Discard
      </Button>
      <Button onClick={handleSave}>Save</Button>

      <DialogConfirmation
        open={openDiscard}
        onOpenChange={setOpenDiscard}
        title={DEFAULT_DIALOG_CONFIRMATION.DISCARD.title}
        description={DEFAULT_DIALOG_CONFIRMATION.DISCARD.description}
        onClickPrimary={handleDiscard}
        onClickSecondary={() => setOpenDiscard(false)}
      />
    </div>
  );
};

export default ConfigurationAction;
