"use client";
import { FormInput, SectionHeader } from "@/components/sections/shared";
import React, { useState, FormEvent } from "react";

type FormStatus = "idle" | "submitting" | "success" | "error";

const WEB3FORMS_ACCESS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_KEY ?? "";

const ContactSection: React.FC = () => {
    const [status, setStatus] = useState<FormStatus>("idle");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus("submitting");

        const form = e.currentTarget;
        const formData = new FormData(form);
        formData.append("access_key", WEB3FORMS_ACCESS_KEY);
        formData.append("subject", "New message from olawale.design");
        formData.append("from_name", "Portfolio Contact Form");

        try {
            const res = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.success) {
                setStatus("success");
                form.reset();
            } else {
                setStatus("error");
            }
        } catch {
            setStatus("error");
        }
    };

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
                            Let&apos;s create something that speaks {"\u2014"} not just looks good.
                        </h2>
                        <p className="max-w-[520px] text-neutral-200 text-base sm:text-lg font-medium font-helvetica leading-relaxed">
                            Share your project goals, timeline, and vision. I&apos;ll respond with a clear next step and a practical design direction.
                        </p>
                        <p className="text-orange-400 text-sm font-medium font-helvetica">Usually replies within 24 hours.</p>
                    </div>
                    <form
                        onSubmit={handleSubmit}
                        className="w-full max-w-[420px] inline-flex flex-col justify-start items-start gap-3.5 mx-auto lg:mx-0"
                        aria-label="Contact form"
                    >
                        <div className="self-stretch px-4 sm:px-5 py-5 sm:py-6 bg-neutral-200 border border-neutral-300 rounded-2xl shadow-[0px_4px_20px_0px_rgba(255,255,255,0.10)] flex flex-col justify-start items-start gap-7 overflow-hidden">
                            {/* Honeypot spam protection */}
                            <input type="checkbox" name="botcheck" className="hidden" tabIndex={-1} autoComplete="off" />
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
                                disabled={status === "submitting"}
                                className="self-stretch px-2.5 py-3.5 bg-orange-500 rounded-[100px] inline-flex justify-center items-center gap-2.5 cursor-pointer transition-all hover:bg-orange-400 hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-neutral-200 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                            >
                                <div className="text-white text-base font-medium font-helvetica">
                                    {status === "submitting" ? "Sending..." : "Send Message"}
                                </div>
                            </button>
                            {status === "success" && (
                                <p className="self-stretch text-center text-green-700 text-sm font-medium font-helvetica">
                                    Message sent! I&apos;ll get back to you soon.
                                </p>
                            )}
                            {status === "error" && (
                                <p className="self-stretch text-center text-red-600 text-sm font-medium font-helvetica">
                                    Something went wrong. Please try again or email me directly.
                                </p>
                            )}
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