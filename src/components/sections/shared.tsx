import Image from "next/image";
import React from "react";

interface NavLinkProps {
    text: string;
    href: string;
}

interface SocialLinkProps {
    text: string;
    href: string;
    external?: boolean;
}

interface SectionHeaderProps {
    text: string;
    bgColor?: string;
    textColor?: string;
}

interface SkillItemProps {
    text: string;
}

interface WorkItemProps {
    src: string;
    alt: string;
    width: number;
    height: number;
    title: string;
    bgColor: string;
    linkText?: string;
    linkHref?: string;
    hasLink?: boolean;
    position?: "center" | "bottom";
}

interface FormInputProps {
    label: string;
    name: string;
    type?: "text" | "email";
    placeholder: string;
    required?: boolean;
    autoComplete?: string;
}

export const NavLink: React.FC<NavLinkProps> = ({ text, href }) => (
    <a
        href={href}
        className="text-neutral-800 text-base sm:text-lg lg:text-lg font-medium font-helvetica tracking-tight transition-colors hover:text-orange-500 focus-visible:text-orange-500 focus-visible:outline-none"
    >
        {text}
    </a>
);

export const SocialLink: React.FC<SocialLinkProps> = ({ text, href, external = false }) => (
    <a
        href={href}
        target={external ? "_blank" : undefined}
        rel={external ? "noopener noreferrer" : undefined}
        className="text-neutral-800 text-sm sm:text-base lg:text-lg font-normal font-helvetica transition-colors hover:text-orange-500 focus-visible:text-orange-500 focus-visible:outline-none lg:rotate-90 lg:origin-bottom-right"
    >
        {text}
    </a>
);

export const SectionHeader: React.FC<SectionHeaderProps> = ({
    text,
    bgColor = "bg-white",
    textColor = "text-neutral-800",
}) => (
    <div className={`px-5 py-3.5 lg:p-5 ${bgColor} rounded-[100px] inline-flex justify-center items-center gap-2.5`}>
        <div className={`text-center ${textColor} text-base lg:text-lg font-medium font-helvetica`}>{text}</div>
    </div>
);

export const SkillItem: React.FC<SkillItemProps> = ({ text }) => (
    <div className="px-5 py-3 lg:px-7 lg:py-5 rounded-[100px] border-[3px] lg:border-[5px] border-neutral-800 flex justify-center items-center gap-2.5">
        <div className="text-neutral-800 text-2xl sm:text-4xl lg:text-5xl font-medium font-helvetica text-center">{text}</div>
    </div>
);

export const WorkItem: React.FC<WorkItemProps> = ({
    src,
    alt,
    width,
    height,
    title,
    bgColor,
    linkText,
    linkHref,
    hasLink = true,
    position = "center",
}) => (
    <article className="w-full lg:w-[613px] inline-flex flex-col justify-start items-end gap-3 lg:gap-2.5">
        <div
            className={`self-stretch h-64 sm:h-80 lg:h-96 relative overflow-hidden ${bgColor} shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] ${position === "center" ? "grid place-items-center" : ""}`}
        >
            <Image
                className={
                    position === "center"
                        ? "max-w-full max-h-full object-contain"
                        : "absolute bottom-0 left-1/2 -translate-x-1/2 max-w-full max-h-full object-contain"
                }
                src={src}
                width={width}
                height={height}
                alt={alt}
            />
        </div>
        <div className="self-stretch flex flex-wrap justify-between items-center gap-3">
            <div className="flex justify-start items-center gap-3 lg:gap-5">
                <div className="w-3.5 h-3.5 lg:w-5 lg:h-5 bg-orange-500 rounded-full" />
                <div className="text-center text-neutral-800 text-base lg:text-lg font-medium font-helvetica">{title}</div>
            </div>
            {hasLink && linkText && (
                <>
                    {linkHref ? (
                        <a href={linkHref} target="_blank" rel="noopener noreferrer" className="flex justify-start items-center gap-3.5 group">
                            <Image src="/long-arrow.svg" width={140} height={17} alt="long arrow" className="hidden sm:block lg:w-[200px]" />
                            <Image src="/long-arrow.svg" width={96} height={17} alt="long arrow" className="sm:hidden" />
                            <div className="flex justify-start items-center gap-2 lg:gap-3.5">
                                <div className="w-6 h-6 relative overflow-hidden">
                                    <Image src="/eye.svg" width={24} height={24} alt="eye" />
                                </div>
                                <div className="text-center text-black text-sm lg:text-lg font-medium font-helvetica underline-offset-4 group-hover:underline">{linkText}</div>
                            </div>
                        </a>
                    ) : (
                        <div className="flex justify-start items-center gap-3.5">
                            <Image src="/long-arrow.svg" width={140} height={17} alt="long arrow" className="hidden sm:block lg:w-[200px]" />
                            <Image src="/long-arrow.svg" width={96} height={17} alt="long arrow" className="sm:hidden" />
                            <div className="flex justify-start items-center gap-2 lg:gap-3.5">
                                <div className="w-6 h-6 relative overflow-hidden">
                                    <Image src="/eye.svg" width={24} height={24} alt="eye" />
                                </div>
                                <div className="text-center text-black text-sm lg:text-lg font-medium font-helvetica">{linkText}</div>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    </article>
);

export const FormInput: React.FC<FormInputProps> = ({
    label,
    name,
    type = "text",
    placeholder,
    required = false,
    autoComplete,
}) => (
    <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
        <label htmlFor={name} className="text-neutral-800 text-sm font-medium font-helvetica">
            {label}
        </label>
        <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            required={required}
            autoComplete={autoComplete}
            className="self-stretch px-2.5 py-3.5 border-b border-black bg-transparent text-sm font-medium font-helvetica text-neutral-800 placeholder:text-neutral-500 transition-colors focus:outline-none focus:border-orange-500"
        />
    </div>
);
