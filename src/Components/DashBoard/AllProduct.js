import React, { useEffect, useState } from 'react';
import Loading from '../Shared/Loading';
import { useQuery } from 'react-query';

const AllProduct = () => {
    // const [allProduct, setAllProduct] = useState([]);
    const [deletedId, setDeletedId] = useState(null);
    const [shippedProduct, setShippedProduct] = useState(null);
    const [shipped, setShipped] = useState(null);
    const [shipmentConfirmedBy, setShipmentConfirmed] = useState(null);

    const {data: allProduct, isLoading, refetch} = useQuery('users', ()=> fetch('http://localhost:5000/allProductForAdmin', {
        method: 'GET',
        headers: {
            'content-type':'application/json',
            'authorization': `Bearer ${localStorage.getItem('accessToken')}`
        }
    })
    .then(res => res.json()))

    const handleRemoveProduct = (id) => {
        setDeletedId(id);
    }

    const handleDeleteFromDB = () => {
        fetch(`http://localhost:5000/deleteProduct/${deletedId}`, {
            method: 'DELETE'
        })
            .then(res => res.json())
            .then(data => {
                refetch(); 
            })
    }

    if (!allProduct) {
        return <Loading></Loading>
    }

    const handleUpdateToShipped = (id) =>{
        setShippedProduct(id); 
    }

    const handleConfirmShipped = () =>{
        fetch(`http://localhost:5000/shippedProduct/${shippedProduct}`, {
            method: 'PUT',
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({paymentStatus: 'shipped'})
        })
        .then(res => res.json())
        .then(data => setShippedProduct(null))
        refetch(); 
    }

    console.log(shipmentConfirmedBy); 
    return (
        <div className='mt-8'>
            <div class="overflow-x-auto">
                <table class="table w-full">
                    <thead>
                        <tr>
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Ordered Product</th>
                            <th>Phone</th>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Product Status</th>
                            <th>Payment Status</th>
                            <th>Approved Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allProduct?.map((product, index) => <tbody>
                            <tr>
                                <th>{index + 1}</th>

                                <td>{product?.name}</td>

                                <td>{product?.email}</td>

                                <td>{product?.orderedProduct}</td>

                                <td>{product?.phone}</td>

                                <td>{product?.productName}</td>

                                <td>{product?.totalPrice}</td>

                                {
                                    product?.paymentStatus ? <td><button class="btn btn-sm">Paid</button></td> : <td><button class="btn btn-sm">Unpaid</button></td>
                                }

                                {
                                    product?.paymentStatus === 'paid' ?  <td><div>
                                    <label class="btn btn-sm ml-2">Pending</label>

                                    <label onClick={()=> handleUpdateToShipped(product._id)} class="btn btn-sm ml-2" for="my-modal-4">shipped</label>
                                    </div></td>: <td></td>
                                }

                                {
                                    product?.paymentStatus === 'shipped' ?
                                    <td><label class="btn btn-sm ml-2" for="my-modal-5">shipment Confirmed</label></td>:<td></td>
                                }

                                {
                                    !product?.paymentStatus ? <td>
                                        <label onClick={() => handleRemoveProduct(product._id)} for="my-modal-3" class="btn modal-button btn-sm btn-error">Remove</label>
                                    </td> : <td></td>
                                }
                            </tr>
                        </tbody>)
                    }
                </table>
                {
                    deletedId ? <div>
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
                    </div> : ''
                }
                
                {
                    shippedProduct ? <div>
                        <input type="checkbox" id="my-modal-4" class="modal-toggle" />
                        <div class="modal">
                            <div class="modal-box relative">
                                <label for="my-modal-4" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                                <h3 class="text-4xl flex justify-center text-blue-500 ">Are you Confirm?</h3>
                                <p className='flex justify-center text-3xl text-blue-700'>To make to order be placed?</p>
                                <label onClick={handleConfirmShipped} for="my-modal-3" class="btn btn-outline btn-error block mt-16 mx-auto w-84"><span className='text-3xl'>Yes! I am Confirm.</span></label>
                            </div>
                        </div>
                    </div> : ''
                }
            </div>
        </div>
    );
};

export default AllProduct;