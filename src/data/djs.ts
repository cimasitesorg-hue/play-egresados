/* ============================================================
   DJs exclusivos de PLAY Egresados.
   Reemplazá `foto` por la foto real de cada DJ cuando la tengas
   (poné el archivo en /public/img/djs/ y actualizá la ruta).
   ============================================================ */

export interface Dj {
  nombre: string;
  slug: string;
  /* Foto principal (idealmente tocando). Reemplazar por la foto real. */
  foto: string;
  rol: string;
  instagram?: string;
}

export const djs: Dj[] = [
  {
    nombre: "Nicolas Emmanuel",
    slug: "nicolas-emmanuel",
    foto: "/img/djs/nicolas-emmanuel.webp",
    rol: "DJ residente",
    instagram: "https://www.instagram.com/nicolasemanuel_dj/",
  },
  {
    nombre: "Jere Ginés",
    slug: "jere-gines",
    foto: "/img/djs/jere-gines.webp",
    rol: "DJ residente",
    instagram: "https://www.instagram.com/jeregines/",
  },
  {
    nombre: "Laucha Pedraza",
    slug: "laucha-pedraza",
    foto: "/img/djs/laucha-pedraza.webp",
    rol: "DJ residente",
  },
  {
    nombre: "Juani Perotti",
    slug: "juani-perotti",
    foto: "/img/djs/juani-perotti.webp",
    rol: "DJ residente",
    instagram: "https://www.instagram.com/juan.iperotti/",
  },
];
