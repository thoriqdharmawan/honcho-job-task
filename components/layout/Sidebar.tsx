"use client";

import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import FilterConfig from "../pages/filter/FilterConfig";
import CropConfig from "../pages/crop/CropConfig";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { action, setAction, setImage, isImageLoaded } =
    useImageAdjustmentContext();

  const handleDiscard = () => {
    setImage((prev) => ({ ...prev, imgUrl: prev.processedImg }));
    setAction("IDLE");
  };

  const handleSave = () => {
    setImage((prev) => ({ ...prev, processedImg: prev.imgUrl }));
    setAction("IDLE");
  };

  const handleDeleteImage = () => {
    setImage((prev) => ({ ...prev, imgUrl: null, processedImg: null }));
    setAction("IDLE");
  };

  const handleResetImage = () => {
    setImage((prev) => ({
      ...prev,
      processedImg: prev.originalImage,
      imgUrl: prev.originalImage,
    }));
  };

  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))]">
      {isImageLoaded && (
        <aside className="sticky top-[var(--header-height)] z-50 h-[calc(100vh-var(--header-height))] w-[var(--sidebar-width)] overflow-y-auto border-r">
          {action !== "IDLE" && (
            <div className="sticky top-0 flex items-center justify-between bg-white p-4">
              <Button variant="ghost" onClick={handleDiscard}>
                Discard
              </Button>
              <Button onClick={handleSave}>Save</Button>
            </div>
          )}

          {action === "IDLE" && (
            <div className="px-4">
              <h1 className="mb-2 p-2 text-2xl font-bold">Action</h1>
              <div className="flex flex-col gap-3">
                <Button onClick={() => setAction("FILTER")}>Filter</Button>
                <Button onClick={() => setAction("CROP")}>Crop</Button>
                <Button onClick={() => setAction("ROTATE")}>Rotate</Button>
              </div>
            </div>
          )}

          {action === "FILTER" && <FilterConfig />}
          {action === "CROP" && <CropConfig />}
        </aside>
      )}

      {children}

      {isImageLoaded && (
        <aside className="sticky top-[var(--header-height)] z-50 flex h-[calc(100vh-var(--header-height))] w-[var(--sidebar-width)] flex-col justify-center gap-5 overflow-y-auto border-r px-4">
          <Button onClick={handleDeleteImage}>Delete Image</Button>
          <Button onClick={handleResetImage}>Reset to Original</Button>
        </aside>
      )}
    </div>
  );
};

export default Sidebar;
