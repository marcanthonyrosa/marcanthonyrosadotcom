import { Sidebar } from "@/components/Sidebar";
import { JohnnyBanner } from "@/components/JohnnyBanner";

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JohnnyBanner />
      <Sidebar />
      <main className="min-h-screen pt-14 min-[750px]:pt-0">{children}</main>
    </>
  );
}
