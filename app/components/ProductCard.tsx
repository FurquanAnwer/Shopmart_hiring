"use client"

import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/cartSlice'
import { Star, ShoppingCart, X } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

interface Product {
  id: number
  title: string
  price: number
  image: string
  description: string
  rating: {
    rate: number
  }
}

interface ProductCardProps {
  product: Product
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useDispatch()
  const [isExpanded, setIsExpanded] = useState(false)
  const [showNotification, setShowNotification] = useState(false)

  const toggleExpand = () => {
    setIsExpanded(!isExpanded)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < Math.round(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
        }`}
      />
    ))
  }

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation()
    dispatch(
      addToCart({
        id: String(product.id),
        name: product.title,
        price: product.price,
        quantity: 1,
        image: product.image,
      })
    )
    setShowNotification(true)
    setTimeout(() => setShowNotification(false), 2000)
  }

  return (
    <>
      <motion.div 
        className="bg-gradient-to-br from-white to-gray-100 rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl flex flex-col h-full"
        whileHover={{ scale: 1.03 }}
        onClick={toggleExpand}
      >
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={product.image}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="transition-transform duration-300 hover:scale-110"
          />
        </div>
        <div className="p-4 flex flex-col flex-grow">
          <h3 className="text-lg font-semibold mb-2 line-clamp-2 flex-grow">{product.title}</h3>
          <div className="flex justify-between items-center mb-4">
            <p className="text-xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
            <div className="flex">{renderStars(product.rating.rate)}</div>
          </div>
          <button 
            onClick={handleAddToCart} 
            className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-2 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Add to Cart
          </button>
        </div>
      </motion.div>

      <AnimatePresence>
        {showNotification && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4 bg-green-500 text-white px-6 py-3 rounded-full shadow-lg"
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
              className="bg-white rounded-xl p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <button 
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 transition-colors duration-300"
                onClick={toggleExpand}
                aria-label="Close"
              >
                <X className="w-6 h-6" />
              </button>
              <div className="flex flex-col md:flex-row gap-8">
                <div className="md:w-1/2">
                  <div className="bg-gray-100 rounded-lg p-4 flex items-center justify-center">
                    <Image
                      src={product.image}
                      alt={product.title}
                      width={300}
                      height={300}
                      objectFit="contain"
                      className="w-full h-auto max-h-[300px]"
                    />
                  </div>
                </div>
                <div className="md:w-1/2 flex flex-col">
                  <h2 className="text-2xl font-bold mb-4">{product.title}</h2>
                  <p className="text-gray-600 mb-6 flex-grow">{product.description}</p>
                  <div className="flex justify-between items-center mb-6">
                    <p className="text-3xl font-bold text-blue-600">${product.price.toFixed(2)}</p>
                    <div className="flex">{renderStars(product.rating.rate)}</div>
                  </div>
                  <button 
                    onClick={handleAddToCart} 
                    className="w-full bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-md hover:from-blue-600 hover:to-blue-700 transition-all duration-300 flex items-center justify-center transform hover:scale-105"
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
  )
}

export default ProductCard

