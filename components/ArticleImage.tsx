"use client";

import { useState } from "react";
import Image from "next/image";

interface ArticleImageProps {
  src: string;
  alt: string;
}

export default function ArticleImage({ src, alt }: ArticleImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) return null;

  return (
    <div className="mb-10 rounded-lg overflow-hidden" style={{ border: "1px solid var(--border)" }}>
      <Image
        src={src}
        alt={alt}
        width={800}
        height={500}
        className="w-full object-cover"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
