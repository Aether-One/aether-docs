"use client";

import Image from "next/image";
import { useTheme } from "@/components/theme";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 36, height = 36, className = "" }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark" ? "/aether_logo_no_bg_dark.png" : "/aether_logo_no_bg.png";

  return (
    <Image
      src={src}
      alt="Aether"
      width={width}
      height={height}
      className={className}
      priority
    />
  );
}
