import { Link } from 'react-router-dom';
import { Zap, Github, Twitter, Mail } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="relative border-t border-white/5">
      <div className="absolute top-0 left-0 right-0 neon-line opacity-30" />

      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-3 group mb-4">
              <Zap className="w-7 h-7 text-neon-cyan group-hover:drop-shadow-[0_0_12px_#00f0ff] transition-all" />
              <div className="flex flex-col">
                <span className="font-display text-base font-bold tracking-wider text-neon-cyan neon-text-cyan leading-tight">
                  ELECTRO
                </span>
                <span className="font-display text-[0.55rem] font-medium tracking-[0.3em] text-neon-pink/80 leading-tight">
                  NAM LAB
                </span>
              </div>
            </Link>
            <p className="text-sm text-gray-500 leading-relaxed">
              Capturing legendary guitar tones with neural precision. Play the icons.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-gray-300 mb-4">
              Navigate
            </h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/shop"
                  className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/free"
                  className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
                >
                  Free
                </Link>
              </li>
              <li>
                <Link
                  to="/#about"
                  className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-gray-300 mb-4">
              Products
            </h4>
            <ul className="space-y-2">
              {['Guitar Plugins', 'Amp Captures', 'IR Cabinets', 'Bundles'].map((item) => (
                <li key={item}>
                  <Link
                    to="/shop"
                    className="text-sm text-gray-500 hover:text-neon-cyan transition-colors duration-300"
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-display text-xs font-bold tracking-widest uppercase text-gray-300 mb-4">
              Connect
            </h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
              >
                <Github className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-neon-pink hover:border-neon-pink/30 transition-all duration-300"
              >
                <Twitter className="w-4 h-4" />
              </a>
              <a
                href="#"
                className="w-9 h-9 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-500 hover:text-neon-green hover:border-neon-green/30 transition-all duration-300"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-600">
            &copy; {new Date().getFullYear()} Electro NAM LAB. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-xs text-gray-600 hover:text-gray-400 transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
