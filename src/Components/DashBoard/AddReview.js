import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddReview = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [review, setRewiew] = useState('');
    const [ratings, setRatings] = useState('');
    const [img, setImg] = useState('');
    

    const handleGetEmail = (event) =>{
        setEmail(event.target.value); 
    }

    const handleGetName = (event) =>{
        setName(event.target.value); 
    }

    const handleGetReview = (event) =>{
        setRewiew(event.target.value); 
    }

    const handleGetRatings = (event) =>{
        setRatings(event.target.value); 
    }

    const handleGetPicture = (event) =>{
        setImg(event.target.value); 
    }

    const handleSubmitButton = () =>{
        const userReview = { name, email, ratings, img, review };
        console.log(userReview);  
        fetch('http://localhost:5000/review', {
            method: 'POST', 
            headers: {
                'content-type':'application/json'
            }, 
            body: JSON.stringify(userReview)
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            toast.success('Thanks for your review');
        })
    }


    return (
        <div class="hero min-h-screen bg-orange-200 rounded-lg mt-8">
  <div class="hero-content flex-col lg:flex-row-reverse">
    <div class="text-center lg:text-left">
      <h1 class="text-5xl font-bold text-blue-400">Add Your Precious Review</h1>
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
            <span class="label-text">Ratings</span>
          </label>
          <input onBlur={handleGetRatings} type="text" placeholder="Ratings" class="input input-bordered" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Picture</span>
          </label>
          <input onBlur={handleGetPicture} type="text" placeholder="Link of picture" class="input input-bordered" />
        </div>
        

        <div class="form-control">
          <label class="label">
            <span class="label-text">Let us know your review</span>
          </label>
          <input onBlur={handleGetReview} type="text" placeholder="Type here" class="input input-bordered input-lg w-full max-w-xs" />
        </div>

        <div class="form-control mt-6">
          <button onClick={handleSubmitButton} class="btn btn-primary">Submit Review</button>
        </div>
      </div>
    </div>
  </div>
  <ToastContainer></ToastContainer>
</div>
    );
};

export default AddReview;