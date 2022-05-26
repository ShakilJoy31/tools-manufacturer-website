import React, { useEffect, useState } from 'react';

const Review = () => {

    const [userReview, setUserReview] = useState([]); 
    useEffect(()=>{
        fetch('https://guarded-badlands-57795.herokuapp.com/userReview')
        .then(res => res.json())
        .then(data => setUserReview(data))
    },[])


    return (
        <div class="card shadow-2xl mt-24">
            <div class="card-body">
                <div className='mb-8'>
                    <h1 className='text-5xl font bold text-purple-600 flex justify-center mb-12'>Our Clients say...</h1>

                    <div className='flex'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            {
                                userReview.map(user => <div className='flex justify-center items-center'>
                                <div class="avatar">
                                    <div class="w-24 mask mask-hexagon">
                                        <img src={user.img} alt="" />
                                    </div>
                                </div>
                                <div className='ml-2'>
                                <h1 className='text-3xl text-red-400'>{user.name}</h1>
                                <p>Ratings <span  className='text-xl text-purple-400'>{user?.ratings}</span></p>
                                <p>{user.review}</p>
                                </div>
                            </div>)
                            }
                       
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;