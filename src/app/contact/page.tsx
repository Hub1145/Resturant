"use client";

import { motion } from "framer-motion";
import { GlassCard, CyberButton } from "@/components/ui/FuturisticComponents";
import { RESTAURANT_DATA } from "@/constants/data";

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 italic">
            CONNECT <span className="text-blue-500">HUB</span>
          </h1>
          <p className="text-zinc-500 uppercase tracking-[0.3em] font-bold text-sm">
            Neural Uplink Established
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20">
          <div className="space-y-12">
            <div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-blue-500 mb-6">Coordinates</h2>
              <div className="space-y-4 text-zinc-400">
                <p className="text-xl">{RESTAURANT_DATA.contact.address}</p>
                <p className="text-xl">{RESTAURANT_DATA.contact.phone}</p>
                <p className="text-xl">{RESTAURANT_DATA.contact.email}</p>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-bold uppercase tracking-widest text-blue-500 mb-6">Stasis Cycles</h2>
              <div className="grid grid-cols-2 gap-4">
                {RESTAURANT_DATA.hours.map((h) => (
                  <div key={h.day} className="flex justify-between border-b border-white/5 pb-2">
                    <span className="text-xs font-bold uppercase text-zinc-500">{h.day}</span>
                    <span className="text-xs font-bold text-white">{h.open} - {h.close}</span>
                  </div>
                ))}
              </div>
            </div>

            <GlassCard className="p-0 overflow-hidden h-64 relative">
               <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
                  <div className="text-center">
                     <p className="text-zinc-600 font-black uppercase tracking-[0.5em] text-xs">Map Encryption Active</p>
                     <p className="text-[10px] text-blue-500 mt-2 font-bold uppercase tracking-widest">SF NEO-DISTRICT 7</p>
                  </div>
               </div>
               {/* Map placeholder simulation */}
               <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex items-end p-6">
                  <a href={RESTAURANT_DATA.contact.googleMaps} target="_blank" className="text-white font-bold text-xs uppercase tracking-widest hover:text-blue-500 transition-colors">
                     Open Satellite Navigation —&gt;
                  </a>
               </div>
            </GlassCard>
          </div>

          <div>
            <GlassCard>
              <h2 className="text-2xl font-bold uppercase tracking-tighter mb-8">TRANSMIT <span className="text-blue-500">MESSAGE</span></h2>
              <form className="space-y-6">
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Identifier</label>
                  <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Name / Neural ID" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Return Sync</label>
                  <input type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" placeholder="Email Address" required />
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Frequency Type</label>
                  <select className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors appearance-none">
                    <option>General Inquiry</option>
                    <option>Event Planning</option>
                    <option>Dietary Coordination</option>
                    <option>Press Transmission</option>
                  </select>
                </div>
                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Encryption Content</label>
                  <textarea rows={5} className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors resize-none" placeholder="Enter your message..." required></textarea>
                </div>
                <CyberButton className="w-full">Initiate Uplink</CyberButton>
              </form>
            </GlassCard>
          </div>
        </div>
      </div>
    </div>
  );
}
