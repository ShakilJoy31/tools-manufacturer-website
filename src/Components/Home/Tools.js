import React from 'react';
import { useNavigate } from 'react-router-dom';

const Tools = (props) => {
    const {_id, name, img, description, minimumOrder, availableQuantity, price } = props.tool;


    const navigate = useNavigate(); 
    const handleTakeParchasPage = (id) =>{
        navigate(`/parchas/${id}`); 
    }


    return (
        <div>
            <div class="card shadow-2xl">
                <figure><img className='w-100' src={img} alt="Shoes" /></figure>
                <div class="card-body">
                    <div className='flex justify-center'>
                    <div>
                    <h2 class="card-title"> <span className='text-orange-500'>Name: </span> {name}</h2>
                    <p><span className='text-orange-500'>Description: </span>{description}</p>
                    <p><span className='text-orange-500'>Minimum Order: </span>{minimumOrder}</p>
                    <p><span className='text-orange-500'>Available: </span>{availableQuantity}</p>
                    <p><span className='text-orange-500'>Price: </span>{price}$ per unit</p>
                    </div>
                    </div>
                    <div class="card-actions justify-center">
                    <button onClick={()=>handleTakeParchasPage(_id)} class="btn btn-outline btn-accent w-64">Place Order</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Tools;