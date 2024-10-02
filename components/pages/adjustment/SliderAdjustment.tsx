import { Slider } from "@/components/ui/slider";
import { FC } from "react";

type SliderAdjustmentProps = {
  label: string;
  value: number;
  onValueChange: (value: number[]) => void;
};

const SliderAdjustment: FC<SliderAdjustmentProps> = (
  props: SliderAdjustmentProps,
) => {
  const { label, onValueChange, value } = props;

  return (
    <div className="w-full">
      <p className="mb-7 text-sm font-semibold">{label}</p>
      <Slider
        defaultValue={[value]}
        value={[value]}
        onValueChange={onValueChange}
        max={1}
        min={-1}
        step={0.01}
        rangeClassName="bg-unset"
      />
    </div>
  );
};

export default SliderAdjustment;
