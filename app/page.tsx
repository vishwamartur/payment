'use client';

import Link from 'next/link';
import { useState } from 'react';

const categories = [
  { id: 'cement', name: 'Cement', icon: '🏗️' },
  { id: 'paints', name: 'Paints', icon: '🎨' },
  { id: 'steel', name: 'Steel & TMT', icon: '🔩' },
  { id: 'tiles', name: 'Tiles & Flooring', icon: '🏠' },
  { id: 'plumbing', name: 'Plumbing', icon: '🔧' },
  { id: 'electrical', name: 'Electrical', icon: '💡' },
];

const featuredProducts = [
  {
    id: 1,
    name: 'UltraTech Cement',
    category: 'Cement',
    image: '/products/ultratech.jpg',
    description: 'India\'s No.1 Cement brand for superior strength and durability',
    price: '₹380/bag',
    badge: 'Best Seller',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    id: 2,
    name: 'Birla Opus Paints',
    category: 'Paints',
    image: '/products/birla-opus.jpg',
    description: 'Premium luxury paints with vibrant colors and lasting finish',
    price: '₹450/L',
    badge: 'Premium',
    color: 'from-purple-500 to-pink-500',
  },
  {
    id: 3,
    name: 'ACC Cement',
    category: 'Cement',
    image: '/products/acc.jpg',
    description: 'Trusted cement brand for strong foundations since 1936',
    price: '₹370/bag',
    badge: 'Popular',
    color: 'from-red-500 to-orange-500',
  },
  {
    id: 4,
    name: 'Asian Paints Royale',
    category: 'Paints',
    image: '/products/asian-paints.jpg',
    description: 'Luxury emulsion with silk-like smooth finish',
    price: '₹520/L',
    badge: 'Top Rated',
    color: 'from-indigo-500 to-purple-500',
  },
  {
    id: 5,
    name: 'Ambuja Cement',
    category: 'Cement',
    image: '/products/ambuja.jpg',
    description: 'Giant compressive strength for modern constructions',
    price: '₹375/bag',
    badge: 'Trusted',
    color: 'from-green-500 to-teal-500',
  },
  {
    id: 6,
    name: 'Nerolac Paints',
    category: 'Paints',
    image: '/products/nerolac.jpg',
    description: 'Weather-resistant exterior paints for lasting protection',
    price: '₹380/L',
    badge: 'Durable',
    color: 'from-yellow-500 to-orange-500',
  },
  {
    id: 7,
    name: 'TATA Tiscon TMT Bars',
    category: 'Steel',
    image: '/products/tata-tiscon.jpg',
    description: 'High-strength TMT rebars for earthquake-resistant structures',
    price: '₹65,000/ton',
    badge: 'Premium',
    color: 'from-gray-500 to-slate-600',
  },
  {
    id: 8,
    name: 'Kajaria Tiles',
    category: 'Tiles',
    image: '/products/kajaria.jpg',
    description: 'Designer floor and wall tiles for modern interiors',
    price: '₹55/sq.ft',
    badge: 'Trending',
    color: 'from-amber-500 to-yellow-500',
  },
];

