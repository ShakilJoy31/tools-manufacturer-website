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



const SignUp = () => {
    const navigate = useNavigate();
    const [updateProfile] = useUpdateProfile(auth);
    const [
        createUserWithEmailAndPassword,
        user,
        loading,
        error,
    ] = useCreateUserWithEmailAndPassword(auth);

    const [generalUser] = useAuthState(auth);

    const AddUserToDatabase = () =>{
        
    }

    const [signInWithGoogle, googleUser, googleLoading, googleError] = useSignInWithGoogle(auth);

    const [signInWithGithub, githubUser, githubLoading, githubError] = useSignInWithGithub(auth);

    const handleOnSubmitButtonForSignUp = async event => {
        event.preventDefault();
        const name = event.target.name.value;
        const email = event.target.email.value;
        const password = event.target.password.value;
        const confirmPassword = event.target.confirmPassword.value;
        if (password === confirmPassword) {
            await createUserWithEmailAndPassword(email, password);
            await updateProfile({ displayName: name })
        }
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
                    console.log(data); 
                    localStorage.setItem('accessToken', data?.token)
                })
    }
    
    const handleSignInWithGoogle = () => {
        signInWithGoogle();
    }

    if(googleUser){
        console.log(googleUser); 
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
                    console.log(data); 
                    localStorage.setItem('accessToken', data?.token)
                    
                })   
        }

    const handleSignInWithGithub = () => {
        signInWithGithub();
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
            console.log(data); 
            localStorage.setItem('accessToken', data?.token)
        })
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
                        <form onSubmit={handleOnSubmitButtonForSignUp} action="">
                            <div>
                                <div className='mb-2'>
                                    <label class="label">
                                        <span class="label-text">Your Name</span>
                                    </label>
                                    <input
                                        type="text" required name='name' class="input input-bordered input-info w-full max-w-lg"
                                    />
                                </div>

                                <div className='mb-2'>
                                    <label class="label">
                                        <span class="label-text">Your Email</span>
                                    </label>
                                    <input
                                        type="email" required name='email' class="input input-bordered input-info w-full max-w-lg"
                                    />
                                </div>

                                <div>
                                    <label class="label">
                                        <span class="label-text">Password</span>
                                    </label>
                                    <input type="password" required name='password' class="input input-bordered input-info w-full max-w-lg" />
                                </div>


                                <div className='mt-2'>
                                    <label class="label">
                                        <span class="label-text">Confirm Password</span>
                                    </label>
                                    <input type="password" required name='confirmPassword' class="input input-bordered input-info w-full max-w-lg" />
                                </div>

                                {
                                    loading ? <button class="btn btn-outline btn-square loading mt-5 w-full">Signing up...</button> :
                                        <input type='submit' value='Sign up'
                                            className='btn btn-outline block mx-auto w-full mt-5 text-xl max-w-lg'
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