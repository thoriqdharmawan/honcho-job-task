"use client";

import AdjustmentProcessImage from "@/components/pages/adjustment/AdjustmentProcessImage";
import CropProcessImage from "@/components/pages/crop/CropProcessImage";
import ProcessImage from "@/components/pages/filter/FilterProcessImage";
import UploadImage from "@/components/pages/upload-image/UploadImage";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

export default function Home() {
  const { action } = useImageAdjustmentContext();

  switch (action) {
    case "IDLE":
      return <UploadImage />;
    case "FILTER":
      return <ProcessImage />;
    case "ADJUSTMENT":
      return <AdjustmentProcessImage />;
    case "CROP":
      return <CropProcessImage />;
    default:
      break;
  }
}
