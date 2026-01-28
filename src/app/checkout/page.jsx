import { getCartItems } from '@/actions/server/cart';
import CheckOut from '@/components/Home/CheckOut';
import React from 'react';

const Checkout = async() => {
    const cartItems = await getCartItems()
    return (
        <div>
            <CheckOut cartItems={cartItems}></CheckOut>
        </div>
    );
};

export default Checkout;