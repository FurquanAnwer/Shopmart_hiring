// src/utils/api.js
export const fetchProducts = async () => {
  try{
    const response = await fetch('https://fakestoreapi.com/products');
    const products = await response.json();
    return products;
  }
  catch{
    console.log("Failed to fetch products!")
  }
};
  