import React, { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useParams } from 'react-router-dom';
import auth from '../firebase.init';

const Parchas = () => {
    const [address, setAddress] = useState(''); 
    const [phone, setPhone] = useState(''); 
    const [increasedProduct, setIncreasedProduct] = useState(); 
    const [quantityError, setQuantityError] = useState(''); 
    const [lessQuantity, setLessQuantityError] = useState(''); 
    const {id} = useParams();
    const [product, setProduct] = useState([]);  
    useEffect(()=>{
        fetch(`http://localhost:5000/parchas/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])

    useEffect(()=>{
        setIncreasedProduct(product?.availableQuantity - 50)
    },[product?.availableQuantity])

    const makeNumber = parseInt(product?.availableQuantity); 
    let getProduct = parseInt(makeNumber - 50); 

    const [user] = useAuthState(auth); 

    const getAddress = (event) =>{
        setAddress(event.target.value); 
    }

    const getPhoneNumber = (event) =>{
        setPhone(event.target.value); 
    }

    const handleQuantityIncreased = () =>{
        let makeInteger = parseInt(increasedProduct)
        getProduct = parseInt(makeInteger + 1); 
        setIncreasedProduct(getProduct); 
        if(getProduct>200){
            setQuantityError('SORRY! Out of range!'); 
            setIncreasedProduct(200); 
            return; 
        }
    }

    const handleQuantityDecreased = () =>{
        let makeInteger = parseInt(increasedProduct)
        getProduct = parseInt(makeInteger - 1); 
        setIncreasedProduct(getProduct); 
        if(getProduct < 100){
            setLessQuantityError('You Must buy at least'); 
            setIncreasedProduct(100); 
            return; 
        }
        
    }
    
    const handleConfirmButton = () =>{
        const name = user?.displayName; 
        const email = user?.email; 
        console.log(name, email, address, phone); 

    }


    return (
        <div class="hero min-h-screen bg-base-200">
  <div class="hero-content flex-col lg:flex-row-reverse">
  <div className='flex justify-center mt-12'>
            <div class="card shadow-2xl w-96">
                <figure><img className='w-screen' src={product.img} alt="Shoes" /></figure>
                <div class="card-body">
                    <div className='flex justify-center'>
                    <div>
                    <h2 class="card-title"> <span className='text-orange-500'>Name: </span> {product.name}</h2>
                    <p className='my-2'><span className='text-orange-500'>Description: </span>{product.description}</p>
                    <p><span className='text-orange-500'>Minimum Order: </span>{product.minimumOrder}</p>
                    <p className='my-2'><span className='text-orange-500'>Available: </span>{product.availableQuantity}</p>

                    <div className='flex'>
                    <p><span className='text-orange-500'>Get {product?.name} : </span>{increasedProduct} pitch</p>

                    <button onClick={handleQuantityIncreased} class="btn btn-success btn-xs ml-4 text-white">Increase</button>
                    <button onClick={handleQuantityDecreased} class="btn btn-error btn-xs ml-4 text-white">Decrease</button>
                    </div>

                    <p className='text-red-600 my-2'>{quantityError}</p>

                    {
                        lessQuantity && <p className='text-red-600 my-2'>{lessQuantity} {product?.minimumOrder}</p>
                    }

                    <p><span className='text-orange-500'>Price: </span>{product.price}$ per unit</p>
                    </div>
                    </div>
                    <div class="card-actions justify-center">
                    <button class="btn btn-outline btn-accent w-64">Place Order</button>
                    </div>
                </div>
            </div>
        </div>


    <div class="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
      <div class="card-body">
          <h1 className='text-3xl'>Hello, <span className='text-green-500'>{user?.displayName}</span></h1>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input type="text" value={user?.email} disabled readOnly class="input input-bordered" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Address</span>
          </label>
          <input onBlur={getAddress} type="text" placeholder="Address" class="input input-bordered" />
        </div>

        <div class="form-control">
          <label class="label">
            <span class="label-text">Phone Number</span>
          </label>
          <input onBlur={getPhoneNumber} type="text" placeholder="Phone number" class="input input-bordered" />
        </div>
        <div class="form-control mt-6">
          <button onClick={handleConfirmButton} class="btn btn-primary">Confirm This Order</button>
        </div>
      </div>
    </div>
  </div>
</div>
    );
};

export default Parchas;