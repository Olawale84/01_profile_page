import ContactButton from "@/components/contact-button";
import { SectionHeader } from "@/components/sections/shared";
import Image from "next/image";
import React from "react";

const AboutSection: React.FC = () => {
    return (
        <section
            id="about"
            className="self-stretch h-full px-6 sm:px-10 lg:px-20 pt-16 sm:pt-20 lg:pt-[100px] pb-20 sm:pb-24 lg:pb-[120px] flex flex-col gap-14 sm:gap-20 lg:gap-[100px] relative bg-neutral-800 overflow-hidden"
        >
            <Image src="/star.svg" width={667} height={333.5} alt="star" className="absolute bottom-0 left-0 w-[75%] lg:w-auto h-auto" />
            <div className="inline-flex flex-col justify-start items-center gap-8 lg:gap-12 z-10">
                <SectionHeader text="My Approach" />
                <div className="self-stretch text-center sm:text-left">
                    <span className="text-white text-3xl sm:text-5xl lg:text-7xl lg:pl-20 font-medium font-helvetica">
                        Building a business goes beyond structure —
                    </span>
                    <span className="text-orange-500 text-3xl sm:text-5xl lg:text-7xl font-medium font-helvetica">
                        it’s about the story that defines it. I help bring that story to life through visual design
                    </span>
                    <span className="text-white text-3xl sm:text-5xl lg:text-7xl font-medium font-helvetica">
                        that connects, inspires, and drives growth.
                    </span>
                </div>
            </div>
            <div className="inline-flex flex-col justify-start items-start sm:items-end gap-8 lg:gap-12 z-10">
                <div className="max-w-[533px] flex flex-col gap-8 lg:gap-[50px]">
                    <h3 className="w-full text-white text-lg font-normal font-helvetica leading-relaxed">
                        I’m a web designer who creates clean, strategic, and user-focused websites that turn ideas into impactful digital experiences.
                    </h3>
                    <ContactButton href="#contact" />
                </div>
            </div>
        </section>
    );
};

export default AboutSection;
