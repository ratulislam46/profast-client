import React, { use } from 'react';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import { useQuery } from '@tanstack/react-query';
import UseAxios from '../../../hook/UseAxios';


const MyProfile = () => {
    const { user } = use(AuthContext);
    const axiosSecure = UseAxios();

    const { data: userInfo = [], refetch } = useQuery({
        queryKey: ["users", user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?email=${user?.email}`);
            return res.data;
        }
    });
    console.log(userInfo);
    return (
        <div className="flex justify-center items-center min-h-[300px] p-6 mt-10 md:mt-14 lg:mt-20">
            <div className="group relative w-full max-w-md bg-white/80 backdrop-blur-md border border-gray-100 p-6 md:p-8 flex flex-col sm:flex-row items-center sm:space-x-8 shadow-xl rounded-3xl transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:bg-white">

                {/* Profile Image Section */}
                <div className="relative flex-shrink-0 mb-6 sm:mb-0">
                    <div className="w-32 h-32 md:w-36 md:h-36 rounded-full p-1 bg-gradient-to-tr from-cyan-400 to-blue-500 shadow-inner">
                        <img
                            src={user?.photoURL || "https://via.placeholder.com/150"}
                            alt="User Profile"
                            className="w-full h-full object-cover rounded-full border-4 border-white shadow-sm"
                        />
                    </div>
                    {/* Online Status Indicator (Optional) */}
                    <span className="absolute bottom-3 right-3 block h-5 w-5 rounded-full bg-green-500 border-4 border-white"></span>
                </div>

                {/* Content Section */}
                <div className="flex flex-col text-center sm:text-left space-y-3">
                    <div>
                        <h2 className="text-2xl md:text-3xl font-extrabold text-gray-800 tracking-tight leading-tight">
                            {user?.displayName || "Anonymous User"}
                        </h2>
                        <p className="text-cyan-600 font-medium text-sm md:text-base mb-2">
                            {user?.email}
                        </p>
                    </div>

                    <div className="space-y-2">
                        {/* Role Badge */}
                        <div className="inline-flex items-center px-3 py-1 rounded-full bg-cyan-100 text-cyan-700 text-xs font-bold uppercase tracking-wider">
                            <span className="mr-1.5 h-2 w-2 rounded-full bg-cyan-500"></span>
                            {userInfo?.role || "Guest"}
                        </div>

                        <div className="text-sm text-gray-500 mt-2">
                            <p className="flex items-center justify-center sm:justify-start">
                                <span className="font-semibold text-gray-700 mr-2 italic">Last login:</span>
                                {userInfo?.last_login
                                    ? new Date(userInfo.last_login).toLocaleDateString(undefined, {
                                        day: 'numeric', month: 'short', year: 'numeric'
                                    })
                                    : "No login record"}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Decorative Background Element */}
                <div className="absolute top-0 right-0 -mr-4 -mt-4 w-24 h-24 bg-cyan-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity blur-2xl"></div>
            </div>
        </div>
    );
};

export default MyProfile;