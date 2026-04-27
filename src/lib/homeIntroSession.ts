const STORAGE_KEY = "pixel-portfolio-home-intro";

let lastPathnameForHomeIntro: string | null = null;
let homeIntroConsumedInMemory = false;
let documentNavigationPrimed = false;

function primeDocumentNavigationOnce(): void {
  if (documentNavigationPrimed) return;
  documentNavigationPrimed = true;
  if (typeof window === "undefined") return;
  const nav = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;
  if (nav?.type === "reload") {
    homeIntroConsumedInMemory = false;
    try {
      sessionStorage.removeItem(STORAGE_KEY);
    } catch {
      return;
    }
  }
}

export function isHomePathname(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}

export function registerPathnameForHomeIntro(pathname: string): void {
  if (typeof window === "undefined") return;
  const prev = lastPathnameForHomeIntro;
  lastPathnameForHomeIntro = pathname;
  if (prev !== null && isHomePathname(prev) && !isHomePathname(pathname)) {
    markHomeIntroSeenInSession();
  }
}

export function shouldAnimateHomeIntro(): boolean {
  if (typeof window === "undefined") return true;
  primeDocumentNavigationOnce();
  if (homeIntroConsumedInMemory) return false;
  try {
    if (sessionStorage.getItem(STORAGE_KEY) === "1") {
      homeIntroConsumedInMemory = true;
      return false;
    }
  } catch {
    return true;
  }
  return true;
}

export function markHomeIntroSeenInSession(): void {
  homeIntroConsumedInMemory = true;
  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    return;
  }
}
