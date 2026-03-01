"use client";

import posthog from "posthog-js";
import { PostHogProvider as PHProvider } from "posthog-js/react";
import { useEffect } from "react";

export function PostHogProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    posthog.init("phc_q48SkxIjWWCMVjD1ydL8Oos0EHlsp6P4wYhi1Qd46TT", {
      api_host: "https://us.i.posthog.com",
      person_profiles: "identified_only",
      capture_pageview: false, // handled manually via usePathname
    });
  }, []);

  return <PHProvider client={posthog}>{children}</PHProvider>;
}
