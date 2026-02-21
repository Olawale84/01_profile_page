import { FormInput, SectionHeader } from "@/components/sections/shared";
import React from "react";

const ContactSection: React.FC = () => {
    return (
        <section
            id="contact"
            className="w-full py-10 lg:py-12 bg-neutral-800"
        >
            <div className="w-full max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-24 inline-flex flex-col justify-start items-center gap-10 lg:gap-12 overflow-hidden">
                <SectionHeader text="Contact Me" />
                <div className="self-stretch flex flex-col lg:flex-row justify-start items-center lg:items-start gap-10 lg:gap-28 xl:gap-44">
                    <div className="w-full lg:w-[573px] flex flex-col gap-5 lg:gap-6">
                        <h2 className="text-white text-3xl sm:text-4xl lg:text-5xl font-medium font-helvetica leading-tight">
                            Let’s create something that speaks — not just looks good.
                        </h2>
                        <p className="max-w-[520px] text-neutral-200 text-base sm:text-lg font-medium font-helvetica leading-relaxed">
                            Share your project goals, timeline, and vision. I’ll respond with a clear next step and a practical design direction.
                        </p>
                        <p className="text-orange-400 text-sm font-medium font-helvetica">Usually replies within 24 hours.</p>
                    </div>
                    <form className="w-full max-w-[420px] inline-flex flex-col justify-start items-start gap-3.5 mx-auto lg:mx-0" aria-label="Contact form">
                        <div className="self-stretch px-4 sm:px-5 py-5 sm:py-6 bg-neutral-200 border border-neutral-300 rounded-2xl shadow-[0px_4px_20px_0px_rgba(255,255,255,0.10)] flex flex-col justify-start items-start gap-7 overflow-hidden">
                            <FormInput label="Name" name="name" placeholder="Your Name" required autoComplete="name" />
                            <FormInput label="Email" name="email" type="email" placeholder="Your Email" required autoComplete="email" />
                            <div className="self-stretch flex flex-col justify-start items-start gap-[5px]">
                                <label htmlFor="message" className="text-neutral-800 text-sm font-medium font-helvetica">
                                    Message
                                </label>
                                <textarea
                                    id="message"
                                    name="message"
                                    placeholder="Add a Message"
                                    required
                                    className="self-stretch min-h-28 p-2.5 border-b border-black bg-transparent text-sm font-medium font-helvetica text-neutral-800 placeholder:text-neutral-500 resize-y transition-colors focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <button
                                type="submit"
                                className="self-stretch px-2.5 py-3.5 bg-orange-500 rounded-[100px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all hover:bg-orange-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200"
                            >
                                <div className="text-white text-base font-medium font-helvetica">Send Message</div>
                            </button>
                        </div>
                        <div className="self-stretch text-neutral-200 text-sm font-medium font-helvetica">
                            Leave a message and I will get back to you soon.
                        </div>
                    </form>
                </div>
            </div>
        </section>
    );
};

export default ContactSection;
