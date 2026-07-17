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

  return (
    <>
      <Image
        src="/aether_logo_no_bg_dark.png"
        alt="Aether"
        width={width}
        height={height}
        className={`${className} ${theme === "dark" ? "block" : "hidden"}`}
        priority
      />
      <Image
        src="/aether_logo_no_bg.png"
        alt="Aether"
        width={width}
        height={height}
        className={`${className} ${theme === "dark" ? "hidden" : "block"}`}
        priority
      />
    </>
  );
}
