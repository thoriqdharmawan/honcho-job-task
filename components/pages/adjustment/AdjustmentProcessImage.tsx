import { useImageAdjustmentContext } from "@/providers/ImageAdjustmentProvider";
import Image from "next/image";
import { FC, Fragment, useEffect, useRef } from "react";

const AdjustmentProcessImage: FC = () => {
  const { action, image, adjustment, adjustmentRef } =
    useImageAdjustmentContext();

  const { brightness, contrast, hue, saturation } = adjustment;

  const src = image.imgUrl;

  const inputImgRef = useRef<HTMLImageElement>(null);

  const drawImage = () => {
    const image = inputImgRef.current;
    const canvas = adjustmentRef.current;
    if (canvas && image && image.complete) {
      const ctx = canvas.getContext("2d");
      canvas.width = image.naturalWidth;
      canvas.height = image.naturalHeight;

      if (ctx) {
        ctx.filter = [
          `brightness(${100 + brightness * 100}%)`,
          `contrast(${100 + contrast * 100}%)`,
          `saturate(${100 + saturation * 100}%)`,
          `hue-rotate(${hue * 360}deg)`,
        ].join(" ");

        ctx.drawImage(image, 0, 0, image.naturalWidth, image.naturalHeight);
      }
    }
  };

  useEffect(() => {
    if (action === "ADJUSTMENT") {
      drawImage();
    }
  }, [src, brightness, saturation, hue, contrast, action]);

  return (
    <div className="flex h-full select-none items-center justify-center bg-black">
      <div className="flex h-[calc(100vh-var(--header-height)-var(--config-bottom-height)-var(--action-bottom-height))] w-full items-center justify-center md:h-[calc(100vh-var(--header-height))]">
        {src && (
          <Fragment>
            {/* Hidden img element to load the image */}
            <Image
              ref={inputImgRef}
              src={src}
              alt="hidden"
              className="hidden"
              onLoad={drawImage}
              width={400}
              height={400}
            />

            <canvas
              ref={adjustmentRef}
              className="h-auto max-h-full w-auto max-w-full"
            />
          </Fragment>
        )}
      </div>
    </div>
  );
};

export default AdjustmentProcessImage;
