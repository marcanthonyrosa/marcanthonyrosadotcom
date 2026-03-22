"use client";

import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AvatarButton() {
  const controls = useAnimation();
  const router = useRouter();

  const handleClick = async () => {
    await controls.start({
      scaleX: 1.12,
      scaleY: 0.78,
      transition: { type: "spring", stiffness: 800, damping: 35 },
    });
    await controls.start({
      scaleX: 1,
      scaleY: 1,
      transition: { type: "spring", stiffness: 420, damping: 11 },
    });
    router.push("/about");
  };

  return (
    <motion.button
      animate={controls}
      onClick={handleClick}
      aria-label="Go to About page"
      style={{
        cursor: "pointer",
        border: "none",
        background: "none",
        padding: 0,
        display: "block",
        marginBottom: "2rem",
        borderRadius: "16px",
        transformOrigin: "bottom center",
      }}
    >
      <Image
        src="/headshot.jpeg"
        alt="Marc Anthony Rosa"
        width={120}
        height={120}
        style={{ borderRadius: "16px", display: "block" }}
        priority
      />
    </motion.button>
  );
}
