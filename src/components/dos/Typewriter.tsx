import { useEffect, useRef, useState } from "react";

interface TypewriterProps {
  text: string;
  speed?: number;
  className?: string;
  startDelay?: number;
}

export function Typewriter({ text, speed = 25, className, startDelay = 0 }: TypewriterProps) {
  const [displayed, setDisplayed] = useState("");
  const intervalRef = useRef<number | null>(null);
  const timeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setDisplayed("");
    let i = 0;
    timeoutRef.current = window.setTimeout(() => {
      intervalRef.current = window.setInterval(() => {
        i += 1;
        setDisplayed(text.slice(0, i));
        if (i >= text.length && intervalRef.current) {
          window.clearInterval(intervalRef.current);
          intervalRef.current = null;
        }
      }, speed);
    }, startDelay);

    return () => {
      if (intervalRef.current) window.clearInterval(intervalRef.current);
      if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
    };
  }, [text, speed, startDelay]);

  return <span className={className}>{displayed}</span>;
}
