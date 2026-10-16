'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Camera, Tv, ShieldCheck, Heart, Printer, Mail, Globe } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';
import { useLanguage } from '@/context/LanguageContext';

export function Navbar() {
  const pathname = usePathname();
  const [supabaseActive, setSupabaseActive] = React.useState(false);
  const { lang, setLang, t } = useLanguage();

  React.useEffect(() => {
    setSupabaseActive(isSupabaseConfigured());
  }, []);

  // Hide standard navbar on full-screen /live stage view to keep stage projector clean
  if (pathname === '/live') {
    return null;
  }

  const navItems = [
    { href: '/', label: t.nav.home, icon: Sparkles },
    { href: '/upload', label: t.nav.upload, icon: Camera, badge: t.nav.uploadBadge },
    { href: '/invitation', label: t.nav.invitation, icon: Mail, badge: t.nav.invitationBadge },
    { href: '/print', label: t.nav.print, icon: Printer, badge: t.nav.printBadge },
    { href: '/live', label: t.nav.live, icon: Tv, badge: t.nav.liveBadge },
    { href: '/admin', label: t.nav.admin, icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-2">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group flex-shrink-0">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-stone-900 tracking-wide block leading-tight">
              Wedding<span className="text-[#B8860B]">Live</span>
            </span>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest block font-medium">
              {t.brand.subtag}
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all whitespace-nowrap ${
                  isActive
                    ? 'bg-[#D4AF37] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-[#F3E5AB]/40'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span className="hidden md:inline">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[9px] px-1.5 py-0.5 rounded-full hidden sm:inline-block ${
                      isActive ? 'bg-black/20 text-white' : 'bg-[#D4AF37]/15 text-[#B8860B]'
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Language Switcher & Status */}
        <div className="flex items-center gap-2 flex-shrink-0">
          {/* Language Switcher Button Pill */}
          <div className="flex items-center p-0.5 rounded-full bg-white border border-[#D4AF37]/40 shadow-xs">
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                lang === 'en'
                  ? 'bg-[#D4AF37] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Switch to English (US Market Default)"
            >
              <span>🇺🇸</span>
              <span className="text-[11px]">EN</span>
            </button>
            <button
              type="button"
              onClick={() => setLang('vi')}
              className={`px-2.5 py-1 rounded-full text-xs font-bold transition-all flex items-center gap-1 ${
                lang === 'vi'
                  ? 'bg-[#D4AF37] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
              title="Chuyển sang Tiếng Việt"
            >
              <span>🇻🇳</span>
              <span className="text-[11px]">VI</span>
            </button>
          </div>

          {/* Status Indicator (Desktop) */}
          <div className="hidden xl:flex items-center gap-1.5 text-xs text-stone-500 pl-1">
            <div
              className={`w-2 h-2 rounded-full ${
                supabaseActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
              }`}
            />
            <span className="text-[10px]">
              {supabaseActive ? t.nav.statusRealtime : t.nav.statusDemo}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
