import { useState, useEffect, useContext } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ShoppingCart, ArrowLeft, Music, CheckCircle } from 'lucide-react';
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

interface GearInfo {
  description: string;
  amps: string[];
  cabinets: string[];
  pedals: string[];
  microphones: string[];
  imageQuery: string;
}

const artistGearData: Record<string, GearInfo> = {
  'eric-johnson': {
    description:
      'This NAM Pack captures the quintessential Eric Johnson tone — a sound built on the duality of pristine Fender Twin Reverb cleans and the searing sustain of a Marshall Plexi pushed into harmonic saturation. The signal chain is meticulously modeled: a Dallas Arbiter Fuzz Face feeds into a Chandler Tube Driver, creating the signature violin-like sustain of his lead work. Every nuance is preserved — from the bell-like clarity of "Cliffs of Dover" cleans to the soaring sustain of his lead lines. The pack includes two distinct amp channels: the Twin for crystalline clean tones with just a hint of compression, and the Plexi for singing lead lines with rich harmonic overtones.',
    amps: ['Fender Twin Reverb (Clean Channel)', 'Marshall Plexi 100W (Lead Channel)', 'Marshall JTM45'],
    cabinets: ['Fender 2x12 Twin Cabinet', 'Marshall 4x12 Straight (G12M-25 Greenbacks)', 'Marshall 4x12 Slant (G12H-30)'],
    pedals: ['Dallas Arbiter Fuzz Face (Germanium)', 'Chandler Tube Driver'],
    microphones: ['Shure SM57 (On-Axis)', 'Shure SM57 (Off-Axis)', 'Neumann U87 (Room)', 'Royer R-121 (Ribbon)'],
    imageQuery: 'vintage-fender-amp',
  },
  'jimi-hendrix': {
    description:
      'This NAM Pack captures the revolutionary tone of Jimi Hendrix — the psychedelic fuzz that redefined electric guitar. Built around a Marshall Super Lead 100W plexi cranked to its sweet spot, the signal chain faithfully models the Dallas Arbiter Fuzz Face pushing the amp into rich, harmonic saturation. The pack captures both the aggressive, feedback-laden lead tones and the surprisingly delicate clean passages Hendrix coaxed from his Stratocaster.',
    amps: ['Marshall Super Lead 100W (Plexi)', 'Fender Bassman (Blues Breakup)'],
    cabinets: ['Marshall 4x12 Straight (G12M-25 Greenbacks)', 'Marshall 4x12 Slant (G12H-30)'],
    pedals: ['Dallas Arbiter Fuzz Face (Germanium)'],
    microphones: ['Shure SM57 (On-Axis)', 'Royer R-121 (Ribbon)', 'Neumann U87 (Room)', 'Sennheiser MD421'],
    imageQuery: 'marshall-plexi-amp',
  },
  'slash': {
    description:
      'This NAM Pack captures the searing Les Paul through Marshall tone that defined an era of rock. Slash\'s sound is built on the JCM 800 pushed hard with a Les Paul Standard, delivering that unmistakable midrange crunch — rich, vocal, and endlessly sustaining. A Boss GE-7 provides the midrange boost that cuts through any mix. From the opening riff of "Sweet Child O\' Mine" to the epic solo of "November Rain," every nuance of this iconic tone is captured.',
    amps: ['Marshall JCM 800 2203 (100W)', 'Marshall Silver Jubilee 2555', 'Marshall 1959 Super Lead'],
    cabinets: ['Marshall 4x12 Straight (G12M-25 Greenbacks)', 'Marshall 4x12 Slant (Vintage 30)'],
    pedals: ['Boss GE-7 Equalizer (Mid Boost)'],
    microphones: ['Shure SM57 (On-Axis)', 'Shure SM57 (Off-Axis)', 'Sennheiser MD421', 'Neumann U87 (Room)'],
    imageQuery: 'marshall-jcm-amp',
  },
  'david-gilmour': {
    description:
      'This NAM Pack captures the infinite sustain and atmospheric tone that made "Comfortably Numb" legendary. Gilmour\'s sound is a masterclass in signal chain design — a Hiwatt DR103 providing the clean headroom, fed by an Electro-Harmonix Big Muff Pi for singing sustain, a Dallas Arbiter Fuzz Face for aggressive leads, and a Colorsound Power Boost for pushing the front end. This pack delivers both the crystalline clean tones and the soaring, sustain-rich lead sounds that are the hallmark of progressive rock guitar.',
    amps: ['Hiwatt DR103 (100W)', 'Fender Twin Reverb', 'Alembic F2B Preamp'],
    cabinets: ['Hiwatt 4x12 (Fane Crescendo speakers)', 'Fender 2x12 Twin Cabinet'],
    pedals: ['Electro-Harmonix Big Muff Pi (Ram\'s Head)', 'Dallas Arbiter Fuzz Face', 'Colorsound Power Boost'],
    microphones: ['Neumann U87 (Room)', 'Shure SM57 (On-Axis)', 'Royer R-121 (Ribbon)', 'AKG C414'],
    imageQuery: 'hiwatt-amp-pedals',
  },
  'stevie-ray-vaughan': {
    description:
      'This NAM Pack captures the thick, punchy Texas blues tone that made SRV the definitive blues guitarist of his generation. Built around a Fender Vibroverb and a Dumble Steel String Singer, the signal chain faithfully models the Tube Screamer TS-808 that provided the signature midrange boost, pushing the amps into rich, harmonic saturation. From the stinging attack of "Pride and Joy" to the raw power of "Crossroads," this pack delivers the full spectrum of Vaughan\'s legendary tone.',
    amps: ['Fender Vibroverb (6L6)', 'Dumble Steel String Singer', 'Fender Super Reverb', 'Marshall Major'],
    cabinets: ['Fender 2x12 Vibroverb (Jensen C12N)', 'Dumble 4x12 (EV12L)', 'Fender 4x10 Super Reverb'],
    pedals: ['Ibanez Tube Screamer TS-808', 'Dallas Arbiter Fuzz Face'],
    microphones: ['Shure SM57 (On-Axis)', 'Sennheiser MD421', 'Neumann U87 (Room)', 'Royer R-121 (Ribbon)'],
    imageQuery: 'fender-vibroverb-amp',
  },
  'john-mayer': {
    description:
      'This NAM Pack captures the silky smooth clean tone with just a hint of breakup that defines John Mayer\'s signature sound. Built around a Two Rock Custom Reverb and a Fender Deluxe Reverb, the signal chain models the Klon Centaur for transparent overdrive and the Tube Screamer for midrange push. From the delicate fingerpicking of "Neon" to the soulful bends of "Slow Dancing in a Burning Room," this pack delivers the warm, dynamic, and endlessly expressive tone that has made Mayer one of the most sought-after guitarists of his generation.',
    amps: ['Two Rock Custom Reverb Signature', 'Fender Deluxe Reverb', 'Fender Twin Reverb', 'Dumble Overdrive Special'],
    cabinets: ['Two Rock 1x12 (Celestion G12-65)', 'Fender 1x12 Deluxe (Jensen C12Q)', 'Fender 2x12 Twin (Jensen C12N)'],
    pedals: ['Klon Centaur', 'Ibanez Tube Screamer TS-808', 'Boss BD-2 Blues Driver'],
    microphones: ['Neumann U87 (Room)', 'Shure SM57 (On-Axis)', 'Royer R-121 (Ribbon)', 'AKG C451'],
    imageQuery: 'two-rock-guitar-amp',
  },
  'jimmy-page': {
    description:
      'This NAM Pack captures the iconic Les Paul crunch that drove Led Zeppelin\'s entire catalog. Page\'s tone is built on a Marshall Super Lead 1959 pushed to its limits, with a Gibson Les Paul Standard delivering the thick, midrange-heavy crunch that defined hard rock. The Sola Sound Tone Bender provides the searing fuzz tones of "Communication Breakdown." From the thunderous "Whole Lotta Love" to the delicate layers of "Stairway to Heaven," this pack covers the full dynamic range.',
    amps: ['Marshall Super Lead 1959 (100W)', 'Vox AC30', 'Fender Twin Reverb'],
    cabinets: ['Marshall 4x12 Straight (G12M-25 Greenbacks)', 'Marshall 4x12 Slant (G12H-30)', 'Vox 2x12 (Celestion Blue)'],
    pedals: ['Sola Sound Tone Bender Professional MKII'],
    microphones: ['Shure SM57 (On-Axis)', 'Sennheiser MD421', 'Neumann U87 (Room)', 'AKG C414'],
    imageQuery: 'marshall-super-lead-amp',
  },
  'eric-clapton': {
    description:
      'This NAM Pack captures the legendary "woman tone" from the Cream era — a singing, vocal-like midrange with controlled feedback and creamy sustain that redefined blues-rock guitar. Built around a Marshall 1959 Super Lead and a Fender Champ for studio cleans, the signal chain models the Dallas Arbiter Fuzz Face and an Ibanez Tube Screamer TS-808 that produced the iconic "Sunshine of Your Love" and "White Room" tones. This pack delivers both the aggressive, overdriven blues-rock crunch and the surprisingly delicate clean tones Clapton coaxed from his Gibson SG and Stratocaster.',
    amps: ['Marshall 1959 Super Lead (100W)', 'Fender Champ (Studio Clean)', 'Fender Twin Reverb'],
    cabinets: ['Marshall 4x12 Straight (G12M-25 Greenbacks)', 'Fender 1x12 Champ Cabinet'],
    pedals: ['Dallas Arbiter Fuzz Face', 'Ibanez Tube Screamer TS-808'],
    microphones: ['Shure SM57 (On-Axis)', 'Royer R-121 (Ribbon)', 'Neumann U87 (Room)', 'Sennheiser MD421'],
    imageQuery: 'marshall-vintage-amp-guitar',
  },
  'steve-vai': {
    description:
      'This NAM Pack captures the ultra-fast legato, whammy bar acrobatics, and high-gain tone that defined instrumental guitar virtuosity. Built around a Carvin Legacy and a Marshall JCM 900, the signal chain models the Ibanez Jem through a Boss DS-1 for the aggressive distortion of "For the Love of God" and an Ibanez Jemini Overdrive for added sustain and saturation. From the soaring melodies of "Liberty" to the technical wizardry of "Attitude Song," this pack delivers the full spectrum of Vai\'s groundbreaking tone.',
    amps: ['Carvin Legacy VL100', 'Marshall JCM 900 4100', 'Mesa/Boogie Mark IV'],
    cabinets: ['Carvin Legacy 4x12 (Vintage 30)', 'Marshall 4x12 Slant (G12M-25)'],
    pedals: ['Boss DS-1 Distortion', 'Ibanez Jemini Overdrive'],
    microphones: ['Shure SM57 (On-Axis)', 'Sennheiser MD421', 'Neumann U87 (Room)', 'Royer R-121 (Ribbon)'],
    imageQuery: 'carvin-legacy-amp',
  },
  'acdc': {
    description:
      'This NAM Pack captures the raw, high-gain Marshall stack crunch that defined rock and roll power. AC/DC\'s tone is deceptively simple — a Gibson SG through a Marshall Super Lead pushed to its natural crunch point, with no pedals in the chain. This pack models both the Angus Young lead tone (bright, cutting, with singing sustain) and the Malcolm Young rhythm tone (thick, punchy, with massive low-mid weight). From the wall-of-sound power of "Back in Black" to the driving riff of "Highway to Hell," this is the definitive rock tone.',
    amps: ['Marshall Super Lead 1959 (100W)', 'Marshall JTM 45 (Blues Breakup)'],
    cabinets: ['Marshall 4x12 Straight (G12M-25 Greenbacks)', 'Marshall 4x12 Slant (G12M-25 Greenbacks)'],
    pedals: ['No pedals — pure amp overdrive only'],
    microphones: ['Shure SM57 (On-Axis)', 'Shure SM57 (Off-Axis)', 'Sennheiser MD421', 'Neumann U87 (Room)'],
    imageQuery: 'marshall-stack-amp-wall',
  },
  'santana': {
    description:
      'This NAM Pack captures the sustained Mesa-style lead tone with singing midrange and spiritual sustain that is Carlos Santana\'s signature. Built around a Mesa/Boogie Mark I and a Dumble Overdrive Special, the signal chain models the PRS Santana through a Tube Screamer TS-808 for the midrange push that drives the amps into rich, harmonic saturation. From the soaring sustain of "Europa" to the rhythmic drive of "Black Magic Woman," this pack delivers the warm, vocal quality that has defined Santana\'s tone across five decades.',
    amps: ['Mesa/Boogie Mark I (Colander)', 'Dumble Overdrive Special', 'Mesa/Boogie Mark IV'],
    cabinets: ['Mesa/Boogie 4x12 (Vintage 30)', 'Dumble 1x12 (EV12L)', 'Mesa/Boogie 2x12 (Celestion V30)'],
    pedals: ['Ibanez Tube Screamer TS-808'],
    microphones: ['Shure SM57 (On-Axis)', 'Royer R-121 (Ribbon)', 'Neumann U87 (Room)', 'Sennheiser MD421'],
    imageQuery: 'mesa-boogie-amp-guitar',
  },
  'bb-king': {
    description:
      'This NAM Pack captures the warm blues-box tones with stinging vibrato and golden touch that made Lucille sing. Built around a Fender Twin Reverb and a Lab Series L5, the signal chain models the Gibson ES-355 through a clean, slightly compressed tone that allows every nuance of touch to shine through. From the sweet, vocal quality of "The Thrill Is Gone" to the stinging attack of "Every Day I Have the Blues," this pack delivers the full emotional range of BB King\'s legendary tone — a masterclass in tone through touch.',
    amps: ['Fender Twin Reverb', 'Lab Series L5 (BB\'s preferred amp)', 'Fender Deluxe Reverb'],
    cabinets: ['Fender 2x12 Twin (Jensen C12N)', 'Lab Series 2x12 (EV12L)'],
    pedals: ['Boss BD-2 Blues Driver', 'Ibanez Tube Screamer TS-9 (Low Gain)'],
    microphones: ['Neumann U87 (Room)', 'Shure SM57 (On-Axis)', 'Royer R-121 (Ribbon)', 'AKG C414'],
    imageQuery: 'fender-twin-reverb-blues',
  },
};

