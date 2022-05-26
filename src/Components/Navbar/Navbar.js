import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [generalUser] = useAuthState(auth);
    const handleLogOut = () => {
        signOut(auth);
        localStorage.removeItem('accessToken'); 
    }
        const navBarElements = <>
        <li className='flex items-center justify-center text-2xl'><Link to='/blog'>BLog</Link></li>

        <li className='flex items-center justify-center text-2xl'><Link to='/myPortfolio'>My Portfolio</Link></li>
        {
            generalUser && <li className='flex items-center justify-center text-2xl'><Link to='/dashboard'>Dash board</Link></li>
        }
        {
            generalUser ? <div className='lg:flex'>
                <li className='flex items-center justify-center text-2xl'><Link onClick={handleLogOut} to='/'>Log out</Link></li>

                <li className='flex items-center justify-center text-2xl text-purple-500'>{generalUser?.displayName}</li>
            </div>
                : <li className='flex items-center justify-center text-2xl'><Link to='/login'>Log in</Link></li>
        }
    </>
     

    return (
        <div className='lg:mx-24 bg-sky-100'>
            <div class="navbar flex justify-between">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navBarElements}
                        </ul>
                    </div>
                    <div className='flex'>
                        <Link to='/' class="btn btn-ghost normal-case text-3xl text-violet-600">Tools Manufacturer</Link>
                        <label for="my-drawer-2" class="btn btn-primary bg-blue-400 drawer-button btn-ghost btn-circle lg:hidden flex justify-center items-center" tabindex="0">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
                        </label>
                    </div>
                </div>
                <div class="navbar-center hidden lg:flex">
                    <ul class="menu menu-horizontal p-0">
                        {navBarElements}
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Navbar;