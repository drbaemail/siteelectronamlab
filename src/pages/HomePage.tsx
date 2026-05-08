import { Link } from 'react-router-dom';
import { Volume2, ChevronDown } from 'lucide-react';
import About from '../components/About';
import Contacts from '../components/Contacts';

export default function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background effects */}
        <div className="absolute inset-0 bg-grid" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950" />

        {/* Animated neon orbs */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] animate-glow-pulse" />
        <div
          className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px] animate-glow-pulse"
          style={{ animationDelay: '1s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-blue/3 rounded-full blur-[150px]" />

        {/* Horizontal neon lines */}
        <div className="absolute top-[30%] left-0 right-0 neon-line opacity-30" />
        <div className="absolute top-[70%] left-0 right-0 neon-line-pink opacity-20" />

        {/* Content */}
        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <div className="animate-fade-in">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 border border-neon-cyan/20 rounded-full bg-neon-cyan/5">
              <Volume2 className="w-4 h-4 text-neon-cyan" />
              <span className="font-display text-[0.65rem] font-medium tracking-[0.25em] uppercase text-neon-cyan/80">
                Neural Amp Modeling Technology
              </span>
            </div>
          </div>

          <h1 className="animate-slide-up">
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9]">
              <span className="text-gradient-cyan">ICONIC</span>
            </span>
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mt-2">
              <span className="text-white">TONE.</span>
            </span>
            <span className="block font-display text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-tight leading-[0.9] mt-2">
              <span className="text-gradient-pink">REDEFINED.</span>
            </span>
          </h1>

          <p className="mt-8 text-lg sm:text-xl text-gray-400 max-w-2xl mx-auto leading-relaxed animate-fade-in" style={{ animationDelay: '0.3s' }}>
            Digital guitar plugins that capture the soul of legendary players.
            From Hendrix to Slash, experience the tones that shaped music history.
          </p>

          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <Link to="/shop" className="btn-neon rounded">
              Shop
            </Link>
            <a href="#about" className="btn-neon btn-neon-pink rounded">
              Learn More
            </a>
          </div>
        </div>

        {/* Scroll indicator */}
        <a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors animate-bounce"
        >
          <span className="font-display text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
          <ChevronDown className="w-5 h-5" />
        </a>
      </section>

      {/* Background image section - Guitar amp with neon glow */}
      <section className="relative">
        <div
          className="relative h-[50vh] sm:h-[60vh] bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/60 to-dark-950" />
          <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-dark-950/80" />
          <div className="absolute inset-0" style={{
            maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 70%, transparent 100%)',
          }} />
          {/* Neon glow overlay */}
          <div className="absolute inset-0 bg-neon-cyan/8 mix-blend-screen" />
          <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-neon-pink/5 to-transparent" />
        </div>
      </section>

      <About />
      <Contacts />
    </>
  );
}
