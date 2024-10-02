"use client";

import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";
import { createContext, useContext, useRef, useState } from "react";
import { CropperRef } from "react-advanced-cropper";

interface ImageState {
  imgUrl: string | null;
  processedImg: string | null;
  originalImage: string | null;
}

interface ImageAdjustmentContextData {
  inputImgRef: MutableRefObject<HTMLImageElement | null>;
  cropperRef: MutableRefObject<CropperRef | null>;

  action: IMAGE_ADJUSTMENT_ACTION_TYPES;
  setAction: Dispatch<SetStateAction<IMAGE_ADJUSTMENT_ACTION_TYPES>>;

  image: ImageState;
  setImage: Dispatch<SetStateAction<ImageState>>;

  isImageLoaded: boolean;
}

const ImageAdjustmentContext = createContext<
  ImageAdjustmentContextData | undefined
>(undefined);

function useImageAdjustmentContext(): ImageAdjustmentContextData {
  const context = useContext(ImageAdjustmentContext);

  if (!context) {
    throw new Error(
      "useImageAdjustmentContext must be used within a BranchProvider",
    );
  }

  return context;
}

const ImageAdjustmentProvider = ({ children }: { children: ReactNode }) => {
  const inputImgRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<CropperRef>(null);

  const [action, setAction] = useState<IMAGE_ADJUSTMENT_ACTION_TYPES>("IDLE");
  const [image, setImage] = useState<ImageState>({
    imgUrl: null,
    processedImg: null,
    originalImage: null,
  });

  return (
    <ImageAdjustmentContext.Provider
      value={{
        inputImgRef: inputImgRef,
        cropperRef: cropperRef,

        action,
        setAction,

        image,
        setImage,

        isImageLoaded: !!image.processedImg,
      }}
    >
      {children}
    </ImageAdjustmentContext.Provider>
  );
};

export { ImageAdjustmentProvider, useImageAdjustmentContext };
