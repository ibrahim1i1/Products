import type { Product, ProductsResponse } from './types/product';
import './App.css';
import { useEffect, useState } from 'react';


function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [search, setSearech] = useState<string>('');

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  )

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
    <div className='min-h-screen bg-slate-900 text-slate-900 p-6'>
      <div className='max-w-6x mx-auto bg'>
        <header className=' mb-8 text-center'>
          <h1 className='text-white text-3xl font-bold tracking-tight mb-2'>Product Store</h1>
          <p className='text-slate-400 text-sm'>Product Display and Filtering Project Using an API</p>
        </header>

        <div className='max-w-md mx-auto mb-6'>
          <input type="text"
            className='border border-slate-700 w-full bg-slate-800 rounded-xl text-white placeholder-slate-400 focus:outline-none px-4 py-2 focus:border-blue-400 focus:ring-1 focus:ring-blue-500 transition duration-150'
            placeholder='Search by title'
            value={search}
            onChange={(e) => setSearech(e.target.value)}
          />
        </div>

        {!loading && !error && filteredProducts.length === 0 && (
          <p className='text-center text-slate-400 py-10'>
            There are no matching products for {search}
          </p>
        )}

        {loading && (
          <div className='flex justify-center items-center py-20'>
            <div className='w-10 h-10 border-4 border-blue-500 rounded-full  border-t-transparent animate-spin'></div>
          </div>
        )}

        {error && !loading && (
          <div className='bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl text-center max-w-md mx-auto'>
            {error}
          </div>
        )}

        {!loading && !error && (
          <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
            {filteredProducts.map((product) => (
              <div
                className='bg-slate-800 border border-slate-700/60 rounded-xl overflow-hidden hover:shadow-slate-500 hover:shadow-md
                 hover:scale-102 transition-all duration-200 flex flex-col justify-between'
                key={product.id}
              >

                <div className='h-48 w-full bg-slate-950/40 p-4 flex items-center justify-center'>
                  <img
                    className='max-h-full max-w-full object-contain'
                    src={product.thumbnail} alt={product.title} />
                </div>


                <div className='p-4 flex flex-col flex-grow justify-between gap-3'>
                  <div>
                    <span className='text-blue-400 text-xs font-semibold px-2.5 py-0.5 rounded-full bg-blue-500/10 uppercase
                     tracking-wider'>{product.category}</span>
                    <h2 className='text-base font-semibold text-white mt-2 line-clamp-1'>{product.title}</h2>
                    <p className='text-slate-400 text-xs line-clamp-2 mt-1'>{product.description}</p>
                  </div>
                </div>

                <div className='flex items-center justify-between pt-2 border-t border-slate-700/40'>
                  <span className='text-emerald-400 text-lg font-bold mx-2'>
                    ${product.price}
                  </span>
                  <span className='text-amber-400 font-medium mx-2'>
                    ★ {product.rating}
                  </span>
                </div>

              </div>
            ))}
          </div>
        )}


      </div>

    </div>
  );

}

export default App
