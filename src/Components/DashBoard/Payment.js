import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../firebase.init';
import CheckoutForm from './CheckoutForm';

const Payment = () => {
    const { id } = useParams();
    const [updatedProduct, setUpdatedProduct] = useState();
    const [product, setProduct] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:5000/toolForPayment/${id}`)
            .then(res => res.json())
            .then(data => setProduct(data))
    }, [])

    // useEffect(() => {
    //     setUpdatedProduct(product?.availableQuantity - 50)
    // }, [product?.availableQuantity])
    const [user] = useAuthState(auth);


    const stripePromise = loadStripe('pk_test_51L183oGvk3EOuY0mCvwv4Q99sX08KsLiOHlvQU09QRHe0UGqRZpUBRNMoCD6xirbdwHZnfHHvYmr2II8zPMqq28t00AAseWdFL'); 

    return (
        <div class="hero min-h-screen bg-base-200">
            <div class="hero-content flex-col lg:flex-row-reverse">
                <div className='flex justify-center mt-12'>
                    <div class="card shadow-2xl w-96">
                        <figure><img className='w-screen' src={product.img} alt="Shoes" /></figure>
                        <div class="card-body">
                            <div className='flex justify-center'>
                                <div>
                                    <h2 class="card-title"> <span className='text-orange-500'>Name: </span> {product?.productName}</h2>
                                    
                                    <p className='text-2xl'><span className='text-orange-500'>You ordered:  </span>{product.orderedProduct}</p>
                                    
                                    <p className='text-2xl'><span className='text-orange-500'>Price: </span>{product.price}$ per unit</p>

                                    <p className='my-2 text-2xl'><span className='text-orange-500'>Price You need to Pay:  </span>{product.totalPrice}$</p>


                                </div>
                            </div>
                        </div>
                    </div>
                </div>


                <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
                    <div class="card-body">
                        <h1 className='text-3xl'>Hello, <span className='text-green-500'>{user?.displayName}</span></h1>
                        <div class="form-control">
                            <label class="label">
                                <span class="label-text">Email</span>
                            </label>
                            <input type="text" value={user?.email} disabled readOnly class="input input-bordered" />
                        </div>

                        <div className='mt-6 mb-4'>
                            <Elements stripe={stripePromise}>
                                <CheckoutForm product={product}></CheckoutForm>
                            </Elements>
                        </div>
                    </div>
                </div>  
            </div>
        </div>
    );
};

export default Payment;