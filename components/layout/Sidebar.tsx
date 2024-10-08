"use client";

import { FC, ReactNode } from "react";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import FilterConfig from "../pages/filter/FilterConfig";
import CropConfig from "../pages/crop/CropConfig";
import ListMenu from "../pages/configuration-menu/ListMenu";
import ConfigurationAction from "../pages/configuration-menu/ConfigurationAction";
import AdjustmentConfig from "../pages/adjustment/AdjustmentConfig";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  const { action, isImageLoaded } = useImageAdjustmentContext();

  if (!isImageLoaded) {
    return (
      <main className="h-[calc(100dvh-var(--header-height))] w-full">
        {children}
      </main>
    );
  }

  return (
    <div className="flex h-[calc(100dvh-var(--header-height))] flex-col justify-between md:flex-row md:gap-0">
      <div className="order-last flex flex-col md:order-first">
        {action === "IDLE" && <ListMenu />}

        {action === "FILTER" && <FilterConfig />}
        {action === "ADJUSTMENT" && <AdjustmentConfig />}
        {action === "CROP" && <CropConfig />}

        {action !== "IDLE" && <ConfigurationAction />}
      </div>

      <main className="flex h-full w-full flex-col md:max-w-[calc(100vw-var(--sidebar-width))]">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
