import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// Input and Style Functions
export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}
  