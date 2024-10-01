import React, { useRef, useState, useEffect } from "react";
import cv from "@techstark/opencv-js";

const ProcessImage: React.FC = () => {
  const inputImgRef = useRef<HTMLImageElement>(null);
  const processedImgRef = useRef<HTMLCanvasElement>(null);

  const [imgUrl, setImgUrl] = useState<string | null>(null);
  const [originalImgUrl, setOriginalImgUrl] = useState<string | null>(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    // @ts-ignore
    window.cv = cv;
  }, []);

  const processImage = () => {
    const imgElement = inputImgRef.current;
    if (imgElement) {
      const img = cv.imread(imgElement);
      const imgGray = new cv.Mat();

      cv.cvtColor(img, imgGray, cv.COLOR_BGR2HLS);
      // @ts-ignore
      cv.imshow(processedImgRef.current, imgGray);

      const canvas = processedImgRef.current;
      if (canvas) {
        const image = canvas.toDataURL("image/png");
        setImgUrl(image);
      }
    }
  };

  const resetImage = () => {
    if (originalImgUrl) {
      setImgUrl(originalImgUrl);
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
      setImgUrl(fileUrl);
      setOriginalImgUrl(fileUrl);
      setIsImageLoaded(true);
    }
  };

  return (
    <div>
      <div style={{ marginTop: "30px" }}>
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
              <button onClick={processImage}>Process Image</button>
            )}
            <button onClick={downloadImage} style={{ marginLeft: "10px" }}>
              Download
            </button>
            <button onClick={resetImage} style={{ marginLeft: "10px" }}>
              Reset Filter
            </button>
          </div>

          <div className="image-card">
            <div style={{ margin: "10px" }}>↓↓↓ The original image ↓↓↓</div>
            <img ref={inputImgRef} alt="Original input" src={imgUrl} />
          </div>

          <div className="image-card">
            <div style={{ margin: "10px" }}>↓↓↓ The processed image ↓↓↓</div>
            <canvas ref={processedImgRef} />
          </div>
        </div>
      )}
    </div>
  );
};

export default ProcessImage;
