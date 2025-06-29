import React from 'react';
import support from '/images/support.png'
import delivery from '/images/delivery.png'
import tracking from '/images/live-tracking.png'
import SupportCard from './SupportCard';

const features = [
    {
        id: 1,
        title: "Live Parcel Tracking",
        details: "Stay updated in real-time with our live parcel tracking feature. From pick-up to delivery, monitor your shipment's journey and get instant status updates for complete peace of mind.",
        image: tracking
    },
    {
        id: 2,
        title: "100% Safe Delivery",
        details: "We ensure your parcels are handled with the utmost care and delivered securely to their destination. Our reliable process guarantees safe and damage-free delivery every time.",
        image: delivery
    },
    {
        id: 3,
        title: "24/7 Call Center Support",
        details: "Our dedicated support team is available around the clock to assist you with any questions, updates, or delivery concerns—anytime you need us.",
        image: support
    }
];

const Support = () => {
    return (
        <section className="py-12 px-4 md:px-16 bg-white">
            <div className="space-y-8">
                {features.map(feature => (
                    <SupportCard key={feature.id} feature={feature}></SupportCard>
                ))}
            </div>
        </section>
    );
};

export default Support;