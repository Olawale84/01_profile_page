import React from "react";

const quickLinks = [
    { text: "Home", href: "#home" },
    { text: "About", href: "#about" },
    { text: "Works", href: "#works" },
    { text: "Contact", href: "#contact" },
];

const socialLinks = [
    { text: "Twitter", href: "https://x.com/olawalewebdsgn" },
    { text: "LinkedIn", href: "https://www.linkedin.com/in/olawaleonasanya-webdesigner/" },
    { text: "Behance", href: "https://www.behance.net/Olawale-Onasanya" },
];

const FooterSection: React.FC = () => {
    return (
        <footer className="w-full pt-14 sm:pt-20 lg:pt-24 pb-7 bg-neutral-800 inline-flex flex-col justify-start items-center gap-8 lg:gap-12 overflow-hidden px-6 sm:px-10 lg:px-0">
            <div className="w-full lg:w-[1240px] inline-flex flex-col md:flex-row justify-between items-start md:items-center gap-12 md:gap-6">
                <div className="w-full lg:w-96 inline-flex flex-col justify-start items-start gap-8 lg:gap-20">
                    <div className="self-stretch text-white text-xl lg:text-2xl font-medium font-helvetica">
                        Designing digital experiences that speak, connect, and convert.
                    </div>
                    <div className="w-60 flex flex-col justify-start items-start gap-3.5">
                        <div className="self-stretch text-neutral-200 text-base font-medium font-helvetica">Email</div>
                        <div className="self-stretch text-white text-base font-medium font-helvetica">olawaleonasanya5@gmail.com</div>
                    </div>
                </div>

                <div className="w-full md:w-28 inline-flex flex-col justify-start md:items-center items-start gap-4 lg:gap-10">
                    <div className="self-stretch text-white text-lg lg:text-xl font-medium font-helvetica">Quick Links</div>
                    {quickLinks.map((link) => (
                        <a key={link.text} href={link.href} className="self-stretch text-white text-base font-medium font-helvetica hover:text-orange-500 transition-colors">
                            {link.text}
                        </a>
                    ))}
                </div>

                <div className="w-full md:w-32 inline-flex flex-col justify-center items-start gap-4 lg:gap-10">
                    <div className="self-stretch text-white text-lg lg:text-xl font-medium font-helvetica">Social Link</div>
                    {socialLinks.map((link) => (
                        <a
                            key={link.text}
                            href={link.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="self-stretch text-white text-base font-medium font-helvetica hover:text-orange-500 transition-colors"
                        >
                            {link.text}
                        </a>
                    ))}
                </div>
            </div>
            <div className="self-stretch h-px bg-white/70" />
            <div className="self-stretch text-center">
                <span className="text-white text-sm font-medium font-helvetica">© 2025 Olawale. All Rights Reserved | Developed by </span>
                <span className="text-orange-500 text-sm font-medium font-helvetica underline">Jolextom</span>
            </div>
        </footer>
    );
};

export default FooterSection;
