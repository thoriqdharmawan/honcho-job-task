import type { Metadata } from "next";
import ComponentProvider from "@/providers/ComponentProvider";
import { FC, ReactNode } from "react";
import { ImageAdjustmentProvider } from "@/providers/ImageAdjustmentProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Frontend Developer Code Challenge",
  description: "Generated by create next app",
};

type Props = {
  children: ReactNode;
};

const RootLayout: FC<Props> = ({ children }: Readonly<Props>) => {
  return (
    <ImageAdjustmentProvider>
      <ComponentProvider>
        <main className="flex w-full max-w-[calc(100vw-var(--sidebar-width))] flex-col">
          {children}
        </main>
      </ComponentProvider>
    </ImageAdjustmentProvider>
  );
};

export default RootLayout;
