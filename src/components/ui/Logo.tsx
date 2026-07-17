"use client";

import { useTheme } from "@/components/theme";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 36, height = 36, className = "" }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark"
    ? "/aether-docs/aether_logo_no_bg_dark.png"
    : "/aether-docs/aether_logo_no_bg.png";

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt="Aether"
      width={width}
      height={height}
      className={className}
    />
  );
}
