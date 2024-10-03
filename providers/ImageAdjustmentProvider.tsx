"use client";

import { type IMAGE_ADJUSTMENT_ACTION_TYPES } from "@/lib/global.types";
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
  meta: {
    name: string;
    size: number;
  };
}

interface AdjustmentState {
  brightness: number;
  saturation: number;
  hue: number;
  contrast: number;
}

interface ImageAdjustmentContextData {
  inputImgRef: MutableRefObject<HTMLImageElement | null>;
  cropperRef: MutableRefObject<CropperRef | null>;
  adjustmentRef: MutableRefObject<HTMLCanvasElement | null>;

  action: IMAGE_ADJUSTMENT_ACTION_TYPES;
  setAction: Dispatch<SetStateAction<IMAGE_ADJUSTMENT_ACTION_TYPES>>;

  image: ImageState;
  setImage: Dispatch<SetStateAction<ImageState>>;

  isImageLoaded: boolean;

  cropOffset: number;
  setCropOffset: Dispatch<SetStateAction<number>>;

  adjustment: AdjustmentState;
  setAdjustment: Dispatch<SetStateAction<AdjustmentState>>;
  handleResetAdjustment: () => void;
}

const DEFAULT_IMAGE_STATE = {
  imgUrl: null,
  processedImg: null,
  originalImage: null,
  meta: {
    name: "",
    size: 0,
  },
};

const DEFAULT_ADJUSTMENT_STATE = {
  brightness: 0,
  saturation: 0,
  hue: 0,
  contrast: 0,
};

const ImageAdjustmentContext = createContext<
  ImageAdjustmentContextData | undefined
>(undefined);

function useImageAdjustmentContext(): ImageAdjustmentContextData {
  const context = useContext(ImageAdjustmentContext);

  if (!context) {
    throw new Error(
      "useImageAdjustmentContext must be used within a ImageAdjustmentProvider",
    );
  }

  return context;
}

const ImageAdjustmentProvider = ({ children }: { children: ReactNode }) => {
  const inputImgRef = useRef<HTMLImageElement | null>(null);
  const cropperRef = useRef<CropperRef>(null);
  const adjustmentRef = useRef<HTMLCanvasElement>(null);

  const [action, setAction] = useState<IMAGE_ADJUSTMENT_ACTION_TYPES>("IDLE");
  const [image, setImage] = useState<ImageState>(DEFAULT_IMAGE_STATE);
  const [cropOffset, setCropOffset] = useState<number>(200);
  const [adjustment, setAdjustment] = useState<AdjustmentState>(
    DEFAULT_ADJUSTMENT_STATE,
  );

  const handleResetAdjustment = () => {
    setAdjustment((prev) => ({
      ...prev,
      brightness: 0,
      contrast: 0,
      hue: 0,
      saturation: 0,
    }));
  };

  return (
    <ImageAdjustmentContext.Provider
      value={{
        inputImgRef,
        cropperRef,
        adjustmentRef,

        action,
        setAction,

        image,
        setImage,

        isImageLoaded: !!image.originalImage,

        cropOffset,
        setCropOffset,

        adjustment,
        setAdjustment,
        handleResetAdjustment,
      }}
    >
      {children}
    </ImageAdjustmentContext.Provider>
  );
};

export { ImageAdjustmentProvider, useImageAdjustmentContext };
