/* ============================================================
   Servicios que incluye la producción PLAY.
   Contenido tomado del catálogo oficial (presupuesto PLAY).
   `icon` referencia una clave del componente Icon.astro.
   ============================================================ */

export interface Servicio {
  id: string;
  icon: string;
  titulo: string;
  resumen: string;
  detalle: string[];
  destacado?: boolean; // resalta las cards de mayor peso institucional
  bg?: string; // foto real de fondo (opcional) para el acordeón
}

export const servicios: Servicio[] = [
  {
    id: "salon",
    icon: "salon",
    titulo: "Salón equipado",
    resumen: "Los mejores salones, exclusivos para nuestros egresados.",
    detalle: [
      "Pista de baile y pantallas LED.",
      "Iluminación y sonido ambientados como boliche.",
      "Salones exclusivos en distintos barrios de Capital Federal.",
      "Limpieza incluida durante y después del evento.",
    ],
    destacado: true,
  },
  {
    id: "party-bus",
    icon: "bus",
    titulo: "Party Bus",
    resumen:
      "El traslado ya es parte de la fiesta: DJ en vivo y clima de boliche arriba del bus.",
    detalle: [
      "DJ en vivo.",
      "Máquina de humo.",
      "Asistente animador.",
      "Iluminación y sonido ambientados como boliche.",
    ],
    destacado: true,
  },
  {
    id: "barra",
    icon: "barra",
    titulo: "Barra libre + barmans profesionales",
    resumen:
      "Barra libre atendida por barmans profesionales durante todo el evento.",
    detalle: [
      "Bebidas incluidas: Smirnoff, Fernet Branca, Campari y Champagne marca Mumm (o equivalente).",
      "Diluyentes: Speed, jugo Baggio o equivalente, Coca-Cola, Sprite, etc.",
      "Barmans profesionales a cargo de la barra.",
    ],
    bg: "/img/servicios/barra.webp",
  },
  {
    id: "seguridad",
    icon: "seguridad",
    titulo: "Seguridad en las unidades",
    resumen:
      "Protocolo de seguridad completo en el traslado, pensado para la tranquilidad de las familias.",
    detalle: [
      "Cámaras internas del chofer.",
      "Cámaras internas del coordinador.",
      "Cámaras externas con control de sonido.",
      "Limitador de puertas y apertura.",
      "Ventanillas expulsables.",
      "Chofer profesional.",
      "Equipos VIGIA.",
    ],
    destacado: true,
  },
  {
    id: "fotografia",
    icon: "foto",
    titulo: "Fotografía profesional",
    resumen:
      "Staff de fotógrafos profesionales cubriendo cada momento del evento.",
    detalle: [
      "Staff de fotógrafos profesionales durante todo el evento.",
      "Entrega de las fotos en una carpeta de Google Drive.",
    ],
  },
  {
    id: "lunch",
    icon: "lunch",
    titulo: "Servicio de lunch / pizza libre",
    resumen:
      "Coctelería de pizza, empanadas, hamburguesas y snacks para toda la noche.",
    detalle: [
      "Coctelería de pizza, empanadas, hamburguesas y snacks.",
      "Pizza libre y servicio de lunch.",
      "Opciones dietéticas aptas: veganas, vegetarianas y celíacas.",
    ],
    bg: "/img/servicios/lunch.webp",
  },
  {
    id: "juegos",
    icon: "juegos",
    titulo: "Juegos temáticos con premios",
    resumen: "Juegos temáticos con premios PLAY para prender la fiesta.",
    detalle: [
      "Beer pong, dardos, twister, yengas, entre otros.",
      "Premios PLAY para los ganadores.",
    ],
  },
  {
    id: "medico",
    icon: "medico",
    titulo: "Servicio médico y primeros auxilios",
    resumen:
      "Enfermeros y paramédicos presentes en el salón durante todo el evento.",
    detalle: [
      "Servicio de primeros auxilios en el salón.",
      "Enfermeros y paramédicos presentes durante todo el evento.",
    ],
    destacado: true,
  },
  {
    id: "padres",
    icon: "padres",
    titulo: "Sector para padres VIP",
    resumen:
      "Un espacio pensado para que las familias también vivan la noche con comodidad.",
    detalle: [
      "Sector exclusivo para padres.",
      "Incluye servicio de lunch y bebida.",
    ],
    bg: "/img/servicios/padres.webp",
  },
];

// Beneficios extra del recorrido con PLAY
export const beneficios = [
  "Inscripción al torneo de fútbol 8 sin cargo.",
  "Rifas para recaudar fondos del curso.",
  "Prefiesta de egresados para recaudar fondos.",
  "Descuento en FDE en Non Stop.",
];

// Pasos para contratar
export const pasosContratar = [
  {
    n: 1,
    titulo: "Escribinos",
    texto:
      "Contactanos por WhatsApp contándonos tu colegio, curso y qué etapa querés producir.",
  },
  {
    n: 2,
    titulo: "Elegís tu producción",
    texto:
      "Te enviamos el presupuesto con todo lo que incluye y lo ajustamos a tu curso.",
  },
  {
    n: 3,
    titulo: "Reservás la fecha",
    texto:
      "Coordinás con el gerente comercial la seña o el pago total. Efectivo, Mercado Pago o transferencia.",
  },
];
