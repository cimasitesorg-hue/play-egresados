# PLAY Egresados — Web institucional

Sitio institucional multipágina de **PLAY Egresados**, productora argentina de
eventos para egresados en CABA. Doble objetivo:

1. **Captar contactos** → que el visitante escriba por WhatsApp.
2. **Catálogo para las familias** → mostrar con claridad todo lo que incluye el
   servicio y generar confianza.

> PLAY **no** organiza "la fiesta de egresados" tradicional: **produce** cada
> etapa del recorrido (previa, UPD, UVI, USS, prefiesta). Todos los textos están
> escritos desde ese lugar.

---

## Stack elegido y por qué

| Pieza | Elección | Motivo |
| --- | --- | --- |
| Framework | **Astro 5** (`output: static`) | Genera **HTML estático por página** → mejor SEO local, primer render instantáneo y **casi cero JS** en mobile (el grueso del tráfico viene de Instagram → celular). |
| Estilos | **Tailwind CSS v4** (`@tailwindcss/vite`) + CSS propio con tokens | Utilidades rápidas para layout + un sistema de diseño con variables (`@theme`) para color, tipografía, easing y z-index. |
| Tipografías | **`@fontsource/anton`** (display) + **`@fontsource-variable/manrope`** (texto), self-hosted | Sin request a Google Fonts → más rápido y sin depender de terceros. Pareja por eje de contraste (display grotesca condensada + sans humanista). |
| Animación | **CSS + un script vanilla mínimo** + **Astro View Transitions** | Ver abajo. |
| SEO | `@astrojs/sitemap` + componente `SEO.astro` | Sitemap automático, meta + Open Graph + JSON-LD `LocalBusiness` por página. |

### ¿Por qué no una librería de animación (Motion / GSAP)?

El brief pide animaciones **densas pero a 60fps en celular**. La forma más
confiable de lograrlo es **no** cargar un runtime de animación en JS y apoyarse
en el compositor del navegador:

- **Reveals por scroll**: un único `IntersectionObserver` (`src/scripts/site.ts`)
  agrega la clase `.in-view`; la animación real la hacen transiciones CSS de
  `opacity`/`transform`/`filter` (corren en GPU, fuera del main thread).
- **Curvas de easing propias** (criterio de Emil Kowalski) en
  `src/styles/global.css`: `--ease-out`, `--ease-in-out`, `--ease-drawer`. Nada
  de `ease-in` ni de curvas default débiles.
- **Transiciones de página** suaves con las **View Transitions** nativas de Astro
  (`<ClientRouter />`).
- **Acordeones** con `<details>` nativo (accesible) animado con
  `grid-template-rows` / `interpolate-size` — sin JS.
- **Parallax** sutil con `requestAnimationFrame` y solo `transform`.

Todo respeta **`prefers-reduced-motion`**: con esa preferencia activa, el
contenido se muestra completo sin movimiento. Además, el ocultamiento inicial de
los reveals está detrás de una clase `.js`, así que **sin JavaScript el sitio
nunca queda en blanco**.

