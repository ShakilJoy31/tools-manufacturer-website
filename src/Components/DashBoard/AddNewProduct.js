import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../firebase.init';
import 'react-toastify/dist/ReactToastify.css';
import { info } from 'daisyui/src/colors/colorNames';

const AddNewProduct = () => {

    const [name, setName] = useState('');
    const [minimumOrder, setOrder] = useState('');
    const [availableQuantity, setAvailable] = useState('');
    const [unauthorized, setUnAuth] = useState(''); 
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [img, setPicture] = useState('');

    const [user] = useAuthState(auth);

    const handleGetName = (event) => {
        setName(event.target.value);
    }

    const handleOrder = (event) => {
        setOrder(event.target.value);
    }


    const handleAvailable = (event) => {
        setAvailable(event.target.value);
    }

    const handlePrice = (event) => {
        setPrice(event.target.value);
    }

    const handlePicture = (event) => {
        setPicture(event.target.value);
    }

    const handleDescription = (event) => {
        setDescription(event.target.value);
    }


    const handleSubmitButton = () => {
        const productInfo = {name, minimumOrder, availableQuantity, price, description, img};
        fetch('https://guarded-badlands-57795.herokuapp.com/addproduct', {
            method: 'POST', 
            headers: {
                'content-type':'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }, 
            body: JSON.stringify(productInfo)
        })
        .then(res =>{
            if(res.status !== 200){
                setUnAuth('You are Un Authorized or not an Admin!!!'); 
                return; 
            }
            return res.json()
        })
        .then(data => {
            if(!unauthorized){
                toast.success('Product successfully added to the Database'); 
            }
            else{
                toast.error('You are Un Authorized or not an Admin!!!'); 
            }
        })
    }

    return (
        <div class="hero min-h-screen bg-yellow-100 rounded-lg mt-8">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold text-orange-400">Add a Product here. </h1>
                    {
                unauthorized && <h1 className='flex justify-center mt-8 text-5xl text-red-600'>{unauthorized}</h1>
            }
                </div>
                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Name of Product</span>
                            </label>
                            <input onBlur={handleGetName} type="text" placeholder="Name" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Minimum Order</span>
                            </label>
                            <input onBlur={handleOrder} type="text" placeholder="Minimum Order" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Available Product</span>
                            </label>
                            <input onBlur={handleAvailable} type="text" placeholder="Available" class="input input-bordered" />
                        </div>


                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Price</span>
                            </label>
                            <input onBlur={handlePrice} type="text" placeholder="price" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Picture</span>
                            </label>
                            <input onBlur={handlePicture} type="text" placeholder="Link Of image" class="input input-bordered" />
                        </div>

                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Add Description</span>
                            </label>
                            <input onBlur={handleDescription} type="text" placeholder="Type here description" class="input input-bordered input-lg w-full max-w-xs" />
                        </div>

                        <div class="form-control mt-6">
                            <button onClick={handleSubmitButton} class="btn btn-primary text-white">Add to Database</button>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer></ToastContainer>
        </div>
    );
};

export default AddNewProduct;