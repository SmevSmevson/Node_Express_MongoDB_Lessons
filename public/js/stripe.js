/* eslint-disable */
import axios from 'axios'
import { showAlert } from './alert'

export const bookTour = async tourId => {
    try {        
        const stripe = Stripe('pk_test_hxLkNFIeccwtJ4Cqy3PpqaGx00e62bHJ7s');
        //1) Get checkout session from API
        const session = await axios(
            `http://127.0.0.1:3000/api/v1/bookings/checkout-session/${tourId}`
        );
        console.log(session);
        //2) Create chackout form + change credit card
        await stripe.redirectToCheckout({
            sessionId: session.data.session.id
        });

    } catch (err) {
        console.log(err);
        showAlert('error', err);
    }
}