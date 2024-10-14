"use client";

import React from 'react';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';
import { PiX } from 'react-icons/pi';

interface CartItem {
  id: string;
  name: string;
  image: string;
  price: number;
  quantity: number;
}

interface CartItemsProps {
  items: CartItem[];
  onRemove: (id: string) => void;
  onQuantityChange: (id: string, quantity: number) => void;
}

const CartItems: React.FC<CartItemsProps> = ({ items, onRemove, onQuantityChange }) => {
  return (
    <div style={styles.cartItems}>
      <div>
        <p style={styles.cartTitle}>Cart Items</p>
      </div>
      {items.length==0 && <p style={styles.cartTitle}>Your Cart is empty!</p>}
      {items.map(item => (
        <div key={item.id} style={styles.cartItem}>
          <div style={styles.cartItemInner}>
            <img src={item.image} alt={item.name} style={styles.cartImage} />
            <div style={styles.cartDetails}>
              <h3 style={styles.cartItemTitle}>{item.name}</h3>
              <p style={styles.cartItemPrice}>${item.price.toFixed(2)}</p>
              <div style={styles.cartControls}>
                <button
                  style={styles.controlButton}
                  onClick={() => onQuantityChange(item.id, item.quantity - 1)}
                >
                  <FaMinus />
                </button>
                <span style={styles.quantity}>{item.quantity}</span>
                <button
                  style={styles.controlButton}
                  onClick={() => onQuantityChange(item.id, item.quantity + 1)}
                >
                  <FaPlus />
                </button>
                <button
                  style={{ ...styles.controlButton, ...styles.removeButton }}
                  onClick={() => onRemove(item.id)}
                >
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const styles = {
  cartItems: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '20px',
    maxWidth: '100%',
    marginRight: 'auto',
    padding: '20px',
    alignItems: 'center', // Centers items horizontally
    justifyContent: 'center', // Centers items vertically (if container has height)
  },

  cartTitle: {
    fontWeight: 'bold' as const,
    textAlign: 'center' as const,
    fontSize: '24px',
    marginBottom: '20px',
  },
  cartItem: {
    display: 'flex',
    alignItems: 'center',
    width: '100%', // Make items take up full width of their container
    maxWidth: '600px', // Optional: set a max width if needed
    borderRadius: '8px',
    backgroundColor: '#f9f9f9',
    padding: '15px', // Increased padding for better appearance
    gap: '15px',
    boxSizing: 'border-box' as const, // Use 'as const' to enforce allowed values
  },

  cartItemInner: {
    display: 'flex',
    flexDirection: 'row' as const,
    margin: '10px',
    backgroundColor: '#f9f9f9',
  },
  cartImage: {
    width: '15rem',
    height: '15rem',
    objectFit: 'cover' as const,
    borderRadius: '2px',
    padding: '5px',
  },
  cartDetails: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '10px',
  },
  cartControls: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginTop: '10px',
  },
  controlButton: {
    border: 'none',
    backgroundColor: 'transparent',
    cursor: 'pointer',
    fontSize: '25px',
    color: '#0070f3',
  },
  quantity: {
    fontSize: '18px',
    margin: '0 10px',
  },
  removeButton: {
    color: '#e00',
  },
  cartItemTitle: {
    margin: 5,
    fontSize: '18px',
  },
  cartItemPrice: {
    margin: 5,
    fontSize: '16px',
  },
};

export default CartItems;
