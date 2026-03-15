"use client";

import { Linkedin, Mail, Github } from "lucide-react";

export function SocialLinks() {
  return (
    <div
      className="mt-8 flex flex-wrap gap-4 items-center"
      style={{ color: "var(--text-3)" }}
    >
      <a
        href="https://www.linkedin.com/in/marcanthonyrosa/"
        className="flex items-center justify-center w-11 h-11 rounded-xl transition-colors hover:bg-[var(--nav-item-hover)]"
        style={{ color: "var(--text-2)" }}
        aria-label="LinkedIn"
      >
        <Linkedin size={24} strokeWidth={1.5} />
      </a>
      <a
        href="mailto:marc.anthony.rosa@gmail.com"
        className="flex items-center justify-center w-11 h-11 rounded-xl transition-colors hover:bg-[var(--nav-item-hover)]"
        style={{ color: "var(--text-2)" }}
        aria-label="Email"
      >
        <Mail size={24} strokeWidth={1.5} />
      </a>
      <a
        href="https://github.com/marcanthonyrosa"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center w-11 h-11 rounded-xl transition-colors hover:bg-[var(--nav-item-hover)]"
        style={{ color: "var(--text-2)" }}
        aria-label="GitHub"
      >
        <Github size={24} strokeWidth={1.5} />
      </a>
    </div>
  );
}
