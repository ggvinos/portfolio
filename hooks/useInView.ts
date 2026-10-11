"use client";
import { useRef } from "react";

/** Content remains readable on first paint, with or without JavaScript. */
export function useInView() {
  const ref = useRef<HTMLDivElement>(null);
  return [ref, true] as const;
}
