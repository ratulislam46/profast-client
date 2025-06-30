import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const AssignRider = () => {
    const axiosSecure = UseAxiosSecure()
    const [selectedParcel, setSelectedParcel] = useState(null);

    // ✅ Step 1: Load parcels which are paid & not_collected
    const { data: parcels = [], isLoading: loadingParcels, refetch } = useQuery({
        queryKey: ['assignableParcels'],
        queryFn: async () => {
            const res = await axiosSecure.get('/parcels?payment_status=paid&delivery_status=not_collected');
            return res.data;
        },
    });

    // ✅ Step 2: Load riders based on selectedParcel region
    const { data: riders = [], isLoading: loadingRiders } = useQuery({
        queryKey: ['riders', selectedParcel?.senderRegion],
        enabled: !!selectedParcel?.senderRegion,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders?region=${selectedParcel.senderRegion}`);
            return res.data;
        },
    });

    // ✅ Step 3: Assign selected rider to parcel
    const handleAssign = async (rider) => {
        try {
            // 1. Update rider work_status to busy
            await axiosSecure.patch(`/riders/asignStatus/${rider._id}`, {
                work_status: 'busy',
            });

            // 2. Assign this rider to the parcel
            await axiosSecure.patch(`/parcels/assign/${selectedParcel._id}`, {
                riderEmail: rider.email,
            });

            Swal.fire('Success', `Assigned ${rider.name} to parcel.`, 'success');
            setSelectedParcel(null); // close modal
            refetch();
        } catch (error) {
            Swal.fire('Error', 'Failed to assign rider.', 'error');
        }
    };

    return (
        <div className="p-4 max-w-7xl mx-auto">
            <h2 className="text-2xl font-bold mb-4 text-purple-700">Assign Rider to Parcels</h2>

            {/* ✅ Parcel Table */}
            {loadingParcels ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto shadow rounded-lg bg-white">
                    <table className="table w-full">
                        <thead className="bg-purple-100 text-purple-700">
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>Sender</th>
                                <th>From → To</th>
                                <th>Cost</th>
                                <th>Assign</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.senderName}</td>
                                    <td>
                                        {parcel.senderRegion} → {parcel.receiverRegion}
                                    </td>
                                    <td>৳{parcel.cost}</td>
                                    <td>
                                        <button
                                            onClick={() => setSelectedParcel(parcel)}
                                            className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm"
                                        >
                                            Assign Rider
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* ✅ Rider Modal */}
            {selectedParcel && (
                <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg w-full max-w-3xl shadow-xl">
                        <h2 className="text-xl font-bold mb-4 text-purple-700">
                            Assign Rider - Region: {selectedParcel.senderRegion}
                        </h2>

                        {loadingRiders ? (
                            <p>Loading riders...</p>
                        ) : riders.length === 0 ? (
                            <p className="text-gray-500">No available riders in this region.</p>
                        ) : (
                            <table className="table w-full mb-4">
                                <thead className="bg-gray-100 text-gray-700">
                                    <tr>
                                        <th>Name</th>
                                        <th>Email</th>
                                        <th>Region</th>
                                        <th>Status</th>
                                        <th>Assign</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {riders.map((rider) => (
                                        <tr key={rider._id}>
                                            <td>{rider.name}</td>
                                            <td>{rider.email}</td>
                                            <td>{rider.region}</td>
                                            <td>
                                                <span className="text-green-600 text-sm">{rider.status}</span>
                                            </td>
                                            <td>
                                                <button
                                                    onClick={() => handleAssign(rider)}
                                                    className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded"
                                                >
                                                    Assign
                                                </button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}

                        <div className="text-right">
                            <button
                                onClick={() => setSelectedParcel(null)}
                                className="text-gray-600 hover:text-red-500 font-medium"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AssignRider;
