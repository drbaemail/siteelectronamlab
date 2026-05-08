import { useState } from 'react';
import { Mail, MapPin, MessageSquare, Send, Github, Twitter } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSending(true);

    // Simulate sending (in production, wire to an edge function)
    await new Promise((r) => setTimeout(r, 1000));

    setSending(false);
    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
    setTimeout(() => setSubmitted(false), 5000);
  }

  return (
    <div className="relative pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-20" />
      <div className="absolute top-0 left-0 right-0 neon-line" />

      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 border border-neon-green/20 rounded-full bg-neon-green/5">
            <MessageSquare className="w-4 h-4 text-neon-green" />
            <span className="font-display text-[0.65rem] font-medium tracking-[0.25em] uppercase text-neon-green/80">
              Get in Touch
            </span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight">
            <span className="text-white">Contact </span>
            <span className="neon-text-green">Us</span>
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto">
            Have questions about our plugins? Need support? Want to collaborate?
            We would love to hear from you.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          {/* Contact info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="glass-card rounded-xl p-6 border border-neon-cyan/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neon-cyan/5 border border-neon-cyan/20 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-5 h-5 text-neon-cyan" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold tracking-wide text-white">Email</h3>
                  <p className="text-sm text-gray-400 mt-1">support@electronolab.com</p>
                  <p className="text-xs text-gray-600 mt-1">We respond within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border border-neon-pink/10">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-neon-pink/5 border border-neon-pink/20 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-neon-pink" />
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold tracking-wide text-white">Studio</h3>
                  <p className="text-sm text-gray-400 mt-1">Austin, TX</p>
                  <p className="text-xs text-gray-600 mt-1">Open by appointment only</p>
                </div>
              </div>
            </div>

            <div className="glass-card rounded-xl p-6 border border-neon-green/10">
              <h3 className="font-display text-sm font-bold tracking-wide text-white mb-4">Follow Us</h3>
              <div className="flex gap-3">
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-cyan hover:border-neon-cyan/30 transition-all duration-300"
                >
                  <Github className="w-5 h-5" />
                </a>
                <a
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-gray-400 hover:text-neon-pink hover:border-neon-pink/30 transition-all duration-300"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Contact form */}
          <div className="lg:col-span-3">
            <form onSubmit={handleSubmit} className="glass-card rounded-xl p-8 border border-white/5 space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-display text-[0.65rem] font-medium tracking-widest uppercase text-gray-400 mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_#00f0ff15] transition-all duration-300"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block font-display text-[0.65rem] font-medium tracking-widest uppercase text-gray-400 mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_#00f0ff15] transition-all duration-300"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block font-display text-[0.65rem] font-medium tracking-widest uppercase text-gray-400 mb-2">
                  Subject
                </label>
                <input
                  type="text"
                  required
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_#00f0ff15] transition-all duration-300"
                  placeholder="Plugin support, collaboration, etc."
                />
              </div>

              <div>
                <label className="block font-display text-[0.65rem] font-medium tracking-widest uppercase text-gray-400 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 bg-dark-800 border border-white/10 rounded-lg text-sm text-white placeholder-gray-600 focus:outline-none focus:border-neon-cyan/40 focus:shadow-[0_0_10px_#00f0ff15] transition-all duration-300 resize-none"
                  placeholder="Tell us what's on your mind..."
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-neon-filled rounded w-full justify-center text-sm py-1.5"
              >
                <Send className="w-4 h-4" />
                {sending ? 'Sending...' : 'Send Message'}
              </button>

              {submitted && (
                <div className="text-center py-3 rounded-lg bg-neon-green/10 border border-neon-green/20">
                  <p className="font-display text-xs font-medium tracking-wider text-neon-green">
                    Message sent successfully!
                  </p>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
