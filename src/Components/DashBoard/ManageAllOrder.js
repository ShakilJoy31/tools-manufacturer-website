import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../firebase.init';

const ManageAllOrder = () => {
    const [unauthorized, setUnAuth] = useState('');
    const [user] = useAuthState(auth);
    const [products, setProduct] = useState([]);
    const [id, setId] = useState(null);
    const email = user?.email;

    useEffect(() => {
        fetch(`http://localhost:5000/allAvailableProduct/${email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if(res.status !== 200){
                    setUnAuth('You are Un Authorized or not an Admin!!!'); 
                    return; 
                }
                return res.json()
            })
            .then(data => setProduct(data))
    }, [])

    // if(products?.message === 'Un Authorized'){
    //     console.log('inside'); 
    //     setUnAuth('You are Un Authorized or not an Admin!!!'); 
    //     return; 
    // }
    const handleDeleteButton = (id) =>{
        setId(id); 
    }

    const handleDeleteFromDB = () =>{
         fetch(`http://localhost:5000/deletebyAdmin/${id}`, {
             method: 'DELETE', 
         })
         .then(res => res.json())
         .then(data => {
             console.log(data); 
             const restProduct = products.filter(product => product._id !== id); 
             setProduct(restProduct); 
         })
    }

    return (
        <div>
            <div class="overflow-x-auto">
                <table class="table w-full">

                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Picture</th>
                            <th>Price</th>
                            <th>Description</th>
                            <th>Available</th>
                            <th>Action</th>
                        </tr>
                    </thead>

                    {
                        products?.map((product, index) => <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{product?.name}</td>
                                
                                <td><img className='w-64 rounded-lg' src={product?.img} alt="" /></td>

                                <td>{product?.price}</td>

                                <td>{product?.description}</td>

                                <td>{product?.availableQuantity}</td>

                                <td>
                                <label onClick={()=>handleDeleteButton(product?._id)} for="my-modal-3" class="btn modal-button btn-outline btn-error">Remove</label>
                                </td>
                            </tr>
                        </tbody>)
                    }

                </table>

                <div>
                {
                    id && <div>
                    <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                    <div class="modal">
                        <div class="modal-box relative">
                            <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                            <h3 class="text-2xl flex justify-center text-blue-500">Do you want to delete?</h3>
                            <p class="py-4 text-xl flex justify-center text-blue-500">If you confirm, it will be deleted permanently. </p>
                            <p className="flex justify-center py-4 text-3xl text-red-500">So be careful!</p>
                            <label onClick={handleDeleteFromDB} for="my-modal-3" class="btn btn-outline btn-error block mx-auto w-84"><span className='text-3xl'>Confirm Delete</span></label>
                        </div>
                </div>

            </div>
                }
        </div>
        </div>
        {
                unauthorized && <h1 className='flex justify-center mt-8 text-5xl text-red-600'>{unauthorized}</h1>
            }
        </div>
    );
};

export default ManageAllOrder;