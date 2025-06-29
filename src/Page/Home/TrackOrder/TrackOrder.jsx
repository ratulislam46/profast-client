// src/pages/TrackOrder.jsx
import { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import ServiceCenter from './ServiceCenter';

const TrackOrder = () => {
    const [search, setSearch] = useState('');
    const [districtData, setDistricData] = useState([]);

    useEffect(() => {
        fetch('/serviceCenter.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setDistricData(data)
            })
    }, []);
    // console.log(districtData);

    return (
        <div className="mt-14 mb-25">
            <h2 className="text-3xl font-bold text-center text-primary mb-8">We are available in 64 districts</h2>

            <div className="flex justify-center mb-6">
                <input
                    type="text"
                    placeholder="Search district..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    className="input input-bordered w-full max-w-xs"
                />
            </div>

            <MapContainer
                center={[23.685, 90.3563]}
                zoom={7} className='h-[800px]'>
                <TileLayer
                    attribution='&copy; <a href="https://osm.org/">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {districtData.map((district, index) => (
                    <ServiceCenter key={index} district={district} ></ServiceCenter>
                ))}
            </MapContainer>
        </div>
    );
};

export default TrackOrder;
