import React from 'react';
import Logo from '../../../assets/logo.png'
import { Link } from 'react-router';

const ProfastIcon = () => {
    return (
        <Link to='/'>
            <div className='flex items-end font-extrabold'>
                <img src={Logo} alt="" className='mb-2' />
                <h3 className='text-3xl -ml-4'>Profast</h3>
            </div>
        </Link>
    );
};

export default ProfastIcon;