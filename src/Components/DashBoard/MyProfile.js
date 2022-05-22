import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import auth from '../firebase.init';

const MyProfile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');

    const [user] = useState(auth); 
    

    const handleGetEmail = (event) =>{
        setEmail(event.target.value); 
    }

    const handleGetName = (event) =>{
        setName(event.target.value); 
    }

    const handleGetPhone = (event) =>{
        setPhone(event.target.value); 
    }

    const handleGetAddress = (event) =>{
        setAddress(event.target.value); 
    }


    const handleSubmitButton = () =>{
        let updatedName = user.displayName;
        let updatedemail = user.email;
        updatedName = name; 
        updatedemail = email; 
        const updatedUser = {updatedName , updatedemail, phone, address}; 
        fetch('http://localhost:5000/updateProfile', {
            method: 'POST', 
            headers: {
                'content-type':'application/json'
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
          <input onBlur={handleGetName} type="text" placeholder="Name" class="input input-bordered" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input onBlur={handleGetEmail} type="text" placeholder="email" class="input input-bordered" />
        </div>
        
        <div class="form-control">
          <label class="label">
            <span class="label-text">Phone</span>
          </label>
          <input onBlur={handleGetPhone} type="text" placeholder="email" class="input input-bordered" />
        </div>


        <div class="form-control">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input onBlur={handleGetAddress} type="text" placeholder="email" class="input input-bordered" />
        </div>

        <div class="form-control mt-6">
          <button onClick={handleSubmitButton} class="btn btn-primary">Update Profile</button>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer></ToastContainer>
</div>
    );
};

export default MyProfile;