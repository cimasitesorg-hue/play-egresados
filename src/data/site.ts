/* ============================================================
   Datos globales del sitio (contacto, links, zonas).
   Editá acá el WhatsApp, Instagram y textos institucionales.
   ============================================================ */

export const site = {
  name: "PLAY Egresados",
  legalName: "PLAY Egresados",
  // Mensaje precargado del WhatsApp (URL-encoded al usarse)
  whatsappNumber: "5491153831911",
  whatsappText:
    "¡Hola PLAY! Quiero recibir información y presupuesto para la previa / UPD de mi curso.",
  instagram: "https://instagram.com/playegresados_",
  instagramHandle: "@playegresados_",
  email: "", // opcional, si lo agregan más adelante
  claim: "La producción que hace de la previa un momento único.",
  descripcion:
    "Somos PLAY Egresados, productora argentina de eventos para egresados en CABA. Producimos cada etapa del recorrido —previas, UPD, UVI, USS y prefiesta— con salón, party bus, seguridad, barra libre y servicio médico incluidos.",
};

// Link a WhatsApp ya armado
export const waLink = `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(
  site.whatsappText,
)}`;

// Zonas donde opera PLAY (SEO local CABA / zona oeste)
export const zonas = [
  "Flores",
  "Caballito",
  "Villa Pueyrredón",
  "Devoto",
  "Mataderos",
];

// Navegación principal
export const navLinks = [
  { href: "/", label: "Inicio" },
  { href: "/servicios/", label: "Servicios" },
  { href: "/djs/", label: "DJs" },
  { href: "/contacto/", label: "Contacto" },
];
