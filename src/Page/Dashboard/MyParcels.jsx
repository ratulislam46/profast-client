import React, { use } from 'react'
import { AuthContext } from '../../Context/AuthContex/AuthContext';
import UseAxiosSecure from '../../hook/UseAxiosSecure'
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { Link, useNavigate } from 'react-router';

const MyParcels = () => {

    const { user } = use(AuthContext)
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();
    const { data: parcels = [], refetch } = useQuery({
        queryKey: ['my-parcels', user.email],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels?email=${user.email}`);
            return res.data;
        }
    })
    console.log(parcels);

    const handlePay = (id) => {
        console.log('proceed to payment', id);
        navigate(`/dashboard/payment/${id}`)
    }

    const handleDelete = async (_id) => {
        const confirm = await Swal.fire({
            title: "Are you sure?",
            text: "The parcel will be parmanetly delete!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        })
        if (confirm.isConfirmed) {
            try {
                axiosSecure.delete(`/parcels/${_id}`)
                    .then(res => {
                        console.log(res.data)
                        if (res.data.deletedCount) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "Parcel has been deleted.",
                                icon: "success",
                                timer: 1500,
                                showConfirmButton: false,
                            });
                        }
                        refetch()
                    })
                    .catch(error => {
                        console.log(error);
                    })
            }
            catch (err) {
                Swal.fire("Error", err.message || "Failed to delete parcel", "error");
            }
        }
    }

    return (
        <div className="overflow-x-auto p-4">
            <table className="table w-full bg-base-100 shadow">
                <thead className="bg-base-200 text-base font-semibold text-neutral">
                    <tr>
                        <th>#</th>
                        <th>Title</th>
                        <th>Type</th>
                        <th>Date</th>
                        <th>Payment</th>
                        <th>Total Cost</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map((parcel, index) => (
                        <tr key={parcel._id} className="hover">
                            <td>{index + 1}</td>
                            <td>{parcel.title}</td>
                            <td>{parcel.parcelType}</td>
                            <td>
                                {new Date(parcel.creation_date).toLocaleString('en-BD', {
                                    dateStyle: 'medium',
                                    timeStyle: 'short',
                                    hour12: true,
                                })}
                            </td>
                            <td>
                                <span className={`badge text-white ${parcel.payment_status === "paid" ? 'bg-green-500' : 'bg-red-500'}`}>
                                    {parcel.payment_status === "paid" ? 'Paid' : 'Unpaid'}
                                </span>
                            </td>
                            <td className='text-green-600 font-extrabold'>৳{parcel.cost}</td>
                            <td className="lg:space-x-1 space-y-1 lg:flex ">
                                <button size="sm" className='btn btn-info'>View</button>

                                {
                                    parcel.payment_status === "paid" ?
                                        " " :
                                        <Link onClick={() => handlePay(parcel._id)} size="sm" className='btn btn-success'>Pay</Link>
                                }

                                <button onClick={() => handleDelete(parcel._id)} size="sm" className='btn btn-warning'>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyParcels;