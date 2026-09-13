import "./styles/tokens.css";
import "./styles/fonts.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/sections.css";

const THEME_KEY = "tl-theme";
const SLIP_KEY = "tl-slip-played";

type Theme = "system" | "light" | "dark";

function isTheme(value: string | null): value is Theme {
  return value === "system" || value === "light" || value === "dark";
}

function readStoredTheme(): Theme {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return isTheme(stored) ? stored : "system";
  } catch {
    return "system";
  }
}

function applyTheme(theme: Theme): void {
  if (theme === "system") {
    delete document.documentElement.dataset.theme;
  } else {
    document.documentElement.dataset.theme = theme;
  }

  try {
    if (theme === "system") {
      localStorage.removeItem(THEME_KEY);
    } else {
      localStorage.setItem(THEME_KEY, theme);
    }
  } catch {
    /* Storage is unavailable. The choice still applies for this page view. */
  }
}

function setUpThemeControl(): void {
  const control = document.querySelector<HTMLFieldSetElement>("#theme-control");
  if (!control) return;

  // The control is hidden in the markup so a visitor without JavaScript never
  // sees a segmented control that cannot do anything.
  control.hidden = false;

  const current = readStoredTheme();
  const inputs = control.querySelectorAll<HTMLInputElement>('input[name="theme"]');

  for (const input of inputs) {
    input.checked = input.value === current;
    input.addEventListener("change", () => {
      if (input.checked && isTheme(input.value)) applyTheme(input.value);
    });
  }
}

function followSystemTheme(): void {
  const query = window.matchMedia("(prefers-color-scheme: dark)");
  // Re-applying "system" is a no-op for the attribute, but it keeps the stored
  // value and the rendered theme in step when the OS flips mid-session.
  query.addEventListener("change", () => {
    if (readStoredTheme() === "system") applyTheme("system");
  });
}

// Four bands level, then the fourth rises out of line. Once per session, on this
// site only, transform-only, and it is not a loader — design-system.md §9.
function playSlipOnce(): void {
  let played = false;
  try {
    played = sessionStorage.getItem(SLIP_KEY) === "1";
  } catch {
    played = true;
  }
  if (played) return;

  for (const mark of document.querySelectorAll<SVGElement>(".header .mark")) {
    mark.dataset.slip = "play";
  }

  try {
    sessionStorage.setItem(SLIP_KEY, "1");
  } catch {
    /* Storage is unavailable. The animation simply plays on every load. */
  }
}

function stampYear(): void {
  const slot = document.querySelector<HTMLElement>("#year");
  if (slot) slot.textContent = String(new Date().getFullYear());
}

setUpThemeControl();
followSystemTheme();
playSlipOnce();
stampYear();
