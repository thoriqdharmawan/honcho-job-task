import ProcessedImage from "./ProcessedImage";
import cv from "@techstark/opencv-js";
import { cn } from "@/lib/utils";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";

const FilterConfig: React.FC = () => {
  return (
    <ScrollArea
      className={cn(
        "overflow-x-auto md:overflow-y-hidden",
        "w-full md:w-[var(--sidebar-width)]",
        "h-[--config-bottom-height] md:h-[calc(100vh-var(--header-height))]",
      )}
    >
      <div className="flex w-full px-4 md:flex-col md:items-center">
        <ProcessedImage filter={cv.COLOR_BGR2HLS} />
        <ProcessedImage filter={cv.COLOR_BGR2Luv} />
        <ProcessedImage filter={cv.COLOR_BGR2XYZ} />
        <ProcessedImage filter={cv.COLOR_BGR2HLS} />
        <ProcessedImage filter={cv.COLOR_BGR2Luv} />
        <ProcessedImage filter={cv.COLOR_BGR2XYZ} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default FilterConfig;
