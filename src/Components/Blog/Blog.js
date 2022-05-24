import React from 'react';

const Blog = () => {
    return (
        <div className='bg-orange-100'>
            <div>
                <div className='lg:mx-48 my-12 mx-6'>
                    <div class="card w-100 bg-blue-50 shadow-xl">
                        <div class="card-body">
                            <h2 class="card-title text-3xl block mx-auto">How to improve the performance of react application: </h2>
                            <p className='block mx-auto mt-2 text-xl'>1. We should keep component state local where it is necessary. <br /> 2. Memoizing React Components to prevent unnecessary re-render. <br />3. We should use React Query over fetch or axios. It can store data while first time loaded. <br />So no need to call data from server again and again. It can make react app more faster. <br />4.We can Use Code-splitting in React using dynamic import() <br />5.Windowing or list virtualization in React can make it fast. <br />6.Lazy loading image in React. </p>
                        </div>
                    </div>




                    {/* Question no 2 */}
                    <div class="card w-100 bg-blue-100 shadow-2xl mt-12">
                        <div class="card-body">
                            <h2 class="card-title text-3xl block mx-auto">What are the different ways to manage a state in a React application?</h2>
                            <p className='block mx-auto mt-2 text-xl'>We have 4 ways to manage a state in a React application</p>
                            <p className='block mx-auto mt-2 text-xl'>1. Local State <br /> 2.Global State <br />3. Server State. <br />4.URL State. </p>
                        </div>
                    </div>

                    {/* Q no 3 */}
                    <div class="card w-100 bg-blue-200 shadow-2xl mt-12">
                        <div class="card-body grid grid-flow-row">
                            <div>
                                <h2 class="card-title text-3xl flex justify-center"> How does prototypical inheritance work?</h2>
                                <p className='mt-2 text-xl'>To know how prototypical inheritance does work, we need to know what inheritance is. <br /> It is as like as a child have charecteristics from his or her father simillerly a class can have the extended class's charecteristics. <br /> And a object can have also. </p>
                                <p className='mt-2 text-xl'>Actually javaScript is a prototype-based, Object Oriented programming language. <br />That means objects and methods can be shared, extended, and copied. Thus prototypical Inheritance works.</p>
                            </div>
                        </div>
                    </div>

                    {/* Q no 4 */}
                    <div class="card w-100 bg-blue-300 shadow-2xl mt-12">
                        <div class="card-body">
                            <div>
                                <h2 class="card-title text-3xl flex justify-center"> Why I do not set the state directly in React.</h2>
                                <p className='mt-2 text-xl'>Suppose I get something from Database or from a fake API. Now I need to store the data and then I need to show at UI. <br />If I use useState hook to update that as much as I want. Or if the data changed the UI will be changed automatically. Where setting "products = [...]" can not. <br /> Actually useState hook is popular to change the UI automatically. <br />So we use useState over "products = [...]" </p>
                            </div>
                        </div>
                    </div>



                    {/* Q no 5 */}
                    <div class="card w-100 bg-blue-400 shadow-2xl mt-12">
                        <div class="card-body">
                            <div>
                                <h2 class="card-title text-3xl flex justify-center">What is a unit test? Why should write unit tests?</h2>
                                <p className='mt-2 text-xl'>Unit tests are typically automated tests written, run and used by the developer. It can be a software developer, web developer or a game developer. <br /> Unit tests are used to ensure that a section of an application meets its design and behaves as intended. <br />A unit can be entire module, but it is more commonly an individual function.  </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Blog;