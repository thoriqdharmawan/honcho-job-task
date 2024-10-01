"use client";

import type {
  Dispatch,
  MutableRefObject,
  ReactNode,
  SetStateAction,
} from "react";
import { createContext, useContext, useRef, useState } from "react";

interface ImageState {
  imgUrl: string | null;
  originalImgUrl: string | null;
}

interface ImageAdjustmentContextData {
  inputImgRef: MutableRefObject<HTMLImageElement | null>;

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

  const [action, setAction] = useState<IMAGE_ADJUSTMENT_ACTION_TYPES>("IDLE");
  const [image, setImage] = useState<ImageState>({
    imgUrl: null,
    originalImgUrl: null,
  });

  return (
    <ImageAdjustmentContext.Provider
      value={{
        inputImgRef: inputImgRef,

        action,
        setAction,

        image,
        setImage,

        isImageLoaded: !!image.originalImgUrl,
      }}
    >
      {children}
    </ImageAdjustmentContext.Provider>
  );
};

export { ImageAdjustmentProvider, useImageAdjustmentContext };
