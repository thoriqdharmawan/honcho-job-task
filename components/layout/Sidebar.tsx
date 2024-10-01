import { FC, ReactNode } from "react";
import { Button } from "../ui/button";

type SidebarProps = {
  children: ReactNode;
};

const Sidebar: FC<SidebarProps> = ({ children }) => {
  return (
    <div className="flex min-h-[calc(100vh-var(--header-height))]">
      <aside className="sticky top-[var(--header-height)] z-50 h-[calc(100vh-var(--header-height))] w-[var(--sidebar-width)] overflow-y-auto border-r p-4">
        <h1 className="mb-2 p-2 text-2xl font-bold">Action</h1>
        <div className="flex flex-col gap-3">
          <Button>Filter</Button>
          <Button>Crop</Button>
          <Button>Rotate</Button>
        </div>
      </aside>

      <main className="flex w-full max-w-[calc(100vw-var(--sidebar-width))] flex-col p-5">
        {children}
      </main>
    </div>
  );
};

export default Sidebar;
