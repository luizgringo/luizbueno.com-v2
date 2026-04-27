import { NCWindow } from "@/shared/ui/dos/nc-window";
import Link from "next/link";

/**
 * Custom 404 page for unknown routes.
 *
 * @returns A themed "not found" screen with a link back to home.
 */
export default function NotFound() {
  return (
    <div className="page-stack">
      <NCWindow title="ABORT, RETRY, FAIL?" className="nc-window--full-width">
        <div className="nc-window-body--centered">
          <p className="pixel-heading not-found-error-title dos-text--destructive">ERROR 404</p>
          <p className="not-found-lead">Bad command or file name.</p>
          <p className="not-found-sub">
            The page you requested could not be located on this drive.
          </p>
          <div className="not-found-actions">
            <Link href="/" className="nc-nav-item">
              <span aria-hidden>{">"}</span> RETURN TO C:\
            </Link>
          </div>
        </div>
      </NCWindow>
    </div>
  );
}
