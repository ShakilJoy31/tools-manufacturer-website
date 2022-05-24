import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, Outlet } from 'react-router-dom';
import auth from '../firebase.init';

const DashBoard = () => {
    const [user] = useAuthState(auth); 
    const [admin, setAdmin] = useState(null); 
    useEffect(()=>{
        const adminEmail = user?.email; 
        if(adminEmail){
            fetch(`http://localhost:5000/adminUser/${adminEmail}`)
        .then(res => res.json())
        .then(data => {
            setAdmin(data); 
        })
        }
        
    },[admin])

    return (
        <div>

            <div class="drawer drawer-mobile">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex flex-col">

                    <h2 className='text-5xl font-bold text-purple-500 '>Welcome to your dash board! </h2>
                    <Outlet></Outlet>

                </div>
                <div class="drawer-side">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 overflow-y-auto w-80 bg-base-100 text-base-content">
                        {
                            !admin && <li><Link to='/dashboard'>My Orders</Link></li>
                        }
                        {
                            !admin && <li><Link to='/dashboard/addreview'>Add A Review</Link></li>
                        }
                        <li><Link to='/dashboard/myprofile'>My Profile</Link></li>

                        {
                            admin && <div>
                                <li><Link to='/dashboard/allusers'>Manage Users</Link></li>

                                <li><Link to='/dashboard/manageAllOrder'>Manage All Order</Link></li>

                                <li><Link to='/dashboard/addProduct'>Add a New Product</Link></li>

                                <li><Link to='/dashboard/allProductForAdmin'>All Ordered Product</Link></li>
                            </div> 
                        }        
                    </ul>

                </div>
            </div>
        </div>
    );
};

export default DashBoard;