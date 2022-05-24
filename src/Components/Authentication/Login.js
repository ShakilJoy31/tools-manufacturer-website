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

const Login = () => {

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

    const handleOnSubmitButtonForSignUp = event => {
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
    if(generalUser){
        navigate(from, {replace: true})
    }
    if(generalLoading){
        return <Loading></Loading>
    }

    if(generalUser){
        const userEmail = generalUser?.email;
            const userName = generalUser?.displayName;
            fetch(`http://localhost:5000/adduser/${userEmail}`, {
                method: 'PUT',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ userName, userEmail })
            })
                .then(res => res.json())
                .then(data => {
                    localStorage.setItem('accessToken', data?.token)
                })
    }

    if(googleUser){
        const userEmail = googleUser?.user?.email;
        const userName = googleUser?.user?.displayName;
        fetch(`http://localhost:5000/adduser/${userEmail}`, {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ userName, userEmail })
        })
            .then(res => res.json())
            .then(data => {
                localStorage.setItem('accessToken', data?.token)
            })   
    }

    if(githubUser){
        const userEmail = githubUser?.user?.email;
    const userName = githubUser?.user?.displayName;
    fetch(`http://localhost:5000/adduser/${userEmail}`, {
        method: 'PUT',
        headers: {
            'content-type': 'application/json'
        },
        body: JSON.stringify({ userName, userEmail })
    })
        .then(res => res.json())
        .then(data => {
            localStorage.setItem('accessToken', data?.token)
        })
    }

    return (
        <div className='flex items-center justify-center h-screen'>
            <div className='grid'>
                <div class="card w-96 bg-base-100 shadow-2xl">
                    <h1 className='flex justify-center mt-8 text-4xl text-sky-400'>Log in</h1>
                    <div class="card-body">
                        <form onSubmit={handleOnSubmitButtonForSignUp} action="">
                            <div>
                                <div className='mb-2'>
                                    <label class="label">
                                        <span class="label-text">Your Email</span>
                                    </label>
                                    <input
                                        type="text" required name='email' class="input input-bordered input-info w-full max-w-lg" />
                                </div>

                                <div>
                                    <label class="label">
                                        <span class="label-text">Password</span>
                                    </label>
                                    <input type="password" required name='password' class="input input-bordered input-info w-full max-w-lg" />
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
                        </form>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default Login;