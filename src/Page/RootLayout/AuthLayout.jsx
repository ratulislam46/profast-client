import React from 'react';
import ProfastIcon from '../Home/Navbar/profastIcon';
import AuthImage from '../../assets/authImage.png'
import { Outlet } from 'react-router';

const AuthLayout = () => {
    return (
        <div>
            <div className="bg-base-200 p-12">
                <div>
                    <ProfastIcon></ProfastIcon>
                </div>
                <div className="hero-content flex-col lg:flex-row-reverse">
                    <div className='flex-1'>
                        <img
                            src={AuthImage}
                            className="rounded-lg"
                        />
                    </div>
                    <div className='flex-1'>
                        <Outlet></Outlet>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLayout;