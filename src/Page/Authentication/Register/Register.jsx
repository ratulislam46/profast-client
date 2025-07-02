import React, { use, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import GoogleLogin from '../GoogleLogin/GoogleLogin';
import axios from 'axios';
import UseAxios from '../../../hook/UseAxios';

const Register = () => {

    const { createUser, uploadUserProfile } = use(AuthContext)

    const { register, handleSubmit, formState: { errors } } = useForm();
    const [imageURL, setImageURL] = useState('');
    const axiosInstance = UseAxios();
    const navigate = useNavigate();

    const handleRegister = data => {
        console.log(data);
        createUser(data.email, data.password)
            .then(async (result) => {
                navigate('/login')
                console.log(result.user);

                // update userinfo  in the database 
                const userInfo = {
                    email: data.email,
                    role: 'user',    //default role
                    created_at: new Date().toISOString(),
                    last_login: new Date().toISOString()
                }
                const userRes = await axiosInstance.post('/users', userInfo);
                console.log(userRes.data);

                // update user profile in firebase 
                const userProfile = {
                    displayName: data.name,
                    photURL: imageURL
                }
                uploadUserProfile(userProfile)
                    .then(() => {
                        console.log('Profile updated');
                    })
                    .catch(error => {
                        console.log('error', error);
                    })
            })
            .catch(error => {
                console.log('error', error);
            })
    }

    const handleUploadImage = async (e) => {
        const image = e.target.files[0]
        console.log(image);
        const formData = new FormData();
        formData.append('image', image);

        const imageUploadURL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_upload_key}`

        const res = await axios.post(imageUploadURL, formData);
        setImageURL(res.data.data.url);
    }

    return (
        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
            <div className="card-body">
                <h1 className="text-5xl font-bold">Register an account!</h1>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <fieldset className="fieldset">

                        {/* name field  */}
                        <label className="label">Your Name</label>
                        <input
                            type="textl"
                            {...register("name", { required: true })}
                            className="input" placeholder="Your Name" />

                        {/* image field */}
                        <label className="label">Image</label>
                        <input
                            onChange={handleUploadImage}
                            type="file" name='image'
                            className='input pt-2 text-primary font-semibold' />


                        {/* email field  */}
                        <label className="label">Email</label>
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="input" placeholder="Email" />
                        {errors.email?.type === 'required' && <p className='text-red-500'>Email required</p>}


                        {/* password field*/}
                        <label className="label">Password</label>
                        <input
                            type="password"
                            {...register("password", { required: true, minLength: 6 })}
                            className="input" placeholder="Password" />
                        {errors.password?.type === 'required' && <p className='text-red-500'>Password required</p>}
                        {errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer</p>}

                        <button className="btn btn-secondary text-primary mt-4">Register</button>

                        <div><p className='pl-2'>Already you have account!
                            <Link to='/login' className='text-blue-600 underline ml-1'>Login</Link> </p></div>
                    </fieldset>
                </form>

                <GoogleLogin></GoogleLogin>

            </div>
        </div>
    );
};

export default Register;