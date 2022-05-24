import React from 'react';
import { useNavigate } from 'react-router-dom';
import './Upcoming.css'; 

const Upcomming = () => {
    const navigate = useNavigate(); 
    const handleSendToPreebook = () =>{
        navigate('/preebook'); 
    }
    return (
        <div class="forBackgoundImage">
            <div>
                <div class="hero-overlay bg-opacity-60"></div>
                <div class="hero-content text-center text-neutral-content">
                    <div class="max-w-md">
                        <h1 class="mb-5 text-red-500 text-5xl font-bold">Upcoming new Product</h1>
                        <p class="mb-5 text-xl text-white">We have created a new necessary tool to make you work with that properly. Though it is a little bit costly and expensive. But we can make you assure that, if you use this your experience will be grown up. </p>
                        <button onClick={handleSendToPreebook} class="btn btn-primary text-xl text-white">Pre Book this product.</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Upcomming;