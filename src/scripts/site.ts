/* ============================================================
   Interacciones del sitio (vanilla, sin framework).
   - Reveal por scroll (IntersectionObserver)
   - Estado de nav al hacer scroll
   - Toggle del menú mobile
   - Parallax sutil
   Todo respeta prefers-reduced-motion y se re-inicializa en cada
   navegación de Astro (evento astro:page-load).
   ============================================================ */

const reduceMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* ---------- Reveal por scroll ---------- */
let revealObserver: IntersectionObserver | null = null;

function initReveals() {
  const els = document.querySelectorAll<HTMLElement>(".reveal:not(.in-view)");
  if (reduceMotion()) {
    els.forEach((el) => el.classList.add("in-view"));
    return;
  }
  if (!revealObserver) {
    revealObserver = new IntersectionObserver(
      (entries, obs) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view");
            obs.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
  }
  els.forEach((el) => revealObserver!.observe(el));
}

/* ---------- Nav: estado al hacer scroll ---------- */
function onScrollNav() {
  const nav = document.getElementById("site-nav");
  if (!nav) return;
  nav.classList.toggle("is-scrolled", window.scrollY > 12);
}

/* ---------- Nav: marcar la sección activa ----------
   El nav se persiste entre páginas (transition:persist), así que el estado
   activo hay que recalcularlo por JS en cada navegación. */
function updateActiveNav() {
  // Los href renderizados ya incluyen el base (ej. /play-egresados/servicios/).
  const base = import.meta.env.BASE_URL;
  const path = window.location.pathname;
  const isActive = (href: string) =>
    href === base ? path === base : path.startsWith(href);
  document
    .querySelectorAll<HTMLAnchorElement>(".nav__link, .mobile-menu__link")
    .forEach((a) => {
      const href = a.getAttribute("href") || "";
      const active = isActive(href);
      a.classList.toggle("is-active", active);
      if (active) a.setAttribute("aria-current", "page");
      else a.removeAttribute("aria-current");
    });
}

/* ---------- Menú mobile ---------- */
function bindMenu() {
  const toggle = document.getElementById("nav-toggle");
  const menu = document.getElementById("mobile-menu");
  if (!toggle || !menu || toggle.dataset.bound) return;
  toggle.dataset.bound = "1";

  const setOpen = (open: boolean) => {
    menu.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", String(open));
    toggle.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
  };

  toggle.addEventListener("click", () => {
    setOpen(!menu.classList.contains("is-open"));
  });
  // Cerrar al tocar un link o presionar Escape
  menu.querySelectorAll("a").forEach((a) =>
    a.addEventListener("click", () => setOpen(false)),
  );
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menu.classList.contains("is-open")) setOpen(false);
  });
}

function closeMenu() {
  const menu = document.getElementById("mobile-menu");
  const toggle = document.getElementById("nav-toggle");
  menu?.classList.remove("is-open");
  toggle?.setAttribute("aria-expanded", "false");
}

/* ---------- Parallax sutil ---------- */
let parallaxEls: HTMLElement[] = [];
let ticking = false;

