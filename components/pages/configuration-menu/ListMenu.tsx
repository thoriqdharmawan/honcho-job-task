import DialogConfirmation from "@/components/shared/DialogConfirmation";
import { Button, ButtonProps } from "@/components/ui/button";
import { DEFAULT_DIALOG_CONFIRMATION } from "@/constant/global";
import type { DIALOG_CONFIRMATION_TYPE } from "@/lib/global.types";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import {
  ArrowDownToLine,
  Blend,
  Crop,
  ListRestart,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { FC, ReactNode, useState } from "react";

type ActionType = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
  variant?: ButtonProps["variant"];
  type?: DIALOG_CONFIRMATION_TYPE;
};

type DialogConfirmationState = {
  open: boolean;
  type: DIALOG_CONFIRMATION_TYPE;
};

const ListMenu: FC = () => {
  const { setAction, setImage, inputImgRef, setCropOffset } =
    useImageAdjustmentContext();

  const [dialogConfirmation, setDialogConfirmation] =
    useState<DialogConfirmationState>({
      open: false,
      type: "RESET_TO_ORIGINAL",
    });

  const handleDeleteImage = () => {
    setAction("IDLE");
    setCropOffset(200);
    setImage((prev) => ({
      ...prev,
      imgUrl: null,
      processedImg: null,
      originalImage: null,
    }));
  };

  const handleResetImage = () => {
    setCropOffset(200);
    setImage((prev) => ({
      ...prev,
      processedImg: prev.originalImage,
      imgUrl: prev.originalImage,
    }));
  };

  const handleDownloadImage = () => {
    const imgElement = inputImgRef.current;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (imgElement && context) {
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;

      context.drawImage(imgElement, 0, 0);

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "original-image.png";
      link.click();
    }
  };

  const ACTIONS: ActionType[] = [
    {
      label: "Filter",
      icon: <Blend className="mr-2 h-4 w-4" />,
      onClick: () => setAction("FILTER"),
    },
    {
      label: "Adjustment",
      icon: <SlidersHorizontal className="mr-2 h-4 w-4" />,
      onClick: () => setAction("ADJUSTMENT"),
    },
    {
      label: "Crop",
      icon: <Crop className="mr-2 h-4 w-4" />,
      onClick: () => setAction("CROP"),
      className: "md:grow",
    },
    {
      label: "Download Image",
      icon: <ArrowDownToLine className="mr-2 h-4 w-4" />,
      onClick: handleDownloadImage,
    },
    {
      label: "Reset to original",
      icon: <ListRestart className="mr-2 h-4 w-4" />,
      onClick: () => {
        setDialogConfirmation({ open: true, type: "RESET_TO_ORIGINAL" });
      },
      variant: "secondary",
      type: "RESET_TO_ORIGINAL",
    },
    {
      label: "Delete Image",
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      onClick: () => {
        setDialogConfirmation({ open: true, type: "DELETE_IMAGE" });
      },
      variant: "ghost",
      type: "DELETE_IMAGE",
    },
  ];

  const handleClickConfirmationPrimary = () => {
    switch (dialogConfirmation.type) {
      case "DELETE_IMAGE":
        handleDeleteImage();
        break;
      case "RESET_TO_ORIGINAL":
        handleResetImage();
        break;

      default:
        break;
    }
  };

  return (
    <div
      className={cn(
        "overflow-x-auto py-4 md:overflow-y-hidden",
        "w-full md:w-[var(--sidebar-width)]",
        "h-[calc(--config-bottom-height+0.5rem)] md:h-[calc(100vh-var(--header-height))]",
      )}
    >
      <div className="flex h-full w-full flex-wrap gap-3 px-4 md:flex-col md:gap-3">
        {ACTIONS.map((action) => (
          <div key={action.label} className={action.className}>
            <Button
              variant={action.variant || "default"}
              className="w-full px-6"
              onClick={action.onClick}
            >
              {action.icon}
              {action.label}
            </Button>
          </div>
        ))}
      </div>

      <DialogConfirmation
        open={dialogConfirmation.open}
        onOpenChange={(open) => {
          setDialogConfirmation((prev) => ({ ...prev, open }));
        }}
        title={DEFAULT_DIALOG_CONFIRMATION[dialogConfirmation.type].title}
        description={
          DEFAULT_DIALOG_CONFIRMATION[dialogConfirmation.type].description
        }
        onClickPrimary={handleClickConfirmationPrimary}
        onClickSecondary={() => {
          setDialogConfirmation((prev) => ({ ...prev, open: false }));
        }}
        textPrimary={
          DEFAULT_DIALOG_CONFIRMATION[dialogConfirmation.type].textPrimary
        }
      />
    </div>
  );
};

export default ListMenu;
