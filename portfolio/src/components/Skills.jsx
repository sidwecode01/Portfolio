import CV_Resume from "../assets/CV_Resume.pdf"
import image1 from "../assets/image.png"
import image2 from "../assets/me.png"
import image3 from "../assets/meUpdate.png"



export default function Skills() {


    const skills = [
        {
            category: "Front-end",
            technologies: ["HTML", "CSS", "Tailwind CSS", "React", "Vue.js", "Next.js"]
        },
        {
            category: "Back-end",
            technologies: ["Laravel", "NestJS", "Flask", "Python"]
        },
        {
            category: "Design & Prototypage",
            technologies: ["Figma"]
        },
        {
            category: "Outils de développement",
            technologies: ["Git", "GitHub", "VS Code"]
        },
        {
            category: "Méthodologies",
            technologies: ["Agile / Scrum", "Trello"]
        },
        {
            category: "Langues",
            technologies: ["Français (natif)", "Anglais (intermédiaire et technique)"]
        }
    ];


    return (
        <div>
            <main id="skills" className="py-6 py-4 sm:p-6 md:py-10 md:py-8">
                <div className="max-w-4xl mx-auto grid grid-cols-1 lg:max-w-5xl lg:gap-x-20 lg:grid-cols-2">
                    <div data-aos="fade-up" data-aos-delay="300" className="relation p-3 col-start-1 flex flex-col-reverse rounded-lg bg-gradient-to-t">
                        <h1 className="mt-l text-lg font-semibold text-white sm:text-slate-900 md:text-3xl">FULLSTACK DEVELOPPER</h1>
                        <p className="text-lg leading-4 font-semibold  text-white sm:text-slate-500 md:text-blue-900">Skills</p>

                    </div>
                    <div data-aos="fade-up" data-aos-delay="300" className="grid gap-4 cols-start-1 col-end-3 row-start-1 sm:mb-6 sm:grid-cols-4 lg:gap-6 lg:cols-start-2 lg:row-end-6 lg:row-span-6 lg:mb-0">
                        <img src={image1} alt="" className="w-full h-60 object-cover rounded-lg sm:h-52 sm:col-span-2 lg:col-span-full" loading="lazy" />
                        <img src={image2} alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:row-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
                        <img src={image3} alt="" className="hidden w-full h-52 object-cover rounded-lg sm:block sm:col-span-2 md:col-span-1 lg:rw-start-2 lg:col-span-2 lg:h-32" loading="lazy" />
                    </div>
                    <div className="mt-4 md:col-start-1 md:row-start-3 self-center lg:mt-2 lg:col-start-1 lg:rox-start-3 lg:row-end-4">
                        <a href={CV_Resume} download>
                            <button data-aos="fade-up" data-aos-delay="300" type="button" className="text-white bg-blue-950 hover:bg-blue-700 focus:outline-none focus:ring-4 focus:ring-blue-700 font-semibold rounded-full text-xs sm:text-sm px-4 py-4 py-2 text-center">
                                Download CV
                            </button>
                        </a>
                    </div>
                    <div
                        data-aos="fade-up"
                        data-aos-delay="600"
                        className="mt-4 text-sm leading-6 col-start-1 sm:col-span-2 lg:mt-6 lg:row-start-4 text-blue-950 lg:col-span-1"
                    >
                        <p className="mb-4 text-lg">
                            Voici les technologies et outils que je maîtrise et que j’utilise pour concevoir des solutions performantes et évolutives :
                        </p>

                        <ul className="space-y-2">
                            {skills.map((skill, index) => (
                                <li key={index} className="text-lg">
                                    <strong>{skill.category} : </strong>
                                    {skill.technologies.map((tech, index) => (
                                        <span key={index}>
                                            {tech}
                                            {index < skill.technologies.length - 1 && ", "}
                                        </span>
                                    ))}
                                </li>
                            ))}
                        </ul>
                    </div>


                </div>

            </main>
        </div>
    )
}