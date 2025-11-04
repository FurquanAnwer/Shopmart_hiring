"use client"

import { useEffect, useState } from 'react'
import { fetchProducts } from '../../utils/api'
import ProductCard from './ProductCard'
import { SkeletonCard } from '../components/SkeletonCard'
import { Skeleton } from '@/components/ui/skeleton'
import SkeletonGrid from './SkeletonGrid'
import CarouselComponent from './Carousel'

interface Product {
  id: string
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
  const [loading,setLoading] = useState(true)

  useEffect(() => {
    const getProducts = async () => {
      try {
          const data = await fetchProducts()
          setProducts(data)
      } catch (error) {
        console.error("Failed to fetch products:", error)
      } finally {
        setLoading(false)   // stop loading after fetch
      }
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
    <div className="container mx-auto p-2 flex flex-col gap-2">
      <div className='flex items-center justify-center m-3'>
        <CarouselComponent/>
      </div>      
      <div className="flex flex-wrap justify-center gap-2 m-5">
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
      <div className='mt-2'>
      {
        loading ? 
        <SkeletonGrid/> :
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {
          filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />           
          ))
          }
        </div>
      }
      </div>
    </div>
  )
}

export default ProductGrid

