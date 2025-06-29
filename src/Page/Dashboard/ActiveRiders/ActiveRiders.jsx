import React, { useState } from 'react';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { MdOutlineRemoveRedEye } from 'react-icons/md';

const ActiveRiders = () => {

    const axiosSecure = UseAxiosSecure();
    const [selectedRider, setSelectedRider] = useState(null);
    const { data: activeRiders = [], isLoading, refetch } = useQuery({
        queryKey: ['approved-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/active')
            return res.data
        }
    })

    if (isLoading) {
        return <span>Loading ...</span>
    }

    const handleDeactivate = async (id) => {
        const confirm = await Swal.fire({
            title: 'Are you sure!',
            icon: 'warning',
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes"
        })

        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/status/${id}`, {
                status: "deactive",
            });

            Swal.fire("Done", "Rides has been deactived", "success");
            refetch()
        }
        catch (error) {
            console.log('Could not update rider status', error);
        }
    }


    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Approved Riders</h2>

            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by rider name..."
                    className="input input-bordered w-full max-w-sm"
                // value={searchTerm}
                // onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            {isLoading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Contact</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {activeRiders.map((rider, index) => (
                                <tr key={rider._id}>
                                    <td>{index + 1}</td>
                                    <td>{rider.name}</td>
                                    <td>{rider.email}</td>
                                    <td>{rider.contact || 'N/A'}</td>
                                    <td><span className="badge badge-success">{rider.status}</span></td>
                                    <td className="flex gap-2">
                                        <button
                                            className="btn btn-sm btn-info"
                                            onClick={() => setSelectedRider(rider)}
                                        >
                                            <MdOutlineRemoveRedEye /> Details
                                        </button>
                                        <button
                                            className="btn btn-sm btn-error"
                                            onClick={() => handleDeactivate(rider._id)}
                                        >
                                            Deactivate
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Rider Details Modal */}
            {selectedRider && (
                <dialog id="details_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg">{selectedRider.name}'s Info</h3>
                        <div className="space-y-1 text-sm">
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.contact}</p>
                            <p><strong>NID No:</strong> {selectedRider.nid}</p>
                            <p><strong>Age:</strong> {selectedRider.age}</p>
                            <p><strong>Address:</strong> {selectedRider.region || 'N/A'}</p>
                            <p><strong>District:</strong> {selectedRider.district || 'N/A'}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                            <p><strong>Opinion:</strong> {selectedRider.message}</p>
                        </div>
                        <div className="modal-action">
                            <form method="dialog">
                                <button onClick={() => setSelectedRider(null)} className="btn">Close</button>
                            </form>
                        </div>
                    </div>
                </dialog>
            )}
        </div>
    );
};

export default ActiveRiders;