// src/pages/SentParcel.jsx
import { useForm } from "react-hook-form";
import { Toaster } from "react-hot-toast";
import { useState, useMemo, useEffect, use } from "react";
import Swal from "sweetalert2";
import { AuthContext } from '../../Context/AuthContex/AuthContext'
import UseAxiosSecure from '../../hook/UseAxiosSecure'
import { useNavigate } from "react-router";
import UseTrackingLogger from "../../hook/UseTrackingLogger";


const generateTrackingID = () => {
    const now = new Date();
    const datePart = now.toISOString().split("T")[0].replace(/-/g, "");
    const randomPart = Math.random().toString(36).substring(2, 8).toUpperCase(); // 
    return `TRK-${datePart}-${randomPart}`;
};


const SentParcel = () => {
    const axiosSecure = UseAxiosSecure()
    const { user } = use(AuthContext);
    const { register, handleSubmit, watch, reset } = useForm();
    const [cost, setCost] = useState(null);
    const [serviceCenters, setServiceCenters] = useState([]);
    const navigate = useNavigate();
    const { logTracking } = UseTrackingLogger();

    const senderRegion = watch("senderRegion");
    const receiverRegion = watch("receiverRegion");
    const parcelType = watch("parcelType");

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

    const filteredSenderCenters = serviceCenters.filter(c => c.region === senderRegion);
    const filteredReceiverCenters = serviceCenters.filter(c => c.region === receiverRegion);

    const onSubmit = (data) => {
        let totalCost = 0;
        let baseCost = 0;
        let extraCost = 0;
        const isRemote = data.receiverServiceCenter === "remote";
        const weight = parseFloat(data.weight) || 0;

        if (data.parcelType === "document") {
            baseCost = isRemote ? 80 : 60;
            extraCost = 0;
            totalCost = baseCost;
        } else if (data.parcelType === "non-document") {
            if (weight <= 3) {
                baseCost = isRemote ? 150 : 110;
                extraCost = 0;
                totalCost = baseCost;
            } else {
                const extraKg = weight - 3;
                extraCost = extraKg * 40;
                baseCost = isRemote ? 150 + 40 : 110; // 40 extra only for remote
                totalCost = baseCost + extraCost;
            }
        }

        //  Updated SweetAlert HTML
        const summaryHtml = `
  <div style="text-align: left; font-size: 16px;">
    <p><strong>Parcel Type:</strong> ${data.parcelType}</p>
    <p><strong> Weight:</strong> ${weight} kg</p>
    <p><strong> Delivery Zone:</strong> ${isRemote ? "Outside City (Remote)" : "Inside City"}</p>
    <hr style="margin: 10px 0;">
    <p><strong> Base Cost:</strong> ${baseCost}</p>
    <p><strong> Extra Weight:</strong>  ${weight - 3} kg</p>
    <p><strong> Extra Cost:</strong>  ${(weight - 3)} * 40 = ${extraCost}</p>
    <hr style="margin: 10px 0;">
    <p><strong> Total Delivery Cost:</strong> <span style="color:green; font-size:18px;">৳${totalCost}</span></p>
  </div>
`;

        Swal.fire({
            title: 'Confirm Parcel Details',
            html: summaryHtml,
            icon: 'info',
            showCancelButton: true,
            confirmButtonText: '✅ Continue',
            cancelButtonText: '✏️ Edit Parcel',
            confirmButtonColor: '#22c55e',
            cancelButtonColor: '#ef4444'
        }).then((result) => {
            if (result.isConfirmed) {
                const tracking_id = generateTrackingID()
                setCost(totalCost);
                const parcelData = {
                    ...data,
                    cost: totalCost,
                    created_by: user.email,
                    payment_status: 'unpaid',
                    delivery_status: 'not_collected',
                    creation_date: new Date().toISOString(),
                    tracking_id: tracking_id
                }
                console.log(parcelData);

                // save data to the server 
                axiosSecure.post('/parcels', parcelData)
                    .then(async (res) => {
                        console.log(res.data);
                        if (res.data.insertedId) {
                            Swal.fire({
                                title: '🎉 Success!',
                                text: 'Parcel Added Successfully!',
                                icon: 'success',
                                timer: 1500,
                                showConfirmButton: false
                            });
                        }

                        //tracking 
                        await logTracking({
                            tracking_id: parcelData.tracking_id,
                            status: "Parcel_created",
                            details: `create by ${user?.displayName}`,
                            updated_by: user?.email
                        })

                        navigate('/dashboard/myParcels')
                    })

                reset();
            }
        });

    };

    return (
        <div className='container mx-auto px-2 lg:px-0'>
            <div className="mt-8 px-2 md:px-4 lg:px-6">
                <div className="w-full p-6 bg-base-100 shadow rounded-xl">
                    <Toaster />
                    <h1 className="text-3xl font-bold text-primary mb-20 border-b-gray-600">Add Parcel</h1>
                    <p className="text-lg text-primary font-extrabold mb-4">Enter your parcel details</p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">

                        {/* Parcel Info */}
                        <div>
                            <h2 className="text-xl font-semibold mb-2">Parcel Info</h2>
                            <div className="flex flex-col md:flex-row gap-4 items-start">
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        value="document"
                                        {...register("parcelType", { required: true })}
                                        className="radio checked:bg-blue-500 mr-2"
                                    />
                                    <span className="label-text">Document</span>
                                </label>
                                <label className="label cursor-pointer">
                                    <input
                                        type="radio"
                                        value="non-document"
                                        {...register("parcelType", { required: true })}
                                        className="radio checked:bg-blue-500 mr-2"
                                    />
                                    <span className="label-text">Non-Document</span>
                                </label>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
                                <input {...register("title", { required: true })} placeholder="Parcel Title" className="input input-bordered" />

                                {parcelType === "non-document" && (
                                    <input type="number" step="0.1" {...register("weight")} placeholder="Weight (kg)" className="input input-bordered" />
                                )}
                            </div>
                        </div>

                        {/* Sender and Receiver Info Side by Side */}
                        <div className="lg:flex gap-6">
                            {/* Sender Info */}
                            <div className="flex-1 space-y-4">
                                <h2 className="text-xl font-semibold mb-2">Sender Info</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <fieldset>
                                        <label className="text-primary font-medium">Sender Name</label>
                                        <input placeholder="Your Name" {...register("senderName", { required: true })} className="input input-bordered w-full" />
                                    </fieldset>

                                    <fieldset>
                                        <label className="text-primary font-medium">Sender Region</label>
                                        <select {...register("senderRegion", { required: true })} className="select select-bordered w-full">
                                            <option value="">Select Region</option>
                                            {uniqueRegions.map(region => (
                                                <option key={region} value={region}>{region}</option>
                                            ))}
                                        </select>
                                    </fieldset>

                                    <fieldset>
                                        <label className="text-primary font-medium">Sender Address</label>
                                        <input {...register("senderAddress", { required: true })} placeholder="Sender Address" className="input input-bordered w-full" />
                                    </fieldset>

                                    <fieldset>
                                        <label className="text-primary font-medium">Sender Contact No</label>
                                        <input {...register("senderContact", { required: true })} placeholder="Sender Contact No" className="input input-bordered w-full" />
                                    </fieldset>
                                </div>

                                <fieldset>
                                    <label className="text-primary font-medium">Sender Service Center</label>
                                    <select {...register("senderServiceCenter", { required: true })} className="select select-bordered w-full">
                                        <option value="">Select Service Center</option>
                                        {filteredSenderCenters.map(center => (
                                            <option key={center.id} value={center.district}>
                                                {center.name} ({center.district})
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                                <fieldset>
                                    <label className="text-primary font-medium">Sender Instruction</label>
                                    <textarea
                                        {...register("pickupInstruction", { required: true })}
                                        placeholder="Pickup Instruction"
                                        className="textarea textarea-bordered w-full"
                                        rows={3}
                                    />
                                </fieldset>
                            </div>

                            {/* Receiver Info */}
                            <div className="flex-1 space-y-4 mt-8 lg:mt-0">
                                <h2 className="text-xl font-semibold mb-2">Receiver Info</h2>
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                    <fieldset>
                                        <label className="text-primary font-medium">Receiver Name</label>
                                        <input {...register("receiverName", { required: true })} placeholder="Receiver Name" className="input input-bordered w-full" />
                                    </fieldset>

                                    <fieldset>
                                        <label className="text-primary font-medium">Receiver Region</label>
                                        <select {...register("receiverRegion", { required: true })} className="select select-bordered w-full">
                                            <option value="">Select Region</option>
                                            {uniqueRegions.map(region => (
                                                <option key={region} value={region}>{region}</option>
                                            ))}
                                        </select>
                                    </fieldset>

                                    <fieldset>
                                        <label className="text-primary font-medium">Receiver Address</label>
                                        <input {...register("receiverAddress", { required: true })} placeholder="Receiver Address" className="input input-bordered w-full" />
                                    </fieldset>

                                    <fieldset>
                                        <label className="text-primary font-medium">Receiver Contact No</label>
                                        <input {...register("receiverContact", { required: true })} placeholder="Receiver Contact" className="input input-bordered w-full" />
                                    </fieldset>
                                </div>

                                <fieldset>
                                    <label className="text-primary font-medium">Receiver Service Center</label>
                                    <select {...register("receiverServiceCenter", { required: true })} className="select select-bordered w-full">
                                        <option value="">Select Service Center</option>
                                        {filteredReceiverCenters.map(center => (
                                            <option key={center.id} value={center.district}>
                                                {center.name} ({center.district})
                                            </option>
                                        ))}
                                    </select>
                                </fieldset>

                                <fieldset>
                                    <label className="text-primary font-medium">Delivery Instruction</label>
                                    <textarea
                                        {...register("deliveryInstruction", { required: true })}
                                        placeholder="Delivery Instruction"
                                        className="textarea textarea-bordered w-full"
                                        rows={3}
                                    />
                                </fieldset>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <div className="text-center">
                            <button type="submit" className="btn btn-secondary text-primary">Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SentParcel;
