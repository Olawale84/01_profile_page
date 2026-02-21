import { WorkItem } from "@/components/sections/shared";
import React from "react";

const WorksSection: React.FC = () => {
    return (
        <section
            id="works"
            className="pb-20 sm:pb-28 lg:pb-[150px] px-6 sm:px-10 lg:px-0 self-stretch inline-flex justify-center items-start gap-8 lg:gap-14 flex-wrap content-start"
        >
            <WorkItem
                src="/seo.png"
                alt="seo"
                width={513}
                height={346}
                title="Landing Page"
                bgColor="bg-slate-900"
                linkText="Behance"
                position="bottom"
            />
            <WorkItem
                src="/festivo.png"
                alt="festivo"
                width={513}
                height={241}
                title="Hero Section"
                bgColor="bg-fuchsia-900"
                hasLink={false}
            />
            <WorkItem
                src="/humtran.png"
                alt="humtran"
                width={513}
                height={346}
                title="Landing Page"
                bgColor="bg-yellow-950"
                linkText="Behance"
                position="bottom"
            />
            <WorkItem
                src="/nike.png"
                alt="nike"
                width={513}
                height={330}
                title="Prototype"
                bgColor="bg-rose-900"
                linkText="Figma Prototyping"
            />
        </section>
    );
};

export default WorksSection;
