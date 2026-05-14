"use client";

import { motion } from "framer-motion";
import Scene3D from "@/components/ui/Scene3D";
import { CyberButton, GlassCard } from "@/components/ui/FuturisticComponents";
import { RESTAURANT_DATA, MENU_ITEMS } from "@/constants/data";
import Link from "next/link";

export default function Home() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <Scene3D />
        <div className="relative z-10 text-center px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black tracking-tighter mb-4 italic">
              AETHERIA
            </h1>
            <p className="text-xl md:text-2xl font-light tracking-[0.5em] uppercase text-blue-400 mb-12">
              {RESTAURANT_DATA.slogan}
            </p>
            <div className="flex flex-col md:flex-row gap-6 justify-center">
              <Link href="/menu">
                <CyberButton>Explore Menu</CyberButton>
              </Link>
              <Link href="/reservations">
                <CyberButton variant="secondary">Book Table</CyberButton>
              </Link>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="text-[10px] font-bold tracking-[0.3em] uppercase text-zinc-500">Initiate Descent</span>
          <div className="w-[1px] h-12 bg-gradient-to-b from-blue-500 to-transparent animate-pulse" />
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-none">
            CRAFTING THE <span className="text-blue-500">QUANTUM</span> PLATE
          </h2>
          <p className="text-xl text-zinc-400 leading-relaxed mb-10">
            In 2026, taste is no longer just a sense—it's an experience. We use molecular architecture
            to reconstruct traditional flavors into futuristic masterpieces. Each dish is a
            symphony of precision and chaos.
          </p>
          <Link href="/about">
            <CyberButton variant="secondary">Our Genesis</CyberButton>
          </Link>
        </motion.div>

        <div className="grid grid-cols-2 gap-4">
          <GlassCard className="aspect-square flex items-center justify-center">
            <div className="text-center">
              <span className="text-4xl font-black text-blue-500">01</span>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Precision</p>
            </div>
          </GlassCard>
          <GlassCard className="aspect-square flex items-center justify-center mt-12">
            <div className="text-center">
              <span className="text-4xl font-black text-blue-500">02</span>
              <p className="text-[10px] font-bold uppercase tracking-widest mt-2">Innovation</p>
            </div>
          </GlassCard>
        </div>
      </section>

      {/* Featured Items */}
      <section className="py-32 bg-zinc-950 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter leading-none">
              SIGNATURE <span className="text-blue-500">SYNTHS</span>
            </h2>
            <Link href="/menu" className="text-xs font-bold text-blue-500 uppercase tracking-widest hover:tracking-[0.3em] transition-all">
              View All Items —&gt;
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {MENU_ITEMS.slice(0, 3).map((item, i) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
              >
                <GlassCard className="h-full group">
                  <div className="h-48 bg-zinc-800 mb-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-blue-500/10 group-hover:bg-blue-500/20 transition-colors" />
                    <div className="absolute inset-0 flex items-center justify-center text-zinc-700 font-black text-4xl opacity-20">
                      {item.name.split(' ')[0]}
                    </div>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">{item.name}</h3>
                  <p className="text-zinc-400 text-sm mb-6">{item.description}</p>
                  <span className="text-blue-500 font-black">{item.price}</span>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
