/* ============================================================
   Prefija rutas internas con el base del sitio (import.meta.env.BASE_URL).
   Necesario cuando el sitio se sirve bajo un subpath (GitHub Pages:
   /play-egresados/). Links externos, mailto, tel y anclas pasan sin tocar.
   ============================================================ */
export function withBase(path: string): string {
  const base = import.meta.env.BASE_URL.replace(/\/$/, ""); // '/play-egresados' o ''
  if (!path) return base + "/";
  if (/^([a-z]+:)?\/\//i.test(path) || /^(mailto:|tel:|#)/i.test(path)) return path;
  const p = path.startsWith("/") ? path : "/" + path;
  return base + p;
}