const buildingMaterials = [
  { name: 'Bricks & Blocks', icon: '🧱' },
  { name: 'Sand & Aggregates', icon: '⛰️' },
  { name: 'Waterproofing', icon: '💧' },
  { name: 'Adhesives', icon: '🔗' },
  { name: 'Hardware', icon: '🔨' },
  { name: 'Wood & Plywood', icon: '🪵' },
];

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredProducts = selectedCategory
    ? featuredProducts.filter(p => p.category.toLowerCase() === selectedCategory)
    : featuredProducts;

  return (
    <div className="gradient-bg min-h-screen relative overflow-hidden">
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

      {/* Navigation */}
      <nav className="relative z-20 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center shadow-lg shadow-indigo-500/30">
              <svg className="w-6 h-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <span className="text-xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                BuildMart
              </span>
              <p className="text-xs text-gray-500">Building Materials Trading</p>
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

      {/* Hero Section */}
      <section className="relative z-10 px-6 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-sm font-medium mb-6">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Trusted by 500+ Contractors & Builders
          </div>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-indigo-200 to-purple-200 bg-clip-text text-transparent leading-tight">
            Premium Building Materials
            <br />
            <span className="text-3xl md:text-5xl">at Wholesale Prices</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-400 max-w-2xl mx-auto mb-8">
            Your one-stop destination for UltraTech Cement, Birla Opus Paints, TMT Bars, Tiles, and all construction materials.
            Delivering across the region with competitive pricing.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="#products" className="pay-btn !py-4 !px-8">
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
      </section>

      {/* Categories */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(selectedCategory === cat.id ? null : cat.id)}
                className={`glass-card p-6 text-center transition-all hover:scale-105 cursor-pointer ${selectedCategory === cat.id ? 'border-indigo-500 bg-indigo-500/10' : ''
                  }`}
              >
                <div className="text-4xl mb-3">{cat.icon}</div>
                <div className="text-white font-medium text-sm">{cat.name}</div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-white">
              {selectedCategory ? `${selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Products` : 'Featured Products'}
            </h2>
            {selectedCategory && (
              <button
                onClick={() => setSelectedCategory(null)}
                className="text-indigo-400 hover:text-indigo-300 text-sm flex items-center gap-2"
              >
                Show All
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="glass-card overflow-hidden group hover:scale-[1.02] transition-transform">
                {/* Product Image Placeholder */}
                <div className={`h-48 bg-gradient-to-br ${product.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-white/30 text-6xl font-bold">
                      {product.name.charAt(0)}
                    </div>
                  </div>
                  {product.badge && (
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-medium">
                      {product.badge}
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="text-xs text-indigo-400 font-medium mb-1">{product.category}</div>
                  <h3 className="text-white font-semibold text-lg mb-2">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-white">{product.price}</span>
                    <Link
                      href="/pay"
                      className="px-4 py-2 rounded-lg bg-indigo-500/20 border border-indigo-500/30 text-indigo-400 text-sm font-medium hover:bg-indigo-500/30 transition-colors"
                    >
                      Order Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* More Materials */}
      <section className="relative z-10 px-6 py-12">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">More Building Materials</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {buildingMaterials.map((item, index) => (
              <div key={index} className="glass-card p-5 text-center hover:scale-105 transition-transform cursor-pointer">
                <div className="text-3xl mb-2">{item.icon}</div>
                <div className="text-gray-300 text-sm font-medium">{item.name}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-12">Why Choose BuildMart?</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { icon: '✓', title: 'Genuine Products', desc: 'Authorized dealer for all major brands' },
              { icon: '🚚', title: 'Fast Delivery', desc: 'Same-day delivery within city limits' },
              { icon: '💰', title: 'Best Prices', desc: 'Wholesale rates for all customers' },
              { icon: '🤝', title: 'Expert Support', desc: 'Technical guidance from our team' },
            ].map((item, index) => (
              <div key={index} className="glass-card p-6 text-center">
                <div className="text-3xl mb-4">{item.icon}</div>
                <h3 className="text-white font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative z-10 px-6 py-16">
        <div className="max-w-3xl mx-auto glass-card p-10 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">Ready to Start Your Project?</h2>
          <p className="text-gray-400 mb-8">
            Get the best prices on cement, paints, steel, and all building materials. Contact us for a custom quote.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link href="/pay" className="pay-btn !py-4 !px-8">
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
            <div>
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                  </svg>
                </div>
                <span className="text-lg font-bold text-white">BuildMart</span>
              </div>
              <p className="text-gray-400 text-sm">
                Your trusted partner for quality building materials. Serving contractors and builders since 2010.
              </p>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Products</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="hover:text-indigo-400 cursor-pointer">Cement</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer">Paints</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer">Steel & TMT</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer">Tiles</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Brands</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><span className="hover:text-indigo-400 cursor-pointer">UltraTech Cement</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer">Birla Opus Paints</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer">Asian Paints</span></li>
                <li><span className="hover:text-indigo-400 cursor-pointer">TATA Tiscon</span></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><Link href="/pay" className="hover:text-indigo-400">Make Payment</Link></li>
                <li><Link href="/contact" className="hover:text-indigo-400">Contact Us</Link></li>
                <li><Link href="/privacy-policy" className="hover:text-indigo-400">Privacy Policy</Link></li>
                <li><Link href="/terms-conditions" className="hover:text-indigo-400">Terms & Conditions</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-white/10 pt-6 flex flex-wrap justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © 2026 BuildMart. All rights reserved. Powered by{' '}
              <span className="text-indigo-400">Razorpay</span>
            </p>
            <div className="flex gap-4 text-sm text-gray-500">
              <Link href="/privacy-policy" className="hover:text-indigo-400">Privacy</Link>
              <Link href="/terms-conditions" className="hover:text-indigo-400">Terms</Link>
              <Link href="/refund-policy" className="hover:text-indigo-400">Refunds</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
