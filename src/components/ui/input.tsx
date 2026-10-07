import * as React from "react";
import { cn } from "@/lib/utils";

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "h-12 w-full min-w-0 rounded-lg border border-line bg-surface px-3.5 text-base text-fg shadow-[inset_0_1px_0_rgb(11_31_58/0.02)] transition-[border-color,box-shadow] duration-150 outline-none placeholder:text-subtle",
        "focus-visible:border-cyan focus-visible:ring-2 focus-visible:ring-cyan/25",
        "aria-invalid:border-danger aria-invalid:ring-2 aria-invalid:ring-danger/15",
        "disabled:pointer-events-none disabled:opacity-50",
        className,
      )}
      {...props}
    />
  );
}

export { Input };
