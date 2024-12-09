"use client";

import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';
import toast from 'react-hot-toast';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';
import { Toaster } from 'react-hot-toast';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart");
  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
      toast.success("Item removed from cart");
    } else {
      dispatch(updateQuantity({ id, quantity }));
      toast.success("Quantity updated");
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    toast.success("Successfully checked out");
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto px-4 py-8">
      <Toaster position="top-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-xl mb-4">Your cart is empty</p>
          <a href="/" className="text-blue-500 hover:underline">Continue Shopping</a>
        </div>
      ) : (
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-2/3">
            <CartItems 
              items={items} 
              onRemove={handleRemove} 
              onQuantityChange={handleQuantityChange} 
            />
          </div>
          <div className="lg:w-1/3">
            <div className="sticky top-24">
              <CartSummary 
                total={total} 
                onCheckout={handleCheckout}
                items={items} 
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CartPage;

