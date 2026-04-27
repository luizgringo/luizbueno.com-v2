import { NCWindow } from "@/shared/ui/dos/nc-window";

/**
 * Fallback loading UI rendered while a route segment is streaming.
 *
 * @returns A DOS-style loading placeholder.
 */
export default function Loading() {
  return (
    <div className="page-stack">
      <NCWindow title="LOADING..." className="nc-window--full-width">
        <p className="dos-text--muted">Reading directory listing, please wait...</p>
      </NCWindow>
    </div>
  );
}
