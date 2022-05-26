import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import Loading from '../Shared/Loading';

const AllUsers = () => {
    const [user] = useAuthState(auth); 
    const [unauthorized, setUnAuth] = useState(''); 
    const {data, isLoading, refetch} = useQuery('users', ()=> fetch(`http://localhost:5000/users/${user?.email}`, {
        method: 'GET',
        headers: {
            'content-type':'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res =>{
        if(res.status !== 200){
            setUnAuth('You are Un Authorized or not an Admin!!!'); 
            return; 
        }
        return res.json()
    }))

    const handlemakeAdmin = (email) =>{
        const requesterEmail = user?.email; 
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type':'application/json',
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }, 
            body: JSON.stringify({requester: requesterEmail})
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
            refetch(); 
        })
    }


    if(isLoading){
        return <Loading></Loading>
    }

    
    return (
        <div class="overflow-x-auto lg:mx-16 md:mx-8 sm:mx-4 xm:mx-2 mb-8">
            <table class="table w-full">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Give Power</th>
                    </tr>
                </thead>

                {
                    data?.map((user, index) => <tbody>
                        <tr>
                            <th>{index + 1}</th>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            {
                                user.act ? <td><button class="btn btn-sm">{user?.act}</button></td> : <td>{''}</td>
                            }

                            {
                                user.act ? <td>{''}</td> : <td><button onClick={()=>handlemakeAdmin(user?.email)} class="btn btn-sm">Make Admin</button></td>
                            }
                            
                        </tr>
                    </tbody>)
                }



            </table>
            {
                !data && <h1 className='flex justify-center mt-8 text-5xl text-red-600'>{unauthorized}</h1>
            }
            
        </div>
    );
};

export default AllUsers;