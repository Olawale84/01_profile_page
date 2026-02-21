import { SectionHeader, SkillItem } from "@/components/sections/shared";
import React from "react";

const skills = ["Web Design", "Web Redesign", "Prototyping", "Responsive Design", "UI/UX Design"];

const SkillsSection: React.FC = () => {
    return (
        <section className="self-stretch py-16 sm:py-24 lg:py-[150px] inline-flex flex-col justify-start items-center gap-8 lg:gap-12 px-6 sm:px-10 lg:px-0">
            <SectionHeader text="Capabilities" bgColor="bg-neutral-800" textColor="text-white" />
            <div className="self-stretch inline-flex justify-center items-start gap-4 sm:gap-8 lg:gap-12 flex-wrap content-start">
                {skills.map((skill) => (
                    <SkillItem key={skill} text={skill} />
                ))}
            </div>
        </section>
    );
};

export default SkillsSection;
