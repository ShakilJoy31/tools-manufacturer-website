import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Parchas = () => {
    const {id} = useParams();
    const [product, setProduct] = useState([]);  
    useEffect(()=>{
        fetch(`http://localhost:5000/parchas/${id}`)
        .then(res => res.json())
        .then(data => setProduct(data))
    },[])
    return (
        <div className='flex justify-center mt-12'>
            <div class="card shadow-2xl w-96">
                <figure><img className='w-screen' src={product.img} alt="Shoes" /></figure>
                <div class="card-body">
                    <div className='flex justify-center'>
                    <div>
                    <h2 class="card-title"> <span className='text-orange-500'>Name: </span> {product.name}</h2>
                    <p><span className='text-orange-500'>Description: </span>{product.description}</p>
                    <p><span className='text-orange-500'>Minimum Order: </span>{product.minimumOrder}</p>
                    <p><span className='text-orange-500'>Available: </span>{product.availableQuantity}</p>
                    <p><span className='text-orange-500'>Price: </span>{product.price}</p>
                    </div>
                    </div>
                    <div class="card-actions justify-center">
                    <button class="btn btn-outline btn-accent w-64">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Parchas;