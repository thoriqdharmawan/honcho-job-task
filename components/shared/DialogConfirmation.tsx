import { FC } from "react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

type DialogConfirmationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  textSecondary?: string;
  textPrimary?: string;
  onClickSecondary: () => void;
  onClickPrimary: () => void;
};

const DialogConfirmation: FC<DialogConfirmationProps> = (props) => {
  const {
    open,
    onOpenChange,
    description,
    title,
    textPrimary,
    textSecondary,
    onClickSecondary,
    onClickPrimary,
  } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter className="mt-3">
          <DialogClose className="flex justify-center gap-3 md:justify-end">
            <Button variant="secondary" onClick={onClickSecondary}>
              {textSecondary || "Cancel"}
            </Button>
            <Button onClick={onClickPrimary}>{textPrimary || "Save"}</Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmation;
