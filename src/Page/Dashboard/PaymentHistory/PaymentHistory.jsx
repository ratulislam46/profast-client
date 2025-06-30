import React, { use } from 'react';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import { useQuery } from '@tanstack/react-query';
import { MdDeleteForever } from 'react-icons/md';
import axios from 'axios';

const PaymentHistory = () => {

    const { user } = use(AuthContext);
    const axiosSecure = UseAxiosSecure();

    const { data: payments = [], isLoading, refetch } = useQuery({
        queryKey: ['payments', user.email],
        queryFn: async () => {
            const result = await axiosSecure.get(`/payments?email=${user.email}`);
            return result.data;
        }
    })
    if (isLoading) {
        return <span>loading ....</span>
    }
    // console.log(payments);

    const handleDelete = (_id) => {
        axios.delete(`http://localhost:5000/payments/${_id}`)
            .then(res => {
                console.log(res.data);
                refetch()
            })
            .catch(error => {
                console.log(error);
            })
    }

    return (
        <div className="overflow-x-auto p-4">
            <h2 className="text-xl font-semibold mb-4">💳 Payment History</h2>
            <table className="table w-full bg-base-100 shadow">
                <thead className="bg-base-200 text-neutral text-sm">
                    <tr>
                        <th>#</th>
                        <th>Parcel ID</th>
                        <th>Transaction ID</th>
                        <th>Amount</th>
                        <th>Date</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {payments.length > 0 ?
                        (
                            payments.map((payment, index) => (
                                <tr key={payment._id}>
                                    <td>{index + 1}</td>
                                    <td>{payment.parcelId}</td>
                                    <td>{payment.transactionId}</td>
                                    <td className='text-green-500 font-bold'>৳{payment.amount}</td>
                                    <td>{new Date(payment.paid_at).toLocaleString('en-BD')}</td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(payment._id)}
                                            className='text-red-500 px-2 py-2 rounded-full bg-primary cursor-pointer '>
                                            <MdDeleteForever size={24} />
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) :
                        <tr>
                            <td className='text-center text-gray-500 py-6'>
                                No payment history found
                            </td>
                        </tr>

                    }

                </tbody>
            </table>
        </div>
    );
};

export default PaymentHistory;