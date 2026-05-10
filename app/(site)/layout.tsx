import { Sidebar } from "@/components/Sidebar";
import { FloatingFrenchie } from "@/components/FloatingFrenchie";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Sidebar />
      <main className="min-h-screen pt-14 min-[750px]:pt-0">{children}</main>
      <FloatingFrenchie />
    </>
  );
}
