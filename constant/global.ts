import { DIALOG_CONFIRMATION_TYPE } from "@/lib/global.types";

type DialogConfirmation = {
  title: string;
  description: string;
};

export const DEFAULT_DIALOG_CONFIRMATION: Record<
  DIALOG_CONFIRMATION_TYPE,
  DialogConfirmation
> = {
  DISCARD: {
    title: "Discard Changes?",
    description:
      "Are you sure you want to discard your changes? All unsaved modifications will be lost.",
  },
  RESET_TO_ORIGINAL: {
    title: "Reset to original?",
    description:
      "Are you sure you want to reset to the original settings? All changes made will be undone.",
  },
  DELETE_IMAGE: {
    title: "Delete Image?",
    description:
      "Are you sure you want to delete this image? This action cannot be undone.",
  },
};
