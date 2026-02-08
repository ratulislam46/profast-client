// src/pages/BeARider.jsx
import React, { use, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import riderImage from '../../../../public/images/rider.png';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import UseAxiosSecure from '../../../hook/UseAxiosSecure';
import Swal from 'sweetalert2';

const BeARider = () => {
    const { user } = use(AuthContext);
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm({
        defaultValues: {
            name: user?.displayName || '',
            email: user?.email || ''
        }
    });
    const axiosSecure = UseAxiosSecure();
    const [serviceCenters, setServiceCenters] = useState([]);

    const riderRegion = watch("region");

    useEffect(() => {
        fetch('/serviceCenter.json')
            .then(res => res.json())
            .then(data => {
                // console.log(data);
                setServiceCenters(data)
            })
    }, []);

    const uniqueRegions = useMemo(() => {
        const regions = serviceCenters.map(center => center.region);
        return [...new Set(regions)];
    }, [serviceCenters]);

    const filteredSenderCenters = serviceCenters.filter(c => c.region === riderRegion);


    const onSubmit = async (data) => {

        // send to server or firebase
        const riderData = {
            ...data,
            status: 'pending',
            created_at: new Date().toISOString()
        };
        console.log(riderData);
        axiosSecure.post('/riders', riderData)
            .then(result => {
                console.log(result.data);
                if (result.data) {
                    Swal.fire({
                        title: "Application Submitted!",
                        icon: "success",
                        text: 'Your application is pending approval'
                    })
                }

            })
            .catch((error) => {
                console.log('error from be a rider', error);
            })
        reset()
    };

    return (
        <div className='container mx-auto px-2 lg:px-0'>
            <div className="bg-base-100 py-10 px-4">
                <div className="shadow-lg rounded-xl overflow-hidden grid md:grid-cols-2 gap-8 p-6 md:p-10 items-center">

                    {/* Left: Form Section */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6 text-center md:text-left">Be A Rider</h2>
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                            {/* Name */}
                            <input
                                {...register('name')}
                                type="text"
                                placeholder="Your Name"
                                className="input input-bordered w-full"
                            />
                            {errors.name && <p className="text-red-500 text-sm">Name is required</p>}

                            {/* Age */}
                            <input
                                {...register('age', { required: true })}
                                type="number"
                                placeholder="Your Age"
                                className="input input-bordered w-full"
                            />
                            {errors.age && <p className="text-red-500 text-sm">Age is required</p>}

                            {/* Email */}
                            <input
                                {...register('email', { required: true })}
                                type="email"
                                readOnly
                                placeholder="Your Email"
                                className="input input-bordered w-full"
                            />
                            {errors.email && <p className="text-red-500 text-sm">Email is required</p>}

                            {/* Region */}
                            <fieldset>
                                <select {...register("region", { required: true })} className="select select-bordered w-full">
                                    <option value="">Select Region</option>
                                    {uniqueRegions.map((region) => (
                                        <option key={region} value={region}>{region}</option>
                                    ))}
                                </select>
                            </fieldset>
                            {errors.region && <p className="text-red-500 text-sm">Region is required</p>}

                            {/* District */}
                            <fieldset>
                                <select {...register("district", { required: true })} className="select select-bordered w-full">
                                    <option value="">Select Service Center</option>
                                    {filteredSenderCenters.map(center => (
                                        <option key={center.id} value={center.district}>
                                            {center.name} ({center.district})
                                        </option>
                                    ))}
                                </select>
                            </fieldset>
                            {errors.district && <p className="text-red-500 text-sm">District is required</p>}

                            {/* NID Number */}
                            <input
                                {...register('nid', { required: true })}
                                type="text"
                                placeholder="NID Number"
                                className="input input-bordered w-full"
                            />
                            {errors.nid && <p className="text-red-500 text-sm">NID number is required</p>}

                            {/* Contact Number */}
                            <input
                                {...register('contact', { required: true })}
                                type="tel"
                                placeholder="Contact Number"
                                className="input input-bordered w-full"
                            />
                            {errors.contact && <p className="text-red-500 text-sm">Contact number is required</p>}

                            {/* Textarea */}
                            <textarea
                                {...register('message')}
                                placeholder="Additional Message or Address"
                                className="textarea textarea-bordered w-full"
                                rows={4}
                            />

                            {/* Submit Button */}
                            <button className="btn bg-secondary text-primary w-full">Submit</button>
                        </form>
                    </div>

                    {/* Right: Image Section */}
                    <div className=" md:block">
                        <img src={riderImage} alt="Rider" className="w-full h-auto rounded-xl object-cover" />
                    </div>

                </div>
            </div>
        </div>
    );
};

export default BeARider;
