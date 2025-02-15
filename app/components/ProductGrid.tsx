"use client"

import { useEffect, useState } from 'react'
import { fetchProducts } from '../../utils/api'
import ProductCard from './ProductCard'

interface Product {
  id: number
  title: string
  price: number
  category: string
  image: string
  description: string
  rating: {
    rate: number
    count: number
  }
}

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts()
      setProducts(data)
    }
    getProducts()
  }, [])

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory)

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'electronics', name: 'Electronics' },
    { id: 'jewelery', name: 'Jewelry' },
    { id: "men's clothing", name: "Men's Clothing" },
    { id: "women's clothing", name: "Women's Clothing" },
  ]

  return (
    <div className="container mx-auto px-4 m-2">
      <div className="flex flex-wrap justify-center gap-2 mb-8">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className={`
              px-4 py-2 rounded-full text-m font-medium
              transition-all duration-300 ease-in-out
              hover:bg-gray-100 hover:shadow-md
              focus:outline-none focus:ring-2 focus:ring-gray-300
              ${selectedCategory === category.id
                ? 'bg-gray-200 text-gray-800 shadow-md'
                : 'bg-white text-gray-600 shadow-sm'
              }
              backdrop-filter backdrop-blur-sm bg-opacity-80
            `}
          >
            {category.name}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid

