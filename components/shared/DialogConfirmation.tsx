import { FC, ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Button } from "../ui/button";

export type DialogConfirmationProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  description: string;
  textSecondary?: string;
  textPrimary?: string;
  onClickSecondary: () => void;
  onClickPrimary: () => void;
  children?: ReactNode;
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
    children,
  } = props;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="mb-3">{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
        <DialogFooter className="mt-3">
          <div className="flex justify-center gap-3 md:justify-end">
            <Button variant="secondary" onClick={onClickSecondary}>
              {textSecondary || "Cancel"}
            </Button>
            <Button onClick={onClickPrimary}>{textPrimary || "Save"}</Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogConfirmation;
