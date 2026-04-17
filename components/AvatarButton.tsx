"use client";

import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { usePostHog } from "posthog-js/react";

type Props = {
  size?: number;
  className?: string;
};

export function AvatarButton({ size = 48, className }: Props) {
  const controls = useAnimation();
  const router = useRouter();
  const posthog = usePostHog();

  const handleClick = async () => {
    posthog.capture("avatar_clicked", { location: "home" });
    await controls.start({
      scale: 0.87,
      transition: { type: "spring", duration: 0.04, bounce: 0 },
    });
    await controls.start({
      scale: 1,
      transition: { type: "spring", duration: 0.18, bounce: 0.08 },
    });
    router.push("/about");
  };

  const radius = Math.round(size / 6);

  return (
    <motion.button
      animate={controls}
      onClick={handleClick}
      aria-label="Go to About page"
      className={className}
      style={{
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: 0,
        display: "block",
        borderRadius: radius,
        flexShrink: 0,
      }}
    >
      <Image
        src="/headshot.jpeg"
        alt="Marc Anthony Rosa"
        width={size}
        height={size}
        style={{ borderRadius: radius, display: "block" }}
        priority
      />
    </motion.button>
  );
}
