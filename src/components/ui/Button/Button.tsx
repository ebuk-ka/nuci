import { forwardRef } from "react";
import { buttonVariants } from "./buttonVariants";
import type { ButtonProps } from "./Button.types";
import Spinner from "../Spinner/Spinner";
import { cn } from "@/utils/cn";

const Button = forwardRef<
  HTMLButtonElement,
  ButtonProps
>(
  (
    {
      children,
      variant,
      size,
      loading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    return (
      <button
        ref={ref}
        disabled={loading || disabled}
        className={cn(
          buttonVariants({
            variant,
            size,
          }),
          fullWidth && "w-full",
          className
        )}
        {...props}
      >
        {loading ? (
          <>
            <Spinner />
            Loading...
          </>
        ) : (
          <>
            {leftIcon}
            {children}
            {rightIcon}
          </>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;