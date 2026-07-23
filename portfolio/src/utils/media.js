// Image de secours (SVG inline) affichee quand un projet n'a pas de
// couverture ou que l'URL est cassee. Pas de requete reseau.
export const PLACEHOLDER_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="300" viewBox="0 0 400 300">
      <rect width="400" height="300" fill="#1e293b"/>
      <path d="M150 190l30-40 25 30 20-25 25 35z" fill="#334155"/>
      <circle cx="160" cy="120" r="18" fill="#334155"/>
      <text x="200" y="250" font-family="sans-serif" font-size="16" fill="#64748b" text-anchor="middle">Pas d'image</text>
    </svg>`
  );

// Renvoie une image valide, ou le placeholder si vide.
export function withPlaceholder(src) {
  return src && src.trim() ? src : PLACEHOLDER_IMAGE;
}

// Handler onError a poser sur les <img> pour basculer sur le placeholder.
export function onImageError(e) {
  if (e.currentTarget.src !== PLACEHOLDER_IMAGE) {
    e.currentTarget.src = PLACEHOLDER_IMAGE;
  }
}

// Detecte un lien video YouTube / Vimeo et renvoie une URL d'embed.
export function getVideoEmbed(url) {
  if (!url) return null;
  const yt = url.match(
    /(?:youtube\.com\/(?:watch\?v=|embed\/|shorts\/)|youtu\.be\/)([\w-]{11})/
  );
  if (yt) return `https://www.youtube.com/embed/${yt[1]}`;
  const vimeo = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  if (vimeo) return `https://player.vimeo.com/video/${vimeo[1]}`;
  return null; // lien direct .mp4 gere par la balise <video>
}

// Determine le type d'un media si non precise.
export function guessMediaType(url) {
  if (!url) return "link";
  if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(url) || getVideoEmbed(url)) return "video";
  if (/\.(png|jpe?g|gif|webp|avif|svg)(\?.*)?$/i.test(url)) return "image";
  return "link";
}
