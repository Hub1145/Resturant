"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MENU_CATEGORIES, MENU_ITEMS } from "@/constants/data";

export default function MenuPage() {
  const [activeCategory, setActiveCategory] = useState(MENU_CATEGORIES[0]);

  const filteredItems = MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen pt-40 pb-20 px-6 bg-background">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20 text-center md:text-left">
          <h1 className="text-6xl md:text-8xl font-heading italic text-foreground leading-none mb-4">
            THE <span className="text-muted-foreground">CODEX</span>
          </h1>
          <p className="text-muted-foreground uppercase tracking-[0.3em] font-body font-light text-sm">
            Digital Culinary Manifest
          </p>
        </header>

        {/* Category Nav */}
        <div className="flex flex-wrap justify-center md:justify-start gap-4 mb-16 border-b border-foreground/5 pb-8">
          {MENU_CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-8 py-3 text-xs font-bold uppercase tracking-widest transition-all duration-300 rounded-full border ${
                activeCategory === cat
                  ? "bg-foreground text-background border-foreground"
                  : "liquid-glass text-muted-foreground hover:text-foreground border-transparent"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Menu Items Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {filteredItems.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="liquid-glass rounded-[2rem] p-6 flex flex-col md:flex-row gap-8 group">
                <div className="w-full md:w-48 h-48 bg-zinc-100 dark:bg-zinc-900 shrink-0 relative overflow-hidden rounded-[1.5rem]">
                   {item.image && (
                     <img
                       src={item.image}
                       alt={item.name}
                       className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                     />
                   )}
                   <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="flex-grow flex flex-col justify-center">
                  <div className="flex justify-between items-start mb-3">
                    <h3 className="text-3xl font-heading italic text-foreground group-hover:text-blue-500 transition-colors tracking-tight">
                      {item.name}
                    </h3>
                    <span className="text-foreground font-heading italic text-2xl">{item.price}</span>
                  </div>
                  <p className="text-muted-foreground text-sm mb-6 leading-relaxed font-body font-light max-w-[35ch]">
                    {item.description}
                  </p>
                  <div className="flex gap-2">
                    {item.dietary.map(tag => (
                      <span key={tag} className="liquid-glass rounded-full px-3 py-1 text-[9px] font-bold uppercase text-muted-foreground tracking-widest">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="mt-20 p-12 liquid-glass-strong rounded-[2.5rem] border border-blue-500/20 text-center">
           <h4 className="text-blue-500 font-heading italic text-2xl mb-4">Neural Warning</h4>
           <p className="text-muted-foreground text-sm leading-relaxed max-w-2xl mx-auto font-body font-light italic">
              "Consuming molecular compounds may result in heightened awareness, temporary perception of extra dimensions, and an insatiable desire for neo-modernist aesthetics. Dine at your own existential risk."
           </p>
        </div>
      </div>
    </div>
  );
}
