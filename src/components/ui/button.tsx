import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap font-medium transition-[color,background-color,box-shadow,transform,opacity] duration-150 ease-out disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-cyan/70 focus-visible:ring-offset-2 active:not-disabled:scale-[0.98]",
  {
    variants: {
      variant: {
        primary:
          "bg-cyan text-surface hover:bg-cyan-deep shadow-[0_1px_0_rgb(0_0_0/0.06)]",
        navy: "bg-navy text-surface hover:bg-navy-mid",
        outline:
          "border border-line bg-surface text-fg hover:border-navy/20 hover:bg-paper",
        ghost: "text-fg hover:bg-paper",
        whatsapp: "bg-whatsapp text-surface hover:bg-whatsapp-deep",
        light:
          "bg-surface text-navy hover:bg-cyan-soft",
        inverse:
          "border border-surface/25 bg-transparent text-surface hover:bg-surface/10",
      },
      size: {
        sm: "h-9 rounded-md px-3.5 text-sm",
        md: "h-11 rounded-lg px-4 text-sm",
        lg: "h-12 rounded-lg px-5 text-base",
        xl: "h-14 rounded-xl px-6 text-base",
        icon: "size-11 rounded-lg",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  },
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
