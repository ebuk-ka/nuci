import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Combines conditional class names and intelligently merges
 * conflicting Tailwind CSS utility classes.
 *
 * Example:
 * cn("p-4", "p-6") -> "p-6"
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}