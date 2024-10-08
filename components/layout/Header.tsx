import { FC } from "react";

type HeaderProps = {
  title: string;
};

const Header: FC<HeaderProps> = ({ title }: HeaderProps) => {
  return (
    <header className="sticky top-0 z-50 flex h-[var(--header-height)] flex-row items-center border-b bg-background">
      <section className="flex flex-1 flex-row items-center justify-between gap-4 px-4">
        <h1 className="mb-2 w-full p-2 text-center text-xl font-bold md:text-3xl">
          {title}
        </h1>
      </section>
    </header>
  );
};

export default Header;
