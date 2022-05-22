import React from 'react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';
import { signOut } from 'firebase/auth';

const Navbar = () => {
    const [generalUser] = useAuthState(auth);
    const handleLogOut = () =>{
        signOut(auth); 
    } 
    const navBarElements = <>
        {
            generalUser ? <li className='text-2xl'><Link onClick={handleLogOut} to='/'>Log out</Link></li>
            :<li className='text-2xl'><Link to='/login'>Log in</Link></li>
        }
        
        <li className='text-2xl'><Link to='/'>BLog</Link></li>
        <li className='text-2xl'><Link to='/'>Dash board</Link></li>
        <li className='text-2xl'><Link to='/'>Contact Us</Link></li>
        
    </>
    return (
        <div>
            <div class="navbar bg-base-100 flex justify-between">
                <div class="navbar-start">
                    <div class="dropdown">
                        <label tabindex="0" class="btn btn-ghost lg:hidden">
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                        </label>
                        <ul tabindex="0" class="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
                            {navBarElements}
                        </ul>
                    </div>
                    <Link to='/' class="btn btn-ghost normal-case text-xl">Tools Manufacturer</Link>
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