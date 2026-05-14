"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

const navLinks = [
  { name: "Home", href: "/" },
  { name: "Voyages", href: "/menu" },
  { name: "Worlds", href: "/reservations" },
  { name: "Innovation", href: "/about" },
  { name: "Plan Launch", href: "/contact" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  return (
    <nav className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl z-50 flex justify-between items-center px-8 py-6">
      {/* Left Logo */}
      <Link href="/" className="text-3xl tracking-tight font-heading text-foreground flex items-center">
        Velorah<sup className="text-xs ml-0.5">®</sup>
      </Link>

      {/* Center Nav (Desktop Only) */}
      <div className="hidden md:flex items-center gap-8">
        {navLinks.map((link) => (
          <Link
            key={link.name}
            href={link.href}
            className={`text-sm font-body transition-colors ${
              pathname === link.href ? "text-foreground font-medium" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            {link.name}
          </Link>
        ))}
      </div>

      {/* Right CTA & Toggle */}
      <div className="hidden md:flex items-center gap-4">
        <ThemeToggle />
        <Link
          href="/reservations"
          className="liquid-glass rounded-full px-6 py-2.5 text-sm font-medium text-foreground hover:scale-[1.03] transition-transform block"
        >
          Begin Journey
        </Link>
      </div>

      {/* Mobile Toggle */}
      <div className="md:hidden flex items-center gap-2">
        <ThemeToggle />
        <button
          className="w-10 h-10 liquid-glass rounded-full flex items-center justify-center text-foreground"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-8 right-8 mt-4 liquid-glass-strong p-8 flex flex-col gap-6 md:hidden rounded-[2rem] z-50 bg-background/80 backdrop-blur-2xl"
          >
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`text-2xl font-heading italic ${
                  pathname === link.href ? "text-foreground" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </Link>
            ))}
            <Link
              href="/reservations"
              onClick={() => setIsOpen(false)}
              className="liquid-glass-strong rounded-full py-4 text-center text-sm font-bold uppercase tracking-widest text-foreground"
            >
              Begin Journey
            </Link>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
