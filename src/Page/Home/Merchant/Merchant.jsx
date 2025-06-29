import React from 'react';
import location from '../../../assets/location.png'

const Merchant = () => {
    return (
        <div  data-aos="zoom-in-right" className="bg-[url(/images/merchantbg.png)] bg-no-repeat  bg-[#03373D] rounded-3xl p-20 mb-25">
            <div className="hero-content flex-col lg:flex-row-reverse">
                <img
                    src={location}
                    className="max-w-sm rounded-lg"
                />
                <div>
                    <h1 className="text-5xl text-white font-bold">Merchant and Customer Satisfaction is Our Frst Priority</h1>
                    <p className="py-6 text-gray-400">
                        Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem
                        quasi. In deleniti eaque aut repudiandae et a id nisi.
                    </p>
                    <button className="btn bg-secondary text-black rounded-full mr-5 ">Become a Marchant</button>
                    <button className="btn test-[#CAEB66] btn-outline border-secondary hover:bg-secondary hover:text-black text-secondary rounded-full mt-4 md:mt-0 ">Earn with Profast Courier</button>
                </div>
            </div>
        </div>
    );
};

export default Merchant;