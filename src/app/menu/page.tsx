"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/FuturisticComponents";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/constants/data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4">
            THE <span className="text-blue-500">CODEX</span>
          </h1>
          <p className="text-zinc-500 uppercase tracking-[0.3em] font-bold text-sm">
            Digital Culinary Manifest
          </p>
        </header>

        {/* Category Nav */}
        <div className="flex flex-wrap gap-4 mb-16 border-b border-white/10 pb-8">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-2 text-xs font-bold uppercase tracking-widest transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "border-white/10 text-zinc-500 hover:border-blue-500/50 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <GlassCard className="flex flex-col md:flex-row gap-6 group">
                <div className="w-full md:w-32 h-32 bg-zinc-800 shrink-0 relative overflow-hidden">
                   <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-xs opacity-20 uppercase tracking-tighter">
                      SYNTH-IMG-{item.id}
                   </div>
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-xl font-bold group-hover:text-blue-500 transition-colors uppercase tracking-tight">
                      {item.name}
                    </h3>
                    <span className="text-blue-500 font-black tracking-tighter">{item.price}</span>
                  </div>
                  <p className="text-zinc-400 text-sm mb-4 leading-relaxed font-light">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    {item.dietary.map(tag => (
                      <span key={tag} className="px-2 py-0.5 border border-white/10 text-[8px] font-black uppercase text-zinc-500 tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </GlassCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-8 border border-blue-500/20 bg-blue-500/5 rounded-2xl">
           <h4 className="text-blue-500 font-bold uppercase text-xs tracking-widest mb-4">Warning: Sensory Overload</h4>
           <p className="text-zinc-500 text-xs leading-relaxed uppercase tracking-tighter font-bold">
              Consuming molecular compounds may result in heightened awareness, temporary perception of extra dimensions, and an insatiable desire for neo-modernist aesthetics. Dine at your own existential risk.
           </p>
        </div>
      </div>
    </div>
  );
}
