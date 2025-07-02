import { useState } from 'react';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const PendingRiders = () => {
    const [selectedRider, setSelectedRider] = useState(null);
    const axiosSecure = UseAxiosSecure();

    const { refetch, data: riders = [] } = useQuery({
        queryKey: ['pending-riders'],
        queryFn: async () => {
            const res = await axiosSecure.get('/riders/pending');
            return res.data
        }
    })
    // console.log(riders);

    const updateStatus = async (id, action, email) => {

        const confirm = await Swal.fire({
            title: `${action === "active" ? "Active" : "Rejected"} Application?`,
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: "Cancel",
            confirmButtonText: "Yes"
        })

        // console.log(confirm);
        if (!confirm.isConfirmed) return;

        try {
            await axiosSecure.patch(`/riders/status/${id}`, {
                // status: action
                status: action === "active" ? "active" : "rejected",
                email: email
            });
            refetch()
            Swal.fire({
                title: `Rider ${action}`,
                icon: 'success'
            })
        }
        catch (error) {
            console.log('Could not update rider status', error);
        }
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-2xl font-semibold mb-4">Pending Riders</h2>

            <table className="table w-full">
                <thead>
                    <tr className="bg-base-200 text-base">
                        <th>#</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {riders.map((rider, index) => (
                        <tr key={rider._id}>
                            <th>{index + 1}</th>
                            <td>{rider.name}</td>
                            <td>{rider.email}</td>
                            <td>{rider.contact || "N/A"}</td>
                            <td><span className="badge badge-warning">{rider.status}</span></td>
                            <td className="flex gap-2">
                                <button
                                    onClick={() => setSelectedRider(rider)}
                                    className="btn btn-sm btn-info text-white"
                                >
                                    <MdOutlineRemoveRedEye className="text-lg" />
                                </button>
                                <button
                                    onClick={() => updateStatus(rider._id, 'active', rider.email)}
                                    className="btn btn-sm btn-success text-white"
                                >
                                    Accept
                                </button>
                                <button
                                    onClick={() => updateStatus(rider._id, 'rejected', rider.email)}
                                    className="btn btn-sm btn-error text-white"
                                >
                                    Cancel
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Modal */}
            {selectedRider && (
                <dialog id="rider_modal" className="modal modal-open">
                    <div className="modal-box">
                        <h3 className="font-bold text-lg mb-2">{selectedRider.name}'s Details</h3>
                        <div className="space-y-1 text-sm">
                            <p><strong>Email:</strong> {selectedRider.email}</p>
                            <p><strong>Phone:</strong> {selectedRider.contact}</p>
                            <p><strong>Region:</strong> {selectedRider.region || 'N/A'}</p>
                            <p><strong>District:</strong> {selectedRider.district || 'N/A'}</p>
                            <p><strong>Status:</strong> {selectedRider.status}</p>
                            <p><strong>
                                Created:</strong> {selectedRider.created_at}</p>
                            <p><strong>Message:</strong> {selectedRider.message}</p>
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

export default PendingRiders;
