import AboutSection from "@/components/sections/about-section";
import ContactSection from "@/components/sections/contact-section";
import FooterSection from "@/components/sections/footer-section";
import HeaderSection from "@/components/sections/header-section";
import SkillsSection from "@/components/sections/skills-section";
import WorksSection from "@/components/sections/works-section";
import React from "react";

const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "Olawale Onasanya",
    url: "https://olawale.design",
    image: "https://olawale.design/wale.jpg",
    jobTitle: "Web Designer",
    description:
        "Web designer based in Nigeria creating clean, strategic, and user-focused websites that turn ideas into impactful digital experiences.",
    address: {
        "@type": "PostalAddress",
        addressCountry: "NG",
    },
    sameAs: [
        "https://x.com/olawalewebdsgn",
        "https://www.linkedin.com/in/olawaleonasanya-webdesigner/",
        "https://www.behance.net/Olawale-Onasanya",
    ],
    knowsAbout: [
        "Web Design",
        "UI/UX Design",
        "Responsive Design",
        "Prototyping",
        "Landing Page Design",
    ],
    email: "mailto:olawaleonasanya5@gmail.com",
};

const Home: React.FC = () => {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <main id="home" className="w-full min-h-screen pt-8 sm:pt-10 lg:pt-12 bg-white flex flex-col items-center">
                <HeaderSection />
                <AboutSection />
                <SkillsSection />
                <WorksSection />
                <ContactSection />
                <FooterSection />
            </main>
        </>
    );
};

export default Home;