function slugify(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

const gearImages: Record<string, string> = {
  'eric-johnson': 'https://images.pexels.com/photos/1449426/pexels-photo-1449426.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'jimi-hendrix': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'slash': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'david-gilmour': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'stevie-ray-vaughan': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'john-mayer': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'jimmy-page': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'eric-clapton': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'steve-vai': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'acdc': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'santana': 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200',
  'bb-king': 'https://images.pexels.com/photos/1449426/pexels-photo-1449426.jpeg?auto=compress&cs=tinysrgb&w=1200',
};

// Cart context - import from ShopPage
import { CartContext, CartContextType } from './ShopPage';

export default function ProductDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const cart = useContext(CartContext) as CartContextType | null;

  useEffect(() => {
    async function fetchProduct() {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', slug || '')
        .maybeSingle();

      if (!error && data) {
        setProduct(data);
      }
      setLoading(false);
    }
    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="relative pt-28 pb-24 min-h-screen">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
          <div className="animate-pulse space-y-6">
            <div className="h-8 bg-dark-700 rounded w-1/3" />
            <div className="h-96 bg-dark-700 rounded-xl" />
            <div className="h-6 bg-dark-700 rounded w-3/4" />
            <div className="h-6 bg-dark-700 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="relative pt-28 pb-24 min-h-screen">
        <div className="absolute inset-0 bg-grid opacity-30" />
        <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8 text-center">
          <h2 className="font-display text-2xl font-bold text-white mb-4">Product Not Found</h2>
          <Link to="/shop" className="btn-neon rounded text-sm">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const artistSlug = slugify(product.artist);
  const gear = artistGearData[artistSlug];
  const imageUrl = gearImages[artistSlug] || 'https://images.pexels.com/photos/8512714/pexels-photo-8512714.jpeg?auto=compress&cs=tinysrgb&w=1200';

  function handleAddToCart() {
    if (cart) {
      cart.addItem({
        id: product!.id,
        name: product!.name,
        artist: product!.artist,
        description: product!.description,
        price: product!.price,
        image_url: product!.image_url,
        genre: product!.genre,
        featured: product!.featured,
      });
    }
  }

  return (
    <div className="relative pt-28 pb-24 lg:pb-32 min-h-screen">
      <div className="absolute inset-0 bg-grid opacity-30" />
      <div className="absolute top-0 left-0 right-0 neon-line" />

      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-neon-cyan/5 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px]" />

      <div className="relative z-10 max-w-5xl mx-auto px-6 lg:px-8">
        {/* Back link */}
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-gray-500 hover:text-neon-cyan transition-colors mb-8 font-display text-xs tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        {/* Hero image */}
        <div className="relative rounded-2xl overflow-hidden mb-10 border border-white/5">
          <div
            className="relative h-[40vh] sm:h-[50vh] bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-b from-dark-950/40 via-dark-950/60 to-dark-950" />
            <div className="absolute inset-0 bg-gradient-to-r from-dark-950/80 via-transparent to-dark-950/80" />
            <div className="absolute inset-0 bg-neon-cyan/5 mix-blend-screen" />
          </div>

          {/* Title overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-dark-950 via-dark-950/90 to-transparent">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 mb-4 border border-neon-cyan/20 rounded-full bg-neon-cyan/5">
              <Music className="w-3.5 h-3.5 text-neon-cyan" />
              <span className="font-display text-[0.6rem] font-medium tracking-[0.25em] uppercase text-neon-cyan/80">
                {product.genre}
              </span>
            </div>
            <h1 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white">
              {product.name}
            </h1>
            <p className="font-display text-sm tracking-widest uppercase text-neon-pink/70 mt-2">
              {product.artist}
            </p>
          </div>
        </div>

        {/* Price & Add to Cart bar */}
        <div className="glass-card rounded-xl p-6 border border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 mb-10">
          <div>
            <span className="font-display text-3xl font-bold text-neon-cyan" style={{ textShadow: '0 0 10px #00f0ff40' }}>
              &euro;{product.price}
            </span>
            <span className="text-gray-500 text-sm ml-2">NAM Pack</span>
          </div>
          <button
            onClick={handleAddToCart}
            className="btn-neon rounded text-sm flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart
          </button>
        </div>

        {/* Technical description */}
        {gear && (
          <div className="glass-card rounded-xl p-8 border border-white/5 mb-8">
            <h2 className="font-display text-lg font-bold tracking-wide text-white mb-4">
              Tone <span className="text-neon-cyan">Architecture</span>
            </h2>
            <p className="text-gray-400 leading-relaxed text-sm">
              {gear.description}
            </p>
          </div>
        )}

        {/* Gear list */}
        {gear && (
          <div className="grid sm:grid-cols-2 gap-6 mb-10">
            <GearSection title="Amplifiers" items={gear.amps} color="cyan" />
            <GearSection title="Cabinets" items={gear.cabinets} color="pink" />
            <GearSection title="Pedals" items={gear.pedals} color="green" />
            <GearSection title="Microphones" items={gear.microphones} color="cyan" />
          </div>
        )}

        {/* Bottom CTA */}
        <div className="glass-card rounded-xl p-8 border border-neon-cyan/10 text-center">
          <h3 className="font-display text-xl font-bold text-white mb-2">
            Ready to Play?
          </h3>
          <p className="text-gray-400 text-sm mb-6">
            Add this NAM Pack to your cart and experience the tone of {product.artist}.
          </p>
          <button
            onClick={handleAddToCart}
            className="btn-neon rounded text-sm inline-flex items-center gap-2"
          >
            <ShoppingCart className="w-4 h-4" />
            Add to Cart — &euro;{product.price}
          </button>
        </div>
      </div>
    </div>
  );
}

function GearSection({ title, items, color }: { title: string; items: string[]; color: string }) {
  const borderColor = color === 'cyan' ? 'border-neon-cyan/10' : color === 'pink' ? 'border-neon-pink/10' : 'border-neon-green/10';
  const accentColor = color === 'cyan' ? 'text-neon-cyan' : color === 'pink' ? 'text-neon-pink' : 'text-neon-green';
  const iconColor = color === 'cyan' ? 'text-neon-cyan' : color === 'pink' ? 'text-neon-pink' : 'text-neon-green';

  return (
    <div className={`glass-card rounded-xl p-6 border ${borderColor}`}>
      <h3 className={`font-display text-xs font-bold tracking-widest uppercase ${accentColor} mb-4`}>
        {title}
      </h3>
      <ul className="space-y-2">
        {items.map((item) => (
          <li key={item} className="flex items-start gap-2 text-sm text-gray-400">
            <CheckCircle className={`w-3.5 h-3.5 ${iconColor} flex-shrink-0 mt-0.5`} />
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
