import ConfigWrapper from "@/components/shared/ConfigWrapper";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { FC } from "react";
import SliderAdjustment from "./SliderAdjustment";
import { Button } from "@/components/ui/button";

const AdjustmentConfig: FC = () => {
  const { adjustment, setAdjustment, handleResetAdjustment } =
    useImageAdjustmentContext();

  const handleChangeSlider = (field: string, value: number) => {
    setAdjustment((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <ConfigWrapper>
      <div className="flex w-full flex-col md:flex-col">
        <div className="flex w-full flex-col gap-6">
          <SliderAdjustment
            label="Brightness"
            value={adjustment.brightness}
            onValueChange={(value) =>
              handleChangeSlider("brightness", value[0])
            }
          />
          <SliderAdjustment
            label="Contrast"
            value={adjustment.contrast}
            onValueChange={(value) => handleChangeSlider("contrast", value[0])}
          />
          <SliderAdjustment
            label="Hue"
            value={adjustment.hue}
            onValueChange={(value) => handleChangeSlider("hue", value[0])}
          />
          <SliderAdjustment
            label="Saturation"
            value={adjustment.saturation}
            onValueChange={(value) =>
              handleChangeSlider("saturation", value[0])
            }
          />
        </div>

        <Button
          variant="secondary"
          className="mt-12 w-full"
          onClick={handleResetAdjustment}
        >
          Reset
        </Button>
      </div>
    </ConfigWrapper>
  );
};
export default AdjustmentConfig;
