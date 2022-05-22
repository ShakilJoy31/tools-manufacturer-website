import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useQuery } from 'react-query';
import auth from '../firebase.init';
import Loading from '../Shared/Loading';

const AllUsers = () => {
    const [user] = useAuthState(auth); 
    const {data, isLoading, refetch} = useQuery('users', ()=> fetch('http://localhost:5000/users')
    .then(res => res.json()))


    console.log(data); 

    const handlemakeAdmi = (email) =>{
        const requesterEmail = user?.email; 
        fetch(`http://localhost:5000/user/admin/${email}`, {
            method: 'PUT',
            headers: {
                'content-type':'application/json'
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
        <div class="overflow-x-auto">
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
                                user.act ? <td>{''}</td> : <td><button onClick={()=>handlemakeAdmi(user?.email)} class="btn btn-sm">Make Admin</button></td>
                            }
                            
                        </tr>
                    </tbody>)
                }



            </table>
        </div>
    );
};

export default AllUsers;