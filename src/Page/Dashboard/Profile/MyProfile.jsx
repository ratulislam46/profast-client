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
        <div className='flex justify-center mt-10 md:mt-14 lg:mt-20'>
            <div className="max-w-md p-8 sm:flex sm:space-x-6 bg-cyan-200 hover:bg-white hover:border hover:border-cyan-300 shadow-lg rounded-2xl">
                <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                    <img src={user?.photoURL || "user profile"} alt="" className="object-cover object-center w-full h-full rounded bg-gray-500" />
                </div>
                <div className="flex flex-col space-y-4">
                    <div>
                        <h2 className="text-2xl font-semibold">{user?.displayName}</h2>

                        <p className='text-gray-600'>{user?.email}</p>
                    </div>
                    <div>
                        <span className="text-sm text-gray-600"><span className='font-bold'>Role:</span> {userInfo?.role}</span>
                        <p className='text-gray-600'>
                            <span className='font-bold'>Last login: </span>
                            {userInfo?.last_login
                                ? new Date(userInfo.last_login).toLocaleString()
                                : "No login record"}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyProfile;