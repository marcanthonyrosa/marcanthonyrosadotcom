import Image from "next/image";

const AVATAR_SIZE = 57;
const AVATAR_RADIUS = Math.round(AVATAR_SIZE / 6);

export function HomeHero() {
  return (
    <div className="flex items-start gap-4 mb-8">
      <div className="mt-[3px]" style={{ flexShrink: 0 }}>
        <Image
          src="/headshot.jpeg"
          alt="Marc Anthony Rosa"
          width={AVATAR_SIZE}
          height={AVATAR_SIZE}
          style={{ borderRadius: AVATAR_RADIUS, display: "block" }}
          priority
        />
      </div>
      <div className="min-w-0">
        <h1
          className="font-bold tracking-tight leading-none"
          style={{ color: "var(--text-1)", fontSize: "var(--text-display)" }}
        >
          Marc Rosa
        </h1>
        <p
          className="font-medium mt-2.5 leading-none"
          style={{ color: "var(--text-2)", fontSize: "var(--text-h2)" }}
        >
          Head of Product
        </p>
      </div>
    </div>
  );
}
