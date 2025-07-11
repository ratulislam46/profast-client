import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import Swal from "sweetalert2";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { use } from "react";
import { AuthContext } from "../../../Context/AuthContex/AuthContext";


const CompletedDeliveries = () => {
    const axiosSecure = UseAxiosSecure()
    const queryClient = useQueryClient();
    const { user } = use(AuthContext)
    const email = user?.email;

    const { data: parcels = [], isLoading } = useQuery({
        queryKey: ["completedDeliveries", email],
        enabled: !!email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/complete-deliveries?email=${email}`);
            return res.data;
        },
    });

    const calculateEarning = (parcel) => {
        const cost = Number(parcel.cost);
        if (parcel.senderRegion === parcel.receiverRegion) {
            return cost * 0.6;
        } else {
            return cost * 0.4;
        }

    };

    // Mutation for cashout
    const { mutateAsync: cashout } = useMutation({
        mutationFn: async (parcelId) => {
            const res = await axiosSecure.patch(`/parcels/cashout/${parcelId}`);
            return res.data;
        },
        onSuccess: () => {
            queryClient.invalidateQueries(["completedDeliveries"]);
        },
    });

    const handleCashout = (parcelId) => {
        console.log(parcelId);
        Swal.fire({
            title: "Confirm Cashout",
            text: "You are about to cash out this delivery.",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Yes, Cash Out",
            cancelButtonText: "Cancel",
        }).then((result) => {
            if (result.isConfirmed) {
                cashout(parcelId)
                    .then(() => {
                        Swal.fire("Success", "Cashout completed.", "success");
                    })
                    .catch(() => {
                        Swal.fire("Error", "Failed to cash out. Try again.", "error");
                    });
            }
        });
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold mb-4">Completed Deliveries</h2>
            {isLoading ? (
                <p>Loading...</p>
            ) : parcels.length === 0 ? (
                <p className="text-gray-500">No deliveries yet.</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="table table-zebra w-full">
                        <thead>
                            <tr>
                                <th>Tracking ID</th>
                                <th>Title</th>
                                <th>From</th>
                                <th>To</th>
                                <th>Delivered At</th>
                                <th>Fee (৳)</th>
                                <th>Your Earning (৳)</th>
                                <th>Cashout</th>
                            </tr>
                        </thead>
                        <tbody>
                            {parcels.map((parcel) => (
                                <tr key={parcel._id}>
                                    <td>{parcel.tracking_id}</td>
                                    <td>{parcel.title}</td>
                                    <td>{parcel.senderRegion}</td>
                                    <td>{parcel.receiverRegion}</td>
                                    <td>{parcel.cashout_at ? new Date(parcel.cashout_at).toLocaleString() : "N/A"}</td>
                                    <td>৳{parcel.cost}</td>
                                    <td className="font-semibold text-green-600">৳{calculateEarning(parcel).toFixed(2)}</td>
                                    <td>
                                        {parcel.cashout_status === "cash_out" ? (
                                            <span className="badge badge-success text-xs px-2 py-1 whitespace-nowrap">
                                                Cashed Out
                                            </span>
                                        ) : (
                                            <button
                                                className="btn btn-sm btn-warning"
                                                onClick={() => handleCashout(parcel._id)}
                                            >
                                                Cashout
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

export default CompletedDeliveries;