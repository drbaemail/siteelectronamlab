import { useState, useEffect, createContext, useContext, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Star, Filter, Music } from 'lucide-react';
import { supabase } from '../lib/supabase';

export interface Product {
  id: string;
  name: string;
  artist: string;
  description: string;
  price: number;
  image_url: string;
  genre: string;
  featured: boolean;
}

interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartContextType {
  items: CartItem[];
  isOpen: boolean;
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, delta: number) => void;
  closeCart: () => void;
  total: number;
}

export const CartContext = createContext<CartContextType>({
  items: [],
  isOpen: false,
  addItem: () => {},
  removeItem: () => {},
  updateQuantity: () => {},
  closeCart: () => {},
  total: 0,
});

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const addItem = useCallback((product: Product) => {
    setItems((prev) => {
      const existing = prev.find((item) => item.product.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    setIsOpen(true);
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((item) => item.product.id !== productId));
  }, []);

  const updateQuantity = useCallback((productId: string, delta: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === productId
            ? { ...item, quantity: item.quantity + delta }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  }, []);

  const closeCart = useCallback(() => setIsOpen(false), []);

  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <CartContext.Provider value={{ items, isOpen, addItem, removeItem, updateQuantity, closeCart, total }}>
      {children}
    </CartContext.Provider>
  );
}

const genreColors: Record<string, { stroke: string; fill: string; accent: string }> = {
  'Psychedelic Rock': { stroke: '#00f0ff', fill: '#00f0ff', accent: 'text-neon-cyan' },
  'Hard Rock': { stroke: '#ff00e5', fill: '#ff00e5', accent: 'text-neon-pink' },
  'Progressive Rock': { stroke: '#39ff14', fill: '#39ff14', accent: 'text-neon-green' },
  'Blues Rock': { stroke: '#ff6600', fill: '#ff6600', accent: 'text-neon-orange' },
  'Blues Pop': { stroke: '#00f0ff', fill: '#00f0ff', accent: 'text-neon-cyan' },
  'Classic Rock': { stroke: '#ff00e5', fill: '#ff00e5', accent: 'text-neon-pink' },
  'Instrumental Rock': { stroke: '#39ff14', fill: '#39ff14', accent: 'text-neon-green' },
  'Latin Rock': { stroke: '#ff6600', fill: '#ff6600', accent: 'text-neon-orange' },
  'Blues': { stroke: '#ff6600', fill: '#ff6600', accent: 'text-neon-orange' },
};

function CornerAccents({ color }: { color: string }) {
  return (
    <g>
      <line x1="30" y1="30" x2="48" y2="30" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="30" y1="30" x2="30" y2="48" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="170" y1="30" x2="152" y2="30" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="170" y1="30" x2="170" y2="48" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="30" y1="170" x2="48" y2="170" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="30" y1="170" x2="30" y2="152" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="170" y1="170" x2="152" y2="170" stroke={color} strokeWidth="2" opacity="0.8" />
      <line x1="170" y1="170" x2="170" y2="152" stroke={color} strokeWidth="2" opacity="0.8" />
    </g>
  );
}

function VoodooGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Psychedelic silhouette */}
      {/* Head shape */}
      <path d="M 100 35 C 85 35, 75 45, 75 60 C 75 72, 80 80, 85 85 L 85 90 L 115 90 L 115 85 C 120 80, 125 72, 125 60 C 125 45, 115 35, 100 35" fill="none" stroke={color} strokeWidth="1.8" opacity="0.6" />
      {/* Bandana tied on head */}
      <path d="M 72 58 Q 85 50, 100 52 Q 115 50, 128 58" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      {/* Bandana tail flowing right */}
      <path d="M 128 58 Q 140 55, 148 48 Q 155 42, 160 45" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 128 60 Q 138 58, 145 52 Q 152 48, 158 50" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Afro hair above bandana */}
      <path d="M 78 55 Q 75 35, 90 28 Q 100 24, 110 28 Q 125 35, 122 55" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Shoulders / outfit collar - military style */}
      <path d="M 75 90 L 55 100 L 50 110" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 125 90 L 145 100 L 150 110" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* V-neck / collar opening */}
      <path d="M 85 90 L 100 110 L 115 90" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Military epaulettes */}
      <line x1="55" y1="100" x2="75" y2="95" stroke={color} strokeWidth="1" opacity="0.35" />
      <line x1="145" y1="100" x2="125" y2="95" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Psychedelic swirl background */}
      <path d="M 40 130 Q 60 120, 80 130 Q 100 140, 120 130 Q 140 120, 160 130" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M 45 140 Q 65 132, 85 140 Q 105 148, 125 140 Q 145 132, 160 140" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      {/* Fuzz pedal at bottom */}
      <rect x="70" y="155" width="60" height="25" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="88" cy="167" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="112" cy="167" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function SlashGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Top hat silhouette */}
      {/* Top hat */}
      <rect x="78" y="28" width="44" height="6" rx="1" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      <rect x="85" y="10" width="30" height="18" rx="1" fill="none" stroke={color} strokeWidth="2" opacity="0.7" />
      {/* Head shape */}
      <path d="M 88 34 C 88 34, 85 42, 85 50 C 85 58, 88 62, 92 65 L 108 65 C 112 62, 115 58, 115 50 C 115 42, 112 34, 112 34" fill="none" stroke={color} strokeWidth="1.8" opacity="0.6" />
      {/* Sunglasses */}
      <rect x="86" y="44" width="14" height="9" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <rect x="104" y="44" width="14" height="9" rx="3" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      {/* Bridge of sunglasses */}
      <line x1="100" y1="48" x2="104" y2="48" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Curly hair flowing down sides */}
      <path d="M 85 50 Q 78 55, 76 65 Q 74 75, 78 85 Q 80 90, 76 95" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 82 55 Q 75 62, 73 72 Q 71 82, 74 90" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <path d="M 115 50 Q 122 55, 124 65 Q 126 75, 122 85 Q 120 90, 124 95" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <path d="M 118 55 Q 125 62, 127 72 Q 129 82, 126 90" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Shoulders / leather jacket collar */}
      <path d="M 85 65 L 60 80 L 50 95" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <path d="M 115 65 L 140 80 L 150 95" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* V-neck jacket */}
      <path d="M 92 65 L 100 85 L 108 65" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Marshall stack outline */}
      <rect x="55" y="110" width="90" height="55" rx="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.15" />
      <circle cx="80" cy="135" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.12" />
      <circle cx="120" cy="135" r="12" fill="none" stroke={color} strokeWidth="0.5" opacity="0.12" />
    </svg>
  );
}

function DarkSideGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Prism/triangle symbol */}
      <polygon points="100,40 50,150 150,150" fill="none" stroke={color} strokeWidth="1.8" opacity="0.6" />
      {/* Light beam entering */}
      <line x1="30" y1="95" x2="65" y2="95" stroke={color} strokeWidth="1.2" opacity="0.5" />
      {/* Refracted rainbow beams exiting */}
      <line x1="135" y1="95" x2="175" y2="70" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="135" y1="95" x2="175" y2="80" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="135" y1="95" x2="175" y2="90" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <line x1="135" y1="95" x2="175" y2="100" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="135" y1="95" x2="175" y2="110" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="135" y1="95" x2="175" y2="120" stroke={color} strokeWidth="0.8" opacity="0.35" />
      {/* Pulse/Division Bell circle */}
      <circle cx="100" cy="95" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      <circle cx="100" cy="95" r="3" fill={color} opacity="0.2" />
      {/* Hiwatt amp outline */}
      <rect x="55" y="155" width="90" height="25" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="75" cy="167" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="100" cy="167" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="125" cy="167" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function TexasFloodGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Texas lone star */}
      <polygon points="100,35 108,60 135,60 113,75 120,100 100,83 80,100 87,75 65,60 92,60" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Texas Flood text */}
      <text x="100" y="118" textAnchor="middle" fill={color} fontSize="16" fontFamily="serif" fontWeight="bold" opacity="0.4" letterSpacing="2">TEXAS</text>
      <text x="100" y="135" textAnchor="middle" fill={color} fontSize="16" fontFamily="serif" fontWeight="bold" opacity="0.4" letterSpacing="2">FLOOD</text>
      {/* Texas outline simplified */}
      <path d="M 55 140 L 65 135 L 80 138 L 95 135 L 110 138 L 120 135 L 130 140 L 140 138 L 145 145 L 135 155 L 120 150 L 100 155 L 80 150 L 65 155 L 55 145 Z" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Vibroverb amp */}
      <rect x="50" y="160" width="100" height="20" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <circle cx="75" cy="170" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <circle cx="100" cy="170" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <circle cx="125" cy="170" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function ContinuumGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Continuum V symbol */}
      {/* Large V shape with inner lines */}
      <path d="M 50 40 L 100 160 L 150 40" fill="none" stroke={color} strokeWidth="2.5" opacity="0.6" />
      {/* Inner V - creating the double-V continuum effect */}
      <path d="M 65 40 L 100 135 L 135 40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      {/* Horizontal bars across the V (continuum lines) */}
      <line x1="60" y1="60" x2="140" y2="60" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="70" y1="80" x2="130" y2="80" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <line x1="78" y1="100" x2="122" y2="100" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Continuum dots along the V edges */}
      <circle cx="75" cy="40" r="2" fill={color} opacity="0.3" />
      <circle cx="125" cy="40" r="2" fill={color} opacity="0.3" />
      <circle cx="100" cy="160" r="2" fill={color} opacity="0.3" />
      {/* Two Rock amp outline */}
      <rect x="55" y="165" width="90" height="20" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="75" cy="175" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="100" cy="175" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="125" cy="175" r="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function StairwayGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Zoso-inspired symbol */}
      <path d="M 85 50 L 85 130 L 90 130 L 90 60 L 110 60 L 110 130 L 115 130 L 115 50" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="90" r="20" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="100" y1="70" x2="100" y2="110" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M 90 80 L 100 90 L 110 80" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      {/* Four symbols reference */}
      <circle cx="60" cy="145" r="8" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M 56 145 L 64 145" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <polygon points="100,137 92,155 108,155" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M 140 137 Q 148 145, 140 153 Q 132 145, 140 137" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="40" y="160" width="120" height="18" rx="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function WomanToneGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Union Jack / British flag simplified */}
      <line x1="40" y1="40" x2="160" y2="130" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="160" y1="40" x2="40" y2="130" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <line x1="100" y1="35" x2="100" y2="135" stroke={color} strokeWidth="2" opacity="0.5" />
      <line x1="40" y1="85" x2="160" y2="85" stroke={color} strokeWidth="2" opacity="0.5" />
      <rect x="40" y="35" width="120" height="100" rx="2" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <rect x="55" y="150" width="90" height="25" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="75" cy="162" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="100" cy="162" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="125" cy="162" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function LoveOfGuitarGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Triangle with eye symbol */}
      <polygon points="100,35 50,140 150,140" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <ellipse cx="100" cy="105" rx="18" ry="12" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="105" r="6" fill="none" stroke={color} strokeWidth="1.2" opacity="0.5" />
      <circle cx="100" cy="105" r="2" fill={color} opacity="0.4" />
      <line x1="82" y1="105" x2="72" y2="100" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="82" y1="105" x2="72" y2="110" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="118" y1="105" x2="128" y2="100" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="118" y1="105" x2="128" y2="110" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <line x1="100" y1="93" x2="100" y2="80" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <line x1="88" y1="95" x2="80" y2="85" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <line x1="112" y1="95" x2="120" y2="85" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <path d="M 65 155 Q 75 148, 85 155 Q 95 162, 105 155 Q 115 148, 125 155 Q 135 162, 140 155" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <rect x="50" y="162" width="100" height="18" rx="3" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
    </svg>
  );
}

function CliffsGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      <circle cx="100" cy="80" r="40" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="80" r="30" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <circle cx="100" cy="80" r="20" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <circle cx="100" cy="80" r="10" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="100" cy="80" r="3" fill={color} opacity="0.3" />
      <line x1="100" y1="35" x2="100" y2="125" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <line x1="55" y1="80" x2="145" y2="80" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <polygon points="100,45 135,80 100,115 65,80" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <rect x="55" y="140" width="90" height="35" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="75" cy="157" r="5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="100" cy="157" r="5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="125" cy="157" r="5" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <path d="M 90 140 L 90 135 L 95 132 L 100 130 L 105 132 L 110 135 L 110 140" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
    </svg>
  );
}

function ACDCGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      <path d="M 105 30 L 85 85 L 100 85 L 80 145 L 110 90 L 95 90 L 115 30 Z" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      <path d="M 140 50 L 130 80 L 138 80 L 125 115 L 145 85 L 137 85 L 148 50 Z" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <path d="M 40 155 Q 60 148, 80 155 Q 100 162, 120 155 Q 140 148, 160 155" fill="none" stroke={color} strokeWidth="1" opacity="0.3" />
      <path d="M 50 165 Q 70 160, 90 165 Q 110 170, 130 165 Q 150 160, 165 165" fill="none" stroke={color} strokeWidth="0.8" opacity="0.2" />
      <rect x="40" y="170" width="120" height="12" rx="2" fill="none" stroke={color} strokeWidth="0.6" opacity="0.2" />
      <rect x="40" y="155" width="120" height="12" rx="2" fill="none" stroke={color} strokeWidth="0.6" opacity="0.15" />
    </svg>
  );
}

function BlackMagicGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Ethnic patterns - Adinkra/Mesoamerican inspired */}
      {/* Central mandala with ethnic petal pattern */}
      <circle cx="100" cy="75" r="28" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      <circle cx="100" cy="75" r="18" fill="none" stroke={color} strokeWidth="1" opacity="0.4" />
      {/* 8-petal ethnic flower pattern */}
      <path d="M 100 47 L 100 103" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M 72 75 L 128 75" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M 80 55 L 120 95" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <path d="M 120 55 L 80 95" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Petal curves */}
      <path d="M 100 47 Q 108 60, 100 75 Q 92 60, 100 47" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <path d="M 128 75 Q 115 67, 100 75 Q 115 83, 128 75" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <path d="M 100 103 Q 92 90, 100 75 Q 108 90, 100 103" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      <path d="M 72 75 Q 85 67, 100 75 Q 85 83, 72 75" fill="none" stroke={color} strokeWidth="1" opacity="0.35" />
      {/* Adinkra-style geometric border pattern (step/fret pattern) */}
      <path d="M 35 115 L 45 115 L 45 105 L 55 105 L 55 115 L 65 115 L 65 105 L 75 105 L 75 115 L 85 115 L 85 105 L 95 105 L 95 115 L 105 115 L 105 105 L 115 105 L 115 115 L 125 115 L 125 105 L 135 105 L 135 115 L 145 115 L 145 105 L 155 105 L 155 115 L 165 115" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* Mesoamerican step pyramid pattern */}
      <path d="M 50 130 L 60 130 L 60 125 L 70 125 L 70 120 L 80 120 L 80 125 L 90 125 L 90 130 L 100 130 L 100 125 L 110 125 L 110 120 L 120 120 L 120 125 L 130 125 L 130 130 L 140 130 L 140 125 L 150 125 L 150 130 L 160 130" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Diamond ethnic pattern row */}
      <path d="M 55 140 L 62 135 L 69 140 L 62 145 Z" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M 76 140 L 83 135 L 90 140 L 83 145 Z" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M 97 140 L 104 135 L 111 140 L 104 145 Z" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M 118 140 L 125 135 L 132 140 L 125 145 Z" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      <path d="M 139 140 L 146 135 L 153 140 L 146 145 Z" fill="none" stroke={color} strokeWidth="0.8" opacity="0.25" />
      {/* Mesa Boogie amp */}
      <rect x="55" y="155" width="90" height="22" rx="3" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="75" cy="166" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="100" cy="166" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
      <circle cx="125" cy="166" r="4" fill="none" stroke={color} strokeWidth="0.6" opacity="0.25" />
    </svg>
  );
}

function BBKingGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      {/* Crown */}
      <path d="M 60 55 L 65 35 L 78 50 L 90 28 L 100 48 L 110 28 L 122 50 L 135 35 L 140 55" fill="none" stroke={color} strokeWidth="2" opacity="0.6" />
      {/* Crown band */}
      <rect x="60" y="55" width="80" height="10" rx="1" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Crown jewels */}
      <circle cx="78" cy="60" r="2.5" fill={color} opacity="0.3" />
      <circle cx="100" cy="60" r="2.5" fill={color} opacity="0.3" />
      <circle cx="122" cy="60" r="2.5" fill={color} opacity="0.3" />
      {/* Silhouette head with Caballero hat (flat-crowned) */}
      {/* Caballero hat - flat crown, wide brim */}
      <path d="M 55 85 L 145 85" fill="none" stroke={color} strokeWidth="1.8" opacity="0.5" />
      <path d="M 70 85 L 70 72 L 130 72 L 130 85" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Flat crown top */}
      <line x1="70" y1="72" x2="130" y2="72" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Hat band */}
      <line x1="70" y1="80" x2="130" y2="80" stroke={color} strokeWidth="0.8" opacity="0.3" />
      {/* Head silhouette below hat */}
      <path d="M 82 85 C 82 85, 80 95, 82 100 L 82 105 L 118 105 L 118 100 C 120 95, 118 85, 118 85" fill="none" stroke={color} strokeWidth="1.5" opacity="0.5" />
      {/* Shoulders */}
      <path d="M 82 105 L 60 120 L 55 130" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      <path d="M 118 105 L 140 120 L 145 130" fill="none" stroke={color} strokeWidth="1.2" opacity="0.4" />
      {/* ES-355 f-holes */}
      <path d="M 80 135 C 78 140, 80 150, 82 155 C 84 150, 86 140, 84 135" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      <path d="M 116 135 C 114 140, 116 150, 118 155 C 120 150, 122 140, 120 135" fill="none" stroke={color} strokeWidth="1.2" opacity="0.35" />
      {/* Lucille text */}
      <text x="100" y="172" textAnchor="middle" fill={color} fontSize="9" fontFamily="serif" fontStyle="italic" opacity="0.35" letterSpacing="3">Lucille</text>
    </svg>
  );
}

function DefaultAmpGraphic({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
      <CornerAccents color={color} />
      <rect x="30" y="50" width="140" height="100" rx="6" fill="none" stroke={color} strokeWidth="1.5" opacity="0.6" />
      <circle cx="70" cy="100" r="25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="70" cy="100" r="18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="130" cy="100" r="25" fill="none" stroke={color} strokeWidth="1.5" opacity="0.4" />
      <circle cx="130" cy="100" r="18" fill="none" stroke={color} strokeWidth="0.8" opacity="0.3" />
      <circle cx="60" cy="65" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="80" cy="65" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="100" cy="65" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="120" cy="65" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <circle cx="140" cy="65" r="5" fill="none" stroke={color} strokeWidth="1" opacity="0.5" />
      <path d="M 40 165 Q 55 150, 70 165 Q 85 180, 100 165 Q 115 150, 130 165 Q 145 180, 160 165" fill="none" stroke={color} strokeWidth="1.2" opacity="0.3" />
    </svg>
  );
}

