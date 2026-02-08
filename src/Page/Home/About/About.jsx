import React from 'react';

const About = () => {
    return (
        <div className='container mx-auto px-2 lg:px-0'>
            <div className='mt-8 mb-2'>
                <div className='py-20'>
                    <h1 className='text-5xl text-primary font-extrabold pb-4'>About Us</h1>
                    <p className='text-gray-500 pb-12 border-b border-gray-500'>Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.</p>
                    <div className='flex gap-8 lg:gap-12 py-12'>
                        <h2 className='text-primary font-extrabold'>Story</h2>
                        <h2 className='text-primary font-extrabold'>Mission</h2>
                        <h2 className='text-primary font-extrabold'>Success</h2>
                        <h2 className='text-primary font-extrabold'>Team & Others</h2>
                    </div>
                    <p className='text-gray-500'> We started with a simple promise — to make parcel delivery fast, reliable, and stress-free. Over the years, our commitment to real-time tracking, efficient logistics, and customer-first service has made us a trusted partner for thousands. Whether it's a personal gift or a time-sensitive business delivery, we ensure it reaches its destination — on time, every time.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;