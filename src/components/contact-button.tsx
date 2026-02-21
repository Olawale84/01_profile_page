import Image from 'next/image'
import React from 'react'

interface ContactButtonProps {
    className?: string
    href?: string
}

const ContactButton: React.FC<ContactButtonProps> = ({ className = "", href }) => {
    const sharedClassName = `pl-5 sm:pl-7 pr-2.5 py-2 bg-orange-500 rounded-[100px] w-fit inline-flex justify-center items-center gap-3 sm:gap-5 cursor-pointer transition-colors hover:bg-orange-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-orange-500 focus-visible:ring-offset-2 focus-visible:ring-offset-white ${className}`

    if (href) {
        return (
            <a className={sharedClassName} href={href}>
                <div className="text-white text-base sm:text-lg font-medium font-helvetica">Contact me</div>
                <div className="w-10 h-10 grid place-items-center bg-white rounded-full">
                    <Image src="/arrow-down.svg" alt="down arrow" width={17.39} height={22.62} />
                </div>
            </a>
        )
    }

    return (
        <button className={sharedClassName} type="button">
            <div className="text-white text-base sm:text-lg font-medium font-helvetica">Contact me</div>
            <div className="w-10 h-10 grid place-items-center bg-white rounded-full">
                <Image src="/arrow-down.svg" alt="down arrow" width={17.39} height={22.62} />
            </div>

        </button>
    )
}

export default ContactButton