import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Zap } from 'lucide-react';

const navLinks = [
  { label: 'Shop', href: '/shop' },
  { label: 'Free', href: '/free' },
  { label: 'About', href: '/#about' },
  { label: 'Contact', href: '/contact' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-dark-950/90 backdrop-blur-xl border-b border-neon-cyan/10'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Zap className="w-8 h-8 text-neon-cyan transition-all duration-300 group-hover:drop-shadow-[0_0_12px_#00f0ff]" />
              </div>
              <div className="flex flex-col">
                <span className="font-display text-lg font-bold tracking-wider text-neon-cyan neon-text-cyan leading-tight">
                  ELECTRO
                </span>
                <span className="font-display text-[0.65rem] font-medium tracking-[0.3em] text-neon-pink/80 leading-tight">
                  NAM LAB
                </span>
              </div>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.href}
                  className="relative px-5 py-2 font-display text-xs font-medium tracking-widest uppercase text-gray-400 hover:text-neon-cyan transition-all duration-300 group"
                >
                  {link.label}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-px bg-neon-cyan group-hover:w-3/4 transition-all duration-300 shadow-[0_0_8px_#00f0ff]" />
                </Link>
              ))}
            </div>
          </div>

          <Link to="/shop" className="btn-neon text-xs py-2 px-5 hidden md:inline-flex">
            Shop
          </Link>

          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden relative p-2 text-gray-400 hover:text-neon-cyan transition-colors"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-6 pb-6 pt-2 bg-dark-950/95 backdrop-blur-xl border-t border-neon-cyan/10">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.href}
              className="block py-3 font-display text-sm font-medium tracking-widest uppercase text-gray-400 hover:text-neon-cyan transition-colors border-b border-white/5 last:border-0"
            >
              {link.label}
            </Link>
          ))}
          <Link
            to="/shop"
            className="btn-neon mt-4 text-xs py-2 px-5 w-full justify-center"
          >
            Shop
          </Link>
        </div>
      </div>
    </nav>
  );
}
