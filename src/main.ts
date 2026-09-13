import "./styles/tokens.css";
import "./styles/fonts.css";
import "./styles/base.css";
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/sections.css";

const THEME_KEY = "tl-theme";
const SLIP_KEY = "tl-slip-played";

type Theme = "light" | "dark";

const darkQuery = window.matchMedia("(prefers-color-scheme: dark)");

function isTheme(value: string | null): value is Theme {
  return value === "light" || value === "dark";
}

function systemTheme(): Theme {
  return darkQuery.matches ? "dark" : "light";
}

/** The stored override, or null when the page is still following the system. */
function storedTheme(): Theme | null {
  try {
    const stored = localStorage.getItem(THEME_KEY);
    return isTheme(stored) ? stored : null;
  } catch {
    return null;
  }
}

function resolvedTheme(): Theme {
  return storedTheme() ?? systemTheme();
}

// Storing a theme that already matches the OS would pin the page to a value it
// is about to agree with anyway. Clearing instead means toggling back to your
// OS theme silently restores "follow the system" — no third control, and the
// default survives the first press.
function applyTheme(theme: Theme): void {
  const root = document.documentElement;

  if (theme === systemTheme()) {
    delete root.dataset.theme;
    try {
      localStorage.removeItem(THEME_KEY);
    } catch {
      /* Storage is unavailable. The theme still applies for this page view. */
    }
  } else {
    root.dataset.theme = theme;
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch {
      /* Storage is unavailable. The choice lasts until the next load. */
    }
  }
}

// The icon is chosen by CSS from the resolved theme; this keeps the button's
// accessible name pointing at the same theme the icon does. Both strings are
// rendered into the markup per locale, so this file carries no English.
function labelToggle(button: HTMLButtonElement): void {
  const next = resolvedTheme() === "dark" ? "light" : "dark";
  const label = next === "light" ? button.dataset.toLight : button.dataset.toDark;
  if (!label) return;
  button.setAttribute("aria-label", label);
  button.title = label;
}

function setUpThemeToggle(): void {
  const button = document.querySelector<HTMLButtonElement>("#theme-toggle");
  if (!button) return;

  // Hidden in the markup so a visitor without JavaScript never sees a control
  // that cannot do anything.
  button.hidden = false;
  labelToggle(button);

  button.addEventListener("click", () => {
    applyTheme(resolvedTheme() === "dark" ? "light" : "dark");
    labelToggle(button);
  });

  darkQuery.addEventListener("change", () => {
    // Following the system: CSS has already repainted, so only the label is
    // stale. Pinned to an override: nothing changed for the reader.
    labelToggle(button);
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

// A scroll-snap track that already works without JavaScript. This adds the two
// step buttons and the counter, and keeps them in step with wherever the reader
// scrolled — including a swipe, which never goes through a button.
function setUpGallery(gallery: HTMLElement): void {
  const track = gallery.querySelector<HTMLElement>(".gallery__track");
  const controls = gallery.querySelector<HTMLElement>(".gallery__controls");
  const previous = gallery.querySelector<HTMLButtonElement>("[data-gallery-prev]");
  const next = gallery.querySelector<HTMLButtonElement>("[data-gallery-next]");
  const counter = gallery.querySelector<HTMLElement>("[data-gallery-counter]");
  if (!track || !controls || !previous || !next || !counter) return;

  const slides = [...track.children] as HTMLElement[];
  if (slides.length < 2) return;

  const template = counter.dataset.template ?? "{index} / {total}";
  const total = slides.length;
  let index = 0;

  const sync = (): void => {
    counter.textContent = template
      .replaceAll("{index}", String(index + 1))
      .replaceAll("{total}", String(total));
    previous.disabled = index === 0;
    next.disabled = index === total - 1;
  };

  const go = (to: number): void => {
    index = Math.max(0, Math.min(total - 1, to));
    const slide = slides[index];
    if (slide)
      track.scrollTo({ left: slide.offsetLeft - track.offsetLeft, behavior: scrollBehavior() });
    sync();
  };

  previous.addEventListener("click", () => go(index - 1));
  next.addEventListener("click", () => go(index + 1));

  // A swipe or an arrow-key scroll moves the track without touching a button,
  // so the index is read back from the scroll position rather than assumed.
  let frame = 0;
  track.addEventListener("scroll", () => {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      index = Math.round(track.scrollLeft / track.clientWidth);
      sync();
    });
  });

  controls.hidden = false;
  sync();
}

function scrollBehavior(): ScrollBehavior {
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

function setUpGalleries(): void {
  for (const gallery of document.querySelectorAll<HTMLElement>("[data-gallery]")) {
    setUpGallery(gallery);
  }
}

function stampYear(): void {
  const slot = document.querySelector<HTMLElement>("#year");
  if (slot) slot.textContent = String(new Date().getFullYear());
}

setUpThemeToggle();
setUpGalleries();
playSlipOnce();
stampYear();
