import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Gear",
};

const GEAR_SECTIONS = [
  {
    title: "Computing",
    items: [
      {
        name: "MacBook Pro 16\" M3 Max",
        note: "The 128GB RAM config. Overkill for product work, but I prototype a lot and run heavy design tools. Will not go back.",
      },
      {
        name: "LG 27UK850-W 4K Monitor",
        note: "Not the most exciting display, but the USB-C hub built in makes cable management liveable on a single-monitor setup.",
      },
      {
        name: "iPad Pro 12.9\" M2 + Apple Pencil Pro",
        note: "My thinking tool. I sketch wireframes, annotate docs, and take notes by hand during user interviews. Replaced a whiteboard for me.",
      },
      {
        name: "iPhone 15 Pro",
        note: "Action button configured to open Voice Memos. Invaluable for capturing thoughts mid-run.",
      },
      {
        name: "Keychron Q3 (Cherry MX Browns)",
        note: "Tactile without being loud. The gasket mount means it's comfortable to type on for long sessions. Required mod: O-rings.",
      },
      {
        name: "Logitech MX Master 3S",
        note: "The scroll wheel is magic. Switched from trackpad to this for most work; use trackpad when I need precision in Figma.",
      },
    ],
  },
  {
    title: "Audio",
    items: [
      {
        name: "AirPods Pro 2",
        note: "My all-day companion. ANC for deep work, Transparency for standup and walking meetings. Battery life is genuinely impressive.",
      },
      {
        name: "Sony WH-1000XM5",
        note: "When I need to disappear for a long writing session. Better ANC than AirPods Pro, but I can't stand wearing them for more than 3 hours.",
      },
      {
        name: "Jabra Speak 750",
        note: "Conference call speaker for the days I'm in the home office alone. Far superior to built-in laptop audio for video calls.",
      },
    ],
  },
  {
    title: "Desk & Office",
    items: [
      {
        name: "Uplift V2 Standing Desk (72\")",
        note: "I alternate between sitting and standing roughly every hour. The memory presets are the feature I didn't know I needed.",
      },
      {
        name: "Herman Miller Aeron (Size B)",
        note: "If you sit for a living, buy a good chair. This is the one. The lumbar support saved my back during pandemic WFH.",
      },
      {
        name: "Elgato Key Light Air (×2)",
        note: "Video calls went from looking like witness protection to looking like I have a production setup. Worth every penny for remote-first work.",
      },
      {
        name: "Anker USB-C Hub (13-in-1)",
        note: "One cable to rule them all. Power, display, storage, and peripherals through a single port.",
      },
    ],
  },
  {
    title: "Software & Apps",
    items: [
      {
        name: "Linear",
        note: "The best issue tracker I've ever used. Fast, keyboard-first, and opinionated in the right ways. Teams adopt it without being forced.",
      },
      {
        name: "Notion",
        note: "Where all strategy docs, PRDs, and research notes live. Team wiki, personal brain, meeting notes. We run our entire product operating system here.",
      },
      {
        name: "Figma",
        note: "I'm not a designer, but I live in Figma for reviewing work, leaving feedback, and doing my own rough wireframes. FigJam replaced Miro for me.",
      },
      {
        name: "Arc Browser",
        note: "Spaces replaced a mess of windows. Easels for research. Command Bar is faster than Alfred for quick site navigation.",
      },
      {
        name: "Raycast",
        note: "Replaced Spotlight entirely. Clipboard manager, window management, and the AI commands mean I almost never alt-tab anymore.",
      },
      {
        name: "Obsidian",
        note: "Personal knowledge base, separate from Notion. I write all my essays here first. Local-first storage means I'm not worried about my notes disappearing.",
      },
      {
        name: "Cleanshot X",
        note: "The screenshot tool macOS should have. Scrolling captures for documenting long flows, instant markup for async feedback.",
      },
      {
        name: "Loom",
        note: "Async video > synchronous meetings for a lot of communication. I loom my product reviews before meetings so the meeting itself can be discussion.",
      },
    ],
  },
  {
    title: "Carry",
    items: [
      {
        name: "Peak Design Everyday Backpack 30L",
        note: "I've tried everything. This is it. The MagSafe-style strap system and the weatherproof zipper make it the only bag I've owned for 4 years.",
      },
      {
        name: "Bellroy Note Sleeve",
        note: "Thin enough to forget it's in my pocket. Cards only — I haven't carried cash since 2019.",
      },
      {
        name: "Apple Watch Series 9",
        note: "Mostly a notification triage device. The workout tracking is reliable enough to replace a dedicated running watch.",
      },
    ],
  },
  {
    title: "Reading & Analog",
    items: [
      {
        name: "Kindle Paperwhite (2023)",
        note: "I read before bed every night. Waterproof for the bathtub, months of battery, and lighter than any physical book. Convinced five friends to switch.",
      },
      {
        name: "Leuchtturm1917 Notebook (A5, dotted)",
        note: "Weekly planning, daily journaling, and sketch-thinking all happen here. The dotted grid is the only correct choice.",
      },
      {
        name: "Pilot Metropolitan Fountain Pen",
        note: "A $25 fountain pen that writes better than most $200 pens. Cartridge or converter — I use Pilot Iroshizuku ink.",
      },
    ],
  },
];

export default function Gear() {
  if (process.env.NODE_ENV !== "development") notFound();

  return (
    <div className="max-w-2xl mx-auto px-6 py-16 sm:px-10">
      {/* ── Header ── */}
      <section className="mb-12">
        <h1
          className="font-semibold mb-3 tracking-tight"
          style={{ color: "var(--text-1)", fontSize: "2.25rem" }}
        >
          Gear
        </h1>
        <p
          className="leading-relaxed"
          style={{ color: "var(--text-2)", fontSize: "1.1rem" }}
        >
          Things I use for computing, working, and thinking. I update this page
          when something changes. No affiliate links — just honest opinions.
        </p>
      </section>

      <hr style={{ borderColor: "var(--border)" }} className="mb-12" />

      {/* ── Sections ── */}
      <div className="flex flex-col gap-14">
        {GEAR_SECTIONS.map((section) => (
          <section key={section.title}>
            <h2
              className="text-xs font-semibold uppercase tracking-widest mb-6"
              style={{ color: "var(--text-3)" }}
            >
              {section.title}
            </h2>
            <div className="flex flex-col gap-5">
              {section.items.map((item) => (
                <div key={item.name} className="flex flex-col gap-1">
                  <span
                    className="font-medium"
                    style={{ color: "var(--text-1)", fontSize: "1.05rem" }}
                  >
                    {item.name}
                  </span>
                  <p
                    className="leading-relaxed"
                    style={{ color: "var(--text-2)", fontSize: "1rem" }}
                  >
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </section>
        ))}
      </div>

      <footer
        className="pt-16 pb-8"
        style={{ color: "var(--text-3)", fontSize: "0.875rem" }}
      >
        Last updated February 2026 · Handcrafted by Marc · {new Date().getFullYear()}
      </footer>
    </div>
  );
}
