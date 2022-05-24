import { signOut } from 'firebase/auth';
import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import auth from '../firebase.init';
import Loading from '../Shared/Loading';

const MyOrder = () => {
    const [user] = useAuthState(auth);
    const [productsInfo, setProductInfo] = useState([]);
    const [deleteProduct, setDeleteProduct] = useState(null);

    const [tokenError, setTokenError] = useState('');
    const navigate = useNavigate();
    const email = user?.email; 
    useEffect(() => {
        if(email){
            fetch(`http://localhost:5000/getOrderedProducts/${email}`, {
            method: 'GET',
            headers: {
                'authorization': `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => {
                if (res?.status !== 200) {
                    setTokenError(res?.statusText)
                    return;
                }
                return res.json()
            })
            .then(data => setProductInfo(data));
        }
    }, [productsInfo])

    if (!productsInfo || tokenError) {
        return <Loading></Loading> 
    }

    if (tokenError) {
        return <div>
            <p className='text-4xl flex justify-center text-red-500'>{tokenError}</p>
            <Loading></Loading>
        </div>
    }

    const handleDeleteProduct = () => {
        fetch(`http://localhost:5000/deleteProduct/${deleteProduct}`, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(data => {
                const rest = productsInfo.filter(product => product._id !== deleteProduct);
                setProductInfo(rest);
            })
    }

    const handleCancelOrder = (id) => {
        setDeleteProduct(id);
    }

    const handlePayment = (id) => {
        navigate(`/payment/${id}`)
        console.log(id);
    }


    return (
        <div class="overflow-x-auto mt-12 mr-12">
            <table class="table table-zebra w-full">
                <thead>
                    <tr>
                        <th>No.</th>
                        <th>Name</th>
                        <th>Address</th>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Total Price</th>
                        <th>Cancel</th>
                        <th>Pay</th>
                    </tr>
                </thead>
                {
                    productsInfo?.map((productInfo, index) =>
                        <tbody>
                            <tr>
                                <th>{index + 1}</th>
                                <td>{productInfo.name}</td>
                                <td>{productInfo.address}</td>
                                <td>{productInfo.productName}</td>
                                <td>{productInfo.orderedProduct}</td>
                                <td>{productInfo.totalPrice}</td>

                                <td>
                                    <label onClick={() => handleCancelOrder(productInfo._id)} for="my-modal-3" class="btn modal-button btn-sm modal-button">Cancel Order</label>

                                </td>
                                <td><button onClick={() => handlePayment(productInfo._id)} class="btn btn-sm">Let me Pay</button></td>
                            </tr>
                        </tbody>
                    )
                }
            </table>

            <div>
                <input type="checkbox" id="my-modal-3" class="modal-toggle" />
                <div class="modal">
                    <div class="modal-box relative">
                        <label for="my-modal-3" class="btn btn-sm btn-circle absolute right-2 top-2">✕</label>
                        <h3 class="text-2xl font-bold block mx-auto">Are your sure you want to delete?</h3>
                        <p class="py-4 text-xl">Once you confirm it will be deleted permanently.</p>

                        <p class="py-2 flex justify-center text-red-600 text-2xl">So Be Careful!</p>

                        <label onClick={handleDeleteProduct} for="my-modal-3" class="btn btn-outline btn-error block mx-auto my-2 w-64"> <span className='text-2xl'>Confirm Delete</span> </label>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyOrder;