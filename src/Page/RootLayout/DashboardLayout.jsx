import React from 'react';
import { Link, Outlet } from 'react-router';
import { MdDashboard, MdPerson, MdLocalShipping, MdPayment, MdGroups, MdPending, MdAdminPanelSettings, MdDeliveryDining } from 'react-icons/md';
import ProfastIcon from '../../Page/Home/Navbar/ProfastIcon'
import UseUserRole from '../../hook/UseUserRole';

const Dashboard = () => {

    const { role, loading } = UseUserRole();
    // console.log(role);

    return (
        <div className="drawer lg:drawer-open">
            <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
            <div className="drawer-content flex flex-col">

                {/* Navbar */}
                <div className="navbar bg-base-300 w-full lg:hidden">
                    <div className="flex-none lg:hidden">
                        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                className="inline-block h-6 w-6 stroke-current"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M4 6h16M4 12h16M4 18h16"
                                ></path>
                            </svg>
                        </label>
                    </div>
                    <div className="mx-2 flex-1 px-2 lg:hidden">Dashboard</div>
                </div>
                {/* Page content here */}

                <Outlet></Outlet>

                {/* Page content here */}

            </div>
            <div className="drawer-side">
                <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
                <ul className="menu bg-base-200 text-base-content min-h-full w-80 p-4">
                    {/* Sidebar content here */}
                    <ProfastIcon></ProfastIcon>
                    <li>
                        <Link to="/dashboard" className="flex items-center gap-3 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors duration-200">
                            <MdDashboard className="text-xl text-blue-500" />
                            <span className="font-semibold">Home</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myProfile" className="flex items-center gap-3 text-purple-600 hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors duration-200">
                            <MdPerson className="text-xl text-purple-500" />
                            <span className="font-semibold">My Profile</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/myParcels" className="flex items-center gap-3 text-green-600 hover:bg-green-100 px-3 py-2 rounded-lg transition-colors duration-200">
                            <MdLocalShipping className="text-xl text-green-500" />
                            <span className="font-semibold">My Parcel</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/dashboard/paymentHistory" className="flex items-center gap-3 text-rose-600 hover:bg-rose-100 px-3 py-2 rounded-lg transition-colors duration-200">
                            <MdPayment className="text-xl text-rose-500" />
                            <span className="font-semibold">Payment History</span>
                        </Link>
                    </li>

                    {/* show link with condition  */}
                    {!loading && role === 'admin' &&
                        <>
                            {/* riders link  */}
                            <li>
                                <Link to="/dashboard/activeRiders" className="flex items-center gap-3 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors duration-200">
                                    <MdGroups className="text-xl text-blue-500" />
                                    <span className="font-semibold">Active Riders</span>
                                </Link>
                            </li>
                            <li>
                                <Link to="/dashboard/pendingRiders" className="flex items-center gap-3 text-yellow-600 hover:bg-yellow-100 px-3 py-2 rounded-lg transition-colors duration-200">
                                    <MdPending className="text-xl text-yellow-500" />
                                    <span className="font-semibold">Pending Riders</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/makeAdmin"
                                    className="flex items-center gap-3 text-blue-600 hover:bg-blue-100 px-3 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <MdAdminPanelSettings className="text-xl text-blue-500" />
                                    <span className="font-semibold">Make Admin</span>
                                </Link>
                            </li>
                            <li>
                                <Link
                                    to="/dashboard/asignRider"
                                    className="flex items-center gap-3 text-purple-600 hover:bg-purple-100 px-3 py-2 rounded-lg transition-colors duration-200"
                                >
                                    <MdDeliveryDining className="text-xl text-purple-500" />
                                    <span className="font-semibold">Asign Rider</span>
                                </Link>
                            </li>
                        </>
                    }
                </ul>
            </div>
        </div>
    );
};

export default Dashboard;