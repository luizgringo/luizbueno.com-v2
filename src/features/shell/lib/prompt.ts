import { PATH_LABELS } from "@/shared/config/navigation";

/**
 * Builds the DOS command prompt text from a pathname.
 *
 * @param pathname - Current browser pathname.
 * @returns Prompt string displayed in the command line area.
 */
export function buildShellPrompt(pathname: string): string {
  const mappedPath = pathname in PATH_LABELS ? (pathname as keyof typeof PATH_LABELS) : undefined;
  const tail = mappedPath ? PATH_LABELS[mappedPath] : undefined;

  if (tail === undefined) {
    const normalized = pathname.replace(/^\//, "").toUpperCase() || "UNKNOWN";
    return `C:\\LUIZBUENO\\${normalized}>`;
  }

  if (tail === "") {
    return "C:\\LUIZBUENO>";
  }

  return `C:\\LUIZBUENO\\${tail}>`;
}
