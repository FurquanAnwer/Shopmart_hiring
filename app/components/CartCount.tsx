// src/components/CartCount.js
"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { RootState } from '@/redux/store';
import { useSelector } from 'react-redux';

const CartCount = () => {
  const router = useRouter();
  const items = useSelector((state: RootState) => state.cart.items);

  const navigateToCart = () => {
    router.push('/cart'); // Adjust the path based on your actual Cart Page route
  };

  const containerStyle:React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
  };

  const iconContainerStyle:React.CSSProperties = {
    cursor: 'pointer',
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
  };

  const iconStyle:React.CSSProperties = {
    fontSize: '30px',
    color: '#00050b',
  };

  const countStyle:React.CSSProperties = {
    position: 'absolute',
    top: '-10px',
    right: '-10px',
    backgroundColor: 'red',
    color: 'white',
    borderRadius: '50%',
    padding: '5px 10px',
    fontSize: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={iconContainerStyle} onClick={navigateToCart}>
        <FontAwesomeIcon icon={faShoppingCart} style={iconStyle} />
        {/* Optional: Add a count badge if needed */}
        <span style={countStyle}>{items.length}</span>
      </div>
    </div>
  );
};

export default CartCount;
