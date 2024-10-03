import { IMAGE_FORMAT_OPTIONS } from "@/constant/global";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import DialogConfirmation, {
  DialogConfirmationProps,
} from "./DialogConfirmation";
import { useState } from "react";
import { Input } from "../ui/input";
import type { IMAGE_FORMAT } from "@/lib/global.types";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

interface ValuesState {
  format: IMAGE_FORMAT;
  filename: string;
}

interface DownloadImageProps
  extends Pick<DialogConfirmationProps, "open" | "onOpenChange"> {
  onDownload: (values: ValuesState) => void;
}

export default function DownloadImage(props: DownloadImageProps) {
  const { image } = useImageAdjustmentContext();
  const { open, onOpenChange, onDownload } = props;

  const [values, setValues] = useState<ValuesState>({
    format: "png",
    filename: image.meta.name,
  });

  const handleChangeValue = (field: "format" | "filename", value: string) => {
    setValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleResetState = () => {
    onOpenChange(false);
    setValues({
      format: "png",
      filename: image.meta.name,
    });
  };

  const handleClickDownload = () => {
    handleResetState();
    onDownload(values);
  };

  const handleClickSecondary = () => {
    handleResetState();
    onOpenChange(false);
  };

  return (
    <DialogConfirmation
      open={open}
      onOpenChange={onOpenChange}
      onClickPrimary={handleClickDownload}
      onClickSecondary={handleClickSecondary}
      title="Download Image"
      description="Do you want to download this image? Make sure you have reviewed the file before saving it to your device."
      textPrimary="Download now"
    >
      <Select
        value={values.format}
        onValueChange={(value) => handleChangeValue("format", value)}
      >
        <SelectTrigger className="mt-3 w-full">
          <SelectValue placeholder={values.format} />
        </SelectTrigger>
        <SelectContent>
          {IMAGE_FORMAT_OPTIONS.map((option) => (
            <SelectItem key={option.value} value={option.value}>
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Input
        className="w-full"
        value={values.filename}
        onChange={(e) => handleChangeValue("filename", e.target.value)}
      />
    </DialogConfirmation>
  );
}
