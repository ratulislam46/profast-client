import React, { use } from 'react';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { QueryClient, useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import Swal from 'sweetalert2';
import UseTrackingLogger from '../../../hook/UseTrackingLogger';

const PendingDeliveries = () => {

    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();
    const queryClient = useQueryClient();
    const { logTracking } = UseTrackingLogger();

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ['rider-parcels'],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/parcels?email=${user.email}`)
            return res.data;
        }
    })
    // console.log(parcels);

    // Mutation for updating parcel status
    const { mutateAsync: updateStatus } = useMutation({
        mutationFn: async ({ parcel, status }) => {
            console.log(parcel._id);
            const res = await axiosSecure.patch(`/parcels/${parcel._id}/status`, {
                status,
            });
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["riderParcels"]);
        },
    });

    const handleStatusUpdate = (parcel, newStatus) => {
        Swal.fire({
            title: "Are you sure?",
            text: `Mark parcel as ${newStatus.replace("_", " ")}?`,
            icon: "question",
            showCancelButton: true,
            confirmButtonText: "Yes, update",
        }).then((result) => {
            if (result.isConfirmed) {
                updateStatus({ parcel, status: newStatus })
                    .then(async () => {
                        Swal.fire("Updated!", "Parcel status updated.", "success");


                        // track 
                        let trackDetails = `Picked up by ${user?.displayName}`
                        if (newStatus === 'delivered') {
                            trackDetails = `Delivered by ${user?.displayName}`
                        }
                        await logTracking({
                            tracking_id: parcel.tracking_id,
                            status: newStatus,
                            details: trackDetails,
                            updated_by: user?.email
                        })


                    })
                    .catch(() => {
                        Swal.fire("Error!", "Failed to update status.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-4">
            <h2 className="text-2xl font-bold mb-4">Your Assigned Parcels</h2>

            {isLoading ? <p>Loading...</p> : (
                <div className="overflow-x-auto">
                    <table className="table w-full">
                        <thead>
                            <tr className="bg-base-200">
                                <th>#</th>
                                <th>Title</th>
                                <th>Type</th>
                                <th>Sender</th>
                                <th>Receiver</th>
                                <th>Cost</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel, index) => (
                                <tr key={parcel._id}>
                                    <td>{index + 1}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.parcelType}</td>
                                    <td>{parcel.senderName} ({parcel.senderRegion})</td>
                                    <td>{parcel.receiverName} ({parcel.receiverRegion})</td>
                                    <td>৳{parcel.cost}</td>
                                    <td>
                                        <span className="badge badge-info capitalize">
                                            {parcel.delivery_status}
                                        </span>
                                    </td>
                                    <td>
                                        {parcel.delivery_status === 'rider_assigned' && (
                                            <button
                                                onClick={() => handleStatusUpdate(parcel, 'in_transit')}
                                                className="btn btn-sm btn-secondary text-primary text-[13px] px-4 py-2 rounded-md whitespace-nowrap w-full max-w-[160px]"
                                            >
                                                Mark as Picked Up
                                            </button>
                                        )}
                                        {parcel.delivery_status === 'in_transit' && (
                                            <button
                                                onClick={() => handleStatusUpdate(parcel, 'delivered')}
                                                className="btn btn-sm bg-green-500 hover:bg-green-600 text-white text-[13px] px-4 py-2 rounded-md whitespace-nowrap w-full max-w-[160px]"
                                            >
                                                Mark as Delivered
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default PendingDeliveries;