function updateParallax() {
  const vh = window.innerHeight;
  for (const el of parallaxEls) {
    const speed = parseFloat(el.dataset.parallax || "0.15");
    const rect = el.getBoundingClientRect();
    const offset = (rect.top + rect.height / 2 - vh / 2) * -speed;
    el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0)`;
  }
  ticking = false;
}

function onScrollParallax() {
  if (reduceMotion() || parallaxEls.length === 0) return;
  if (!ticking) {
    ticking = true;
    requestAnimationFrame(updateParallax);
  }
}

function initParallax() {
  parallaxEls = Array.from(
    document.querySelectorAll<HTMLElement>("[data-parallax]"),
  );
  if (!reduceMotion() && parallaxEls.length) updateParallax();
}

/* ---------- Formulario de contacto → WhatsApp ---------- */
function bindContactForm() {
  const form = document.getElementById("contact-form") as HTMLFormElement | null;
  if (!form || form.dataset.bound) return;
  form.dataset.bound = "1";

  const validate = (field: string): boolean => {
    const input = form.elements.namedItem(field) as HTMLInputElement | null;
    if (!input) return true;
    const wrap = input.closest(".field");
    const ok = input.value.trim().length > 0;
    wrap?.classList.toggle("has-error", !ok);
    return ok;
  };

  // Validación al salir del campo (blur), no en cada tecla
  ["nombre", "colegio"].forEach((f) => {
    const input = form.elements.namedItem(f) as HTMLInputElement | null;
    input?.addEventListener("blur", () => validate(f));
    input?.addEventListener("input", () => {
      if (input.closest(".field")?.classList.contains("has-error")) validate(f);
    });
  });

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const okNombre = validate("nombre");
    const okColegio = validate("colegio");
    if (!okNombre || !okColegio) {
      const firstBad = form.querySelector<HTMLElement>(".field.has-error input");
      firstBad?.focus();
      return;
    }
    const data = new FormData(form);
    const nombre = String(data.get("nombre") || "").trim();
    const colegio = String(data.get("colegio") || "").trim();
    const mensaje = String(data.get("mensaje") || "").trim();
    const numero = form.dataset.wa || "";

    const texto =
      `¡Hola PLAY! Soy ${nombre} (${colegio}).` +
      (mensaje ? ` ${mensaje}` : " Quiero pedir un presupuesto para mi curso.");
    const url = `https://wa.me/${numero}?text=${encodeURIComponent(texto)}`;
    window.open(url, "_blank", "noopener");

    // Confirmación en la página + link de respaldo (por si el popup se bloquea)
    const success = document.getElementById("form-success");
    const link = document.getElementById(
      "form-success-link",
    ) as HTMLAnchorElement | null;
    if (link) link.href = url;
    if (success) {
      success.hidden = false;
      success.scrollIntoView({ block: "nearest", behavior: "smooth" });
    }
  });
}

/* ---------- Carousel (DJs) ---------- */
function bindCarousels() {
  document
    .querySelectorAll<HTMLElement>("[data-carousel]")
    .forEach((carousel) => {
      if (carousel.dataset.bound) return;
      carousel.dataset.bound = "1";
      const track = carousel.querySelector<HTMLElement>(
        "[data-carousel-track]",
      );
      const prev = carousel.querySelector<HTMLButtonElement>(
        "[data-carousel-prev]",
      );
      const next = carousel.querySelector<HTMLButtonElement>(
        "[data-carousel-next]",
      );
      if (!track) return;

      const step = () => {
        const slide = track.querySelector<HTMLElement>(":scope > *");
        const gap = parseFloat(getComputedStyle(track).columnGap || "16") || 16;
        return slide ? slide.offsetWidth + gap : track.clientWidth * 0.8;
      };
      const updateButtons = () => {
        const max = track.scrollWidth - track.clientWidth - 2;
        if (prev) prev.disabled = track.scrollLeft <= 2;
        if (next) next.disabled = track.scrollLeft >= max;
      };

      prev?.addEventListener("click", () =>
        track.scrollBy({ left: -step(), behavior: "smooth" }),
      );
      next?.addEventListener("click", () =>
        track.scrollBy({ left: step(), behavior: "smooth" }),
      );
      track.addEventListener("scroll", updateButtons, { passive: true });
      window.addEventListener("resize", updateButtons, { passive: true });
      updateButtons();
    });
}

/* ---------- Init global (se ejecuta en cada carga/navegación) ---------- */
function init() {
  initReveals();
  bindMenu();
  bindContactForm();
  bindCarousels();
  updateActiveNav();
  closeMenu();
  onScrollNav();
  initParallax();
}

// Listeners globales (una sola vez)
window.addEventListener("scroll", onScrollNav, { passive: true });
window.addEventListener("scroll", onScrollParallax, { passive: true });
window.addEventListener("resize", initParallax, { passive: true });

// Astro dispara este evento en la carga inicial y tras cada View Transition
document.addEventListener("astro:page-load", init);
