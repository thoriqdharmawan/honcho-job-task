import ProcessedImage from "./ProcessedImage";
import {
  COLOR_BGR2XYZ,
  COLOR_BGR2GRAY,
  COLOR_BGR2HLS,
  COLOR_BGR2HSV,
  COLOR_BGR2Lab,
  COLOR_BGR2Luv,
  COLOR_BGR2RGB,
  COLOR_BGR2YCrCb,
  COLOR_BGR2YUV,
} from "@techstark/opencv-js";
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
        <ProcessedImage filter={COLOR_BGR2XYZ} />
        <ProcessedImage filter={COLOR_BGR2GRAY} />
        <ProcessedImage filter={COLOR_BGR2HLS} />
        <ProcessedImage filter={COLOR_BGR2HSV} />
        <ProcessedImage filter={COLOR_BGR2Lab} />
        <ProcessedImage filter={COLOR_BGR2Luv} />
        <ProcessedImage filter={COLOR_BGR2RGB} />
        <ProcessedImage filter={COLOR_BGR2YCrCb} />
        <ProcessedImage filter={COLOR_BGR2YUV} />
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  );
};

export default FilterConfig;
