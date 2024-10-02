"use client";

import { FC, ReactNode } from "react";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import FilterConfig from "../pages/filter/FilterConfig";
import CropConfig from "../pages/crop/CropConfig";
import ListMenu from "./configuration-menu/ListMenu";
import ConfigurationAction from "./configuration-menu/ConfigurationAction";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { action, isImageLoaded } = useImageAdjustmentContext();

  return (
    <div className="flex h-[calc(100vh-var(--header-height))] flex-col justify-between md:flex-row md:gap-0">
      <div className="order-last flex flex-col md:order-first">
        {isImageLoaded && action === "IDLE" && <ListMenu />}
        {action === "FILTER" && <FilterConfig />}
        {action === "CROP" && <CropConfig />}

        {action !== "IDLE" && <ConfigurationAction />}
      </div>

      {children}
    </div>
  );
};

export default Sidebar;
