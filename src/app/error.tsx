"use client";

import { useEffect } from "react";

/**
 * Props received by the App Router error boundary.
 */
type ErrorPageProps = {
  error: Error & { digest?: string };
  reset: () => void;
};

/**
 * Route-level error boundary UI.
 *
 * @param props - Error payload and reset callback provided by Next.js.
 * @returns A recoverable error screen.
 */
export default function ErrorPage({ error, reset }: ErrorPageProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="router-error">
      <div className="router-error__card">
        <div className="router-error__icon-wrap">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="router-error__icon"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <title>Error warning icon</title>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
            />
          </svg>
        </div>
        <h1 className="router-error__title">Something went wrong</h1>
        <p className="router-error__lead">An unexpected error occurred. Please try again.</p>
        {process.env.NODE_ENV === "development" && error.message ? (
          <pre className="router-error__trace">{error.message}</pre>
        ) : null}
        <div className="router-error__actions">
          <button
            type="button"
            onClick={reset}
            className="router-error__btn router-error__btn--primary"
          >
            Try again
          </button>
          <a href="/" className="router-error__btn router-error__btn--secondary">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}
