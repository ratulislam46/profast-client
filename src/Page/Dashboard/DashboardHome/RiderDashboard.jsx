import { useQuery } from '@tanstack/react-query';
import React, { use } from 'react';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { FaBox, FaCheckCircle, FaClock, FaTruck } from 'react-icons/fa';


const COLORS = ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"];

const statusIcons = {
    delivered: <FaCheckCircle className="text-green-500 text-3xl" />,
    rider_assigned: <FaTruck className="text-orange-500 text-3xl" />,
    in_transit: <FaClock className="text-red-500 text-3xl" />,
    service_center_delivered: <FaBox className="text-blue-500 text-3xl" />,
};

const statusColors = {
    delivered: "bg-green-100 text-green-800",
    rider_assigned: "bg-orange-100 text-orange-800",
    in_transit: "bg-red-100 text-red-800",
    service_center_delivered: "bg-blue-100 text-blue-800",
};

const RiderDashboard = () => {

    const { user } = use(AuthContext)
    const axiosSecure = UseAxiosSecure();

    const { data = [] } = useQuery({
        queryKey: [],
        queryFn: async () => {
            const res = await axiosSecure.get(`/riders/delivery/status-count?email=${user?.email}`)
            return res.data;
        }
    })
    console.log(data);

    return (
        <div className="max-w-4xl mx-auto p-4">
            <h2 className="text-xl font-bold mb-6 text-center">Your Delivery Summary</h2>

            {/* card  */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                {data.map(({ status, count }, index) => (
                    <div
                        key={index}
                        className={`rounded-xl p-4 shadow-md border ${statusColors[status] || "bg-gray-100 text-gray-800"}`}
                    >
                        <div className="flex items-center justify-between mb-2">
                            <h3 className="capitalize font-semibold">{status.replaceAll("_", " ")}</h3>
                            {statusIcons[status] || <FaBox className="text-gray-500 text-3xl" />}
                        </div>
                        <p className="text-4xl font-bold text-center">{count}</p>
                    </div>
                ))}
            </div>


            {/* Pie chart  */}
            <div className="w-full h-[400px]">
                <ResponsiveContainer>
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="count"
                            nameKey="status"
                            cx="50%"
                            cy="50%"
                            outerRadius={120}
                            label
                        >
                            {data.map((_, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>

    );
};

export default RiderDashboard;