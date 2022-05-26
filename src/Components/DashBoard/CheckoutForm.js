import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import React, { useEffect, useState } from 'react';
import Loading from './../Shared/Loading';

const CheckoutForm = ({ product }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [cardError, setCardError] = useState('');
    const [intentError, setIntentError] = useState('');
    const [intentSuccess, setIntentSuccess] = useState('');
    const [clientSecret, setClientSecret] = useState('');

    const { totalPrice, _id} = product;

    useEffect(() => {
        if (totalPrice) {
            fetch('https://guarded-badlands-57795.herokuapp.com/create-payment-intent', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify({ totalPrice })
            })
                .then(res => res.json())
                .then(data => {
                    if (data) {
                        setClientSecret(data?.clientSecret)
                    }
                })
        }
    }, [totalPrice])




    const handleSubmit = async event => {
        event.preventDefault();
        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);
        if (card === null) {
            return;
        }

        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card
        })

        if (error) {
            setCardError(error.message);

        }
        else {
            setCardError('');
        }


        // confirm card payment
        const { paymentIntent, error: intentError } = await stripe.confirmCardPayment(
            clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: 'shakil joy'
                }
            }
        }
        );
        if (intentError) {
            setIntentError(intentError.message);
        }
        if (paymentIntent) {
            setIntentError('');
            setIntentSuccess(paymentIntent.id);
        }
    }

    if(intentSuccess){
        fetch(`https://guarded-badlands-57795.herokuapp.com/paid/${_id}`, {
            method: 'PUT', 
            headers:{
                'content-type':'application/json'
            } 
        })
        .then(res => res.json())
        .then(data => {
            console.log(data); 
        })
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


                {

                    !intentSuccess && <div className='mt-8'>
                        <Loading></Loading>
                        <div className='flex mt-4'>
                        <p className='text-blue-800'>Waiting for your payment. To be Completed...</p>
                        </div>
                    </div>
                }


                {
                    intentSuccess && <div>
                        <p className='text-xl text-green-400 flex justify-center mt-4 mb-2'>Congratulation! payment is done. </p>
                        <p className='text-2xl flex justify-center'>Note Your Tr. id:</p>
                        <p className='text-2xl text-orange-400 flex justify-center'>{intentSuccess}</p>
                    </div>
                }
                {
                    intentError && <p className='text-xl flex justify-center text-red-400'>{intentError}</p>
                }
            </div>
        </form>
    );
};

export default CheckoutForm;