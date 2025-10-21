import Image from 'next/image'
import React from 'react'

const ContactButton = () => {
    return (
        <div className="pl-7 pr-2.5 py-2.5 bg-orange-500 rounded-[100px] w-fit inline-flex justify-center items-center gap-5">
            <div className=" cursor-pointer text-white text-lg font-medium font-helvetica ">Contact me</div>
            <div className="w-10 h-10 grid place-items-center bg-white rounded-full">
                <Image src="/arrow-down.svg" alt="down arrow" width={17.39} height={22.62} />
            </div>

        </div>
    )
}

export default ContactButton