"use client";

import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromCart, updateQuantity, clearCart } from '../../redux/cartSlice';
import CartItems from '../components/CartItems';
import CartSummary from '../components/CartSummary';
import { Toaster } from 'react-hot-toast';
import Link from "next/link"
import { motion,AnimatePresence } from 'framer-motion';

const CartPage = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.cart.items);
  const [quantityUpdated,setquantityUpdated] = useState(false)
  const [removedFromCart,setremovedFromCart] = useState(false)
  const [checkedOut,setcheckedOut] = useState(false)

  const handleRemove = (id: string) => {
    dispatch(removeFromCart(id));
    setremovedFromCart(true)
    setTimeout(()=>setremovedFromCart(false),2000)  };

  const handleQuantityChange = (id: string, quantity: number) => {
    if (quantity <= 0) {
      dispatch(removeFromCart(id));
      setremovedFromCart(true)
      setTimeout(()=>setremovedFromCart(false),2000)
    } else {
      dispatch(updateQuantity({ id, quantity }));
      setquantityUpdated(true)
      setTimeout(()=>setquantityUpdated(false),2000)
    }
  };

  const handleCheckout = () => {
    dispatch(clearCart());
    setcheckedOut(true)
    setTimeout(()=>setcheckedOut(false),2000)
  };

  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <>
    <div className="container mx-auto px-4 py-8">
      <Toaster position="bottom-right" />
      <h1 className="text-3xl font-bold mb-8 text-center">Your Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-xl mb-4">Your cart is empty</p>
          <Link href="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
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
          <AnimatePresence>
        {quantityUpdated && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg z-10"
          >
            Quantity Updated !
          </motion.div>
        )}
        {removedFromCart && ( 
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg z-10"
          >
            Item removed from cart!
          </motion.div>
        
        )
        }
        {checkedOut && ( 
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-slate-800 text-white px-6 py-3 rounded-full shadow-lg z-10"
          >
            Successfully checked out!
          </motion.div>
        
        )
        }

      </AnimatePresence>

    </>
    
  );
};

export default CartPage;

