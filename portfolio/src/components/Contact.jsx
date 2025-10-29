

export default function Contact() {
    return (
        <section id="contact" className="text-gray-600">
            <div className="container mx-auto flex px-5 py-24 items-center justify-center flex-col">
                <div data-aos="fade-up" data-aos-delay="300" className="text-center lg:w-2/3 w-full" >
                    <h1 className="sm:text-4xl text-3xl mb-4 font-medium text-gray-900">Contact</h1>
                    <p className="mb-8 leading-relaxed">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum eaque doloribus in nesciunt omnis aperiam sapiente veritatis totam! Esse natus minima sit nostrum dolorum praesentium dolore nobis blanditiis rem odit!
                    </p>
                    <div data-aos="fade-up" data-aos-delay="500" className="flex flex-col items-center text-xl font-bold">
                        <div className="flex items-center space-x-2">

                            <svg className="text-green-500 h-8 w-8 " xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 4.5A2.25 2.25 0 014.5 2.25h3a2.25 2.25 0 012.25 2.25v3A2.25 2.25 0 017.5 9.75h-.75a11.25 11.25 0 0011.25 11.25v-.75a2.25 2.25 0 012.25-2.25h3a2.25 2.25 0 012.25 2.25v3a2.25 2.25 0 01-2.25 2.25h-3A19.5 19.5 0 012.25 4.5z" />
                            </svg>

                            <span>+225 0151390918</span>
                        </div>

                        <div className="flex items-center space-x-2">
                            <svg className="text-red-500 h-8 w-8 b" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0L12 13.5 2.25 6.75m19.5 0H2.25" />
                            </svg>


                            <span>sidoine.nango@epitech.eu</span>
                        </div>

                        <div className="flex items-center text-center space-x-2">
                            <svg className="text-blue-500 h-8 w-8 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.761 0 5-2.239 5-5v-14c0-2.761-2.239-5-5-5zm-11 19h-3v-10h3v10zm-1.5-11.268c-.966 0-1.75-.784-1.75-1.75s.784-1.75 1.75-1.75 1.75.784 1.75 1.75-.784 1.75-1.75 1.75zm13.5 11.268h-3v-5.604c0-1.337-.026-3.063-1.867-3.063-1.869 0-2.156 1.46-2.156 2.967v5.7h-3v-10h2.881v1.367h.041c.401-.761 1.379-1.563 2.838-1.563 3.034 0 3.593 1.996 3.593 4.59v5.606z" />
                            </svg>

                            <a href="https://www.linkedin.com/in/koffi-sidoine-nango-160a2833b?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app">
                                Linkedin
                            </a>

                        </div>

                    </div>
                </div>
            </div>
        </section>
    )
}