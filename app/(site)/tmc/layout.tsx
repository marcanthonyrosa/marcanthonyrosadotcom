import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMC Intelligence",
};

export default function TMCLayout({ children }: { children: React.ReactNode }) {
  return children;
}
