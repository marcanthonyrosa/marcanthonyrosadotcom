import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "TMC Intelligence",
};

export default function TMCLayout({ children }: { children: React.ReactNode }) {
  // The site layout removes pt-14 at min-[750px], but the TMC page keeps the
  // horizontal nav until min-[1125px]. Restore the offset for that gap.
  return (
    <div className="min-[750px]:pt-14 min-[1125px]:pt-0">
      {children}
    </div>
  );
}
