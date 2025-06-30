// src/pages/Forbidden.jsx
import React from 'react';
import { MdBlock } from 'react-icons/md';
import { Link } from 'react-router';

const Forbidden = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-red-50 text-center px-4">
            <MdBlock className="text-6xl text-red-500 mb-4" />
            <h1 className="text-3xl font-bold text-red-600 mb-2">403 - Forbidden</h1>
            <p className="text-gray-600 mb-4">You do not have permission to access this page.</p>
            <Link
                to="/"
                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
            >
                Go to Home
            </Link>
        </div>
    );
};

export default Forbidden;
