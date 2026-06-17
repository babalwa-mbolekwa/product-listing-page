import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

// Function for merging class names and Tailwind classes
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}