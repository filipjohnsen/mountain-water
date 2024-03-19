import clsx, { ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...classNames: ClassValue[]) {
  return twMerge(clsx(classNames));
}

export function sanitiseForPreview(string: string) {
  const fixedString = string.replace(/[^a-zA-Z]/g, "");

  return fixedString;
}
