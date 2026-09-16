'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Sparkles, Camera, Tv, ShieldCheck, Heart } from 'lucide-react';
import { isSupabaseConfigured } from '@/lib/supabase';

export function Navbar() {
  const pathname = usePathname();
  const [supabaseActive, setSupabaseActive] = React.useState(false);

  React.useEffect(() => {
    setSupabaseActive(isSupabaseConfigured());
  }, []);

  // Hide standard navbar on full-screen /live stage view to keep stage projector clean,
  // but show on other pages.
  if (pathname === '/live') {
    return null;
  }

  const navItems = [
    { href: '/', label: 'Giới Thiệu', icon: Sparkles },
    { href: '/upload', label: 'Khách Gửi Ảnh', icon: Camera, badge: 'Mobile' },
    { href: '/live', label: 'Màn LED Sân Khấu', icon: Tv, badge: '16:9 Live' },
    { href: '/admin', label: 'Quản Trị Duyệt', icon: ShieldCheck },
  ];

  return (
    <header className="sticky top-0 z-50 bg-[#FAF8F5]/90 backdrop-blur-md border-b border-[#E8DFC8]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Brand */}
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center shadow-sm text-white group-hover:scale-105 transition-transform">
            <Heart className="w-5 h-5 fill-white" />
          </div>
          <div>
            <span className="font-serif text-lg font-bold text-stone-900 tracking-wide block leading-tight">
              Wedding<span className="text-[#B8860B]">Live</span>
            </span>
            <span className="text-[10px] text-stone-500 uppercase tracking-widest block">
              Eventoly Style • VN
            </span>
          </div>
        </Link>

        {/* Links */}
        <nav className="flex items-center gap-1 sm:gap-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all ${
                  isActive
                    ? 'bg-[#D4AF37] text-white shadow-sm'
                    : 'text-stone-700 hover:text-stone-900 hover:bg-[#F3E5AB]/40'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="hidden md:inline">{item.label}</span>
                {item.badge && (
                  <span
                    className={`text-[10px] px-1.5 py-0.5 rounded-full hidden sm:inline-block ${
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

        {/* Status Indicator */}
        <div className="hidden lg:flex items-center gap-2 text-xs">
          <div
            className={`w-2 h-2 rounded-full ${
              supabaseActive ? 'bg-emerald-500 animate-pulse' : 'bg-amber-500'
            }`}
          />
          <span className="text-stone-500 text-[11px]">
            {supabaseActive ? 'Supabase Realtime' : 'Demo Mode (Active)'}
          </span>
        </div>
      </div>
    </header>
  );
}
