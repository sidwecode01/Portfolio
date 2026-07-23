import { getVideoEmbed, withPlaceholder, onImageError } from "../utils/media";
import { FaExternalLinkAlt } from "react-icons/fa";

// Affiche un media (image, video ou lien) dans la galerie du projet.
function MediaItem({ item, index, title }) {
  const { type, url, label } = item;

  if (type === "video") {
    const embed = getVideoEmbed(url);
    return (
      <div className="rounded-2xl overflow-hidden border border-gray-100 bg-black aspect-video">
        {embed ? (
          <iframe
            src={embed}
            title={label || `${title} video ${index + 1}`}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <video src={url} controls className="w-full h-full object-cover">
            <track kind="captions" />
          </video>
        )}
      </div>
    );
  }

  if (type === "link") {
    return (
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center gap-2 rounded-2xl border border-gray-200 bg-white p-6 h-full min-h-40 text-blue-950 font-medium hover:bg-blue-50 transition"
      >
        <FaExternalLinkAlt className="w-4 h-4" />
        {label || "Voir le lien"}
      </a>
    );
  }

  // image par defaut
  return (
    <div className="rounded-2xl overflow-hidden border border-gray-100">
      <img
        src={withPlaceholder(url)}
        onError={onImageError}
        alt={label || `${title} ${index + 1}`}
        loading="lazy"
        decoding="async"
        className="w-full h-56 object-cover"
      />
    </div>
  );
}

export default function MediaGallery({ media = [], title }) {
  if (!media.length) return null;
  return (
    <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {media.map((item, index) => (
        <MediaItem key={index} item={item} index={index} title={title} />
      ))}
    </div>
  );
}
