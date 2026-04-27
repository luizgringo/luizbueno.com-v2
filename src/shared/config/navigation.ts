/**
 * Valid top-level routes available in the shell menu.
 */
export type AppPath = "/" | "/portfolio" | "/about" | "/contact";

/**
 * Navigation item rendered in menu and status bars.
 */
export type MainNavItem = {
  /** Route destination. */
  href: AppPath;
  /** Full label for accessibility and tooltips. */
  label: string;
  /** Compact label shown in the status bar. */
  footerShortLabel: string;
  /** Function key shortcut shown in hints. */
  fnKeyLabel: "F1" | "F2" | "F3" | "F4";
  /** Number shortcut shown in hints. */
  digitKey: "1" | "2" | "3" | "4";
  /** Label shown in top menu items. */
  barLabel: string;
  /** Hotkey character position in the menu label. */
  barHotkeyIndex: number;
};

/**
 * Canonical shell navigation model.
 */
export const MAIN_NAV_ITEMS: readonly MainNavItem[] = [
  {
    href: "/",
    label: "Home",
    footerShortLabel: "Home",
    fnKeyLabel: "F3",
    digitKey: "1",
    barLabel: "Home",
    barHotkeyIndex: 0,
  },
  {
    href: "/portfolio",
    label: "Portfolio",
    footerShortLabel: "Portfolio",
    fnKeyLabel: "F2",
    digitKey: "2",
    barLabel: "Portfolio",
    barHotkeyIndex: 0,
  },
  {
    href: "/about",
    label: "About",
    footerShortLabel: "About Me",
    fnKeyLabel: "F1",
    digitKey: "3",
    barLabel: "About Me",
    barHotkeyIndex: 0,
  },
  {
    href: "/contact",
    label: "Contact",
    footerShortLabel: "Contact",
    fnKeyLabel: "F4",
    digitKey: "4",
    barLabel: "Contact",
    barHotkeyIndex: 0,
  },
] as const;

/**
 * Prompt suffix mapping used by the command line shell.
 */
export const PATH_LABELS: Partial<Record<AppPath, string>> = {
  "/": "",
  "/about": "ABOUT",
  "/portfolio": "PORTFOLIO",
  "/contact": "CONTACT",
};
