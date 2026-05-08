import { useState, useEffect } from 'react';
import { ShoppingCart, Star, Filter, Music } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface Product {
  id: string;
  name: string;
  artist: string;
  description: string;
  price: number;
  image_url: string;
  genre: string;
  featured: boolean;
}

export default function Shop() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeGenre, setActiveGenre] = useState('All');

  useEffect(() => {
    fetchProducts();
  }, []);

  async function fetchProducts() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('featured', { ascending: false });

    if (!error && data) {
      setProducts(data);
    }
    setLoading(false);
  }

  const genres = ['All', ...Array.from(new Set(products.map((p) => p.genre)))];

  const filtered = activeGenre === 'All'
    ? products
    : products.filter((p) => p.genre === activeGenre);

  return (
    <section id="shop" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 neon-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-neon-cyan/20 rounded-full bg-neon-cyan/5">
            <Music className="w-4 h-4 text-neon-cyan" />
            <span className="font-display text-[0.65rem] font-medium tracking-[0.25em] uppercase text-neon-cyan/80">
              Plugin Collection
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="text-white">The </span>
            <span className="text-gradient-cyan">Shop</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Each plugin is precision-captured using Neural Amp Modeling to deliver the exact tone of legendary guitar players.
          </p>
        </div>

        {/* Genre filter */}
        <div className="flex items-center justify-center gap-2 mb-12 flex-wrap">
          <Filter className="w-4 h-4 text-gray-500 mr-2" />
          {genres.map((genre) => (
            <button
              key={genre}
              onClick={() => setActiveGenre(genre)}
              className={`px-4 py-2 font-display text-[0.65rem] font-medium tracking-widest uppercase rounded transition-all duration-300 ${
                activeGenre === genre
                  ? 'bg-neon-cyan/10 text-neon-cyan border border-neon-cyan/40 shadow-[0_0_10px_#00f0ff20]'
                  : 'text-gray-500 border border-white/5 hover:text-gray-300 hover:border-white/10'
              }`}
            >
              {genre}
            </button>
          ))}
        </div>

        {/* Products grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="product-card rounded-xl overflow-hidden animate-pulse">
                <div className="aspect-[4/3] bg-dark-700" />
                <div className="p-5 space-y-3">
                  <div className="h-4 bg-dark-600 rounded w-3/4" />
                  <div className="h-3 bg-dark-600 rounded w-1/2" />
                  <div className="h-3 bg-dark-600 rounded w-full" />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function ProductCard({ product }: { product: Product }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="product-card rounded-xl overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={product.image_url}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark-950 via-dark-950/20 to-transparent" />

        {product.featured && (
          <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-neon-pink/20 border border-neon-pink/40 rounded-full backdrop-blur-sm">
            <Star className="w-3 h-3 text-neon-pink fill-neon-pink" />
            <span className="font-display text-[0.55rem] font-semibold tracking-wider uppercase text-neon-pink">
              Featured
            </span>
          </div>
        )}

        <div className="absolute top-3 right-3 px-3 py-1 bg-dark-950/60 border border-white/10 rounded-full backdrop-blur-sm">
          <span className="font-display text-[0.55rem] font-medium tracking-wider uppercase text-gray-300">
            {product.genre}
          </span>
        </div>

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-neon-cyan/5 transition-opacity duration-500 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        />
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div>
            <h3 className="font-display text-sm font-bold tracking-wide text-white group-hover:text-neon-cyan transition-colors duration-300">
              {product.name}
            </h3>
            <p className="font-display text-[0.65rem] font-medium tracking-wider uppercase text-neon-pink/70 mt-0.5">
              {product.artist}
            </p>
          </div>
          <div className="font-display text-lg font-bold text-neon-cyan whitespace-nowrap">
            ${product.price}
          </div>
        </div>

        <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">
          {product.description}
        </p>

        <button className="w-full btn-neon text-[0.65rem] py-2 justify-center rounded">
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
