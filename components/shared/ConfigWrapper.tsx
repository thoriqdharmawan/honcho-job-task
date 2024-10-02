import { FC, ReactNode } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { cn } from "@/lib/utils";

type Props = {
  children: ReactNode;
};

const ConfigWrapper: FC<Props> = ({ children }) => {
  return (
    <ScrollArea
      className={cn(
        "overflow-x-auto md:overflow-y-hidden",
        "w-full md:w-[var(--sidebar-width)]",
        "h-[--config-bottom-height] md:h-[calc(100vh-var(--header-height))]",
      )}
    >
      <div className="flex w-full p-4 md:flex-col md:items-center">
        {children}
      </div>
    </ScrollArea>
  );
};

export default ConfigWrapper;
