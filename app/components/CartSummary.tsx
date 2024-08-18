"use client";
import React, { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
  items: { name: string; price: number; quantity: number }[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout, items }) => {
  const [coupon, setCoupon] = useState('');
  const [discount, setDiscount] = useState(0);
  const [toastShown, setToastShown] = useState(false);

  const validCoupons = {
    SAVE10: 10,
    SAVE20: 20,
    SAVE30: 30,
  };

  const applyCoupon = () => {
    if (validCoupons[coupon]) {
      setDiscount(validCoupons[coupon]);
      if (!toastShown) {
        toast.success(`Coupon applied! ${validCoupons[coupon]}% discount`);
        setToastShown(true);
      }
    } else {
      toast.error('Invalid coupon code');
    }
  };

  const handleCheckout = () => {
    if (total - (total * discount) / 100 > 0) {
      onCheckout();
      toast.success('Successfully checked out!');
    }
  };

  const directDiscount = 20;
  const finalTotal = total - directDiscount - (total * discount) / 100;

  return (
    <div style={styles.cartSummary}>
      <Toaster />
      <h2 style={styles.orderSummaryTitle}>Order Summary</h2>

      <div style={styles.billDetails}>
        <table style={styles.billTable}>
          <thead>
            <tr>
              <th>Product</th>
              <th>Price</th>
              <th>Quantity</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((item, index) => (
              <tr key={index}>
                <td>{item.name}</td>
                <td>${item.price.toFixed(2)}</td>
                <td>{item.quantity}</td>
                <td>${(item.price * item.quantity).toFixed(2)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div style={styles.discountSection}>
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Use SAVE10,SAVE20,SAVE30"
          style={styles.couponInput}
        />
        <button onClick={applyCoupon} style={styles.applyButton}>Apply</button>
      </div>

      <div style={styles.discountDetails}>
        <h3>Direct Discount: ${directDiscount.toFixed(2)}</h3>
        <h3>Percentage Discount: {discount}%</h3>
      </div>

      <h2 style={styles.finalTotal}>Total: ${finalTotal.toFixed(2)}</h2>
      <button onClick={handleCheckout} style={styles.checkoutButton}>Checkout</button>
    </div>
  );
};

const styles = {
  cartSummary: {
    backgroundColor: '#bed8f1',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    maxWidth: '500px',
    margin: '40px auto',
  },
  orderSummaryTitle: {
    fontSize: '50px',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: '20px',
  },
  billDetails: {
    marginBottom: '20px',
  },
  billTable: {
    width: '100%',
    borderCollapse: 'collapse',
  },
  billTableHeaderFooter: {
    padding: '10px',
    textAlign: 'left',
    borderBottom: '1px solid #ccc',
  },
  discountSection: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '20px',
  },
  couponInput: {
    flexGrow: 1,
    padding: '10px',
    borderRadius: '5px',
    border: '1px solid #ccc',
    marginRight: '10px',
  },
  applyButton: {
    padding: '10px 20px',
    backgroundColor: '#28a745',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
  discountDetails: {
    marginTop: '10px',
    fontSize: '16px',
    lineHeight: '1.6',
  },
  finalTotal: {
    fontSize: '20px',
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: '10px',
  },
  checkoutButton: {
    width: '100%',
    padding: '15px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    marginTop: '20px',
  },
  buttonHover: {
    backgroundColor: '#0056b3',
  },
};

export default CartSummary;
