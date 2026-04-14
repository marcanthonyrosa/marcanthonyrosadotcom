"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  House,
  User,
  PenLine,
  Layers,
  Cpu,
  Baby,
  Sun,
  Moon,
  Monitor,
} from "lucide-react";

const IS_DEV = process.env.NODE_ENV === "development";

const NAV_ITEMS = [
  {
    href: "/",
    label: "Home",
    icon: House,
    exact: true,
    devOnly: false,
    motionProps: {
      whileHover: { y: -3 },
      transition: { type: "spring" as const, stiffness: 400, damping: 10 },
    },
  },
  {
    href: "/about",
    label: "About",
    icon: User,
    devOnly: false,
    motionProps: {
      whileHover: { scale: 1.18 },
      transition: { type: "spring" as const, stiffness: 350, damping: 12 },
    },
  },
  {
    href: "/writing",
    label: "Writing",
    icon: PenLine,
    devOnly: false,
    motionProps: {
      whileHover: { rotate: -14 },
      transition: { type: "spring" as const, stiffness: 300, damping: 10 },
    },
  },
  {
    href: "/johnny",
    label: "Johnny",
    icon: Baby,
    devOnly: false,
    beta: true,
    motionProps: {
      whileHover: { y: -3, scale: 1.12 },
      transition: { type: "spring" as const, stiffness: 350, damping: 10 },
    },
  },
  {
    href: "/work",
    label: "Work",
    icon: Layers,
    devOnly: true,
    motionProps: {
      whileHover: { y: -3, scale: 1.1 },
      transition: { type: "spring" as const, stiffness: 350, damping: 10 },
    },
  },
  {
    href: "/gear",
    label: "Gear",
    icon: Cpu,
    devOnly: true,
    motionProps: {
      whileHover: { rotate: 90 },
      transition: { type: "spring" as const, stiffness: 180, damping: 12 },
    },
  },
].filter((item) => !item.devOnly || IS_DEV);


function NavItem({
  href,
  label,
  icon: Icon,
  exact,
  beta,
  motionProps,
}: (typeof NAV_ITEMS)[number]) {
  const pathname = usePathname();
  const isActive = exact ? pathname === href : pathname.startsWith(href);
  const [hovered, setHovered] = useState(false);

  return (
    <Link href={href} className="relative flex items-center group">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              {label}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Button */}
      <motion.div
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer"
        style={{
          background: isActive ? "var(--nav-item-active)" : "transparent",
          color: isActive ? "var(--nav-icon-active)" : "var(--text-2)",
          transition: "color 0.18s ease",
        }}
      >
        {/* Hover background */}
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ background: "var(--nav-item-hover)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered && !isActive ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
        {/* Icon with per-item motion */}
        <motion.div className="relative z-10" {...motionProps}>
          <Icon size={20} strokeWidth={isActive ? 2 : 1.75} />
        </motion.div>
        {beta && (
          <span
            className="absolute top-1 right-1 z-20 w-1.5 h-1.5 rounded-full pointer-events-none"
            style={{
              background: "var(--accent)",
              boxShadow: "0 0 0 1.5px var(--bg)",
            }}
            aria-label="Beta"
          />
        )}
      </motion.div>
    </Link>
  );
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setMounted(true), []);

  function toggleTheme() {
    setTheme(resolvedTheme === "dark" ? "light" : "dark");
  }

  const nextLabel = resolvedTheme === "dark" ? "Light" : "Dark";

  if (!mounted) {
    return (
      <div className="w-10 h-10 rounded-xl flex items-center justify-center">
        <Monitor size={20} strokeWidth={1.75} className="opacity-40" />
      </div>
    );
  }

  return (
    <div className="relative flex items-center group">
      {/* Tooltip */}
      <AnimatePresence>
        {hovered && (
          <motion.div
            initial={{ opacity: 0, x: -6 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -4 }}
            transition={{ duration: 0.15 }}
            className="absolute left-[calc(100%+10px)] top-1/2 -translate-y-1/2 z-50 pointer-events-none"
          >
            <div
              className="px-2.5 py-1 rounded-lg text-xs font-medium whitespace-nowrap"
              style={{
                background: "var(--surface)",
                border: "1px solid var(--border)",
                color: "var(--text-1)",
                boxShadow: "0 2px 8px rgba(0,0,0,0.12)",
              }}
            >
              Switch to {nextLabel}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onClick={toggleTheme}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer"
        style={{ color: "var(--text-3)" }}
        aria-label={`Switch to ${nextLabel} mode`}
      >
        <motion.div
          className="absolute inset-0 rounded-xl"
          style={{ background: "var(--nav-item-hover)" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.15 }}
        />
        <motion.div
          className="relative z-10"
          whileHover={{ rotate: 35 }}
          transition={{ type: "spring", stiffness: 250, damping: 12 }}
        >
          {resolvedTheme === "dark" ? (
            <Moon size={20} strokeWidth={1.75} />
          ) : (
            <Sun size={20} strokeWidth={1.75} />
          )}
        </motion.div>
      </motion.button>
    </div>
  );
}

export function Sidebar() {
  const pathname = usePathname();
  const isWide = pathname === "/tmc" || pathname.startsWith("/tmc/");

  // The TMC page uses max-w-5xl (1024px). Solving for the breakpoint at which
  // the sidebar (left: 3vw + 40px wide) just clears the content text edge
  // ((W − 1024) / 2 + 24px padding) gives W ≈ 1123px → rounded to 1125px.
  // The standard pages use max-w-2xl (672px) → the existing 750px breakpoint.
  const navClasses = isWide
    ? [
        "z-40 fixed flex items-center",
        "top-0 left-0 right-0 px-2 h-14",
        "bg-[var(--bg)]",
        "min-[1125px]:flex-col min-[1125px]:items-start min-[1125px]:gap-1",
        "min-[1125px]:top-[9.5rem] min-[1125px]:left-[3vw] min-[1125px]:right-auto",
        "min-[1125px]:h-auto min-[1125px]:w-auto min-[1125px]:px-0",
        "min-[1125px]:bg-transparent min-[1125px]:border-0",
      ]
    : [
        "z-40 fixed flex items-center",
        // Mobile: horizontal top bar
        "top-0 left-0 right-0 px-2 h-14",
        "bg-[var(--bg)]",
        "min-[750px]:flex-col min-[750px]:items-start min-[750px]:gap-1",
        "min-[750px]:top-[9.5rem] min-[750px]:left-[3vw] min-[750px]:right-auto",
        "min-[750px]:h-auto min-[750px]:w-auto min-[750px]:px-0",
        "min-[750px]:bg-transparent min-[750px]:border-0",
      ];

  return (
    <nav className={navClasses.join(" ")}>
      {/* Nav items */}
      <div
        className={
          isWide
            ? "flex items-center gap-1 min-[1125px]:flex-col min-[1125px]:gap-1"
            : "flex items-center gap-1 min-[750px]:flex-col min-[750px]:gap-1"
        }
      >
        {NAV_ITEMS.map((item) => (
          <NavItem key={item.href} {...item} />
        ))}
      </div>

      {/* Theme toggle: right-aligned on mobile, below nav on desktop */}
      <div
        className={
          isWide
            ? "ml-auto min-[1125px]:ml-0 min-[1125px]:mt-3"
            : "ml-auto min-[750px]:ml-0 min-[750px]:mt-3"
        }
      >
        <ThemeToggle />
      </div>
    </nav>
  );
}
