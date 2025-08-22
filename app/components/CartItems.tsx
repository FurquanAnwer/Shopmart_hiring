import React from 'react';
import { FaPlus, FaMinus, FaTrashAlt } from 'react-icons/fa';

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
    <div className="space-y-4">
      {items.map(item => (
        <div key={item.id} className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow">
          <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded" />
          <div className="flex-grow">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-gray-600">${item.price.toFixed(2)}</p>
            <div className="flex items-center space-x-2 mt-2">
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => onQuantityChange(item.id, item.quantity - 1)}
              >
                <FaMinus />
              </button>
              <span className="font-medium">{item.quantity}</span>
              <button
                className="text-gray-500 hover:text-gray-700"
                onClick={() => onQuantityChange(item.id, item.quantity + 1)}
              >
                <FaPlus />
              </button>
            </div>
          </div>
          <button
            className="text-slate-600 hover:text-slate-900"
            onClick={() => onRemove(item.id)}
          >
            <FaTrashAlt />
          </button>
        </div>
      ))}
    </div>
  );
};

export default CartItems;

