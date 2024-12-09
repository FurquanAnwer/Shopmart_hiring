"use client"

import { useEffect, useState } from 'react'
import { fetchProducts } from '../../utils/api'
import ProductCard from './ProductCard'
import styles from './ProductGrid.module.css'

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

  return (
    <>
      <div className={`${styles.categoryButtons} flex flex-wrap justify-center gap-2 mb-4`}>
        <button onClick={() => setSelectedCategory('all')} className="px-4 py-2 bg-blue-500 text-white rounded">All</button>
        <button onClick={() => setSelectedCategory('electronics')} className="px-4 py-2 bg-blue-500 text-white rounded">Electronics</button>
        <button onClick={() => setSelectedCategory('jewelery')} className="px-4 py-2 bg-blue-500 text-white rounded">Jewelry</button>
        <button onClick={() => setSelectedCategory("men's clothing")} className="px-4 py-2 bg-blue-500 text-white rounded">Men's Clothing</button>
        <button onClick={() => setSelectedCategory("women's clothing")} className="px-4 py-2 bg-blue-500 text-white rounded">Women's Clothing</button>
      </div>
      <div className={`${styles.grid} grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4`}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default ProductGrid

