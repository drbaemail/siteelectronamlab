import { ChevronDown, Volume2 } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid" />
      <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-dark-950/80 to-dark-950" />

      {/* Animated neon orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px] animate-glow-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px] animate-glow-pulse" style={{ animationDelay: '1s' }} />
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
          From Voodoo Experience to Appetite for Rock, experience the tones that shaped music history.
        </p>

        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a href="#shop" className="btn-neon rounded">
            Explore Plugins
          </a>
          <a href="#about" className="btn-neon btn-neon-pink rounded">
            Learn More
          </a>
        </div>

        <div className="mt-16 flex items-center justify-center gap-8 text-gray-500 animate-fade-in" style={{ animationDelay: '0.9s' }}>
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-neon-cyan">50+</div>
            <div className="text-xs tracking-wider uppercase mt-1">Amp Models</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-neon-pink">24</div>
            <div className="text-xs tracking-wider uppercase mt-1">Iconic Players</div>
          </div>
          <div className="w-px h-10 bg-white/10" />
          <div className="text-center">
            <div className="font-display text-2xl font-bold text-neon-green">99.7%</div>
            <div className="text-xs tracking-wider uppercase mt-1">Accuracy</div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <a
        href="#shop"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors animate-bounce"
      >
        <span className="font-display text-[0.6rem] tracking-[0.3em] uppercase">Scroll</span>
        <ChevronDown className="w-5 h-5" />
      </a>
    </section>
  );
}
