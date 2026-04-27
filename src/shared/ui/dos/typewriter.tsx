"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Props accepted by the typewriter text effect.
 */
type TypewriterProps = {
  /** Full text to reveal. */
  text: string;
  /** Interval between characters in milliseconds. */
  speed?: number;
  /** Optional class names applied to the wrapping span. */
  className?: string;
  /** Delay before typing starts in milliseconds. */
  startDelay?: number;
  /** When true, renders the full text immediately. */
  instant?: boolean;
};

/**
 * Progressive text reveal component used in the home intro.
 *
 * @param props - Text and timing options.
 * @returns Animated or static text span.
 */
export function Typewriter({
  text,
  speed = 25,
  className,
  startDelay = 0,
  instant = false,
}: TypewriterProps) {
  const [displayed, setDisplayed] = useState(() => (instant ? text : ""));
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    if (instant) {
      setDisplayed(text);
      return;
    }

    setDisplayed("");
    let index = 0;

    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        index += 1;
        setDisplayed(text.slice(0, index));

        if (index >= text.length && intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, speed);
    }, startDelay);

    return () => {
      if (intervalRef.current) {
        window.clearInterval(intervalRef.current);
      }

      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
    };
  }, [instant, speed, startDelay, text]);

  return <span className={className}>{displayed}</span>;
}