Si en el futuro se quiere una animación más compleja (hero interactivo, etc.),
se puede sumar [`motion`](https://motion.dev/) puntualmente sin cambiar el resto.

---

## Cómo levantarlo en local

Requisitos: **Node 18+** (recomendado 20) y npm.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo → http://localhost:4321
npm run build    # build de producción → carpeta dist/
npm run preview  # previsualizar el build
```

---

## Cómo deployar

El sitio es 100% estático (`dist/`), así que va en cualquier hosting estático.

### Opción A — GitHub Pages (incluida)

Ya viene un workflow en `.github/workflows/deploy.yml`:

1. Subí el repo a GitHub.
2. **Settings → Pages → Source: "GitHub Actions"**.
3. Cada push a `main` buildea y publica solo.

**Dominio propio** (ej. `playegresados.com.ar`):

- Creá el archivo `public/CNAME` con una sola línea: `www.playegresados.com.ar`.
- Configurá el DNS del dominio apuntando a GitHub Pages.
- Verificá que `site` en `astro.config.mjs` sea ese mismo dominio (impacta en el
  sitemap y las URLs de Open Graph).

> Si en cambio lo servís en `usuario.github.io/play-egresados` (sin dominio
> propio), agregá `base: "/play-egresados"` en `astro.config.mjs`.

### Opción B — Netlify / Vercel

Importá el repo. Build command: `npm run build`. Publish directory: `dist`.
Detectan Astro automáticamente.

---

## Dónde editar textos e imágenes

**Todo el contenido vive en `src/data/` (no hace falta tocar el diseño):**

| Archivo | Qué edita |
| --- | --- |
| `src/data/site.ts` | WhatsApp, mensaje precargado, Instagram, claim, descripción y zonas de CABA. |
| `src/data/servicios.ts` | Los servicios (título, resumen y detalle), los beneficios y los pasos de "cómo contratar". |
| `src/data/eventos.ts` | Los tipos de evento (previa, UPD, UVI, USS, prefiesta). |
| `src/data/djs.ts` | Los DJs y la ruta de su foto. |

**Número de WhatsApp:** está en `src/data/site.ts` (`whatsappNumber`). Se usa en
todos los botones y en el formulario de contacto.

**Imágenes** (en `public/img/`):

| Imagen | Reemplazar por |
| --- | --- |
| `img/logo-blanco-*.png` / `img/logo-azul-*.png` | Logo oficial (blanco para fondos oscuros, azul para claros). |
| `img/hero/hero-1..3.webp` | Fotos de eventos que rotan de fondo en el hero del inicio. |
| `img/servicios/{barra,lunch,padres}.webp` | Fotos de fondo de esos servicios (se ven al abrir el acordeón). Se enlazan desde el campo `bg` en `src/data/servicios.ts`. |
| `img/placas/*.webp` | Placas de redes (ya no se usan en el hero; quedan por si querés reutilizarlas). |
| `img/djs/*.webp` | **Fotos reales de cada DJ tocando** (hoy hay placeholders). Descargalas del Instagram de cada uno, ponelas acá y actualizá la ruta en `src/data/djs.ts`. |
| `og-image.jpg` | Imagen que se ve al compartir el link (1200×630). |
| `favicon*.png`, `apple-touch-icon.png` | Ícono del sitio. |

> Las imágenes se sirven optimizadas (WebP y PNG recortados) y con `loading="lazy"`
> fuera del hero.

---

## Estructura del proyecto

```
play-egresados/
├── public/
│   ├── img/            → logos, placas y fotos de DJs
│   ├── og-image.jpg    → Open Graph
│   ├── favicon*.png    → íconos
│   └── robots.txt
├── src/
│   ├── data/           → CONTENIDO editable (textos, links, servicios, djs)
│   ├── components/     → Nav, Footer, WhatsappFloat, SEO, Icon, Marquee, ServiceAccordion
│   ├── layouts/        → BaseLayout (head, nav, footer, botón flotante, transiciones)
│   ├── pages/          → index, servicios, djs, contacto, 404
│   ├── scripts/        → site.ts (reveals, menú, parallax, formulario→WhatsApp)
│   └── styles/         → global.css (sistema de diseño: color, tipografía, motion)
├── astro.config.mjs
└── .github/workflows/deploy.yml
```

---

## Páginas

- **/** — Home: hero + quiénes somos + tipos de evento + resumen de servicios +
  confianza para familias + zonas de CABA + CTA.
- **/servicios/** — Detalle completo en acordeones + beneficios + cómo contratar.
- **/djs/** — Los DJs exclusivos de PLAY (con placeholders de foto).
- **/contacto/** — Botón grande de WhatsApp, Instagram y formulario que arma el
  mensaje de WhatsApp con los datos del curso.

Botón flotante de WhatsApp fijo en **todas** las páginas.

---

## Identidad de marca

- **Azul de marca** extraído del logo: `~#0B4EA2` (definido en OKLCH en
  `global.css` como `--color-brand`, con un azul eléctrico `--color-brand-bright`
  para CTAs, links y glows).
- **Estética** nocturna / "boliche premium": fondos oscuros profundos, contraste
  fuerte, acentos azul eléctrico.
- **Tono** cercano y argentino (voseo), hablándole tanto a egresados como a
  familias.

Contrastes verificados (WCAG AA): texto atenuado 7.9:1, links de acento 5.3:1,
placeholder 5.0:1 sobre el fondo oscuro.
