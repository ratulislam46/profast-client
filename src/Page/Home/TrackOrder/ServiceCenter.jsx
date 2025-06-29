import React from 'react';
import { Marker, Popup } from 'react-leaflet';

const ServiceCenter = ({ district }) => {
    return (
        <Marker position={[district.latitude, district.longitude]}>
            <Popup>
                <div className="bg-base-100 shadow-xl">
                    <div className="p-4">
                        <p><span className="font-semibold">Region:</span> {district.region}</p>
                        <p><span className="font-semibold ">city:</span> {district.city}</p>
                        <div>
                            <span className="font-semibold">Areas Covered:</span>
                            <ul className="list-disc list-inside text-sm mt-1">
                                {district.covered_area?.map((area, i) => (
                                    <li key={i}>{area}</li>
                                ))}
                            </ul>
                        </div>
                        <p className='font-semibold'>Status: <span className='text-green-500'>{district.status}</span></p>
                    </div>
                </div>
            </Popup>

        </Marker>
    );
};

export default ServiceCenter;