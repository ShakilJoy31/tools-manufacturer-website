import React from 'react';

const Review = () => {
    return (
        <div class="card shadow-2xl mt-24">
            <div class="card-body">
                <div className='mb-8'>
                    <h1 className='text-5xl font bold text-purple-600 flex justify-center mb-12'>Our Clients say...</h1>

                    <div className='flex'>
                        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
                            <div className='flex justify-center items-center'>
                                <div class="avatar">
                                    <div class="w-24 mask mask-hexagon">
                                        <img src="https://cdn.psychologytoday.com/sites/default/files/styles/article-inline-half/public/field_blog_entry_images/shutterstock_105623048_1.jpg?itok=IcdHbI7U" alt="" />
                                    </div>
                                </div>
                                <p>There can be so many tools like this. But these are seem unique and different to me.</p>
                            </div>


                            <div className='flex justify-center items-center'>
                                <div class="avatar">
                                    <div class="w-24 mask mask-hexagon">
                                        <img src="https://i.guim.co.uk/img/media/9b089d0d5d0939056d2be35001310adc0f355895/946_287_3140_1884/master/3140.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=51ec094b8672595d76d321e0ee6421f6" alt="" />
                                    </div>
                                </div>
                                <p>There can be so many tools like this. But these are seem unique and different to me.</p>
                            </div>


                            <div className='flex justify-center items-center'>
                                <div class="avatar">
                                    <div class="w-24 mask mask-hexagon">
                                        <img src="https://assets.entrepreneur.com/content/3x2/2000/20150820205507-single-man-outdoors-happy-bliss.jpeg" alt="" />
                                    </div>
                                </div>
                                <p>There can be so many tools like this. But these are seem unique and different to me.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;