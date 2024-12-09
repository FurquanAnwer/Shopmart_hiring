"use client"

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/cartSlice';
import { Star, ShoppingCart, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: {
    rate: number;
  };
}

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch();
  const [isExpanded, setIsExpanded] = useState(false);
  const [showNotification, setShowNotification] = useState(false);

  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ));
  };

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch(
      addToCart({
        id: String(product.id),
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    );
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 2000);
  };

  return (
    <>
      <div 
        className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:scale-105 cursor-pointer"
        onClick={toggleExpand}
      >
        <div className="relative h-48 w-full">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="transition-opacity duration-300 hover:opacity-75"
          />
        </div>
        <div className="p-4">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2">{product.title}</h3>
          <div className="flex justify-between items-center mb-2">
            <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <div className="flex">{renderStars(product.rating.rate)}</div>
          </div>
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-md shadow-lg"
          >
            Item added to cart!
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
            onClick={toggleExpand}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                onClick={toggleExpand}
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row gap-6">
                <div className="md:w-1/2">
                  <Image
                    src={product.image}
                    alt={product.title}
                    width={300}
                    height={300}
                    objectFit="contain"
                    className="w-full h-auto"
                  />
                </div>
                <div className="md:w-1/2">
                  <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                  <p className="text-gray-600 mb-4">{product.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <p className="text-2xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                    <div className="flex">{renderStars(product.rating.rate)}</div>
                  </div>
                  <button 
                    onClick={handleAddToCart} 
                    className="w-full bg-blue-600 text-white py-3 rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center"
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ProductCard;

