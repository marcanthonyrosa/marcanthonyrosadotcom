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

function ThemeIcon({ theme }: { theme: string | undefined }) {
  if (theme === "dark") return <Moon size={20} strokeWidth={1.75} />;
  if (theme === "light") return <Sun size={20} strokeWidth={1.75} />;
  return <Monitor size={20} strokeWidth={1.75} />;
}

function NavItem({
  href,
  label,
  icon: Icon,
  exact,
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
      </motion.div>
    </Link>
  );
}

function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => setMounted(true), []);

  function cycleTheme() {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  }

  const nextLabel =
    theme === "system" ? "Light" : theme === "light" ? "Dark" : "System";

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
        onClick={cycleTheme}
        className="relative flex items-center justify-center w-10 h-10 rounded-xl cursor-pointer"
        style={{ color: "var(--text-3)" }}
        aria-label={`Switch to ${nextLabel} theme`}
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
          <ThemeIcon theme={theme} />
        </motion.div>
      </motion.button>
    </div>
  );
}

export function Sidebar() {
  return (
    <nav
      className="z-40 flex flex-col gap-1"
      style={{
        position: "fixed",
        top: "9.5rem",
        left: "3vw",
        width: "auto",
        alignItems: "flex-start",
        paddingTop: "calc(var(--spacing, 4px) * 0)",
      }}
    >
      {/* Nav items */}
      {NAV_ITEMS.map((item) => (
        <NavItem key={item.href} {...item} />
      ))}

      {/* Theme toggle with a small gap above */}
      <div style={{ marginTop: "0.75rem" }}>
        <ThemeToggle />
      </div>
    </nav>
  );
}
