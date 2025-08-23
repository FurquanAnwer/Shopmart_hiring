"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { fetchProducts } from "../../utils/api";
import ProductCard from "../components/ProductCard";
import SkeletonGrid from "./SkeletonGrid";
import { useRouter } from "next/navigation";

interface Product {
  id: number;
  title: string;
  price: number;
  category: string;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

export default function SearchResults() {
  const searchParams = useSearchParams();
  const query = searchParams.get("q");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading,setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const getProducts = async () => {
      try{
        const data = await fetchProducts();
        setProducts(data);
      }
      catch{
        console.log(`Unable to fetched searched product with the query ${query}`)
      }
      finally{
        setLoading(false)
      }
    };
    getProducts()
  }, []);

  if(!query)router.push('/')
  const regex = new RegExp(`\\b${query}\\b`, "i");
  const filteredProducts = products.filter(
    (p) => regex.test(p.title) || regex.test(p.description)
  )
  const noOfProducts = filteredProducts.length;


  return (
    <div className="container mx-auto px-4 m-2">
      {
          loading?
          <SkeletonGrid/>:
          <div>
              <div className="flex flex-row justify-center text-gray-700 text-2xl mb-10 mt-3">
                {noOfProducts} matching products found!
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>

          </div>          
      }
    </div>
  );
}
