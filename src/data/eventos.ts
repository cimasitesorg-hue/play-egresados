/* ============================================================
   Tipos de evento que produce PLAY.
   IMPORTANTE: PLAY NO organiza "la fiesta de egresados" tradicional.
   Produce cada etapa del recorrido de egresados.
   ============================================================ */

export interface Evento {
  slug: string;
  nombre: string;
  sigla?: string;
  descripcion: string;
  /* Neón de wayfinding por evento (OKLCH), inspirado en las placas reales.
     Verificado ≥7.2:1 sobre el fondo oscuro. */
  accent: string;
}

export const eventos: Evento[] = [
  {
    slug: "previa",
    nombre: "Previa",
    descripcion:
      "El arranque del recorrido. Salón, party bus y toda la producción PLAY para que la previa sea inolvidable.",
    accent: "oklch(0.72 0.17 255)", // azul
  },
  {
    slug: "upd",
    nombre: "UPD",
    sigla: "Último Primer Día",
    descripcion:
      "Producimos tu UPD 2026 de punta a punta: llegada, ambientación de boliche y fiesta con DJs exclusivos.",
    accent: "oklch(0.80 0.19 150)", // verde
  },
  {
    slug: "uvi",
    nombre: "UVI",
    sigla: "Últimas Vacaciones de Invierno",
    descripcion:
      "Las Últimas Vacaciones de Invierno del curso, con la misma producción, logística y seguridad de PLAY.",
    accent: "oklch(0.80 0.12 215)", // cian
  },
  {
    slug: "uss",
    nombre: "USS",
    sigla: "Última Semana Santa",
    descripcion:
      "La Última Semana Santa juntos, con salón equipado, barra libre y toda la animación de PLAY.",
    accent: "oklch(0.72 0.20 350)", // magenta
  },
  {
    slug: "prefiesta",
    nombre: "Prefiesta",
    descripcion:
      "Prefiesta de egresados pensada también para recaudar fondos del curso, con toda la energía PLAY.",
    accent: "oklch(0.82 0.15 70)", // ámbar
  },
];
