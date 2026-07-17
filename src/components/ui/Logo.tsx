"use client";

import { useTheme } from "@/components/theme";

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || "";

interface LogoProps {
  width?: number;
  height?: number;
  className?: string;
}

export default function Logo({ width = 36, height = 36, className = "" }: LogoProps) {
  const { theme } = useTheme();
  const src = theme === "dark"
    ? `${BASE_PATH}/aether_logo_no_bg_dark.png`
    : `${BASE_PATH}/aether_logo_no_bg.png`;

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
