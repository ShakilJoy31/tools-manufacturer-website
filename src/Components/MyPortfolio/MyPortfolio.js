import React from 'react';

const MyPortfolio = () => {
    return (
        <div>
            <div class="card bg-base-100 shadow-2xl mx-12">
                <div class="card-body">

                    <div class="card bg-orange-50 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title text-4xl">Name:</h2>
                            <p className='text-3xl text-purple-400 font-bold'>Shakidul Islam Shakil.</p>
                        </div>
                    </div>


                    <div class="card bg-orange-100 shadow-2xl">
                        <div class="card-body">
                            <p className='text-xl'>Email Address: </p>
                            <span className='text-2xl text-purple-400'>joy31a@gmail.com</span>
                        </div>
                    </div>

                    <div class="card bg-orange-200 shadow-2xl">
                        <div class="card-body">
                            <p className='text-3xl'>Educational Background: <br /> <span className='text-xl'>BSc in CSE <br /> Green University on Bangladesh.</span>  </p>
                        </div>
                    </div>

                    <div class="card bg-orange-300 shadow-2xl">
                        <div class="card-body">
                            <p className='text-5xl flex justify-center mb-6'>Skills I have as a web developer: <span className=''></span></p>
                            <div className='lg:flex justify-between'>
                                <div>
                                    <ol className='text-xl'>1. HTML and HTML5</ol><br />
                                    <ol className='text-xl'>2. CSS and CSS3</ol><br />
                                    <ol className='text-xl'>3. Bootstrap (A framework of CSS) </ol><br />
                                    <ol className='text-xl'>4. React Bootstrap (CSS component for React) </ol><br />
                                    <ol className='text-xl'>5. Tailwind (A framework of CSS)</ol><br />
                                    <ol className='text-xl'>6. Tailwind (CSS component for React)</ol><br />
                                    <ol className='text-xl'>7. JavaScript</ol><br />
                                    <ol className='text-xl'>8. ES6 (Updated version of JavaScript)</ol><br />
                                </div>

                                <div>
                                    <ol className='text-xl'>9. React</ol><br />
                                    <ol className='text-xl'>10. Authentication (React firebase hooks and google firebase)</ol><br />
                                    <ol className='text-xl'>11. React Query</ol><br />
                                    <ol className='text-xl'>12. Node.js</ol><br />
                                    <ol className='text-xl'>13. Mongodb (as database)</ol><br />
                                    <ol className='text-xl'>14. Toastify</ol><br />
                                    <ol className='text-xl'>15. Mindset of working hard till the task got complete.</ol><br />
                                </div>
                            </div>
                        </div>
                    </div>


                    <div class="card bg-orange-400 shadow-2xl">
                        <div class="card-body">
                            <p className='text-3xl flex justify-center'>Here is my personal practice projects: <br /> </p>
                            <p></p>
                            <p></p>
                            <p></p>
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default MyPortfolio;