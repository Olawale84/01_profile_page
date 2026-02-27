import ContactButton from "@/components/contact-button";
import { NavLink, SocialLink } from "@/components/sections/shared";
import Image from "next/image";
import React from "react";

const HeaderSection: React.FC = () => {
    return (
        <header className="px-6 sm:px-10 lg:px-20 w-full flex flex-col items-start gap-10 lg:gap-12">
            <nav className="w-full flex justify-center sm:justify-between items-center gap-6 sm:gap-3">
                <NavLink text="About" href="#about" />
                <NavLink text="Works" href="#works" />
                <NavLink text="Contact" href="#contact" />
            </nav>

            <div className="w-full flex flex-col lg:flex-row justify-between gap-10 lg:gap-0">
                <Image
                    src="/indicator.svg"
                    alt=""
                    width={53}
                    height={281}
                    className="hidden lg:block self-end pb-10"
                    aria-hidden="true"
                />

                <div className="flex flex-col items-center gap-4">
                    <div className="flex flex-col items-center gap-5 lg:gap-7">
                        <h1 className="text-center">
                            <span className="text-neutral-800 text-4xl sm:text-6xl lg:text-7xl font-extralight font-helvetica">I’m a </span>
                            <span className="text-neutral-800 text-4xl sm:text-6xl lg:text-7xl font-bold font-helvetica">Web Designer </span>
                        </h1>
                        <div className="flex flex-col sm:flex-row items-center gap-3 lg:gap-7">
                            <div className="text-neutral-800 text-sm lg:text-lg font-medium font-helvetica">Based in Nigeria</div>
                            <div className="hidden sm:block w-24 lg:w-32 h-px bg-orange-500" />
                            <div className="text-neutral-800 text-sm lg:text-lg font-medium font-helvetica">I Work Remotely</div>
                        </div>
                        <ContactButton href="#contact" />
                    </div>

                    <div className="flex flex-col items-center gap-1">
                        <Image src="/wale.jpg" width={292} height={328} alt="Olawale Onasanya — Web Designer" className="w-[220px] sm:w-[280px] lg:w-[292px] h-auto" />
                        <p>
                            <span className="text-black text-3xl sm:text-5xl font-medium font-helvetica">Olawale </span>
                            <span className="text-black text-3xl sm:text-5xl font-thin font-helvetica">Onasanya</span>
                        </p>
                    </div>
                </div>

                <div className="w-full lg:w-fit flex flex-row lg:flex-col lg:py-20 justify-center lg:justify-between items-center gap-5 lg:gap-16">
                    <SocialLink text="Twitter" href="https://x.com/olawalewebdsgn" external />
                    <SocialLink text="LinkedIn" href="https://www.linkedin.com/in/olawaleonasanya-webdesigner/" external />
                    <SocialLink text="Behance" href="https://www.behance.net/Olawale-Onasanya" external />
                </div>
            </div>
        </header>
    );
};

export default HeaderSection;
