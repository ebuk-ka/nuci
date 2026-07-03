import { cva } from "class-variance-authority";

export const buttonVariants = cva(
  [
    "inline-flex",
    "items-center",
    "justify-center",
    "gap-2",
    "rounded-xl",
    "font-medium",
    "transition-all",
    "duration-200",
    "disabled:pointer-events-none",
    "disabled:opacity-50",
    "focus:outline-none",
    "focus:ring-2",
    "focus:ring-cyan-500",
    "cursor-pointer",
  ],
  {
    variants: {
      variant: {
        primary:
          "bg-cyan-500 text-white hover:bg-cyan-600",

        secondary:
          "bg-zinc-800 text-white hover:bg-zinc-700",

        ghost:
          "bg-transparent text-white hover:bg-zinc-800",

        danger:
          "bg-red-500 text-white hover:bg-red-600",
      },

      size: {
        sm: "h-9 px-3 text-sm",

        md: "h-11 px-5 text-sm",

        lg: "h-12 px-6 text-base",
      },
    },

    defaultVariants: {
      variant: "primary",
      size: "md",
    },
  }
);