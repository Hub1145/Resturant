"use client";

import { motion } from "framer-motion";
import { GlassCard } from "@/components/ui/FuturisticComponents";
import { RESTAURANT_DATA } from "@/constants/data";

export default function AboutPage() {
  return (
    <div className="min-h-screen pt-32 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <header className="mb-20">
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-4 italic">
            OUR <span className="text-blue-500">GENESIS</span>
          </h1>
          <p className="text-zinc-500 uppercase tracking-[0.3em] font-bold text-sm">
            Temporal Origin Story
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="text-2xl font-light text-white leading-relaxed mb-8 italic">
              "To predict the future, we had to invent it on a plate."
            </p>
            <div className="space-y-6 text-zinc-400 leading-relaxed">
              <p>
                Founded in the neon-drenched districts of Neo-Tokyo, Aetheria Gastronomy was born from a singular vision:
                to merge the precision of quantum computing with the raw emotion of culinary art.
                In 2026, we opened our San Francisco module, bringing our unique neo-molecular fusion to the global stage.
              </p>
              <p>
                Our team consists of rogue scientists, digital artists, and traditional chefs who felt limited by the laws of thermodynamics.
                Together, we've engineered a space where gravity is optional and flavor is multidimensional.
              </p>
            </div>
          </motion.div>

          <div className="relative">
            <GlassCard className="h-full flex items-center justify-center min-h-[400px]">
               <div className="text-center">
                  <div className="text-6xl font-black text-blue-500 mb-2">2026</div>
                  <p className="text-xs font-bold uppercase tracking-widest">Year of Manifestation</p>
               </div>
            </GlassCard>
            <div className="absolute -bottom-10 -right-10 w-40 h-40 border border-blue-500/20 bg-blue-500/5 backdrop-blur-xl -z-10" />
          </div>
        </div>

        <h2 className="text-4xl font-black tracking-tighter mb-12 uppercase">The <span className="text-blue-500">Architects</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
           {[
             { name: "DR. ELARA VANCE", role: "Molecular Architect", bio: "Former NASA chemist who specialized in synthetic nutrition." },
             { name: "KAIZO-7", role: "Neural Chef", bio: "A third-generation cyborg focusing on taste-memory synthesis." },
             { name: "RENA NOVA", role: "Atmospheric Designer", bio: "Visual artist specializing in bioluminescent environments." }
           ].map((member, i) => (
             <motion.div
               key={member.name}
               initial={{ opacity: 0, y: 20 }}
               whileInView={{ opacity: 1, y: 0 }}
               viewport={{ once: true }}
               transition={{ delay: i * 0.2 }}
             >
               <GlassCard>
                 <div className="w-16 h-16 bg-zinc-800 mb-6 rounded-full overflow-hidden flex items-center justify-center font-black text-zinc-600">
                    {member.name.split(' ')[0][0]}
                 </div>
                 <h3 className="text-xl font-bold mb-1 tracking-tight">{member.name}</h3>
                 <p className="text-blue-500 text-[10px] font-bold uppercase tracking-widest mb-4">{member.role}</p>
                 <p className="text-zinc-500 text-sm">{member.bio}</p>
               </GlassCard>
             </motion.div>
           ))}
        </div>
      </div>
    </div>
  );
}
