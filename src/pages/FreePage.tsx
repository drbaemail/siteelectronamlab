import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { X, Download, Mail, CheckCircle, Gift, Zap } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function FreePage() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [downloading, setDownloading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => setShowModal(true), 600);
    return () => clearTimeout(timer);
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !consent) return;

    setDownloading(true);
    setError('');

    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({ email, source: 'free_pack', consent });

    if (insertError) {
      if (insertError.code === '23505') {
        // Duplicate email - still show success since they're already subscribed
        setSubmitted(true);
      } else {
        setError('Something went wrong. Please try again.');
      }
      setDownloading(false);
      return;
    }

    setDownloading(false);
    setSubmitted(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  return (
    <div className="relative pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 neon-line" />

      {/* Background glows */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-green/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-neon-green/20 rounded-full bg-neon-green/5">
            <Gift className="w-4 h-4 text-neon-green" />
            <span className="font-display text-[0.65rem] font-medium tracking-[0.25em] uppercase text-neon-green/80">
              Free Download
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="text-white">Free </span>
            <span className="neon-text-green">NAM Pack</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Try our Neural Amp Modeling technology with a free plugin pack.
            Experience the quality before you commit.
          </p>
        </div>

        {/* Free pack showcase */}
        <div className="glass-card rounded-2xl p-8 lg:p-12 border border-neon-green/10 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-neon-green/40 to-transparent" />

          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Graphic */}
            <div className="relative aspect-square flex items-center justify-center">
              <svg viewBox="0 0 200 200" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                <rect x="30" y="50" width="140" height="100" rx="6" fill="none" stroke="#39ff14" strokeWidth="1.5" opacity="0.6" />
                <circle cx="70" cy="100" r="25" fill="none" stroke="#39ff14" strokeWidth="1.5" opacity="0.4" />
                <circle cx="70" cy="100" r="18" fill="none" stroke="#39ff14" strokeWidth="0.8" opacity="0.3" />
                <circle cx="130" cy="100" r="25" fill="none" stroke="#39ff14" strokeWidth="1.5" opacity="0.4" />
                <circle cx="130" cy="100" r="18" fill="none" stroke="#39ff14" strokeWidth="0.8" opacity="0.3" />
                <circle cx="60" cy="65" r="5" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.5" />
                <circle cx="80" cy="65" r="5" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.5" />
                <circle cx="100" cy="65" r="5" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.5" />
                <circle cx="120" cy="65" r="5" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.5" />
                <circle cx="140" cy="65" r="5" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.5" />
                <circle cx="100" cy="140" r="4" fill="none" stroke="#39ff14" strokeWidth="1" opacity="0.4" />
                <path
                  d="M 40 160 Q 55 145, 70 160 Q 85 175, 100 160 Q 115 145, 130 160 Q 145 175, 160 160"
                  fill="none" stroke="#39ff14" strokeWidth="1.2" opacity="0.3"
                />
                <line x1="30" y1="50" x2="45" y2="50" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="30" y1="50" x2="30" y2="65" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="170" y1="50" x2="155" y2="50" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="170" y1="50" x2="170" y2="65" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="30" y1="150" x2="45" y2="150" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="30" y1="150" x2="30" y2="135" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="170" y1="150" x2="155" y2="150" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
                <line x1="170" y1="150" x2="170" y2="135" stroke="#39ff14" strokeWidth="2" opacity="0.8" />
              </svg>
              <div className="absolute inset-0 bg-neon-green/5 rounded-xl blur-[40px]" />
            </div>

            {/* Details */}
            <div>
              <h3 className="font-display text-2xl font-bold text-white mb-2">
                Starter NAM Pack
              </h3>
              <p className="font-display text-[0.65rem] font-medium tracking-wider uppercase text-neon-green/70 mb-4">
                Free Download
              </p>
              <p className="text-gray-400 leading-relaxed mb-6">
                Get started with our free NAM Pack featuring a classic clean tone
                and a crunch channel. Includes VST3, AU, and AAX formats for all
                major DAWs.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  '2 amp channels (Clean + Crunch)',
                  'IR cabinet included',
                  'VST3 / AU / AAX formats',
                  'Low CPU usage',
                ].map((item) => (
                  <li key={item} className="flex items-center gap-3 text-sm text-gray-400">
                    <CheckCircle className="w-4 h-4 text-neon-green flex-shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>

              <button
                onClick={() => setShowModal(true)}
                className="btn-neon-filled rounded w-full justify-center text-sm py-1.5"
                style={{ borderColor: '#39ff14', backgroundColor: '#39ff14', color: '#020209' }}
              >
                <Download className="w-4 h-4" />
                Download Free Pack
              </button>
            </div>
          </div>
        </div>

        {/* CTA to shop */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">Want more tones?</p>
          <Link to="/shop" className="btn-neon rounded text-sm">
            <Zap className="w-4 h-4" />
            Browse All NAM Packs
          </Link>
        </div>
      </div>

      {/* Auto-popup Modal */}
      {showModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-dark-950/80 backdrop-blur-sm"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative glass-card rounded-2xl p-8 max-w-md w-full border border-neon-green/20 animate-slide-up">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 text-gray-500 hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {!submitted ? (
              <>
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 rounded-lg bg-neon-green/10 border border-neon-green/20 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-neon-green" />
                  </div>
                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      Get Your Free Pack
                    </h3>
                    <p className="text-xs text-gray-500">No credit card required</p>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block font-display text-[0.65rem] font-medium tracking-widest uppercase text-gray-400 mb-2">
                      Email Address
                    </label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-600" />
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full pl-10 pr-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-green/40 focus:shadow-[0_0_10px_#39ff1415] transition-all duration-300"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <label className="flex items-start gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-0.5 w-4 h-4 rounded border-white/20 bg-dark-800 text-neon-green focus:ring-neon-green/30 accent-[#39ff14]"
                    />
                    <span className="text-xs text-gray-500 leading-relaxed group-hover:text-gray-400 transition-colors">
                      I agree to receive the Electro NAM LAB newsletter with product updates, new releases, and exclusive offers. You can unsubscribe at any time.
                    </span>
                  </label>

                  <button
                    type="submit"
                    disabled={!email || !consent || downloading}
                    className={`w-full py-1.5 rounded font-display text-xs font-semibold tracking-widest uppercase flex items-center justify-center gap-2 transition-all duration-300 ${
                      email && consent && !downloading
                        ? 'bg-neon-green text-dark-950 border border-neon-green shadow-[0_0_15px_#39ff1440] hover:shadow-[0_0_20px_#39ff1460]'
                        : 'bg-dark-700 text-gray-600 border border-white/5 cursor-not-allowed'
                    }`}
                  >
                    {downloading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-dark-950/30 border-t-dark-950 rounded-full animate-spin" />
                        Preparing Download...
                      </>
                    ) : (
                      <>
                        <Download className="w-4 h-4" />
                        Download Free Pack
                      </>
                    )}
                  </button>

                  {error && (
                    <p className="text-xs text-red-400 text-center mt-2">{error}</p>
                  )}
                </form>
              </>
            ) : (
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-neon-green/10 border border-neon-green/30 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-neon-green" />
                </div>
                <h3 className="font-display text-xl font-bold text-white mb-2">
                  Download Started!
                </h3>
                <p className="text-sm text-gray-400 mb-1">
                  Your free NAM Pack is downloading.
                </p>
                <p className="text-xs text-gray-600 mb-6">
                  A confirmation has been sent to <span className="text-neon-green">{email}</span>
                </p>
                <button
                  onClick={closeModal}
                  className="btn-neon rounded text-xs py-2 px-6"
                  style={{ borderColor: '#39ff14', color: '#39ff14' }}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
