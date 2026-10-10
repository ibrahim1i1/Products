import type { Product, ProductsResponse } from './types/product';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await fetch('https://dummyjson.com/products');

        if (!res.ok) {
          throw new Error('Failed to fetch products; check your internet connection.')
        }

        const data: ProductsResponse = await res.json();
        setProducts(data.products)

      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred.')
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [])


  return (
    <div>
      
    </div>
  );

}

export default App
