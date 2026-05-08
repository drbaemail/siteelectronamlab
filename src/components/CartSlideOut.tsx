import { useContext } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import { CartContext } from '../pages/ShopPage';

export default function CartSlideOut() {
  const { items, isOpen, removeItem, updateQuantity, closeCart, total } = useContext(CartContext);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={closeCart}
      />

      {/* Slide-out panel */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-dark-950/95 backdrop-blur-xl border-l border-neon-cyan/20 z-50 transform transition-transform duration-500 ease-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <ShoppingCart className="w-5 h-5 text-neon-cyan" />
            <h2 className="font-display text-lg font-bold tracking-wider text-white">YOUR CART</h2>
            {items.length > 0 && (
              <span className="px-2 py-0.5 text-[0.6rem] font-bold bg-neon-cyan/20 text-neon-cyan rounded-full">
                {items.reduce((s, i) => s + i.quantity, 0)}
              </span>
            )}
          </div>
          <button onClick={closeCart} className="p-2 text-gray-400 hover:text-neon-cyan transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6" style={{ maxHeight: 'calc(100vh - 180px)' }}>
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
              <ShoppingCart className="w-12 h-12 mb-4 opacity-30" />
              <p className="font-display text-sm tracking-wider">Your cart is empty</p>
              <p className="text-xs mt-1 text-gray-600">Add some NAM Packs to get started</p>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="glass-card rounded-lg p-4 border border-white/5">
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <h3 className="font-display text-xs font-bold tracking-wide text-white truncate">
                        {item.product.name}
                      </h3>
                      <p className="font-display text-[0.6rem] tracking-wider uppercase text-neon-pink/60 mt-0.5">
                        {item.product.artist}
                      </p>
                    </div>
                    <button
                      onClick={() => removeItem(item.product.id)}
                      className="p-1 text-gray-500 hover:text-neon-pink transition-colors"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, -1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="font-display text-sm font-bold text-white w-6 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, 1)}
                        className="w-7 h-7 flex items-center justify-center rounded border border-white/10 text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-colors"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                    </div>
                    <span className="font-display text-sm font-bold text-neon-cyan">
                      &euro;{(item.product.price * item.quantity).toFixed(2)}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 p-6 border-t border-white/5 bg-dark-950/90 backdrop-blur-xl">
            <div className="flex items-center justify-between mb-4">
              <span className="font-display text-sm tracking-wider text-gray-400">TOTAL</span>
              <span className="font-display text-xl font-bold text-neon-cyan" style={{ textShadow: '0 0 10px #00f0ff40' }}>
                &euro;{total.toFixed(2)}
              </span>
            </div>
            <button className="w-full btn-neon-filled py-1.5 text-xs justify-center rounded">
              Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
}
