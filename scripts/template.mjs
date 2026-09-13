// The page, as one function of a locale dictionary.
//
// Three complete HTML documents are emitted — English at the root, Portuguese
// under /pt/ and Spanish under /es/. Each is a whole page with the right `lang`,
// so every locale works with JavaScript disabled, is indexable, and is read in
// the right voice by a screen reader. Switching language is a plain link.
//
// Asset references are written as absolute public paths (`/people/x.jpg`). Vite
// rewrites them per document against `base: './'`, which resolves correctly from
// the root and from one directory down.

export const SITE_URL = "https://rogerpoliver.github.io/tessarion-labs-site/";

const escapes = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };

/** Escape a dictionary string for text or attribute context. */
export function e(value) {
  return String(value).replace(/[&<>"']/g, (c) => escapes[c]);
}

function fill(template, values) {
  return Object.entries(values).reduce(
    (out, [key, value]) => out.replaceAll(`{${key}}`, value),
    template,
  );
}

/** Relative href from `from` ("", "pt", "es") to `to`. */
function hrefTo(from, to) {
  const up = from === "" ? "./" : "../";
  return to === "" ? up : `${up}${to}/`;
}

function absolute(dir) {
  return dir === "" ? SITE_URL : `${SITE_URL}${dir}/`;
}

const MARK_BANDS_LIGHT = ["#A83214", "#E0562D", "#F0873C"];
const MARK_BANDS_DARK = ["#C0431F", "#E0562D", "#F0873C"];

function lockup(bands, wordmarkFill, { hidden }) {
  const rects = bands
    .map((fillColor, i) => `<rect x="${2 + i * 6}" y="5" width="6" height="24" fill="${fillColor}" />`)
    .join("\n            ");

  return `<svg
            class="mark mark--${hidden ? "dark" : "light"}"
            viewBox="0 0 190 32"
            width="190"
            height="32"
            ${hidden ? 'role="presentation" aria-hidden="true"' : 'role="img"'}
          >
            ${rects}
            <rect class="mark__band--slipped" x="22" y="1" width="6" height="24" fill="#F7C08A" />
            <text x="45" y="23" font-family="Inter Tight, Inter, system-ui, sans-serif" font-size="24" font-weight="500" letter-spacing="-0.48" fill="${wordmarkFill}">Tessarion</text>
            <text x="150" y="22" font-family="JetBrains Mono, ui-monospace, monospace" font-size="9.5" font-weight="500" letter-spacing="2.1" fill="${wordmarkFill}" opacity="0.6">LABS</text>
          </svg>`;
}

function gallery(person, t) {
  const label = fill(t.people.galleryLabel, { name: person.name });
  const slides = person.photos
    .map(
      (photo, i) => `<li class="gallery__slide">
                <img
                  class="gallery__photo"
                  src="/people/${e(photo.src)}"
                  width="640"
                  height="800"
                  ${i === 0 ? 'fetchpriority="high"' : 'loading="lazy"'}
                  decoding="async"
                  alt="${e(photo.alt)}"
                />
              </li>`,
    )
    .join("\n              ");

  // The track is a scroll-snap list, so it is swipeable and arrow-key scrollable
  // with no JavaScript at all. The buttons and the counter are an enhancement
  // and stay hidden until main.ts wires them.
  return `<div class="gallery" data-gallery>
            <ul class="gallery__track" tabindex="0" aria-label="${e(label)}">
              ${slides}
            </ul>
            <div class="gallery__controls" hidden>
              <button
                class="gallery__step"
                type="button"
                data-gallery-prev
                aria-label="${e(fill(t.people.previous, { name: person.name }))}"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
                  <path d="M10 2L4 8l6 6" fill="none" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </button>
              <p
                class="gallery__counter"
                data-gallery-counter
                data-template="${e(t.people.counter)}"
                aria-live="polite"
              >${e(fill(t.people.counter, { index: 1, total: person.photos.length }))}</p>
              <button
                class="gallery__step"
                type="button"
                data-gallery-next
                aria-label="${e(fill(t.people.next, { name: person.name }))}"
              >
                <svg viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
                  <path d="M6 2l6 6-6 6" fill="none" stroke="currentColor" stroke-width="1.5" />
                </svg>
              </button>
            </div>
          </div>`;
}

function person(p, t) {
  const links = p.links
    .map(
      (link) =>
        `<a href="${e(link.href)}" rel="noopener noreferrer" aria-label="${e(link.aria)}">${e(link.label)}</a>`,
    )
    .join("\n                ");

  return `<li class="card person">
          ${gallery(p, t)}
          <div class="person__body">
            <h3 class="person__name">${e(p.name)}</h3>
            <p class="person__role">${e(p.role)}</p>
            <p class="person__bio">${e(p.bio)}</p>
          </div>
          <p class="person__links">
                ${links}
          </p>
        </li>`;
}

function product(item, endorsement) {
  const paragraphs = item.paragraphs.map((text) => `<p>${e(text)}</p>`).join("\n                ");

  return `<li class="card product product--${e(item.id)}">
          <div class="product__head">
            <img class="product__mark" src="/brand/${e(item.id)}/symbol.svg" width="32" height="32" alt="" />
            <h3 class="product__name">${e(item.name)}</h3>
          </div>
          <hr class="product__rule" />
          <p class="product__lede">${e(item.lede)}</p>
          <div class="product__body">
                ${paragraphs}
          </div>
          <p class="product__meta">
            <span class="badge"><span class="badge__glyph" aria-hidden="true">◆</span>${e(item.stack)}</span>
            <span class="badge"><span class="badge__glyph" aria-hidden="true">▸</span>${e(item.state)}</span>
          </p>
          <p class="product__endorsement">${e(endorsement)}</p>
        </li>`;
}

function crewCard(member) {
  return `<li class="card card--quiet crew__card">
            <img
              class="crew__photo"
              src="/crew/${e(member.id)}.jpg"
              width="96"
              height="96"
              loading="lazy"
              decoding="async"
              alt="${e(member.alt)}"
            />
            <p class="crew__name">${e(member.name)}</p>
            <p class="crew__role">${e(member.role)}</p>
          </li>`;
}

export function render(t, all) {
  const here = t.dir;
  const alternates = all
    .map((other) => `<link rel="alternate" hreflang="${other.htmlLang}" href="${absolute(other.dir)}" />`)
    .join("\n    ");

  const languages = all
    .map((other) => {
      const current = other.locale === t.locale;
      return `<a
            class="lang__option"
            href="${hrefTo(here, other.dir)}"
            hreflang="${other.htmlLang}"
            lang="${other.htmlLang}"
            ${current ? 'aria-current="true"' : ""}
          >${e(other.short)}<span class="visually-hidden"> — ${e(other.name)}</span></a>`;
    })
    .join("\n          ");

  return `<!doctype html>
<html lang="${t.htmlLang}">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />

    <title>${e(t.meta.title)}</title>
    <meta name="description" content="${e(t.meta.description)}" />
    <link rel="canonical" href="${absolute(here)}" />
    ${alternates}
    <link rel="alternate" hreflang="x-default" href="${SITE_URL}" />

    <meta property="og:type" content="website" />
    <meta property="og:site_name" content="Tessarion Labs" />
    <meta property="og:locale" content="${t.htmlLang.replace("-", "_")}" />
    <meta property="og:title" content="${e(t.meta.title)}" />
    <meta property="og:description" content="${e(t.meta.social)}" />
    <meta property="og:url" content="${absolute(here)}" />
    <meta property="og:image" content="${SITE_URL}brand/share-${t.locale}.png" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:image:alt" content="${e(t.meta.imageAlt)}" />
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${e(t.meta.title)}" />
    <meta name="twitter:description" content="${e(t.meta.social)}" />
    <meta name="twitter:image" content="${SITE_URL}brand/share-${t.locale}.png" />

    <meta name="theme-color" content="#F6F5F2" media="(prefers-color-scheme: light)" />
    <meta name="theme-color" content="#0C0D0F" media="(prefers-color-scheme: dark)" />
    <link rel="icon" href="/brand/logo/favicon.svg" type="image/svg+xml" />

    <link rel="preload" href="/fonts/inter-tight-latin-600-normal.woff2" as="font" type="font/woff2" crossorigin />
    <link rel="preload" href="/fonts/inter-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin />

    <!-- Applies a stored theme before first paint. Inline and blocking on
         purpose: an external module would load after first paint and the page
         would flash the wrong theme. This is the only inline script here. -->
    <script>
      try {
        var stored = localStorage.getItem("tl-theme");
        if (stored === "light" || stored === "dark") {
          document.documentElement.dataset.theme = stored;
        }
      } catch (error) {
        /* Storage is unavailable. The system preference still applies. */
      }
    </script>

    <script type="module" src="/src/main.ts"></script>
  </head>

  <body id="top">
    <a class="skip-link visually-hidden" href="#main">${e(t.nav.skip)}</a>

    <header class="header">
      <div class="shell header__inner">
        <a class="header__brand" href="#top" aria-label="${e(t.nav.backToTop)}">
          ${lockup(MARK_BANDS_LIGHT, "#101114", { hidden: false })}
          ${lockup(MARK_BANDS_DARK, "#F6F5F2", { hidden: true })}
        </a>

        <nav class="header__nav" aria-label="${e(t.nav.sections)}">
          <a href="#about">${e(t.nav.about)}</a>
          <a href="#people">${e(t.nav.people)}</a>
          <a href="#products">${e(t.nav.products)}</a>
          <a href="#contact">${e(t.nav.contact)}</a>
        </nav>

        <nav class="lang" aria-label="${e(t.language.label)}">
          ${languages}
        </nav>

        <!-- Both icons are in the DOM and CSS shows the one matching the resolved
             theme, so the right glyph is on the first painted frame and follows a
             live OS change with no JavaScript. main.ts reads the labels below. -->
        <button
          class="theme-toggle"
          id="theme-toggle"
          type="button"
          data-to-light="${e(t.theme.toLight)}"
          data-to-dark="${e(t.theme.toDark)}"
          hidden
        >
          <svg class="theme-toggle__icon theme-toggle__icon--light" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <circle cx="8" cy="8" r="3" fill="none" stroke="currentColor" stroke-width="1.5" />
            <g stroke="currentColor" stroke-width="1.5">
              <path d="M13 8H14.8" />
              <path d="M1.2 8H3" />
              <path d="M8 13V14.8" />
              <path d="M8 1.2V3" />
              <path d="M11.54 11.54L12.81 12.81" />
              <path d="M3.19 3.19L4.46 4.46" />
              <path d="M4.46 11.54L3.19 12.81" />
              <path d="M12.81 3.19L11.54 4.46" />
            </g>
          </svg>
          <svg class="theme-toggle__icon theme-toggle__icon--dark" viewBox="0 0 16 16" width="16" height="16" aria-hidden="true" focusable="false">
            <path d="M6.5 2.2a5.8 5.8 0 1 0 7.3 7.3A6.2 6.2 0 0 1 6.5 2.2z" fill="currentColor" />
          </svg>
        </button>
      </div>
    </header>

    <main id="main" tabindex="-1">
      <section class="section hero" aria-labelledby="hero-title">
        <div class="shell">
          <p class="eyebrow hero__eyebrow">${e(t.hero.eyebrow)}</p>
          <h1 id="hero-title">${e(t.hero.title)}</h1>
          <p class="lead">${e(t.hero.lead)}</p>
          <div class="cluster hero__actions">
            <a class="button button--primary" href="#contact">${e(t.hero.primary)}</a>
            <a class="button button--secondary" href="#products">${e(t.hero.secondary)}</a>
          </div>
        </div>
      </section>

      <section class="section" id="about" tabindex="-1" aria-labelledby="about-title">
        <div class="shell">
          <div class="section__head">
            <h2 id="about-title">${e(t.about.title)}</h2>
          </div>
          <div class="prose">
            ${t.about.paragraphs.map((p) => `<p>${e(p)}</p>`).join("\n            ")}
          </div>
          <p class="callout about__callout">${e(t.about.callout)}</p>
          <ul class="facts">
            ${t.about.facts.map((f) => `<li>${e(f)}</li>`).join("\n            ")}
          </ul>
        </div>
      </section>

      <section class="section" id="people" tabindex="-1" aria-labelledby="people-title">
        <div class="shell">
          <div class="section__head">
            <h2 id="people-title">${e(t.people.title)}</h2>
          </div>
          <ul class="grid-2">
            ${t.people.members.map((p) => person(p, t)).join("\n            ")}
          </ul>
        </div>
      </section>

      <section class="section" id="products" tabindex="-1" aria-labelledby="products-title">
        <div class="shell">
          <div class="section__head">
            <h2 id="products-title">${e(t.products.title)}</h2>
          </div>
          <ul class="grid-2">
            ${t.products.items.map((item) => product(item, t.products.endorsement)).join("\n            ")}
          </ul>
        </div>
      </section>

      <section class="section" id="crew" tabindex="-1" aria-labelledby="crew-title">
        <div class="shell">
          <div class="section__head">
            <h2 id="crew-title">${e(t.crew.title)}</h2>
            <p class="lead">${e(t.crew.lead)}</p>
          </div>
          <ul class="grid-3">
            ${t.crew.members.map(crewCard).join("\n            ")}
          </ul>
        </div>
      </section>

      <section class="section" id="contact" tabindex="-1" aria-labelledby="contact-title">
        <div class="shell">
          <div class="section__head">
            <h2 id="contact-title">${e(t.contact.title)}</h2>
            <p class="lead">${e(t.contact.lead)}</p>
          </div>
          <p class="contact__action">
            <a class="button button--secondary" href="mailto:${e(t.contact.email)}">${e(t.contact.email)}</a>
          </p>
        </div>
      </section>
    </main>

    <footer class="footer">
      <div class="shell footer__inner">
        <img class="mark mark--light" src="/brand/logo/lockup-horizontal.svg" width="190" height="32" alt="Tessarion Labs" />
        <img class="mark mark--dark" src="/brand/logo/lockup-horizontal-inverted.svg" width="190" height="32" alt="" aria-hidden="true" />
        <p class="footer__meta">
          <span>${e(t.footer.location)}</span>
          <a href="mailto:${e(t.contact.email)}">${e(t.contact.email)}</a>
          <a href="https://github.com/rogerpoliver" rel="noopener noreferrer">${e(t.footer.github)}</a>
          <span>© <span id="year">2026</span> ${e(t.footer.copyright)}</span>
        </p>
      </div>
    </footer>
  </body>
</html>
`;
}
