import { Button } from "@/components/ui/button";
import ProcessedImage from "./ProcessedImage";
import cv from "@techstark/opencv-js";

const FilterType: React.FC = () => {
  return (
    <div className="flex flex-col gap-6 px-4">
      <ProcessedImage filter={cv.COLOR_BGR2HLS} />
      <ProcessedImage filter={cv.COLOR_BGR2Luv} />
      <ProcessedImage filter={cv.COLOR_BGR2XYZ} />
    </div>
  );
};

export default FilterType;
