"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { GlassCard, CyberButton } from "@/components/ui/FuturisticComponents";

export default function ReservationsPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="min-h-screen pt-32 pb-20 px-6 flex items-center justify-center">
      <div className="max-w-4xl w-full">
        {!submitted ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-6xl font-black tracking-tighter mb-6 leading-none">
                SECURE <span className="text-blue-500">STASIS</span>
              </h1>
              <p className="text-zinc-400 mb-8 leading-relaxed">
                Reservations are required for entry into the Aetheria Gastronomy module.
                Please provide your temporal coordinates to secure your table.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center font-black text-blue-500">01</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Select Timeline</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center font-black text-blue-500">02</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Confirm Biological Count</p>
                </div>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 border border-white/10 flex items-center justify-center font-black text-blue-500">03</div>
                  <p className="text-xs font-bold uppercase tracking-widest text-zinc-500">Enter Neural ID</p>
                </div>
              </div>
            </div>

            <GlassCard>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Neural Name</label>
                    <input type="text" className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" required />
                  </div>
                  <div className="col-span-2 md:col-span-1">
                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Sync Email</label>
                    <input type="email" className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" required />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Cycle Date</label>
                    <input type="date" className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors invert" required />
                  </div>
                  <div>
                    <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Stasis Time</label>
                    <select className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors appearance-none">
                      <option>17:00</option>
                      <option>18:30</option>
                      <option>20:00</option>
                      <option>21:30</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] font-bold uppercase text-zinc-500 mb-2">Bio Count (Guests)</label>
                  <input type="number" min="1" max="10" defaultValue="2" className="w-full bg-black border border-white/10 px-4 py-3 text-sm focus:border-blue-500 outline-none transition-colors" required />
                </div>

                <CyberButton className="w-full">Initialize Booking</CyberButton>
              </form>
            </GlassCard>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-24 h-24 bg-blue-600 rounded-full mx-auto mb-8 flex items-center justify-center">
              <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="4" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-4">Transmission Received</h2>
            <p className="text-zinc-400 mb-8 max-w-sm mx-auto">
              Your stasis coordinates have been synced with our master server.
              Check your neural link (email) for confirmation.
            </p>
            <CyberButton variant="secondary" onClick={() => setSubmitted(false)}>Modify Timeline</CyberButton>
          </motion.div>
        )}
      </div>
    </div>
  );
}
