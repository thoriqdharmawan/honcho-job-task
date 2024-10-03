import { MAX_FILE_SIZE } from "@/constant/global";
import { cn } from "@/lib/utils";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { ArrowUpToLine } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const UploadImage = () => {
  const { image, inputImgRef, setImage } = useImageAdjustmentContext();
  const { processedImg } = image;
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (file: File) => {
    if (!file.type.startsWith("image/")) {
      setError("Please upload a valid image file.");
      return;
    }

    if (file.size > MAX_FILE_SIZE) {
      setError("File size exceeds 2MB.");
      return;
    }

    const fileUrl = URL.createObjectURL(file);

    setImage((prev) => ({
      ...prev,
      processedImg: fileUrl,
      imgUrl: fileUrl,
      originalImage: fileUrl,
      meta: {
        name: file.name.split(".")?.slice(0, -1)?.join("."),
        size: file.size,
      },
    }));

    setError(null);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileUpload(e.target.files[0]);
      e.target.value = "";
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(true);
  };

  const handleDragLeave = () => {
    setDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      {!processedImg && (
        <div
          className={cn(
            "flex h-full w-full items-center justify-center rounded-lg border-4 border-dashed p-6 text-center transition-colors duration-300 ease-in-out",
            {
              "border-white bg-gray-900": dragging,
              "border-gray-500 bg-black": !dragging,
            },
          )}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
        >
          <div>
            <ArrowUpToLine className="mx-auto mb-4 h-12 w-12 text-gray-200" />
            <p className="mb-2 text-gray-300">Drag & drop an image here</p>
            <p className="mb-4 text-gray-300">or</p>
            <label className="cursor-pointer rounded-lg bg-gray-600 px-4 py-2 text-gray-200 hover:bg-gray-500">
              Select Image
              <input
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleImageUpload}
              />
            </label>
            {error && <p className="mt-4 text-sm text-destructive">{error}</p>}
          </div>
        </div>
      )}
      {processedImg && (
        <div className="relative flex h-full w-full items-center justify-center bg-black">
          <Image
            ref={inputImgRef}
            alt="Processed image"
            className="h-full w-full object-contain"
            src={processedImg}
            layout="fill"
          />
        </div>
      )}
    </div>
  );
};

export default UploadImage;
