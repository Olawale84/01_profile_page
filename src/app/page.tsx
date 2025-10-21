import ContactButton from "@/components/contact-button";
import Image from "next/image";

// Type definitions for component props
interface NavLinkProps {
  text: string;
}

interface SocialLinkProps {
  text: string;
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
  hasLink?: boolean;
  position?: "center" | "bottom";
}

interface FormInputProps {
  label: string;
  placeholder: string;
}

// Reusable Navigation Link Component
const NavLink: React.FC<NavLinkProps> = ({ text }) => (
  <div className="text-neutral-800 text-lg font-medium font-helvetica tracking-tight">
    {text}
  </div>
);

// Reusable Social Link Component (for rotated social links)
const SocialLink: React.FC<SocialLinkProps> = ({ text }) => (
  <div className="text-neutral-800 text-lg font-normal font-helvetica rotate-90 origin-bottom-right">
    {text}
  </div>
);

// Reusable Section Header Component
const SectionHeader: React.FC<SectionHeaderProps> = ({
  text,
  bgColor = "bg-white",
  textColor = "text-neutral-800",
}) => (
  <div className={`p-5 ${bgColor} rounded-[100px] inline-flex justify-center items-center gap-2.5`}>
    <div className={`text-center ${textColor} text-lg font-medium font-helvetica`}>{text}</div>
  </div>
);

// Reusable Skill Item Component
const SkillItem: React.FC<SkillItemProps> = ({ text }) => (
  <div className="px-7 py-5 rounded-[100px] outline-[5px] outline-neutral-800 flex justify-center items-center gap-2.5">
    <div className="text-neutral-800 text-5xl font-medium font-helvetica">{text}</div>
  </div>
);

// Reusable Work Item Component
const WorkItem: React.FC<WorkItemProps> = ({
  src,
  alt,
  width,
  height,
  title,
  bgColor,
  linkText,
  hasLink = true,
  position = "center",
}) => (
  <div className="w-[613px] inline-flex flex-col justify-start items-end gap-2.5">
    <div
      className={`self-stretch h-96 relative ${bgColor} shadow-[0px_4px_4px_0px_rgba(0,0,0,0.10)] ${position === "center" ? "grid place-items-center" : "overflow-hidden"
        }`}
    >
      <Image
        className={
          position === "center"
            ? "object-contain"
            : "absolute bottom-0 left-1/2 -translate-x-1/2 max-w-full max-h-full object-contain"
        }
        src={src}
        width={width}
        height={height}
        alt={alt}
      />
    </div>
    <div className="self-stretch inline-flex justify-between items-center">
      <div className="flex justify-start items-center gap-5">
        <div className="w-5 h-5 bg-orange-500 rounded-full" />
        <div className="text-center text-neutral-800 text-lg font-medium font-helvetica">{title}</div>
      </div>
      {hasLink && linkText && (
        <>
          <Image src="/long-arrow.svg" width={200} height={17} alt="long arrow" />
          <div className="flex justify-start items-center gap-3.5">
            <div className="w-6 h-6 relative overflow-hidden">
              <Image src="/eye.svg" width={24} height={24} alt="eye" />
            </div>
            <div className="text-center text-black text-lg font-medium font-helvetica">{linkText}</div>
          </div>
        </>
      )}
    </div>
  </div>
);

// Reusable Form Input Component
const FormInput: React.FC<FormInputProps> = ({ label, placeholder }) => (
  <div className="self-stretch flex flex-col justify-start items-start gap-[ inteligent 5px]">
    <div className="text-neutral-800 text-sm font-medium font-helvetica">{label}</div>
    <div className="self-stretch px-2.5 py-3.5 border-b border-black inline-flex justify-start items-center gap-2.5">
      <div className="text-neutral-500 text-sm font-medium font-helvetica">{placeholder}</div>
    </div>
  </div>
);

