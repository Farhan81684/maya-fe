import React from 'react'
import slide from "../../../public/assets/slide.jpg"
import Image from 'next/image'

const Page = () => {
    return (
        <div className='grid grid-cols-2 gap-5 bg-amber-200'>
            <div className='bg-red-200'>s</div>
            <div className='bg-purple-200 relative'>
                <Image src={slide} alt />
            </div>
        </div>
    )
}

export default Page
