"use client";

import CropProcessImage from "@/components/pages/crop/CropProcessImage";
import ProcessImage from "@/components/pages/filter/ProcessImage";
import UploadImage from "@/components/pages/upload-image/UploadImage";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

export default function Home() {
  const { action } = useImageAdjustmentContext();

  if (action === "IDLE") {
    return <UploadImage />;
  }

  if (action === "FILTER") {
    return <ProcessImage />;
  }

  if (action === "CROP") {
    return <CropProcessImage />;
  }
}
