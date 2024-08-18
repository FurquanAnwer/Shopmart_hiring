"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';
// import './CartPage.module.css';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateQuantity({ id, quantity }));
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    toast.success("Successfully checked out");
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="flex flex-row">
  <div className="w-1/2">
    <CartItems 
      items={items} 
      onRemove={handleRemove} 
      onQuantityChange={handleQuantityChange} 
    />
  </div>
  <div className="w-1/2">
    <CartSummary 
      total={total} 
      onCheckout={handleCheckout}
      items={items} 
    />
  </div>
</div>

  );
};

export default CartPage;
