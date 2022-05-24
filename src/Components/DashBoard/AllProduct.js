import React, { useEffect, useState } from 'react';

const AllProduct = () => {
    const [allProduct, setAllProduct] = useState([]);
    const [deletedId, setDeletedId] = useState(null);
    useEffect(() => {
        fetch('http://localhost:5000/allProductForAdmin')
            .then(res => res.json())
            .then(data => setAllProduct(data))
    }, [])

    const handleRemoveProduct = (id) => {
        setDeletedId(id);
    }

    console.log(deletedId); 

    const handleDeleteFromDB = () => {
        fetch(`http://localhost:5000/deleteProduct/${deletedId}`, {
            method: 'DELETE'
        })
        .then(res => res.json())
        .then(data => {
            const restProduct = allProduct.filter(product => product._id !== deletedId); 
            setAllProduct(restProduct); 
            console.log(data); 
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
                            <th>Email</th>
                            <th>Ordered Product</th>
                            <th>Phone</th>
                            <th>Product Name</th>
                            <th>Total Price</th>
                            <th>Payment Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    {
                        allProduct.map((product, index) => <tbody>
                            <tr>
                                <th>{index + 1}</th>

                                <td>{product?.name}</td>

                                <td>{product?.email}</td>

                                <td>{product?.orderedProduct}</td>

                                <td>{product?.phone}</td>

                                <td>{product?.productName}</td>

                                <td>{product?.totalPrice}</td>

                                <td><button class="btn btn-sm">Payment</button></td>

                                <td>
                                <label onClick={() => handleRemoveProduct(product._id)}  for="my-modal-3" class="btn modal-button btn-sm btn-error">Remove</label>
                                </td>
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
                            <p className="py-4 text-3xl flex justify-center text-red-500">So be careful!</p>
                            <label onClick={handleDeleteFromDB} for="my-modal-3" class="btn btn-outline btn-error block mx-auto w-84"><span className='text-3xl'>Confirm Delete</span></label>
                        </div>
                    </div>
                </div> : ''
                }
            </div>
        </div>
    );
};

export default AllProduct;