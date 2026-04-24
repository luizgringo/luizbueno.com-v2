import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { FKey } from "./FKey";

function formatTime(d: Date): string {
  const h = String(d.getHours()).padStart(2, "0");
  const m = String(d.getMinutes()).padStart(2, "0");
  const s = String(d.getSeconds()).padStart(2, "0");
  return `${h}:${m}:${s}`;
}

export function StatusBar() {
  const navigate = useNavigate();
  const [time, setTime] = useState<string>(() => formatTime(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setTime(formatTime(new Date())), 1000);
    return () => window.clearInterval(id);
  }, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.target instanceof HTMLElement) {
        const tag = e.target.tagName;
        if (tag === "INPUT" || tag === "TEXTAREA") return;
      }
      switch (e.key) {
        case "F1":
          e.preventDefault();
          navigate({ to: "/about" });
          break;
        case "F2":
          e.preventDefault();
          navigate({ to: "/portfolio" });
          break;
        case "F3":
          e.preventDefault();
          navigate({ to: "/" });
          break;
        case "F4":
          e.preventDefault();
          navigate({ to: "/contact" });
          break;
        case "F10":
          e.preventDefault();
          window.scrollTo({ top: 0, behavior: "smooth" });
          break;
        default:
          break;
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [navigate]);

  return (
    <footer className="sticky bottom-0 z-40 w-full bg-primary text-primary-foreground border-t-2 border-foreground">
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-2 gap-y-1 px-3 py-1 text-base">
        <FKey num={1} label="Help" onClick={() => navigate({ to: "/about" })} />
        <FKey num={2} label="View" onClick={() => navigate({ to: "/portfolio" })} />
        <FKey num={3} label="Home" onClick={() => navigate({ to: "/" })} />
        <FKey num={4} label="Mail" onClick={() => navigate({ to: "/contact" })} />
        <FKey
          num={10}
          label="Top"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        />
        <div className="ml-auto flex items-center gap-3 text-primary-foreground">
          <span aria-hidden>640K OK</span>
          <span aria-label={`Current time ${time}`}>{time}</span>
        </div>
      </div>
    </footer>
  );
}