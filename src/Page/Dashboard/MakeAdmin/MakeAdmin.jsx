import { useQuery } from '@tanstack/react-query';
import React, { useState } from 'react';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { FaSearch } from 'react-icons/fa';
import Swal from 'sweetalert2';

const MakeAdmin = () => {

    const axiosSecure = UseAxiosSecure();
    const [emailQuery, setEmailQuery] = useState('');


    const { data: users = [], refetch, isFetching, isLoading } = useQuery({
        queryKey: ['searchUsers', emailQuery],
        enabled: !!emailQuery,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/search?email=${emailQuery}`)
            return res.data;
        }
    })

    const handleToggleRole = async (user) => {
        const newRole = user.role === 'admin' ? 'user' : 'admin';
        const action = user.role === 'admin' ? 'Remove admin' : 'Make admin';

        const confirm = await Swal.fire({
            title: `${action}`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes",
            cancelButtonText: "Cancel",
        });

        if (!confirm.isConfirmed) return;

        try {
            const res = await axiosSecure.patch(`/users/admin/${user._id}`, { role: newRole })
            if (res.data.modifiedCount > 0) {
                Swal.fire('Success', `Role updated to ${action}`, 'success');
                refetch()
            }
        }
        catch (error) {
            console.log('error patch user', error);
        }
    }

    return (
        <div className="max-w-5xl mx-auto mt-8 px-4">
            <h2 className="text-4xl font-bold mb-6 text-center text-primary">User Role Management</h2>

            {/* Search input */}
            <div className="flex items-center gap-2 mb-6">
                <input
                    type="text"
                    placeholder="Search by user email..."
                    value={emailQuery}
                    onChange={(e) => setEmailQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <FaSearch className="text-gray-500" />
            </div>

            {/* Loading state */}
            {isLoading && <p>Loading users...</p>}

            {/* User table */}
            {users.length > 0 ? (
                <div className="overflow-x-auto">
                    <table className="table w-full bg-white rounded-lg shadow-md">
                        <thead className="bg-blue-100">
                            <tr>
                                <th>#</th>
                                <th className="py-2 px-4 text-left">Email</th>
                                <th className="py-2 px-4 text-left">Created At</th>
                                <th className="py-2 px-4 text-left">Role</th>
                                <th className="py-2 px-4 text-center">Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user, index) => (
                                <tr key={user._id}>
                                    <td>{index + 1}</td>
                                    <td className="py-2 px-4">{user.email}</td>
                                    <td className="py-2 px-4">{new Date(user.created_at).toLocaleDateString()}</td>
                                    <td className="py-2 px-4 capitalize"> <span
                                        className={`badge ${user.role === "admin" ? "badge-success" : "badge-ghost"
                                            }`}
                                    >
                                        {user.role || "user"}
                                    </span></td>
                                    <td className="py-2 px-4 text-center">
                                        <button
                                            onClick={() => handleToggleRole(user)}
                                            className={`btn btn-sm text-black ${user.role === "admin" ? "btn-error" : "btn-secondary"
                                                }`}
                                        >
                                            {user.role === 'admin' ? 'Remove Admin' : 'Make Admin'}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            ) :
                (
                    emailQuery && !isLoading && (
                        <p className="text-center text-gray-500">No users found for this email.</p>
                    )
                )}
        </div>
    );
};

export default MakeAdmin;