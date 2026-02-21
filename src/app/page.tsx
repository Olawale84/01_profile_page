import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import FooterSection from "@/components/sections/footer-section";
import HeaderSection from "@/components/sections/header-section";
import SkillsSection from "@/components/sections/skills-section";
import WorksSection from "@/components/sections/works-section";
import React from "react";

const Home: React.FC = () => {
    return (
        <main id="home" className="w-full min-h-screen pt-8 sm:pt-10 lg:pt-12 bg-white flex flex-col items-center">
            <HeaderSection />
            <AboutSection />
            <SkillsSection />
            <WorksSection />
            <ContactSection />
            <FooterSection />
        </main>
    );
};

export default Home;