// Main Home Component
const Home: React.FC = () => {
  return (
    <div className="w-full h-fit pt-12 bg-white flex flex-col items-center gap-36">
      {/* HEADER */}
      <div className="px-20 w-full flex flex-col items-start gap-12">
        {/* NAV */}
        <div className="w-full flex justify-between items-center">
          <NavLink text="About" />
          <NavLink text="Works" />
          <NavLink text="Contact" />
        </div>
        <div className="w-full flex justify-between">
          <Image src="./indicator.svg" alt="indicator" width={53} height={281} className="self-end pb-10" />
          <div className="flex flex-col items-center gap-4">
            <div className="flex flex-col items-center gap-7">
              <div className="text-center">
                <span className="text-neutral-800 text-7xl font-extralight font-helvetica">I’m a </span>
                <span className="text-neutral-800 text-7xl font-bold font-helvetica">Web Designer </span>
              </div>
              <div className="flex items-center gap-7">
                <div className="text-neutral-800 text-lg font-medium font-helvetica">Based in Nigeria</div>
                <div className="w-32 h-0 outline-1 outline-offset-[-0.50px] outline-orange-500"></div>
                <div className="text-neutral-800 text-lg font-medium font-helvetica">I Work Remotely</div>
              </div>
              <ContactButton />
            </div>
            <div className="flex flex-col items-center gap-1">
              <Image src="/wale.jpg" width={292} height={328} alt="ME" />
              <div>
                <span className="text-black text-5xl font-medium font-helvetica">Olawale </span>
                <span className="text-black text-5xl font-thin font-helvetica">Onasanya</span>
              </div>
            </div>
          </div>
          <div className="w-fit flex-col py-20 inline-flex justify-between items-center">
            <SocialLink text="Twitter" />
            <SocialLink text="LinkedIn" />
            <SocialLink text="Behance" />
          </div>
        </div>
      </div>
      {/* END OF HEADER */}

      {/* ABOUT */}
      <div className="self-stretch h-full px-20 pt-[100px] pb-[120px] flex flex-col gap-[100px] relative bg-neutral-800">
        <Image src="/star.svg" width={667} height={333.5} alt="star" className="absolute bottom-0" />
        <div className="inline-flex flex-col justify-start items-center gap-12">
          <SectionHeader text="My Approach" />
          <div className="self-stretch">
            <span className="text-white pl-20 text-7xl font-medium font-helvetica">
              Building a business goes beyond structure —
            </span>
            <span className="text-orange-500 text-7xl font-medium font-helvetica">
              it’s about the story that defines it. I help bring that story to life through visual design
            </span>
            <span className="text-white text-7xl font-medium font-helvetica">
              that connects, inspires, and drives growth.
            </span>
          </div>
        </div>
        <div className="inline-flex flex-col justify-start items-end gap-12">
          <div className="max-w-[533px] flex flex-col gap-[50px]">
            <h3 className="w-full text-white text-lg font-normal font-helvetica leading-relaxed">
              I’m a web designer who creates clean, strategic, and user-focused websites that turn ideas into impactful digital experiences.
            </h3>
            <ContactButton />
          </div>
        </div>
      </div>
      {/* END OF ABOUT */}

      {/* SKILLS */}
      <div className="self-stretch py-[150px] inline-flex flex-col justify-start items-center gap-12">
        <SectionHeader text="Capabilities" bgColor="bg-neutral-800" textColor="text-white" />
        <div className="self-stretch inline-flex justify-center items-start gap-12 flex-wrap content-start">
          {["Web Design", "Web Redesign", "Prototyping", "Responsive Design", "UI/UX Design"].map((skill) => (
            <SkillItem key={skill} text={skill} />
          ))}
        </div>
      </div>
      {/* END OF SKILLS */}

      {/* WORKS */}
      <div className="pb-[150px] self-stretch inline-flex justify-center items-start gap-14 flex-wrap content-start">
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
      </div>
      {/* END OF WORKS */}

      {/* FORM */}
      <div className="w-[1280px] px-24 py-12 bg-neutral-800 inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
        <SectionHeader text="Contact Me" />
        <div className="self-stretch inline-flex justify-start items-start gap-44">
          <div className="w-[573px] text-white text-5xl font-medium font-helvetica">
            Let’s create something that speaks — not just looks good.
          </div>
          <div className="w-80 inline-flex flex-col justify-start items-start gap-3.5">
            <div className="self-stretch px-3.5 py-5 bg-neutral-200 shadow-[0px_4px_20px_0px_rgba(255,255,255,0.10)] flex flex-col justify-start items-start gap-7 overflow-hidden">
              <FormInput label="Name" placeholder="Your Name" />
              <FormInput label="Email" placeholder="Your Email" />
              <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
                <div className="text-neutral-800 text-sm font-medium font-helvetica">Message</div>
                <div className="self-stretch h-24 p-2.5 border-b border-black inline-flex justify-start items-start gap-2.5">
                  <div className="text-neutral-500 text-sm font-medium font-helvetica">Add a Message</div>
                </div>
              </div>
              <div className="self-stretch px-2.5 py-3.5 bg-orange-500 rounded-[100px] inline-flex justify-center items-center gap-2.5">
                <div className="text-white text-base font-medium font-helvetica">Send Message</div>
              </div>
            </div>
            <div className="self-stretch text-white text-sm font-medium font-helvetica">
              Leave a message I will get back to you soon
            </div>
          </div>
        </div>
      </div>
      {/* END OF FORM */}

      {/* FOOTER */}
      <div className="w-full pt-24 pb-7 bg-neutral-800 inline-flex flex-col justify-start items-center gap-12 overflow-hidden">
        <div className="w-[1240px] inline-flex justify-between items-center">
          <div className="w-96 inline-flex flex-col justify-start items-start gap-20">
            <div className="self-stretch text-white text-2xl font-medium font-helvetica">
              Designing digital experiences that speak, connect, and convert.
            </div>
            <div className="w-60 flex flex-col justify-start items-start gap-3.5">
              <div className="self-stretch text-neutral-200 text-base font-medium font-helvetica">Email</div>
              <div className="self-stretch text-white text-base font-medium font-helvetica">olawalewebdesigner@gmail.com</div>
            </div>
          </div>
          <div className="w-28 inline-flex flex-col justify-start items-center gap-10">
            <div className="self-stretch text-white text-xl font-medium font-helvetica">Quick Links</div>
            {["Home", "About", "Contact"].map((link) => (
              <div key={link} className="self-stretch text-white text-base font-medium font-helvetica">
                {link}
              </div>
            ))}
          </div>
          <div className="w-32 inline-flex flex-col justify-center items-start gap-10">
            <div className="self-stretch text-white text-xl font-medium font-helvetica">Social Link</div>
            {["Twitter", "LinkedIn", "Whatsapp"].map((link) => (
              <div key={link} className="self-stretch text-white text-base font-medium font-helvetica">
                {link}
              </div>
            ))}
          </div>
        </div>
        <div className="self-stretch h-0 outline outline-offset-[-0.50px] outline-white"></div>
        <div className="self-stretch text-center">
          <span className="text-white text-sm font-medium font-helvetica">© 2025 Olawale. All Rights Reserved | Developed by </span>
          <span className="text-orange-500 text-sm font-medium font-helvetica underline">Jolextom</span>
        </div>
      </div>
      {/* END OF FOOTER */}
    </div>
  );
};

export default Home;