import localFont from "next/font/local";
import Sidebar from "@/components/layout/Sidebar";
import Header from "@/components/layout/Header";
import { FC, ReactNode } from "react";

const geistSans = localFont({
  src: "../fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "../fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

type Props = {
  children: ReactNode;
};

const ComponentProvider: FC<Props> = ({ children }: Props) => {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} h-dvh antialiased`}
      >
        <Header title="Frontend Developer Code Challenge" />
        <Sidebar>{children}</Sidebar>
      </body>
    </html>
  );
};

export default ComponentProvider;
