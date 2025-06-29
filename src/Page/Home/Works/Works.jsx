import React from 'react';
import { FaTruckPickup, FaMoneyBillWave, FaWarehouse, FaBuilding } from 'react-icons/fa';

const services = [
    {
        id: 1,
        title: "Booking Pick & Drop",
        "details": "Easily book our pickup and drop-off service for your parcels right from your location.",
        icon: <FaTruckPickup className="text-4xl text-blue-600 mb-4" />
    },
    {
        id: 2,
        title: "Cash On Delivery",
            "details": "Deliver products with the convenience of collecting payments at the customer's doorstep.",
        icon: <FaMoneyBillWave className="text-4xl text-green-600 mb-4" />
    },
    {
        id: 3,
        title: "Delivery Hub",
        "details": "Access our secure and fast delivery hubs for storing and dispatching your packages.",
        icon: <FaWarehouse className="text-4xl text-yellow-600 mb-4" />
    },
    {
        id: 4,
        title: "Booking SME & Corporate",
            "details": "Customized logistics solutions tailored for small businesses and corporate clients.",
        icon: <FaBuilding className="text-4xl text-purple-600 mb-4" />
    }
];

const Works = () => {
    return (
        <section className="mb-25 mt-15 md:px-16">
            <h2 className="text-3xl text-primary font-bold mb-10">How it Works</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {services.map(service => (
                    <div
                        service={service}
                        key={service.id}
                        className="bg-white shadow-md rounded-2xl p-6  hover:shadow-xl"
                    >
                        {service.icon}
                        <h3 className="text-xl text-primary font-semibold mb-2">{service.title}</h3>
                        <p className="text-gray-600 text-sm">{service.details}</p>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default Works;