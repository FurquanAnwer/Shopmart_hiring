"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from 'react'
import { fetchProducts } from '../../utils/api'
import ProductCard from '../components/ProductCard'

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

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q"); // e.g. ?q=iphone

  const [products, setProducts] = useState<Product[]>([])

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts()
      setProducts(data)
    }
    getProducts()
  }, [])

  const regex = new RegExp(`\\b${query}\\b`, "i");
  const filteredProducts = products.filter(p => regex.test(p.title) || regex.test(p.description))
  const noOfProducts = filteredProducts.length

  console.log(filteredProducts)  
    
  return (
    <div className="container mx-auto px-4 m-2">
        <div className="flex flex-row justify-center text-gray-700 text-2xl mb-10 mt-3" >
            {noOfProducts} matching products found!
        </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}