function ProductGraphic({ product }: { product: Product }) {
  const colors = genreColors[product.genre] || { stroke: '#00f0ff', fill: '#00f0ff', accent: 'text-neon-cyan' };
  const color = colors.stroke;
  const artistKey = product.artist.toLowerCase().replace(/[^a-z]/g, '');

  switch (artistKey) {
    case 'voodooexperience':
      return <VoodooGraphic color={color} />;
    case 'appetiteforrock':
      return <SlashGraphic color={color} />;
    case 'darksideofthewall':
      return <DarkSideGraphic color={color} />;
    case 'texasflood':
      return <TexasFloodGraphic color={color} />;
    case 'continuumgravity':
      return <ContinuumGraphic color={color} />;
    case 'stairwaytorock':
      return <StairwayGraphic color={color} />;
    case 'womantoneblues':
      return <WomanToneGraphic color={color} />;
    case 'fortheloveofguitar':
      return <LoveOfGuitarGraphic color={color} />;
    case 'cliffsofmanhattan':
      return <CliffsGraphic color={color} />;
    case 'thundervoltage':
      return <ACDCGraphic color={color} />;
    case 'blackmagicspirit':
      return <BlackMagicGraphic color={color} />;
    case 'lucilleblues':
      return <BBKingGraphic color={color} />;
    default:
      return <DefaultAmpGraphic color={color} />;
  }
}

export default function ShopPage() {
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
  const filtered = activeGenre === 'All' ? products : products.filter((p) => p.genre === activeGenre);

  return (
    <section className="relative pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 neon-line" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-neon-cyan/20 rounded-full bg-neon-cyan/5">
            <Music className="w-4 h-4 text-neon-cyan" />
            <span className="font-display text-[0.65rem] font-medium tracking-[0.25em] uppercase text-neon-cyan/80">
              Plugin Collection
            </span>
          </div>
            <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
              <span className="text-white">The </span>
              <span className="text-neon-cyan" style={{ textShadow: '0 0 10px #00f0ff, 0 0 30px #00f0ff80, 0 0 60px #00f0ff40, 0 0 100px #00f0ff20' }}>Shop</span>
            </h2>
            <p className="mt-4 text-gray-400 max-w-xl mx-auto">
              Each NAM Pack is precision-captured using Neural Amp Modeling to deliver the exact tone of legendary guitar players.
            </p>
          </div>

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

          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="product-card rounded-xl overflow-hidden animate-pulse">
                  <div className="aspect-square bg-dark-700" />
                  <div className="p-5 space-y-3">
                    <div className="h-4 bg-dark-600 rounded w-3/4" />
                    <div className="h-3 bg-dark-600 rounded w-1/2" />
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
  const { addItem } = useContext(CartContext);
  const colors = genreColors[product.genre] || { stroke: '#00f0ff', fill: '#00f0ff', accent: 'text-neon-cyan' };

  return (
    <div
      className="product-card rounded-xl overflow-hidden group"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Link to={`/shop/${product.id}`} className="block">
        <div className="relative aspect-square overflow-hidden bg-dark-900 flex items-center justify-center p-8">
          <ProductGraphic product={product} />
          <div
            className={`absolute inset-3 border-2 rounded-sm transition-all duration-500 pointer-events-none ${
              hovered ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}
            style={{
              borderColor: colors.stroke,
              boxShadow: hovered ? `0 0 15px ${colors.stroke}40, inset 0 0 15px ${colors.stroke}10` : 'none',
            }}
          />
          {product.featured && (
            <div className="absolute top-3 left-3 flex items-center gap-1 px-3 py-1 bg-neon-pink/20 border border-neon-pink/40 rounded-full backdrop-blur-sm z-10">
              <Star className="w-3 h-3 text-neon-pink fill-neon-pink" />
              <span className="font-display text-[0.55rem] font-semibold tracking-wider uppercase text-neon-pink">Featured</span>
            </div>
          )}
          <div className="absolute top-3 right-3 px-3 py-1 bg-dark-950/60 border border-white/10 rounded-full backdrop-blur-sm z-10">
            <span className="font-display text-[0.55rem] font-medium tracking-wider uppercase text-gray-300">{product.genre}</span>
          </div>
        </div>
      </Link>

      <div className="p-5">
        <Link to={`/shop/${product.id}`} className="block">
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
              &euro;{product.price}
            </div>
          </div>
          <p className="text-xs text-gray-500 leading-relaxed line-clamp-2 mb-4">{product.description}</p>
        </Link>
        <button
          onClick={(e) => { e.preventDefault(); addItem(product); }}
          className="w-full btn-neon text-[0.65rem] py-1 justify-center rounded"
        >
          <ShoppingCart className="w-3.5 h-3.5" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
