import React from 'react';

const NotFound = () => {
    return (
        <div>
            <h1 className='text-4xl font-bold text-red-600 flex justify-center'>404! The page you are looking for is not found! </h1>
            <img className='block w-96 rounded-md  mx-auto mt-8' src="https://img.freepik.com/free-vector/error-404-concept-illustration_114360-1811.jpg?w=2000" alt="" />
        </div>
    );
};

export default NotFound;