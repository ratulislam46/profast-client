import React from 'react';
import { FaSpinner } from 'react-icons/fa';

const Loading = () => {
    return (
        <div className="flex flex-col items-center justify-center h-screen bg-base-100 text-base-content">
            <FaSpinner className="animate-spin text-5xl text-primary mb-4" />
            <p className="text-lg font-medium">Loading, please wait...</p>
        </div>
    );
};

export default Loading;
