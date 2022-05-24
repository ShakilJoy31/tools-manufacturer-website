import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../firebase.init';

const MyProfile = () => {
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [education, setEducation] = useState('');
    const [linkedin, setLinkedIN] = useState('');

    const [user] = useAuthState(auth);

    console.log(user?.displayName); 

    const handleGetPhone = (event) => {
        setPhone(event.target.value);
    }

    const handleGetAddress = (event) => {
        setAddress(event.target.value);
    }

    const handleGetEducation = (event) => {
        setEducation(event.target.value);
    }

    const handleGetLinkedIn = (event) => {
        setLinkedIN(event.target.value);
    }


    const handleSubmitButton = () => {
        let updatedName = user?.displayName;
        let updatedEmail = user?.email;
        if( phone  ==='' || address ==='' || education ==='' || linkedin ===''){
            return; 
        }
        const updatedUser = { updatedName, updatedEmail, phone, address, education, linkedin };
        fetch('http://localhost:5000/updateProfile', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(updatedUser)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                toast.success('Your Profile is updated successfully');
            })
    }

    return (
        <div class="hero min-h-screen bg-sky-200 rounded-lg mt-8">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold text-orange-400">Update Your Profile now</h1>
                    <p class="py-6"></p>
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name</span>
                            </label>
                            <input type="text" disabled readOnly value={user?.displayName} placeholder="Name" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" value={user?.email} disabled readOnly placeholder="email" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Phone</span>
                            </label>
                            <input onBlur={handleGetPhone} type="text" placeholder="Phone" class="input input-bordered" />
                        </div>


                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Location</span>
                            </label>
                            <input onBlur={handleGetAddress} type="text" placeholder="Location" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Education</span>
                            </label>
                            <input onBlur={handleGetEducation} type="text" placeholder="Education" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Linkedin Profile link</span>
                            </label>
                            <input onBlur={handleGetLinkedIn} type="text" placeholder="Linked in profile" class="input input-bordered" />
                        </div>

                        <div class="form-control mt-6">
                            <button onClick={handleSubmitButton} class="btn btn-primary  text-2xl text-white">Update Profile</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default MyProfile;