"use client";

import { motion } from "framer-motion";
import { FadingVideo } from "@/components/ui/FadingVideo";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { RESTAURANT_DATA, MENU_ITEMS } from "@/constants/data";

export default function Home() {
  return (
    <div className="relative bg-background text-foreground">
      {/* Cinematic Hero Section */}
      <section className="relative h-screen w-full flex flex-col items-center justify-center overflow-hidden">
        <FadingVideo
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260314_131748_f2ca2a28-fed7-44c8-b9a9-bd9acdd5ec31.mp4"
          className="absolute inset-0 w-full h-full object-cover z-0"
        />

        <div className="relative z-10 flex flex-col items-center text-center px-6 pt-32 pb-40">
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl leading-[0.95] tracking-[-2.46px] max-w-7xl font-normal font-heading text-foreground"
          >
            Where <em className="not-italic text-muted-foreground">dreams</em> rise <br className="hidden md:block" />
            <em className="not-italic text-muted-foreground">through the silence.</em>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
            className="text-muted-foreground text-base sm:text-lg max-w-2xl mt-8 leading-relaxed font-body"
          >
            We're designing tools for deep thinkers, bold creators, and quiet rebels.
            Amid the chaos, we build digital spaces for sharp focus and inspired work.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="mt-12"
          >
            <Link href="/menu">
              <button className="liquid-glass rounded-full px-14 py-5 text-base font-medium text-foreground hover:scale-[1.03] transition-transform flex items-center gap-2 group">
                Begin Journey <ArrowUpRight className="w-5 h-5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Featured Food Section */}
      <section className="py-32 px-8 md:px-16 lg:px-20 max-w-7xl mx-auto">
        <div className="flex flex-col gap-4 mb-20">
          <div className="text-sm font-body text-muted-foreground uppercase tracking-widest">// Featured Creations</div>
          <h2 className="font-heading italic text-foreground text-6xl md:text-7xl leading-[0.9] tracking-[-3px]">
            SYNTHETIC <span className="text-muted-foreground">SAVOR</span>
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {MENU_ITEMS.slice(0, 3).map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: i * 0.2 }}
              className="group"
            >
              <div className="liquid-glass rounded-[2.5rem] p-4 mb-8 group-hover:scale-[1.02] transition-transform duration-500">
                <div className="aspect-[4/5] overflow-hidden rounded-[2rem] relative bg-zinc-100 dark:bg-zinc-900">
                  {item.image && (
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    />
                  )}
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-8">
                     <p className="text-foreground text-xs font-bold uppercase tracking-widest">Molecular Specimen {item.id}</p>
                  </div>
                </div>
              </div>
              <div className="px-2">
                <h3 className="font-heading italic text-foreground text-4xl mb-3 tracking-tight group-hover:text-blue-500 transition-colors">
                  {item.name}
                </h3>
                <p className="text-muted-foreground text-base font-body font-light leading-snug mb-6 max-w-[28ch]">
                  {item.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-foreground font-heading italic text-3xl">{item.price}</span>
                  <Link href="/menu" className="w-12 h-12 liquid-glass rounded-full flex items-center justify-center text-foreground hover:bg-blue-500 hover:text-white transition-all">
                    <ArrowUpRight className="w-5 h-5" />
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-8 md:px-16 lg:px-20 max-w-7xl mx-auto flex flex-col gap-12">
        <div className="text-sm font-body text-muted-foreground uppercase tracking-widest">// Philosophy</div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <h2 className="font-heading italic text-foreground text-6xl md:text-7xl leading-[0.9] tracking-[-3px] mb-8">
                CRAFTING THE <br /> <span className="text-muted-foreground">QUANTUM</span> PLATE
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-body font-light">
                In 2026, taste is no longer just a sense—it's an experience. We use molecular architecture
                to reconstruct traditional flavors into futuristic masterpieces.
              </p>
            </motion.div>

            <div className="relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="liquid-glass aspect-square flex items-center justify-center rounded-[2rem]">
                  <div className="text-center">
                    <span className="text-4xl font-heading italic text-foreground">01</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-2 text-muted-foreground">Precision</p>
                  </div>
                </div>
                <div className="liquid-glass aspect-square flex items-center justify-center rounded-[2rem] mt-12">
                  <div className="text-center">
                    <span className="text-4xl font-heading italic text-foreground">02</span>
                    <p className="text-[10px] font-bold uppercase tracking-widest mt-2 text-muted-foreground">Innovation</p>
                  </div>
                </div>
              </div>
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-20 -right-20 w-64 h-64 hidden xl:block pointer-events-none"
              >
                <img
                  src="https://media0.giphy.com/media/v1.Y2lkPTZjMDliOTUyY2JjcXF2eWJkazJobWoyaGQzMGlhbHhsaHI2eHJ4ZDF0N3R3dGRvbCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/7JzHsh3UTip20/giphy.gif"
                  alt="Floating Molecular Dish"
                  className="w-full h-full object-contain rounded-full shadow-2xl shadow-blue-500/20"
                />
              </motion.div>
            </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-zinc-50 dark:bg-zinc-950/50">
        <div className="max-w-7xl mx-auto px-8 md:px-16 lg:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <div className="text-sm font-body text-muted-foreground uppercase tracking-widest mb-6">// Neural Feedback</div>
              <h2 className="font-heading italic text-foreground text-6xl md:text-7xl leading-[0.9] tracking-[-3px] mb-8">
                What the <br /> <span className="text-muted-foreground">thinkers</span> say
              </h2>
              <p className="text-xl text-muted-foreground leading-relaxed font-body font-light max-w-md">
                "Aetheria isn't just a meal; it's a recalibration of the senses. In 2026, this is where the avant-garde dines."
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="liquid-glass-strong p-8 rounded-[2rem]">
                <p className="text-foreground italic font-body mb-6">"The Plasma Scallops changed my understanding of light and flavor."</p>
                <div className="font-heading italic text-xl text-blue-500">— Juno R., Cyber-Architect</div>
              </div>
              <div className="liquid-glass-strong p-8 rounded-[2rem] mt-12">
                <p className="text-foreground italic font-body mb-6">"Digital spaces meets physical dining. Flawless execution."</p>
                <div className="font-heading italic text-xl text-blue-500">— Silas V., Neo-Historian</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
