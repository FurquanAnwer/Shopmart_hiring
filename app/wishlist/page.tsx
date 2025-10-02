"use client"

import { useEffect, useState } from 'react'
import { fetchProducts } from '../../utils/api'
import { RootState, AppDispatch } from '../../redux/store';
import { removeFromWishList } from '@/redux/wishList';
import ProductCard from '../components/ProductCard'
import { SkeletonCard } from '../components/SkeletonCard'
import { Skeleton } from '@/components/ui/skeleton'
import SkeletonGrid from '../components/SkeletonGrid'
import { useDispatch, useSelector } from 'react-redux';
import Link from 'next/link'
import toast from 'react-hot-toast';


const wishlist = () => {
  const dispatch = useDispatch<AppDispatch>();
  const items = useSelector((state: RootState) => state.wishList.items);


  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">Your Wishlist has {items.length} items!</h1>
      {items.length === 0 ? (
        <div className="text-center text-gray-500">
          <p className="text-xl mb-4">Your wishlist is empty</p>
          <Link href="/" className="text-blue-500 hover:underline">Continue Shopping</Link>
        </div>
      ) : (
        <div className="container mx-auto p-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {
            items.map(product => (
            <ProductCard key={product.id} product={product} />           
            ))
            }
            </div>
        </div>
      )}
    </div>
  );
};

export default wishlist;

