import React from 'react';
import ServiceCard from './ServiceCard';
import { FaTruck, FaMapMarkedAlt, FaWarehouse, FaMoneyBillWave, FaHandshake, FaUndo } from "react-icons/fa";

const serviceData = [
    {
        title: "Express & Standard Delivery",
        description: "We deliver parcels within 24–72 hours in Dhaka, Chittagong, Sylhet, Khulna, and Rajshahi. Express delivery available in Dhaka within 4–6 hours from pick-up to drop-off.",
        icon: FaTruck
    },
    {
        title: "Nationwide Delivery",
        description: "We deliver parcels nationwide with home delivery in every district, ensuring your products reach customers within 48–72 hours.",
        icon: FaMapMarkedAlt
    },
    {
        title: "Fulfillment Solution",
        description: "We also offer customized service with inventory management support, online order processing, packaging, and after sales support.",
        icon: FaWarehouse
    },
    {
        title: "Cash on Home Delivery",
        description: "100% cash on delivery anywhere in Bangladesh with guaranteed safety of your product.",
        icon: FaMoneyBillWave
    },
    {
        title: "Corporate Service / Contract In Logistics",
        description: "Customized corporate services which includes warehouse and inventory management support.",
        icon: FaHandshake
    },
    {
        title: "Parcel Return",
        description: "Through our reverse logistics facility we allow end customers to return or exchange their products with online business merchants.",
        icon: FaUndo
    }
];


const Services = () => {
    return (
        <div className='bg-[#03373D] border rounded-3xl'>
            <div className="px-4 py-16 md:px-10">
                <div className="text-center max-w-2xl mx-auto mb-12">
                    <h2 className="text-4xl font-bold text-white mb-4">Our Services</h2>
                    <p className="text-gray-300 text-lg">
                        Enjoy fast, reliable parcel delivery with real-time tracking and zero hassle. From personal packages to business shipments — we deliver on time, every time.
                    </p>
                </div>

                <div data-aos="fade-right" className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                    {serviceData.map((service, index) => (
                        <ServiceCard key={index} service={service}></ServiceCard>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Services;