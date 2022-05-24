import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSignInWithGithub } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useLocation } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from '../Shared/Loading';
import CreatingToken from './CreatingToken';
import { useForm } from "react-hook-form";

const Login = () => {
    const { register, formState: { errors }, handleSubmit } = useForm();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location?.state?.from?.pathname || '/';

    const handleSentToSignUp = () => {
        navigate('/signup');
    }

    const [
        signInWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useSignInWithEmailAndPassword(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

    const onSubmit = event => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        signInWithEmailAndPassword(email, password);
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle();
    }

    const handleSignInWithGithub = () => {
        signInWithGithub();
    }

    const [generalUser, generalLoading] = useAuthState(auth);
    
    if (generalUser) {
        navigate(from, { replace: true })
    }
    if (generalLoading) {
        return <Loading></Loading>
    }

    if (generalUser) {
        CreatingToken(generalUser);
    }

    if (googleUser) {
        CreatingToken(googleUser);
    }

    if (githubUser) {
        CreatingToken(githubUser);
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='grid'>
                <div class="card w-96 bg-base-100 shadow-2xl">
                    <h1 className='flex justify-center mt-8 text-4xl text-sky-400'>Log in</h1>
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} action="">

                            <div className='mb-2'>
                                <label class="label">
                                    <span class="label-text">Your Email</span>
                                </label>
                                <input
                                    type="email" name='email' class="input input-bordered input-info w-full max-w-lg"
                                    {...register("email", {
                                        required: {
                                            value: true,
                                            message: 'Email is required'
                                        },
                                        pattern: {
                                            value: /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/,
                                            message: 'Provide a valid email'
                                        }
                                    })}
                                />
                                {errors.email?.type === 'required' && <span className='text-red-500 label-text-alt'>{errors.email.message}</span>}

                                {errors.email?.type === 'pattern' && <span className='text-red-500 label-text-alt'>{errors.email.message}</span>}
                            </div>

                            <div>
                                <label class="label">
                                    <span class="label-text">Password</span>
                                </label>
                                <input type="password" name='password' class="input input-bordered input-info w-full max-w-lg"
                                    {...register("password", {
                                        required: {
                                            value: true,
                                            message: 'Password is required'
                                        },
                                        minLength: {
                                            value: 7,
                                            message: 'Password must be 7 or longer'
                                        }
                                    })}
                                />
                                <label class="label">
                                    {errors.password?.type === 'required' && <span className='text-red-500 label-text-alt'>{errors.password.message}</span>}

                                    {errors.password?.type === 'minLength' && <span className='text-red-500 label-text-alt'>{errors.password.message}</span>}
                                </label>
                            </div>


                            {
                                loading ?
                                    <button class="btn btn-outline btn-square loading mt-5 w-full">Logging in...</button>
                                    :
                                    <input type='submit' value='Log in'
                                        className='btn btn-outline block mx-auto w-full mt-5 text-xl max-w-lg'
                                    />
                            }



                            {
                                error ? <p className='mt-4 mb-4 text-red-700'>{error.message}</p> : ''
                            }




                            <label class="label flex justify-center">
                                <span class="label-text text-xl">New here? click to <span onClick={handleSentToSignUp} className='text-2xl text-red-400'>Sign up</span> </span>
                            </label>

                            <div class="divider text-sky-400">OR</div>
                        </form>
                        {
                            googleLoading ?
                                <button class="btn btn-outline btn-square loading w-full">Signing up with google...</button>
                                :
                                <button onClick={handleSignInWithGoogle} class="btn btn-outline block mx-auto w-full mt-2 text-xl max-w-lg ">Continue With Google
                                </button>
                        }

                        {
                            googleError ? <p className='mt-4 mb-4 text-red-700'>{googleError.message}</p> : ''
                        }


                        {
                            githubLoading ? <button class="btn btn-outline btn-square loading w-full">Signing up with github...</button> :
                                <button onClick={handleSignInWithGithub} class="btn btn-outline block mx-auto w-full mt-2 text-xl max-w-lg ">Continue With Github
                                </button>
                        }
                        {
                            githubError ? <p className='mt-4 mb-4 text-red-700'>{githubError.message}</p> : ''
                        }
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;