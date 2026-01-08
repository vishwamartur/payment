'use client';

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';

const categories = [
  { id: 'cement', name: 'Cement', icon: '🏗️' },
  { id: 'putty', name: 'Putty & Primers', icon: '🎨' },
  { id: 'tiles', name: 'Tiles', icon: '🏠' },
  { id: 'adhesives', name: 'Tile Adhesives', icon: '🔗' },
  { id: 'waterproofing', name: 'Waterproofing', icon: '💧' },
  { id: 'blocks', name: 'Blocks & RMC', icon: '🧱' },
];

const featuredProducts = [
  // Cement Products
  {
    id: 1,
    name: 'UltraTech Cement PPC',
    category: 'Cement',
    description: 'Portland Pozzolana Cement - India\'s No.1 cement for durable construction',
    price: '₹380/bag',
    badge: 'Best Seller',
    color: 'from-blue-500 to-cyan-500',
    icon: '🏗️',
  },
  {
    id: 2,
    name: 'UltraTech Premium Cement',
    category: 'Cement',
    description: 'Superior strength cement for high-rise buildings and infrastructure',
    price: '₹420/bag',
    badge: 'Premium',
    color: 'from-indigo-500 to-purple-500',
    icon: '⭐',
  },
  {
    id: 3,
    name: 'UltraTech Weather Plus',
    category: 'Cement',
    description: 'Water-repellent cement for weather-resistant constructions',
    price: '₹450/bag',
    badge: 'Weather Proof',
    color: 'from-cyan-500 to-blue-600',
    icon: '🌧️',
  },
  {
    id: 4,
    name: 'Birla White Cement',
    category: 'Cement',
    description: 'Premium white cement for decorative and specialty applications',
    price: '₹520/bag',
    badge: 'White Cement',
    color: 'from-gray-100 to-gray-300',
    icon: '⚪',
  },
  // Putty & Primers
  {
    id: 5,
    name: 'Birla White WallCare Putty',
    category: 'Putty',
    description: 'White cement-based water-resistant wall putty for smooth finish',
    price: '₹850/40kg',
    badge: 'Top Rated',
    color: 'from-amber-400 to-orange-500',
    icon: '🎨',
  },
  {
    id: 6,
    name: 'Birla White Levelplast',
    category: 'Putty',
    description: 'Self-leveling putty for perfect wall finishing',
    price: '₹920/40kg',
    badge: 'Premium',
    color: 'from-yellow-400 to-amber-500',
    icon: '✨',
  },
  {
    id: 7,
    name: 'Birla White Interior Primer',
    category: 'Putty',
    description: 'High-quality interior primer for enhanced paint adhesion',
    price: '₹380/L',
    badge: 'Interior',
    color: 'from-pink-400 to-rose-500',
    icon: '🖌️',
  },
  {
    id: 8,
    name: 'EXTOCARE Primer',
    category: 'Putty',
    description: 'Anti-carbonation exterior primer with high opacity',
    price: '₹420/L',
    badge: 'Exterior',
    color: 'from-teal-400 to-green-500',
    icon: '🏡',
  },
  // Tiles
  {
    id: 9,
    name: 'Birla Pivot GVT Tiles',
    category: 'Tiles',
    description: 'Glazed Vitrified Tiles with water & stain resistance',
    price: '₹65/sq.ft',
    badge: 'Trending',
    color: 'from-purple-500 to-pink-500',
    icon: '🏠',
  },
  {
    id: 10,
    name: 'Birla Pivot Ceramic Tiles',
    category: 'Tiles',
    description: 'Waterproof ceramic tiles for floors and walls',
    price: '₹45/sq.ft',
    badge: 'Popular',
    color: 'from-emerald-500 to-teal-500',
    icon: '🪟',
  },
  // Tile Adhesives
  {
    id: 11,
    name: 'TILEFIXO VT',
    category: 'Adhesives',
    description: 'Tile adhesive for vitrified tiles, interior & exterior use',
    price: '₹650/20kg',
    badge: 'Best Seller',
    color: 'from-orange-500 to-red-500',
    icon: '🔗',
  },
  {
    id: 12,
    name: 'TILEFIXO CT',
    category: 'Adhesives',
    description: 'High-strength adhesive for ceramic tile fixing',
    price: '₹480/20kg',
    badge: 'Value',
    color: 'from-rose-500 to-pink-600',
    icon: '🧲',
  },
  {
    id: 13,
    name: 'TILEFIXO GROUT CG',
    category: 'Adhesives',
    description: 'Coloured grout for tile joints - 25+ color options',
    price: '₹280/kg',
    badge: '25+ Colors',
    color: 'from-violet-500 to-purple-600',
    icon: '🌈',
  },
  // Waterproofing
  {
    id: 14,
    name: 'UltraTech Seal & Dry',
    category: 'Waterproofing',
    description: 'Integral waterproofing compound for concrete',
    price: '₹320/L',
    badge: 'Essential',
    color: 'from-blue-600 to-indigo-600',
    icon: '💧',
  },
  {
    id: 15,
    name: 'Weather Pro WP+200',
    category: 'Waterproofing',
    description: 'Advanced waterproofing solution for terrace & roof',
    price: '₹450/L',
    badge: 'Advanced',
    color: 'from-sky-500 to-blue-600',
    icon: '🌊',
  },
  // Blocks & RMC
  {
    id: 16,
    name: 'UltraTech Xtralite AAC Blocks',
    category: 'Blocks',
    description: 'Autoclaved Aerated Concrete blocks - lightweight & insulating',
    price: '₹4,200/cu.m',
    badge: 'Eco-Friendly',
    color: 'from-green-500 to-emerald-600',
    icon: '🧱',
  },
];

