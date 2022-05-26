import React, { useEffect, useState } from 'react';
import Banner from './Banner';
import Business from './Business';
import ExtraSection1 from './ExtraSection1';
import Footer from './Footer';
import Review from './Review';
import Tools from './Tools';
import Upcomming from './Upcomming';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from './../firebase.init';

const Home = () => {
    const [tools, setTools] = useState([]);
    useEffect(() => {
        fetch('https://guarded-badlands-57795.herokuapp.com/tools')
            .then(res => res.json())
            .then(data => setTools(data))
    }, [])
    
    return (
        <div>
            <div className='lg:mx-48'>

                <Banner></Banner>

                <ExtraSection1></ExtraSection1>

                <Upcomming></Upcomming>

                <h1 className='flex justify-center mt-8 mb-4 text-5xl font-bold text-purple-500'>Tools We contain.</h1>
                <div>
                    <div className='grid grid-cols-1 gap-8 lg:grid-cols-3 md:grid-cols-2'>
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
            <div className='mt-12 bg-indigo-200'>
                <Footer></Footer>
            </div>
        </div>
    );
};

export default Home;