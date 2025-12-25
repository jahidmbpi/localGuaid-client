// app/components/Layout.tsx
import Navbar from "@/component/sheard/Navbar";
import React from "react";

type Props = {
  children: React.ReactNode;
};

export default function Layout({ children }: Props) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="grow">{children}</main>
    </div>
  );
}
