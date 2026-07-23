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
