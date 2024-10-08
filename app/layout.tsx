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
      <ComponentProvider>{children}</ComponentProvider>
    </ImageAdjustmentProvider>
  );
};

export default RootLayout;
