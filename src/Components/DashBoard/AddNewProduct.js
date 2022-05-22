import React, { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { toast, ToastContainer } from 'react-toastify';
import auth from '../firebase.init';
import 'react-toastify/dist/ReactToastify.css';

const AddNewProduct = () => {

    const [name, setName] = useState('');
    const [minimumOrder, setOrder] = useState('');
    const [availableQuantity, setAvailable] = useState('');
    
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
        fetch('http://localhost:5000/addproduct', {
            method: 'POST', 
            headers: {
                'content-type':'application/json'
            }, 
            body: JSON.stringify(productInfo)
        })
        .then(res => res.json())
        .then(data => {
            toast.success('Product successfully added to the Database'); 
        })
    }

    return (
        <div class="hero min-h-screen bg-yellow-100 rounded-lg mt-8">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div class="text-center lg:text-left">
                    <h1 class="text-5xl font-bold text-orange-400">Add a Product here. </h1>
                    <p class="py-6"></p>
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