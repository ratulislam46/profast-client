import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { use, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import Swal from 'sweetalert2';

const PaymentForm = () => {

    const { user } = use(AuthContext)
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState('');
    const { parcelId } = useParams();
    // console.log(parcelId);
    const axiosSecure = UseAxiosSecure();
    const navigate = useNavigate();


    // get parcel by spesific id 
    const { isPending, data: parcelInfo = {} } = useQuery({
        queryKey: ['parcel', parcelId],
        queryFn: async () => {
            const res = await axiosSecure.get(`/parcels/${parcelId}`);
            return res.data;
        },
    })

    if (isPending) {
        return <span>Loading...</span>
    }

    console.log(parcelInfo);
    const cost = parcelInfo.cost;
    const ammoutCents = cost * 100;
    console.log(ammoutCents);

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        const card = elements.getElement(CardElement);
        if (!card) {
            return;
        }
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        });
        if (error) {
            console.log('error', error)
            setError(error.message)
        }
        else {
            setError('')
            console.log('payment method', paymentMethod);
        }

        // create payment intent 
        const res = await axiosSecure.post('/create-payment-intent', {
            ammoutCents: ammoutCents,
            parcelId: parcelId
        })

        console.log('res from intent', res);
        const clientSecret = res.data.clientSecret;

        const result = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: user?.displayName,
                    email: user.email
                },
            },
        });

        if (result.error) {
            setError(result.error)
            console.log(result.error.message);
        }
        else {
            if (result.paymentIntent.status === "succeeded") {
                setError('');
                toast.success('Payment succeeded');
                console.log('payment succeeded', result);

                //post payment data in database
                const transactionId = result.paymentIntent.id;
                const paymentData = {
                    parcelId,
                    email: user.email,
                    amount: cost,
                    paymentMethod: result.paymentIntent.payment_method_types,
                    transactionId: transactionId

                }
                const paymentResult = await axiosSecure.post('/payments', paymentData)
                if (paymentResult.data.insertedId) {
                    console.log('payment successfully');
                    await Swal.fire({
                        icon: 'success',
                        title: 'Payment successfull!',
                        html: `<strong>TransactionID : ${transactionId}</strong>`,
                        confirmButtonText: 'Go to My parcel'
                    })
                    navigate('/dashboard/myParcels')
                }
            }
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit} className='space-y-4 bg-white mt-12 p-6 rounded-xl shadow-md w-full max-w-md mx-auto'>
                <CardElement className='p-2 border  rounded'></CardElement>
                <button
                    type="submit"
                    disabled={!stripe}
                    className='btn btn-secondary w-full text-primary mt-2'>
                    Pay ${cost}
                </button>
                {
                    error && <p className='text-red-500'>{error}</p>
                }
            </form>
        </div>
    );
};

export default PaymentForm;