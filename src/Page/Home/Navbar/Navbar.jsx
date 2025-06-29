import React, { use } from 'react';
import { Link, NavLink } from 'react-router';
import ProfastIcon from './profastIcon';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';

const Navbar = () => {

    const { user, logOut } = use(AuthContext);

    const handleLogOut = () => {
        logOut()
            .then(result => {
                console.log('successfully logout');
            })
            .catch(error => {
                console.log(error);
            })
    }

    const Navlinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/about'>About</NavLink></li>
        <li><NavLink to='/sentParcel'>Sent Parcel</NavLink></li>
        <li><NavLink to='/trackOrder'>Track Order</NavLink></li>

        {
            user && <>
                <li><NavLink to='/beARider'>Be A Rider</NavLink></li>
                <li><NavLink to='/dashboard'>Dashboard</NavLink></li>
            </>
        }

    </>

    return (
        <div className="navbar bg-base-100 shadow-sm">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /> </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
                        {
                            Navlinks
                        }
                    </ul>
                </div>
                <div>
                    <ProfastIcon></ProfastIcon>
                </div>

            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        Navlinks
                    }
                </ul>
            </div>
            <div className="navbar-end">
                {
                    user ?
                        <Link onClick={handleLogOut} className="btn">Logout</Link> :
                        <Link to='/login' className="btn">Login</Link>

                }
            </div>
        </div>
    );
};

export default Navbar;