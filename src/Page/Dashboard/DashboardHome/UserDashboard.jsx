import React, { use } from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../hook/UseAxiosSecure";
import { FaBox, FaTruck, FaTimesCircle, FaCheckCircle } from "react-icons/fa";
import { AuthContext } from "../../../Context/AuthContex/AuthContext";

const statusData = {
    delivered: {
        icon: <FaCheckCircle className="text-green-500 text-4xl" />,
        bg: "bg-gradient-to-r from-green-100 to-green-200",
        text: "text-green-800",
    },
    rider_assigned: {
        icon: <FaTruck className="text-orange-500 text-4xl" />,
        bg: "bg-gradient-to-r from-orange-100 to-orange-200",
        text: "text-orange-800",
    },
    not_collected: {
        icon: <FaTimesCircle className="text-red-500 text-4xl" />,
        bg: "bg-gradient-to-r from-red-100 to-red-200",
        text: "text-red-800",
    },
    service_center_delivered: {
        icon: <FaBox className="text-blue-500 text-4xl" />,
        bg: "bg-gradient-to-r from-blue-100 to-blue-200",
        text: "text-blue-800",
    },
};

const UserDeliveryStatusCards = () => {
    const axiosSecure = useAxiosSecure();
    const { user } = use(AuthContext)

    const { data = [] } = useQuery({
        queryKey: ["userStatusCount", user?.email],
        enabled: !!user?.email,
        queryFn: async () => {
            const res = await axiosSecure.get(`/users/delivery/status-count?email=${user.email}`);
            return res.data;
        },
    });

    if (!data || data.length === 0) {
        return (
            <div className="p-6 text-center">
                <h2 className="text-2xl font-bold text-gray-700 mb-2">
                    No Delivery Data Found
                </h2>
                <p className="text-gray-500">
                    You haven’t created or delivered any parcels yet.
                </p>
            </div>
        );
    }

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
                📦 Your Parcel Delivery Overview
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map(({ status, count }, index) => {
                    const config = statusData[status] || {
                        icon: <FaBox className="text-gray-500 text-4xl" />,
                        bg: "bg-gray-100",
                        text: "text-gray-700",
                    };

                    return (
                        <div
                            key={index}
                            className={`rounded-2xl shadow-md p-6 hover:shadow-xl transition-all duration-300 ${config.bg}`}
                        >
                            <div className="flex items-center justify-between mb-4">
                                <div
                                    className={`text-lg font-semibold capitalize ${config.text}`}
                                >
                                    {status.replaceAll("_", " ")}
                                </div>
                                {config.icon}
                            </div>
                            <div className="text-4xl font-bold text-center text-gray-800">
                                {count}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default UserDeliveryStatusCards;
