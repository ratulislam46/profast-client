import React from 'react';

const ServiceCard = ({ service }) => {

    const { title, description, icon: Icon } = service;

    return (
        <div className='border border-gray-400 bg-white py-4 px-4 rounded-xl hover:bg-secondary'>
            <div className="flex items-center justify-center mb-4 text-primary">
                <Icon className="text-5xl" />
            </div>
            <div className="text-center">
                <h3 className="text-xl text-primary font-semibold mb-2">{title}</h3>
                <p className="">{description}</p>
            </div>
        </div>
    );
};

export default ServiceCard;