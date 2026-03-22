"use client";

import { motion, useAnimation } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";

export function AvatarButton() {
  const controls = useAnimation();
  const router = useRouter();

  const handleClick = async () => {
    // Deep press
    await controls.start({
      scale: 0.72,
      transition: { type: "spring", stiffness: 900, damping: 40 },
    });
    // Big overshoot bounce back
    await controls.start({
      scale: 1,
      transition: { type: "spring", stiffness: 350, damping: 8 },
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
