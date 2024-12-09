import React, { useState } from 'react';
import { FaShoppingCart } from 'react-icons/fa';

interface CartSummaryProps {
  total: number;
  onCheckout: () => void;
  items: { name: string; price: number; quantity: number }[];
}

const CartSummary: React.FC<CartSummaryProps> = ({ total, onCheckout, items }) => {
  const [coupon, setCoupon] = useState('');

  const applyCoupon = () => {
    // Implement coupon logic here
    console.log('Applying coupon:', coupon);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-4">Order Summary</h2>
      <div className="space-y-2 mb-4">
        {items.map((item, index) => (
          <div key={index} className="flex justify-between">
            <span>{item.name} x {item.quantity}</span>
            <span>${(item.price * item.quantity).toFixed(2)}</span>
          </div>
        ))}
      </div>
      <div className="border-t pt-4 mb-4">
        <div className="flex justify-between font-semibold">
          <span>Total</span>
          <span>${total.toFixed(2)}</span>
        </div>
      </div>
      <div className="mb-4">
        <input
          type="text"
          value={coupon}
          onChange={(e) => setCoupon(e.target.value)}
          placeholder="Enter coupon code"
          className="w-full p-2 border rounded"
        />
        <button
          onClick={applyCoupon}
          className="mt-2 w-full bg-gray-200 text-gray-800 py-2 rounded hover:bg-gray-300 transition duration-200"
        >
          Apply Coupon
        </button>
      </div>
      <button
        onClick={onCheckout}
        className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition duration-200 flex items-center justify-center"
      >
        <FaShoppingCart className="mr-2" />
        Proceed to Checkout
      </button>
    </div>
  );
};

export default CartSummary;

