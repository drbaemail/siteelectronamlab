import { Cpu, Headphones, Sliders, Activity, Shield, Zap } from 'lucide-react';

const features = [
  {
    icon: Cpu,
    title: 'Neural Amp Modeling',
    description:
      'Our proprietary NAM technology captures every nuance of the original amp signal chain with 99.7% accuracy.',
    color: 'cyan',
  },
  {
    icon: Sliders,
    title: 'Zero Latency',
    description:
      'Optimized DSP engine delivers sub-1ms processing. Play live, record, or perform without any perceptible delay.',
    color: 'pink',
  },
  {
    icon: Headphones,
    title: 'Studio-Grade Quality',
    description:
      '48kHz/24-bit processing with 32-bit internal floating point. Every harmonic, every overtone, preserved.',
    color: 'green',
  },
  {
    icon: Activity,
    title: 'Dynamic Response',
    description:
      'Your playing dynamics are faithfully reproduced. Pick softly for cleans, dig in for crunch — just like the real thing.',
    color: 'cyan',
  },
  {
    icon: Shield,
    title: 'Cross-Platform',
    description:
      'VST3, AU, and AAX formats. Works seamlessly in your DAW on Windows, macOS, and Linux.',
    color: 'pink',
  },
  {
    icon: Zap,
    title: 'Low CPU Usage',
    description:
      'Highly optimized algorithms mean you can run multiple instances without breaking a sweat. Stack tones freely.',
    color: 'green',
  },
];

const colorMap: Record<string, { text: string; border: string; bg: string; glow: string }> = {
  cyan: {
    text: 'text-neon-cyan',
    border: 'border-neon-cyan/20',
    bg: 'bg-neon-cyan/5',
    glow: 'group-hover:shadow-[0_0_20px_#00f0ff15]',
  },
  pink: {
    text: 'text-neon-pink',
    border: 'border-neon-pink/20',
    bg: 'bg-neon-pink/5',
    glow: 'group-hover:shadow-[0_0_20px_#ff00e515]',
  },
  green: {
    text: 'text-neon-green',
    border: 'border-neon-green/20',
    bg: 'bg-neon-green/5',
    glow: 'group-hover:shadow-[0_0_20px_#39ff1415]',
  },
};

export default function About() {
  return (
    <section id="about" className="relative py-24 lg:py-32">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 neon-line-pink" />

      {/* Faded background image of multiple amps (Fender, Marshall, Vox) */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-[0.06]"
          style={{
            backgroundImage: `url(https://images.pexels.com/photos/31089167/pexels-photo-31089167.jpeg?auto=compress&cs=tinysrgb&w=1920)`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-dark-950 via-transparent to-dark-950" />
        <div className="absolute inset-0 bg-gradient-to-r from-dark-950/90 via-transparent to-dark-950/90" />
      </div>

      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-neon-cyan/3 rounded-full blur-[200px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-neon-pink/20 rounded-full bg-neon-pink/5">
            <Cpu className="w-4 h-4 text-neon-pink" />
            <span className="font-display text-[0.65rem] font-medium tracking-[0.25em] uppercase text-neon-pink/80">
              The Technology
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="text-white">About </span>
            <span className="text-gradient-pink">Electro NAM LAB</span>
          </h2>
          <p className="mt-6 text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            We are a team of signal processing engineers and guitar tone obsessives
            on a mission: to preserve the greatest guitar tones ever recorded and
            make them accessible to every player.
          </p>
        </div>

        {/* Mission statement */}
        <div className="glass-card rounded-2xl p-8 lg:p-12 mb-20 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-cyan/40 to-transparent" />
          <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-pink/40 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-4">
                Our Mission
              </h3>
              <p className="text-gray-400 leading-relaxed mb-4">
                Every legendary guitar tone lives in a specific combination of
                guitar, amp, cabinet, effects, and most importantly — the player's
                touch. Traditional amp simulators approximate. We capture.
              </p>
              <p className="text-gray-400 leading-relaxed">
                Using Neural Amp Modeling, we feed thousands of signal samples
                through the exact rigs used by iconic players. Our neural network
                learns the nonlinear transfer function of the entire signal chain,
                producing a digital replica that is indistinguishable from the
                original in blind listening tests.
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square rounded-xl overflow-hidden border border-white/5">
                <img
                  src="https://images.pexels.com/photos/7450057/pexels-photo-7450057.jpeg?auto=compress&cs=tinysrgb&w=800"
                  alt="Fender Bassman amplifier"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark-950/80 via-transparent to-dark-950/30" />
                <div className="absolute inset-0 bg-gradient-to-r from-dark-950/40 to-transparent" />
                <div className="absolute inset-0 bg-neon-cyan/8 mix-blend-screen" />
              </div>
              <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-neon-cyan/10 rounded-full blur-[60px]" />
              <div className="absolute -top-4 -left-4 w-32 h-32 bg-neon-pink/10 rounded-full blur-[60px]" />
            </div>
          </div>
        </div>

        {/* Features grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature) => {
            const colors = colorMap[feature.color];
            const Icon = feature.icon;
            return (
              <div
                key={feature.title}
                className={`group glass-card rounded-xl p-6 border ${colors.border} transition-all duration-500 ${colors.glow}`}
              >
                <div className={`w-12 h-12 rounded-lg ${colors.bg} ${colors.border} border flex items-center justify-center mb-4`}>
                  <Icon className={`w-6 h-6 ${colors.text}`} />
                </div>
                <h3 className="font-display text-sm font-bold tracking-wide text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-gray-500 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
