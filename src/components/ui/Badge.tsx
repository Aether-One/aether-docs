import { ReactNode } from "react";

type BadgeVariant = "default" | "purple" | "blue" | "green" | "pink";

interface BadgeProps {
  children: ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: "bg-cosmos-800 text-star-dim border-border",
  purple: "bg-nebula-purple/10 text-nebula-purple border-nebula-purple/20",
  blue: "bg-nebula-blue/10 text-nebula-blue border-nebula-blue/20",
  green: "bg-aurora-green/10 text-aurora-green border-aurora-green/20",
  pink: "bg-nebula-pink/10 text-nebula-pink border-nebula-pink/20",
};

export default function Badge({ children, variant = "default", className = "" }: BadgeProps) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
