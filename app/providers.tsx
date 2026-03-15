"use client";

import { ThemeProvider, useTheme } from "next-themes";
import { useEffect } from "react";

function ThemeSessionReset({ children }: { children: React.ReactNode }) {
  const { setTheme } = useTheme();

  useEffect(() => {
    if (!sessionStorage.getItem("theme-session")) {
      setTheme("system");
      sessionStorage.setItem("theme-session", "1");
    }
  }, [setTheme]);

  return <>{children}</>;
}

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange={false}
    >
      <ThemeSessionReset>{children}</ThemeSessionReset>
    </ThemeProvider>
  );
}
