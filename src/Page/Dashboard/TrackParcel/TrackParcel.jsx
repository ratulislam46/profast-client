import { useParams } from 'react-router';
import { useQuery } from '@tanstack/react-query';
// import moment from 'moment';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';

const TrackParcel = () => {
    const { trackingId } = useParams;
    const axiosSecure = UseAxiosSecure()

    const { data: parcel, isLoading, error } = useQuery({
        queryKey: ['track-parcel', trackingId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/track/${trackingId}`);
            return res.data;
        },
        enabled: !!trackingId, 
    });

    if (isLoading) return <p className="text-center py-8">Loading...</p>;
    if (error) return <p className="text-center text-red-500">Error: {error.message}</p>;
    if (!parcel) return <p className="text-center text-gray-500">Parcel not found.</p>;

    return (
        <div className="max-w-3xl mx-auto p-6 bg-white shadow rounded-md">
            <h2 className="text-2xl font-semibold mb-4 text-center">Parcel Tracking Info</h2>

            <div className="space-y-2">
                <p><strong>Tracking ID:</strong> {parcel.tracking_id}</p>
                <p><strong>Title:</strong> {parcel.title}</p>
                <p><strong>Parcel Type:</strong> {parcel.parcelType}</p>
                <p><strong>Sender:</strong> {parcel.senderRegion} ➝ <strong>Receiver:</strong> {parcel.receiverRegion}</p>
                <p><strong>Current Status:</strong> <span className="badge badge-info">{parcel.delivery_status}</span></p>
                <p><strong>Assigned Rider:</strong> {parcel.assigned_rider_name || 'Not Assigned'}</p>
                {/* <p><strong>Created At:</strong> {moment(parcel.creation_date).format('LLL')}</p> */}
            </div>

            <div className="mt-6">
                <h3 className="text-lg font-medium mb-2">📦 Delivery Timeline</h3>
                <ul className="timeline timeline-vertical">
                    <li className="timeline-item">✅ Booked</li>
                    {parcel.delivery_status !== 'not_collected' && <li className="timeline-item">🛵 Assigned</li>}
                    {parcel.delivery_status === 'in_transit' || parcel.delivery_status === 'delivered' ? <li className="timeline-item">📦 Picked Up</li> : null}
                    {parcel.delivery_status === 'delivered' && <li className="timeline-item">✅ Delivered</li>}
                </ul>
            </div>
        </div>
    );
};

export default TrackParcel;
