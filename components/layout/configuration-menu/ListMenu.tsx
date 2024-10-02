import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import {
  ArrowDownToLine,
  Crop,
  ListRestart,
  RefreshCcw,
  SlidersHorizontal,
  Trash2,
} from "lucide-react";
import { FC, ReactNode } from "react";

type ActionType = {
  label: string;
  icon: ReactNode;
  onClick: () => void;
  className?: string;
  variant?: ButtonProps["variant"];
};

const ListMenu: FC = () => {
  const { setAction, setImage, inputImgRef, setCropOffset } =
    useImageAdjustmentContext();

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
      icon: <SlidersHorizontal className="mr-2 h-4 w-4" />,
      onClick: () => setAction("FILTER"),
    },
    {
      label: "Crop",
      icon: <Crop className="mr-2 h-4 w-4" />,
      onClick: () => setAction("CROP"),
    },
    {
      label: "Rotate",
      icon: <RefreshCcw className="mr-2 h-4 w-4" />,
      onClick: () => setAction("ROTATE"),
      className: "md:grow",
    },
    {
      label: "Download Image",
      icon: <ArrowDownToLine className="mr-2 h-4 w-4" />,
      onClick: handleDownloadImage,
    },
    {
      label: "Reset to Original",
      icon: <ListRestart className="mr-2 h-4 w-4" />,
      onClick: handleResetImage,
      variant: "ghost",
    },
    {
      label: "Delete Image",
      icon: <Trash2 className="mr-2 h-4 w-4" />,
      onClick: handleDeleteImage,
      variant: "ghost",
    },
  ];

  return (
    <div
      className={cn(
        "overflow-x-auto py-4 md:overflow-y-hidden",
        "w-full md:w-[var(--sidebar-width)]",
        "h-[--config-bottom-height] md:h-[calc(100vh-var(--header-height))]",
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
    </div>
  );
};

export default ListMenu;
