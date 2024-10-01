import React, { useEffect } from "react";
import cv from "@techstark/opencv-js";
import ProcessedImage from "./ProcessedImage";
import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import { Button } from "./ui/button";

const ProcessImage: React.FC = () => {
  const { action, setAction, image, inputImgRef, setImage, isImageLoaded } =
    useImageAdjustmentContext();

  const { imgUrl, originalImgUrl } = image;

  useEffect(() => {
    // @ts-ignore
    window.cv = cv;
  }, []);

  const resetImage = () => {
    if (originalImgUrl) {
      setImage((prev) => ({ ...prev, imgUrl: originalImgUrl }));
    }
  };

  const downloadImage = () => {
    const imgElement = inputImgRef.current;

    const canvas = document.createElement("canvas");
    const context = canvas.getContext("2d");

    if (imgElement && context) {
      canvas.width = imgElement.naturalWidth;
      canvas.height = imgElement.naturalHeight;

      context.drawImage(imgElement, 0, 0);

      const image = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = image;
      link.download = "original-image.png";
      link.click();
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const fileUrl = URL.createObjectURL(e.target.files[0]);

      setImage((prev) => ({
        ...prev,
        originalImgUrl: fileUrl,
        imgUrl: fileUrl,
      }));
    }
  };

  return (
    <div className="flex flex-col">
      <div>
        <span style={{ marginRight: "10px" }}>Select an image file:</span>
        <input
          type="file"
          name="file"
          accept="image/*"
          onChange={handleImageUpload}
        />
      </div>

      {imgUrl && (
        <div className="images-container">
          <div style={{ marginTop: "20px" }}>
            {isImageLoaded && (
              <Button onClick={() => setAction("FILTER")}>Filter Image</Button>
            )}
            {isImageLoaded && (
              <Button onClick={() => setAction("IDLE")}>
                Close filter Image
              </Button>
            )}
            <Button onClick={downloadImage} style={{ marginLeft: "10px" }}>
              Download
            </Button>
            <Button onClick={resetImage} style={{ marginLeft: "10px" }}>
              Reset Filter
            </Button>
          </div>

          <div className="image-card">
            <img ref={inputImgRef} alt="Original input" src={imgUrl} />
          </div>

          {action === "FILTER" && (
            <div className="flex">
              <ProcessedImage filter={cv.COLOR_BGR2HLS} />
              <ProcessedImage filter={cv.COLOR_BGR2Luv} />
              <ProcessedImage filter={cv.COLOR_BGR2XYZ} />
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProcessImage;
