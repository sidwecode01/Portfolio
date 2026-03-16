import { FaGraduationCap, FaSchool, FaUniversity, FaBriefcase } from "react-icons/fa";

export default function Experience() {
    const formations = [
        { title: "Licence 3", period: "2025-2026", place: "Universite Virtuelle de Cote d'Ivoire", Icon: FaUniversity },
        { title: "Licence 2", period: "2024-2025", place: "Universite Virtuelle de Cote d'Ivoire", Icon: FaUniversity },
        { title: "Licence 1", period: "2023-2024", place: "Universite Virtuelle de Cote d'Ivoire", Icon: FaUniversity },
        { title: "Formation WECODE (6 mois)", period: "Delivree par Epitech", place: "WECODE", Icon: FaGraduationCap },
        { title: "BAC obtenu", period: "2023", place: "Lycee Moderne 2 de Bondoukou", Icon: FaGraduationCap },
        { title: "BEPC obtenu", period: "2020", place: "Ecole MAMPO - Bondoukou", Icon: FaSchool },
    ];

    return (
        <section id="experience" className="text-gray-600">
            <div className="container px-5 py-10 m-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 data-aos="fade-up" data-aos-delay="200" className="sm:text-3xl text-3xl font-bold">Formation</h1>
                    <p data-aos="fade-up" data-aos-delay="300" className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Mon parcours academique et professionnel recent.
                    </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="400" className="grid gap-6 md:grid-cols-2 mb-20">
                    {formations.map(({ title, period, place, Icon }) => (
                        <div key={`${title}-${period}`} className="group relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.5)] transition-all hover:-translate-y-1 hover:shadow-[0_30px_80px_-40px_rgba(15,23,42,0.7)]">
                            <div className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-blue-50"></div>
                            <div className="relative flex items-start gap-4">
                                <div className="h-12 w-12 rounded-2xl bg-blue-950 text-white flex items-center justify-center shadow-md">
                                    <Icon className="text-xl" />
                                </div>
                                <div className="flex-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h2 className="font-semibold text-lg text-gray-900">{title}</h2>
                                        <span className="text-xs font-semibold px-2 py-1 rounded-full bg-blue-950 text-white">{period}</span>
                                    </div>
                                    <p className="leading-relaxed text-gray-600">{place}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="flex flex-col text-center w-full mb-20">
                    <h1 data-aos="fade-up" data-aos-delay="300" className="sm:text-3xl text-3xl font-bold">Experience</h1>
                    <p data-aos="fade-up" data-aos-delay="400" className="lg:w-2/3 mx-auto leading-relaxed text-base">
                        Mon expérience repose sur la réalisation de projets concrets, chacun visant à résoudre un besoin spécifique ou à reproduire une application existante. J’ai conçu des interfaces mobiles et web, manipulé des APIs externes (TMDB, Stripe, Firebase), et intégré des fonctionnalités comme le drag & drop, la gestion de panier, ou la réservation en ligne. Ces projets m’ont permis de développer rigueur, autonomie et sens du détail.                    </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="500" className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_16px_50px_-36px_rgba(15,23,42,0.6)]">
                        <h2 className="font-semibold text-3xl text-gray-900">+6 mois</h2>
                        <p className="leading-relaxed text-gray-600">Experience</p>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_16px_50px_-36px_rgba(15,23,42,0.6)]">
                        <h2 className="font-semibold text-3xl text-gray-900">+15</h2>
                        <p className="leading-relaxed text-gray-600">Projets concrets</p>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-white p-5 shadow-[0_16px_50px_-36px_rgba(15,23,42,0.6)]">
                        <h2 className="font-semibold text-3xl text-gray-900">+3</h2>
                        <p className="leading-relaxed text-gray-600">Langages</p>
                    </div>
                    <div className="rounded-2xl border border-blue-100 bg-blue-950 p-5 shadow-[0_16px_50px_-36px_rgba(15,23,42,0.8)] text-white">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-xl bg-white/15 flex items-center justify-center">
                                <FaBriefcase className="text-white" />
                            </div>
                            <div>
                                <h2 className="font-semibold text-lg">Stage en cours</h2>
                                <p className="text-sm text-white/80">MPL BUSINESS</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <div>


            </div>
        </section>
    )
}