const buildingMaterials = [
  { name: 'Ready Mix Concrete', icon: '🏭' },
  { name: 'Fixoblock Masonry', icon: '🧱' },
  { name: 'Repair Products', icon: '🔧' },
  { name: 'Flooring Screed', icon: '🏠' },
  { name: 'Industrial Grouts', icon: '⚙️' },
  { name: 'Plaster Products', icon: '🎨' },
];

// Custom hook for scroll reveal animations
function useScrollReveal() {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal, .reveal-left, .reveal-right, .reveal-scale');

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    reveals.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, []);
}

// 3D Tilt effect hook
function useTiltEffect(ref: React.RefObject<HTMLElement | null>) {
  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = (y - centerY) / 20;
      const rotateY = (centerX - x) / 20;

      element.style.setProperty('--rotateX', `${rotateX}deg`);
      element.style.setProperty('--rotateY', `${rotateY}deg`);
    };

    const handleMouseLeave = () => {
      element.style.setProperty('--rotateX', '0deg');
      element.style.setProperty('--rotateY', '0deg');
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [ref]);
}

// Product Card Component with animations
function ProductCard({ product, index }: { product: typeof featuredProducts[0], index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useTiltEffect(cardRef);

  return (
    <div
      ref={cardRef}
      className={`glass-card product-card card-shine overflow-hidden tilt-card reveal stagger-${(index % 8) + 1}`}
    >
      {/* Product Image with animated icon */}
      <div className={`h-48 bg-gradient-to-br ${product.color} relative overflow-hidden product-image-container`}>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="product-icon text-7xl opacity-80 drop-shadow-lg">
            {product.icon}
          </div>
        </div>
        {/* Animated geometric shapes */}
        <div className="absolute top-4 right-4 w-20 h-20 border border-white/20 rounded-full float-icon float-icon-1" />
        <div className="absolute bottom-4 left-4 w-12 h-12 border border-white/20 rounded-lg rotate-45 float-icon float-icon-2" />
        {product.badge && (
          <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium z-10 bounce-in">
            {product.badge}
          </div>
        )}
      </div>
      <div className="p-5 tilt-card-inner">
        <div className="text-xs text-indigo-400 font-medium mb-1">{product.category}</div>
        <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
        <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-white">{product.price}</span>
          <Link
            href="/pay"
            className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30 transition-all hover:scale-105 ripple-effect"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  useScrollReveal();

  const filteredProducts = selectedCategory
    ? featuredProducts.filter(p => p.category.toLowerCase() === selectedCategory)
    : featuredProducts;

  return (
    <div className="gradient-bg min-h-screen relative overflow-hidden">
      {/* Morphing blob backgrounds */}
      <div className="morph-blob-1" style={{ top: '-200px', right: '-100px' }} />
      <div className="morph-blob-2" style={{ bottom: '-150px', left: '-100px' }} />

      {/* Glowing orbs */}
      <div className="glow-orb glow-orb-1" />
      <div className="glow-orb glow-orb-2" />

      {/* Floating particles */}
      {[5, 15, 25, 35, 45, 55, 65, 75, 85, 95].map((pos, i) => (
        <div
          key={i}
          className="particle"
          style={{
            left: `${pos}%`,
            animationDelay: `${(i * 0.5) % 10}s`,
            animationDuration: `${10 + (i % 10)}s`,
          }}
        />
      ))}

      {/* Hero decoration elements */}
      <div className="hero-decoration" style={{ top: '15%', right: '10%' }}>
        <div className="hero-circle" />
      </div>
      <div className="hero-decoration" style={{ bottom: '20%', left: '5%' }}>
        <div className="hero-dots">
          {[...Array(25)].map((_, i) => (
            <div key={i} className="hero-dot" style={{ animationDelay: `${i * 0.1}s` }} />
          ))}
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 logo-pulse">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                NICE Traders
              </span>
              <p className="text-xs text-gray-500">Authorized UltraTech Dealer</p>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <Link href="/contact" className="text-gray-400 hover:text-white transition-colors text-sm">
              Contact
            </Link>
            <Link href="/pay" className="pay-btn !py-3 !px-6 !text-sm !rounded-xl">
              Make Payment
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section with text animations */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6 text-reveal text-reveal-1">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Authorized UltraTech Building Solutions Dealer
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            <span className="text-reveal text-reveal-2 block animated-gradient-text">
              UltraTech Building Solutions
            </span>
            <span className="text-reveal text-reveal-3 block text-3xl md:text-5xl bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent mt-2">
              Complete Range at Best Prices
            </span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8 text-reveal text-reveal-4">
            Your one-stop destination for UltraTech Cement, Birla White Putty, Primers, Tiles,
            Tile Adhesives, Waterproofing & more. NICE Traders - delivering quality across the region.
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-reveal text-reveal-4">
            <a href="#products" className="pay-btn !py-4 !px-8 ripple-effect">
              View Products
            </a>
            <Link href="/contact" className="preset-btn !py-4 !px-8 flex items-center gap-2">
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              Get Quote
            </Link>
          </div>
        </div>

        {/* Animated line under hero */}
        <div className="max-w-xs mx-auto mt-12">
          <div className="animated-line" />
        </div>
      </section>

      {/* Categories with reveal animation */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8 reveal">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat, index) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`glass-card category-card card-shine p-6 text-center transition-all cursor-pointer reveal stagger-${index + 1} ${selectedCategory === cat.id ? 'border-indigo-500 bg-indigo-500/10' : ''
                  }`}
              >
                <div className="text-4xl mb-3 float-icon">{cat.icon}</div>
                <div className="text-white font-medium text-sm">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products with staggered reveal */}
      <section id="products" className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8 reveal">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'UltraTech Building Solutions'}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-2 transition-colors"
              >
                Show All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}
          </div>
        </div>
      </section>

      {/* More Materials with reveal */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8 reveal">More UltraTech Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {buildingMaterials.map((item, index) => (
              <div
                key={index}
                className={`glass-card card-shine p-5 text-center hover:scale-105 transition-transform cursor-pointer reveal stagger-${index + 1}`}
              >
                <div className="text-3xl mb-2 float-icon">{item.icon}</div>
                <div className="text-gray-300 text-sm font-medium">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us with animation */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12 reveal">Why Choose NICE Traders?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '✓', title: 'Authorized Dealer', desc: 'Official UltraTech Building Solutions dealer', delay: 1 },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery within city limits', delay: 2 },
              { icon: '💰', title: 'Best Prices', desc: 'Competitive wholesale rates', delay: 3 },
              { icon: '🤝', title: 'Expert Support', desc: 'Technical guidance from our team', delay: 4 },
            ].map((item, index) => (
              <div key={index} className={`glass-card card-shine p-6 text-center reveal-scale stagger-${item.delay}`}>
                <div className="text-3xl mb-4 float-icon">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section with glow effect */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center reveal-scale" style={{ boxShadow: '0 0 80px rgba(99, 102, 241, 0.2)' }}>
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 animated-gradient-text">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8">
            Get the best prices on UltraTech Cement, Birla White, Tile Adhesives, and all building solutions. Contact us for a custom quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pay" className="pay-btn !py-4 !px-8 ripple-effect">
              Make Payment
            </Link>
            <Link href="/contact" className="preset-btn !py-4 !px-8">
              Request Quote
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 px-6 py-10 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-10">
            <div className="reveal">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">NICE Traders</span>
              </div>
              <p className="text-gray-400 text-sm">
                Authorized UltraTech Building Solutions dealer. Your trusted partner for quality construction materials.
              </p>
            </div>
            <div className="reveal stagger-1">
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">UltraTech Cement</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">Birla White Putty</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">Tile Adhesives</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">Waterproofing</span></li>
              </ul>
            </div>
            <div className="reveal stagger-2">
              <h4 className="text-white font-semibold mb-4">Brands</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">UltraTech Cement</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">Birla White</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">Birla Pivot Tiles</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer transition-colors">TILEFIXO</span></li>
              </ul>
            </div>
            <div className="reveal stagger-3">
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pay" className="hover:text-indigo-400 transition-colors">Make Payment</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-indigo-400 transition-colors">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 NICE Traders. All rights reserved. Powered by{' '}
              <span className="text-indigo-400">Razorpay</span>
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
              <Link href="/terms-conditions" className="hover:text-indigo-400 transition-colors">Terms</Link>
              <Link href="/refund-policy" className="hover:text-indigo-400 transition-colors">Refunds</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
