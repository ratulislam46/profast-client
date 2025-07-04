import React from "react";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTruck, FaBoxOpen, FaWarehouse, FaClock, } from "react-icons/fa";
import UseAxiosSecure from "../../../hook/UseAxiosSecure";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";


const COLORS = ["#00C49F", "#FF8042", "#8884D8", "#FFBB28", "#FF6384"];

const statusConfig = {
    delivered: { title: "Delivered", icon: <FaCheckCircle className="text-green-600 text-4xl" />, color: "bg-green-100 text-green-800" },
    rider_assigned: { title: "Rider Assigned", icon: <FaTruck className="text-blue-600 text-4xl" />, color: "bg-blue-100 text-blue-800", },
    not_collected: { title: "Not Collected", icon: <FaBoxOpen className="text-red-600 text-4xl" />, color: "bg-red-100 text-red-800", },
    in_transit: { title: "In Transit", icon: <FaClock className="text-yellow-600 text-4xl" />, color: "bg-yellow-100 text-yellow-800", },
    service_center_delivered: { title: "Delivered to Center", icon: <FaWarehouse className="text-purple-600 text-4xl" />, color: "bg-purple-100 text-purple-800", },
};

const AdminDashboard = () => {
    const axiosSecure = UseAxiosSecure();

    const { data = [], error } = useQuery({
        queryKey: ["parcelStatusCount"],
        queryFn: async () => {
            const res = await axiosSecure.get("/parcels/delivery/status-count");
            return res.data;
        },
    });

    if (error) return <div className="text-center text-red-600 py-10">Error loading data</div>;

    return (
        <div className="max-w-7xl mx-auto px-4 py-8">
            <h2 className="text-3xl font-bold text-center mb-8"> Parcel Delivery Overview</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {data.map(({ status, count }, idx) => {
                    const config = statusConfig[status] || {
                        title: status.replace(/_/g, " "),
                        icon: <FaBoxOpen className="text-gray-600 text-4xl" />,
                        color: "bg-gray-100 text-gray-800",
                    };

                    return (
                        <div key={idx} className={`card shadow-md ${config.color}`}>
                            <div className="card-body flex flex-col items-center text-center">
                                <div>{config.icon}</div>
                                <h2 className="card-title text-xl font-semibold capitalize">
                                    {config.title}
                                </h2>
                                <p className="text-4xl font-bold">{count}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* pie chart  */}
            <div className="w-full h-[400px] mt-12">
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
                            {data.map((entry, index) => (
                                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                        </Pie>
                        <Tooltip />
                        <Legend verticalAlign="bottom" />
                    </PieChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default AdminDashboard;
