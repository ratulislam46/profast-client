import React, { use } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../../../Context/AuthContex/AuthContext';
import GoogleLogin from '../GoogleLogin/GoogleLogin'

const Login = () => {

    const { signIn } = use(AuthContext)
    const location = useLocation();
    const from = location.state || '/'
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors } } = useForm()

    const hanldeLogin = data => {
        signIn(data.email, data.password)
            .then(result => {
                console.log(result.user);
                navigate(from)
            })
            .catch((error) => {
                console.log(error);
            })
    }

    return (
        <div>
            <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
                <div className="card-body">
                    <h1 className="text-5xl font-bold">Login Now!</h1>
                    <form onSubmit={handleSubmit(hanldeLogin)}>
                        <fieldset className="fieldset">

                            <label className="label">Email</label>
                            <input
                                type="email"
                                {...register("email", { required: true })}
                                className="input"
                                placeholder="Email" />
                            {errors.email?.type === 'required' && <p className='text-red-500'>Email required</p>}


                            <label className="label">Password</label>
                            <input
                                type="password"
                                {...register("password", {
                                    required: true, minLength: 6
                                })}
                                className="input" placeholder="Password" />
                            {errors.password?.type === 'required' && <p className='text-red-500'>Password is required</p>}
                            {
                                errors.password?.type === 'minLength' && <p className='text-red-500'>Password must be 6 character or longer</p>
                            }

                            <div><a className="link link-hover">Forgot password?</a></div>
                            <button className="btn btn-secondary text-primary mt-4">Login</button>

                            <div><p className='pl-2'>If you have no account!
                                <Link to='/register' className='text-blue-600 underline ml-1'>Register</Link> </p></div>
                        </fieldset>
                    </form>
                    <GoogleLogin></GoogleLogin>
                </div>
            </div>
        </div>
    );
};

export default Login;