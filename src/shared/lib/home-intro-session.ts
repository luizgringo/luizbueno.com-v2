/**
 * Session storage key used to track home intro consumption.
 */
const STORAGE_KEY = "pixel-portfolio-home-intro";

let lastPathnameForHomeIntro: string | null = null;
let homeIntroConsumedInMemory = false;
let documentNavigationPrimed = false;

/**
 * Initializes reload detection once to reset intro state when needed.
 */
function primeDocumentNavigationOnce(): void {
  if (documentNavigationPrimed) {
    return;
  }

  documentNavigationPrimed = true;

  if (typeof window === "undefined") {
    return;
  }

  const navigation = performance.getEntriesByType("navigation")[0] as
    | PerformanceNavigationTiming
    | undefined;

  if (navigation?.type !== "reload") {
    return;
  }

  homeIntroConsumedInMemory = false;

  try {
    sessionStorage.removeItem(STORAGE_KEY);
  } catch {
    return;
  }
}

/**
 * Checks whether a pathname points to the home route.
 *
 * @param pathname - Route pathname.
 * @returns `true` for `/` and empty path.
 */
export function isHomePathname(pathname: string): boolean {
  return pathname === "/" || pathname === "";
}

/**
 * Registers route transitions to mark intro as consumed after leaving home.
 *
 * @param pathname - Current pathname.
 */
export function registerPathnameForHomeIntro(pathname: string): void {
  if (typeof window === "undefined") {
    return;
  }

  const previousPathname = lastPathnameForHomeIntro;
  lastPathnameForHomeIntro = pathname;

  if (previousPathname && isHomePathname(previousPathname) && !isHomePathname(pathname)) {
    markHomeIntroSeenInSession();
  }
}

/**
 * Determines if the home intro animation should run in this session.
 *
 * @returns `true` when the intro should animate.
 */
export function shouldAnimateHomeIntro(): boolean {
  if (typeof window === "undefined") {
    return true;
  }

  primeDocumentNavigationOnce();

  if (homeIntroConsumedInMemory) {
    return false;
  }

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

/**
 * Marks the home intro as already seen in the current session.
 */
export function markHomeIntroSeenInSession(): void {
  homeIntroConsumedInMemory = true;

  try {
    sessionStorage.setItem(STORAGE_KEY, "1");
  } catch {
    return;
  }
}
