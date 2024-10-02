"use client";

import { FC, ReactNode } from "react";
import { Button } from "../ui/button";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import FilterType from "../pages/filter/FilterType";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { action, setAction, setImage, isImageLoaded } =
    useImageAdjustmentContext();

  const handleDiscard = () => {
    setImage((prev) => ({ ...prev, imgUrl: prev.originalImgUrl }));
    setAction("IDLE");
  };

  const handleSave = () => {
    setImage((prev) => ({ ...prev, originalImgUrl: prev.imgUrl }));
    setAction("IDLE");
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

          {action === "FILTER" && <FilterType />}
        </aside>
      )}

      {children}
    </div>
  );
};

export default Sidebar;
