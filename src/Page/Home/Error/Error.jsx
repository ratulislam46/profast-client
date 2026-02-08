import React from 'react';
import { Link } from 'react-router';

const Error = () => {
    return (
        <div className='mt-4 mb-2'>
            <div className='flex justify-center items-center'>
                <div className='pb-6'>
                    <img src="https://i.postimg.cc/C5sPdYcy/error.jpg" alt="" className='' />
                    <div className='flex justify-center pb-12 -mt-16'>
                        <Link className='text-primary bg-secondary btn rounded-xl' to='/'>Go To Home</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Error;