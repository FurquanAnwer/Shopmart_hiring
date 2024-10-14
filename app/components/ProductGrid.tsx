"use client"
import { useEffect, useState } from 'react';
import { fetchProducts } from '../../utils/api';
import ProductCard from './ProductCard';
import styles from './ProductGrid.module.css';

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

const ProductGrid = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchProducts();
      setProducts(data);
    };
    getProducts();
  }, []);

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  return (
    <>
      <div className={styles.categoryButtons}>
        <button onClick={() => setSelectedCategory('all')}>All</button>
        <button onClick={() => setSelectedCategory('electronics')}>Electronics</button>
        <button onClick={() => setSelectedCategory('jewelery')}>Jewelry</button>
        <button onClick={() => setSelectedCategory("men's clothing")}>Men's Clothing</button>
        <button onClick={() => setSelectedCategory("women's clothing")}>Women's Clothing</button>
      </div>
      <div className={styles.grid}>
        {filteredProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
};

export default ProductGrid;
