import React from 'react';
import './cart.css'

const Cart = ({ cartItems, setCartItems }) => {

    const increment = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        ));
    }

    const decrement = (id) => {
        setCartItems(cartItems.map(item => 
            item.id === id ? { ...item, quantity: Math.max(item.quantity - 1, 1) } : item
        ));
    }

    const removeItem = (id) => {
        setCartItems(cartItems.filter(item => item.id !== id));
    }

    const total = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

    return (
        <div className='cart'>
            <h1>Your Cart</h1>
            {cartItems.length === 0 ? <p>Cart is empty</p> : 
                cartItems.map(item => (
                <div key={item.id} className='cart_item'>
                    <img src={item.thumbnail} alt={item.title} width={50}/>
                    <p>{item.title}</p>
                    <p>${item.price}</p>
                    <div>
                        <button onClick={() => decrement(item.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increment(item.id)}>+</button>
                    </div>
                    <button onClick={() => removeItem(item.id)}>Remove</button>
                </div>
            ))}
            <h2>Total: ${total}</h2>
        </div>
    )
}

export default Cart;
