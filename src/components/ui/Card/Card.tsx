import { forwardRef } from "react";
import { motion } from "framer-motion";
import type { HTMLMotionProps } from "framer-motion";
import { cn } from "@/utils/cn";

interface CardProps extends Omit<HTMLMotionProps<"div">, "onDrag"> {
  hover?: boolean;
  animated?: boolean;
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ className, hover = false, animated = true, children, ...props }, ref) => {
    return (
      <motion.div
        ref={ref}
        initial={animated ? { opacity: 0, y: 10 } : false}
        animate={animated ? { opacity: 1, y: 0 } : false}
        transition={animated ? { duration: 0.25 } : undefined}
        className={cn(
          "rounded-2xl",
          "border border-zinc-800",
          "bg-zinc-900",
          "shadow-sm",
          "transition-all duration-300",
          hover && [
            "hover:-translate-y-1",
            "hover:border-cyan-500/60",
            "hover:shadow-lg",
          ],
          className
        )}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;