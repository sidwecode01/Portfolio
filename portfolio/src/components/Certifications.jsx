import { FaCertificate, FaExternalLinkAlt } from "react-icons/fa";
import { useCertifications } from "../hooks/useCertifications";

export default function Certifications() {
  const { certifications, loading } = useCertifications();

  // Section masquee tant qu'aucune certification n'est enregistree.
  if (loading || certifications.length === 0) return null;

  return (
    <div className="mb-20">
      <div className="flex flex-col text-center w-full mb-12">
        <h1 data-aos="fade-up" data-aos-delay="200" className="sm:text-3xl text-3xl font-bold">
          Certifications
        </h1>
        <p data-aos="fade-up" data-aos-delay="300" className="lg:w-2/3 mx-auto leading-relaxed text-base">
          Les certifications qui attestent de mes competences.
        </p>
      </div>

      <div data-aos="fade-up" data-aos-delay="400" className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {certifications.map((c) => (
          <div
            key={c.id}
            className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)]"
          >
            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50"></div>
            <div className="relative flex items-start gap-4">
              <div className="h-12 w-12 shrink-0 rounded-2xl bg-blue-950 text-white flex items-center justify-center shadow-md overflow-hidden">
                {c.image ? (
                  <img src={c.image} alt="" className="h-full w-full object-cover" />
                ) : (
                  <FaCertificate className="text-xl" />
                )}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="font-semibold text-lg text-gray-900">{c.name}</h2>
                  {c.year && (
                    <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-950 text-white">
                      {c.year}
                    </span>
                  )}
                </div>
                {c.issuer && <p className="leading-relaxed text-gray-600">{c.issuer}</p>}
                {c.credentialUrl && (
                  <a
                    href={c.credentialUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-2 text-sm font-medium text-blue-700 hover:text-blue-900"
                  >
                    <FaExternalLinkAlt className="w-3 h-3" /> Verifier
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
