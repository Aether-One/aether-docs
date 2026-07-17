import { ButtonHTMLAttributes, AnchorHTMLAttributes } from "react";

type ButtonVariant = "primary" | "secondary" | "ghost";
type ButtonSize = "sm" | "md" | "lg";

interface BaseProps {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & { href?: never };
type LinkProps = BaseProps & AnchorHTMLAttributes<HTMLAnchorElement> & { href: string };

type Props = ButtonProps | LinkProps;

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "bg-nebula-purple hover:bg-nebula-purple/90 text-white shadow-lg shadow-nebula-purple/20 hover:shadow-nebula-purple/30",
  secondary:
    "border border-border hover:border-nebula-purple/50 text-star-dim hover:text-star-white bg-transparent",
  ghost:
    "text-star-dim hover:text-star-white bg-transparent hover:bg-cosmos-800/50",
};

const sizeStyles: Record<ButtonSize, string> = {
  sm: "px-4 py-2 text-sm rounded-md",
  md: "px-6 py-2.5 text-sm rounded-lg",
  lg: "px-8 py-3.5 rounded-lg",
};

export default function Button({ variant = "primary", size = "md", ...props }: Props) {
  const className = `inline-flex items-center justify-center font-medium transition-all duration-200 ${variantStyles[variant]} ${sizeStyles[size]} ${(props as { className?: string }).className || ""}`;

  if ("href" in props && props.href) {
    const { href, ...rest } = props as LinkProps;
    return <a href={href} className={className} {...rest} />;
  }

  return <button className={className} {...(props as ButtonProps)} />;
}
