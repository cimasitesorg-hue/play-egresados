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
}

export const eventos: Evento[] = [
  {
    slug: "previa",
    nombre: "Previa",
    descripcion:
      "El arranque del recorrido. Salón, party bus y toda la producción PLAY para que la previa sea inolvidable.",
  },
  {
    slug: "upd",
    nombre: "UPD",
    sigla: "Último Primer Día",
    descripcion:
      "Producimos tu UPD 2026 de punta a punta: llegada, ambientación de boliche y fiesta con DJs exclusivos.",
  },
  {
    slug: "uvi",
    nombre: "UVI",
    sigla: "Últimas Vacaciones de Invierno",
    descripcion:
      "Las Últimas Vacaciones de Invierno del curso, con la misma producción, logística y seguridad de PLAY.",
  },
  {
    slug: "uss",
    nombre: "USS",
    sigla: "Última Semana Santa",
    descripcion:
      "La Última Semana Santa juntos, con salón equipado, barra libre y toda la animación de PLAY.",
  },
  {
    slug: "prefiesta",
    nombre: "Prefiesta",
    descripcion:
      "Prefiesta de egresados pensada también para recaudar fondos del curso, con toda la energía PLAY.",
  },
];
