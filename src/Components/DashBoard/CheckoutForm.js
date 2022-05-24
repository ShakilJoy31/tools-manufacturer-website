import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';

const CheckoutForm = ({product}) => {  
    const stripe = useStripe();
    const elements = useElements(); 
    const [cardError, setCardError] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    console.log(product)

    const {totalPrice} = product;  

    useEffect(()=>{
        if(totalPrice){
        fetch('http://localhost:5000/create-payment-intent', {
            method: 'POST', 
            headers: {
                'content-type':'application/json'
            },
            body: JSON.stringify({totalPrice})
        })
        .then(res => res.json())
        .then(data => {      
            if(data){
                setClientSecret(data?.clientSecret)
            }
        })
    }
    },[totalPrice])




    const handleSubmit = async event => {
        event.preventDefault();
        if(!stripe || !elements){
            return; 
        }

        const card = elements.getElement(CardElement);
        if(card === null){
            return; 
        }

        const {error, paymentMethod} = await stripe.createPaymentMethod({
            type: 'card', 
            card
        })

        if(error){
            setCardError(error.message); 
            
        }
        else{
            setCardError(''); 
        }

        // confirm card payment
        const {paymentIntent, IntentError: intentError} = await stripe.confirmCardPayment(
            clientSecret, {
                payment_method: {
                    card: card, 
                    billing_details: {
                        name: 'shakil joy'
                    }
                }
            }
        );
        console.log(paymentIntent); 
    }
    
    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <div class="form-control mt-6">
                <p className='text-red-600 flex justify-center mb-2'>{cardError}</p>
                <button disabled={!stripe || !clientSecret} type="submit" class="btn btn-primary text-xl">Complete Payment</button>
            </div>
        </form>
    );
};

export default CheckoutForm;