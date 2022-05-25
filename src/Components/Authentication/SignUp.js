import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthState, useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import { useSignInWithGithub } from 'react-firebase-hooks/auth';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpdateProfile } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import Adduser from '../Adduser';
import CreatingToken from './CreatingToken';
import { useForm } from "react-hook-form";



const SignUp = () => {
    const navigate = useNavigate();
    const [updateProfile] = useUpdateProfile(auth);
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [generalUser] = useAuthState(auth);

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

    const onSubmit = async event => {
        const name = event.text;
        const email = event.email;
        const password = event.password;
        const confirmPassword = event.confirmPassword;
        console.log(typeof password);
        console.log(typeof confirmPassword);
        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name })
            navigate('/');
        }
        return false; 
    }

    console.log(generalUser); 
    
    if (generalUser) {
        CreatingToken(generalUser);
    }

    const handleSignInWithGoogle = () => {
        signInWithGoogle();
    }

    if (googleUser) {
        CreatingToken(googleUser);
    }

    const handleSignInWithGithub = () => {
        signInWithGithub();
    }


    if (githubUser) {
        CreatingToken(githubUser);
    }


    const handleSentToLogIn = () => {
        navigate('/login')
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='grid'>
                <div class="card w-96 bg-base-100 shadow-2xl">
                    <h1 className='flex justify-center mt-8 text-4xl text-sky-400'>Sign up</h1>
                    <div class="card-body">
                        <form onSubmit={handleSubmit(onSubmit)} action="">
                            <div>
                                <div className='mb-2'>
                                    <div class="form-control w-full max-w-xs">
                                        <label class="label">
                                            <span class="label-text">Your name</span>
                                        </label>
                                        <input type="text" placeholder="Name" name='name' class="input input-bordered input-info w-full max-w-lg"
                                        {...register("text", {
                                            required: {
                                                value: true,
                                                message: 'Your name is required'
                                            }
                                        })}
                                    />
                                    {errors.text?.type === 'required' && <span className='text-red-500 label-text-alt'>{errors.text.message}</span>}
                                    </div>
                                </div>

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
                                            pattern:{
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


                                <div className='mt-2'>
                                    <label class="label">
                                        <span class="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" name='confirmPassword' class="input input-bordered input-info w-full max-w-lg" 
                                    {...register("confirmPassword", {
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
                                    loading ? <button class="btn btn-outline btn-square loading mt-5 w-full">Signing up...</button> :
                                        <input type='submit' value='Sign up'
                                            className='block w-full max-w-lg mx-auto mt-5 text-xl btn btn-outline'
                                        />
                                }



                                {
                                    error ? <p className='mt-4 mb-4 text-red-700'>{error.message}</p> : ''
                                }




                                <label class="label flex justify-center">
                                    <span class="label-text text-xl">Already have an account? <span onClick={handleSentToLogIn} className='text-2xl text-red-400'>Log in</span> </span>
                                </label>

                                <div class="divider text-sky-400">OR</div>


                                {
                                    googleLoading ? <button class="btn btn-outline btn-square loading w-full">Signing up with google...</button> :
                                        <button onClick={handleSignInWithGoogle} class="btn btn-outline block mx-auto w-full mt-2 text-xl max-w-lg">Continue with google</button>
                                }

                                {
                                    googleError ? <p className='mt-4 mb-4 text-red-700'>{googleError.message}</p> : ''
                                }


                                {
                                    githubLoading ? <button class="btn btn-outline btn-square loading w-full">Signing up with github...</button> :
                                        <button onClick={handleSignInWithGithub} class="btn btn-outline block mx-auto w-full mt-2 text-xl max-w-lg">Continue with Github</button>
                                }

                                {
                                    githubError ? <p className='mt-4 mb-4 text-red-700'>{githubError.message}</p> : ''
                                }
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default SignUp;