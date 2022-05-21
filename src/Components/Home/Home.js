import React, { useEffect, useState } from 'react';
import Business from './Business';
import Review from './Review';
import Tools from './Tools';

const Home = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('http://localhost:5000/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])
    return (
        <div>
            <h1>This is home. </h1>



            <h1 className='text-5xl text-purple-500 font-bold flex justify-center mt-8 mb-4'>Tools We contain.</h1>
            <div>
                <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-8'>
                    {
                        tools.map(tool =>
                            <Tools
                                tool={tool}
                                key={tool._id}
                            ></Tools>
                        )
                    }
                </div>
            </div>

            <Business></Business>
            <Review></Review>
        </div>
    );
};

export default Home;