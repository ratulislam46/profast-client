import React from 'react';

const SupportCard = ({ feature }) => {
    return (
        <div
            className="flex flex-row items-center gap-6 bg-base-100 shadow-md rounded-xl p-6"
        >
            {/* Image Left */}
            <div>
                <img
                    src={feature.image}
                    alt={feature.title}
                    className="w-full h-auto rounded-lg object-contain"
                />
            </div>

            {/* Divider (Desktop only) */}
            <div className="hidden md:flex justify-center">
                <div className="divider divider-horizontal h-full mx-4" />
            </div>

            {/* Text Right */}
            <div className="md:w-2/3">
                <h3 className="text-2xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.details}</p>
            </div>
        </div>
    );
};

export default SupportCard;