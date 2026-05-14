import Link from "next/link";
import { RESTAURANT_DATA } from "@/constants/data";

export function Footer() {
  return (
    <footer className="bg-black border-t border-white/10 py-20 px-6">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-2">
          <h2 className="text-3xl font-black tracking-tighter mb-4">AETHERIA</h2>
          <p className="text-zinc-400 max-w-sm mb-6">
            {RESTAURANT_DATA.description}
          </p>
          <div className="flex gap-4">
            {Object.entries(RESTAURANT_DATA.social).map(([platform, url]) => (
              <a
                key={platform}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-blue-500 hover:text-blue-500 transition-all uppercase text-[10px] font-bold"
              >
                {platform.slice(0, 2)}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Explore</h3>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li><Link href="/menu" className="hover:text-blue-500 transition-colors">Digital Menu</Link></li>
            <li><Link href="/reservations" className="hover:text-blue-500 transition-colors">Quantum Booking</Link></li>
            <li><Link href="/about" className="hover:text-blue-500 transition-colors">Our Origin</Link></li>
            <li><Link href="/contact" className="hover:text-blue-500 transition-colors">Contact Hub</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-bold uppercase tracking-widest text-xs mb-6">Location</h3>
          <ul className="space-y-4 text-zinc-400 text-sm">
            <li>{RESTAURANT_DATA.contact.address}</li>
            <li>{RESTAURANT_DATA.contact.phone}</li>
            <li>{RESTAURANT_DATA.contact.email}</li>
            <li className="text-white font-bold mt-4 uppercase text-xs">Opening Stasis</li>
            {RESTAURANT_DATA.hours.slice(0, 1).map(h => (
              <li key="hours" className="text-[10px]">MON-SUN: 17:00 - 02:00</li>
            ))}
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] text-zinc-600 font-bold uppercase tracking-widest">
        <p>© 2026 AETHERIA GASTRONOMY. ALL RIGHTS RESERVED.</p>
        <div className="flex gap-8">
          <Link href="/privacy" className="hover:text-white">Privacy Protocol</Link>
          <Link href="/terms" className="hover:text-white">Terms of Existence</Link>
          <Link href="/admin" className="hover:text-white">Admin Access</Link>
        </div>
      </div>
    </footer>
  );
}
