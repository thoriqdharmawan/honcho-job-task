import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";

const UploadImage = () => {
  const { image, inputImgRef, setImage } = useImageAdjustmentContext();
  const { processedImg } = image;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);

      setImage((prev) => ({
        ...prev,
        processedImg: fileUrl,
        imgUrl: fileUrl,
        originalImage: fileUrl,
      }));

      e.target.value = "";
    }
  };

  return (
    <div className="flex w-full flex-col items-center justify-center">
      {!processedImg && (
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      )}
      {processedImg && (
        <div className="flex w-full items-center justify-center bg-black">
          <div className="flex h-[calc(100vh-var(--header-height)-200px)] w-full items-center justify-center md:h-[calc(100vh-var(--header-height))]">
            <img
              ref={inputImgRef}
              alt="Processed image"
              className="h-auto max-h-full"
              src={processedImg}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UploadImage;
