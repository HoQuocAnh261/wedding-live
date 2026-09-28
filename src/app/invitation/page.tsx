'use client';

import React, { useState, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  MapPin,
  Gift,
  Camera,
  Share2,
  CheckCircle2,
  Send,
  Volume2,
  VolumeX,
  ExternalLink,
  RotateCcw,
  Palette,
  Building,
} from 'lucide-react';
import { triggerWeddingConfetti } from '@/lib/confetti';
import { VietQRModal } from '@/components/VietQRModal';
import {
  BaroqueCorner,
  FloralSpray,
  DoubleHappinessMedallion,
  RealisticWaxSeal,
  ArchitecturalDateBadge,
  CalligraphyAmpersand,
} from '@/components/WeddingOrnaments';

type InvitationTheme = 'starlit' | 'golden' | 'amber' | 'poised' | 'gold';

function InvitationContent() {
  const searchParams = useSearchParams();

  // Personalized guest URL parameters
  const guestNameParam = searchParams.get('guest') || '';
  const salutationParam = searchParams.get('salutation') || 'Bạn';
  const plusOneParam = searchParams.get('plus') || '';
  const companyParam = searchParams.get('company') || '';
  const initialThemeParam = (searchParams.get('theme') as InvitationTheme) || 'starlit';

  const [currentTheme, setCurrentTheme] = useState<InvitationTheme>(
    ['starlit', 'golden', 'amber', 'poised', 'gold'].includes(initialThemeParam)
      ? initialThemeParam
      : 'starlit'
  );

  const [isOpenEnvelope, setIsOpenEnvelope] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isVietQRModalOpen, setIsVietQRModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // RSVP Form State
  const [rsvpGuestName, setRsvpGuestName] = useState(
    guestNameParam ? `${salutationParam} ${guestNameParam}` : ''
  );
  const [rsvpAttending, setRsvpAttending] = useState<'yes_1' | 'yes_2' | 'no'>('yes_1');
  const [rsvpDiet, setRsvpDiet] = useState<'regular' | 'vegetarian'>('regular');
  const [rsvpWish, setRsvpWish] = useState('');
  const [rsvpSubmitted, setRsvpSubmitted] = useState(false);

  // Countdown timer state
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const coupleNames = process.env.NEXT_PUBLIC_EVENT_NAME || 'Minh Anh & Tuấn Kiệt';
  const groomName = 'Tuấn Kiệt';
  const brideName = 'Minh Anh';
  const weddingDateStr = '2026-10-26T18:00:00';

  useEffect(() => {
    const calculateTime = () => {
      const diff = new Date(weddingDateStr).getTime() - new Date().getTime();
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleOpenEnvelope = () => {
    setIsOpenEnvelope(true);
    triggerWeddingConfetti();
  };

  const handleCopyPersonalLink = () => {
    if (typeof window !== 'undefined') {
      const url = window.location.href;
      navigator.clipboard.writeText(url);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2500);
    }
  };

  const handleRsvpSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setRsvpSubmitted(true);
    triggerWeddingConfetti();
  };

  // Luxury visual theme styling (matching the 4 phone designs from the reference picture)
  const themeData = {
    // 1. Starlit Garden (Đỏ rượu Velvet & Baroque)
    starlit: {
      name: 'Starlit Garden',
      badge: 'Đỏ Velvet Bordeaux',
      screenBg: 'bg-gradient-to-b from-[#4A0A14] via-[#6B1120] to-[#3B070F]',
      frameBorder: 'border-[#E6C687]',
      cornerColor: '#E6C687',
      floralVariant: 'crimson' as const,
      waxVariant: 'gold' as const,
      titleColor: 'text-[#FCEEB5]',
      bodyColor: 'text-[#FFF8E7]',
      subColor: 'text-[#F3D798]/80',
      envelopeBg: 'bg-gradient-to-b from-[#6B1120] to-[#4A0A14]',
      envelopeBorder: 'border-[#E6C687]',
      tagline: "WE'RE GETTING MARRIED",
      isDark: true,
    },
    // 2. Golden Soirée (Hồng Phấn & Chữ Hỷ 囍)
    golden: {
      name: 'Golden Soirée',
      badge: 'Hồng Phấn & Chữ Hỷ',
      screenBg: 'bg-gradient-to-b from-[#FFFDF9] via-[#FFF8F3] to-[#FFF0E6]',
      frameBorder: 'border-[#FDBA74]',
      cornerColor: '#E07A5F',
      floralVariant: 'peach' as const,
      waxVariant: 'rose' as const,
      titleColor: 'text-[#C2410C]',
      bodyColor: 'text-[#431407]',
      subColor: 'text-[#9A3412]/80',
      envelopeBg: 'bg-gradient-to-b from-[#FFEDD5] to-[#FED7AA]',
      envelopeBorder: 'border-[#FB923C]',
      tagline: 'THE WEDDING OF',
      isDark: false,
    },
    // 3. Amber Noir (Cổ Điển Espresso Châu Âu)
    amber: {
      name: 'Amber Noir',
      badge: 'Cổ Điển Espresso',
      screenBg: 'bg-gradient-to-b from-[#1C1816] via-[#29221D] to-[#120F0D]',
      frameBorder: 'border-[#CBB282]',
      cornerColor: '#CBB282',
      floralVariant: 'vintage' as const,
      waxVariant: 'amber' as const,
      titleColor: 'text-[#EFE2CE]',
      bodyColor: 'text-[#F7EFE5]',
      subColor: 'text-[#D0BC9E]/80',
      envelopeBg: 'bg-gradient-to-b from-[#29221D] to-[#1C1816]',
      envelopeBorder: 'border-[#CBB282]',
      tagline: 'CÙNG NHỮNG NGƯỜI THÂN YÊU TRONG GIA ĐÌNH',
      isDark: true,
    },
    // 4. Poised Romance (Xanh Đêm Hoàng Gia)
    poised: {
      name: 'Poised Romance',
      badge: 'Xanh Đêm Hoàng Gia',
      screenBg: 'bg-gradient-to-b from-[#0B1A2A] via-[#10273E] to-[#08121D]',
      frameBorder: 'border-[#93C5FD]',
      cornerColor: '#93C5FD',
      floralVariant: 'wildflower' as const,
      waxVariant: 'gold' as const,
      titleColor: 'text-[#E0F2FE]',
      bodyColor: 'text-white',
      subColor: 'text-[#BAE6FD]/80',
      envelopeBg: 'bg-gradient-to-b from-[#10273E] to-[#0B1A2A]',
      envelopeBorder: 'border-[#93C5FD]',
      tagline: 'SAVE THE DATE',
      isDark: true,
    },
    // 5. Royal Ivory Gold
    gold: {
      name: 'Royal Ivory',
      badge: 'Vàng Hoàng Gia Luxury',
      screenBg: 'bg-gradient-to-b from-[#FAF8F5] via-[#FFFDF9] to-[#F5EFEB]',
      frameBorder: 'border-[#D4AF37]',
      cornerColor: '#D4AF37',
      floralVariant: 'peach' as const,
      waxVariant: 'gold' as const,
      titleColor: 'text-[#854D0E]',
      bodyColor: 'text-[#292524]',
      subColor: 'text-[#78716C]',
      envelopeBg: 'bg-gradient-to-b from-[#FDFBF7] to-[#F5EFEB]',
      envelopeBorder: 'border-[#D4AF37]',
      tagline: 'THE WEDDING OF',
      isDark: false,
    },
  }[currentTheme];

  return (
    <div className="min-h-screen bg-[#110D0C] text-stone-900 font-sans selection:bg-[#F3E5AB]">
      {/* Floating Theme Switcher & Audio Bar */}
      <div className="fixed top-3 inset-x-0 z-50 flex items-center justify-center px-4 pointer-events-none">
        <div className="pointer-events-auto flex items-center gap-1.5 sm:gap-2 p-1.5 rounded-full bg-stone-900/90 backdrop-blur-md border border-white/20 shadow-2xl">
          {/* Theme Selector Pills */}
          {(['starlit', 'golden', 'amber', 'poised', 'gold'] as InvitationTheme[]).map((thm) => (
            <button
              key={thm}
              type="button"
              onClick={() => setCurrentTheme(thm)}
              className={`px-2.5 sm:px-3 py-1 rounded-full text-[10px] sm:text-xs font-semibold transition-all ${
                currentTheme === thm
                  ? 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold shadow-md scale-105'
                  : 'text-stone-300 hover:text-white hover:bg-white/10'
              }`}
            >
              {thm === 'starlit' && '🌹 Starlit'}
              {thm === 'golden' && '🌸 Golden'}
              {thm === 'amber' && '☕ Amber'}
              {thm === 'poised' && '✨ Poised'}
              {thm === 'gold' && '👑 Ivory'}
            </button>
          ))}

          <div className="w-[1px] h-4 bg-white/30 mx-1" />

          {/* Audio Button */}
          <button
            type="button"
            onClick={() => setIsPlayingMusic((prev) => !prev)}
            className="p-1.5 rounded-full text-amber-300 hover:bg-white/10 transition-colors"
            title={isPlayingMusic ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
          >
            {isPlayingMusic ? <Volume2 className="w-4 h-4 animate-pulse" /> : <VolumeX className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* COVER VIEW: REALISTIC PHONE FRAME MOCKUP (Như trong ảnh mẫu)         */}
      {/* ===================================================================== */}
      {!isOpenEnvelope ? (
        <div className="min-h-screen flex items-center justify-center p-3 pt-16 pb-8 bg-radial from-[#29221D] via-[#1A1412] to-[#0A0706]">
          {/* Smartphone Hardware Frame */}
          <div className="relative w-full max-w-[360px] sm:max-w-[380px] h-[720px] sm:h-[750px] rounded-[48px] bg-stone-950 p-3 shadow-[0_25px_70px_rgba(0,0,0,0.85)] border-4 border-stone-800 flex flex-col overflow-hidden">
            {/* Phone Speaker & Dynamic Island Notch */}
            <div className="absolute top-4 inset-x-0 z-30 flex justify-center pointer-events-none">
              <div className="w-24 h-4 rounded-full bg-black flex items-center justify-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-stone-900 border border-stone-800" />
                <div className="w-8 h-1 rounded-full bg-stone-900" />
              </div>
            </div>

            {/* Screen Inner Container */}
            <div
              className={`relative flex-1 rounded-[38px] overflow-hidden flex flex-col justify-between p-5 text-center select-none shadow-inner border ${themeData.frameBorder} ${themeData.screenBg}`}
            >
              {/* Ornate Baroque Filigree Corners */}
              <BaroqueCorner position="top-left" color={themeData.cornerColor} className="absolute top-2 left-2 w-12 h-12" />
              <BaroqueCorner position="top-right" color={themeData.cornerColor} className="absolute top-2 right-2 w-12 h-12" />
              <BaroqueCorner position="bottom-left" color={themeData.cornerColor} className="absolute bottom-2 left-2 w-12 h-12" />
              <BaroqueCorner position="bottom-right" color={themeData.cornerColor} className="absolute bottom-2 right-2 w-12 h-12" />

              {/* Dual Gold Hairline Inner Border */}
              <div
                className={`absolute inset-3 border border-double border-2 rounded-[30px] pointer-events-none ${themeData.frameBorder} opacity-60`}
              />

              {/* Watercolor Floral Bouquets */}
              <FloralSpray
                variant={themeData.floralVariant}
                position="top-right"
                className="absolute -top-3 -right-3 w-28 h-28 opacity-80 pointer-events-none"
              />
              <FloralSpray
                variant={themeData.floralVariant}
                position="bottom-left"
                className="absolute -bottom-3 -left-3 w-32 h-32 opacity-85 pointer-events-none"
              />

              {/* Header: Tagline & Traditional Emblem */}
              <div className="pt-7 relative z-10">
                {/* Traditional 囍 Calligraphy for Golden Soirée */}
                {currentTheme === 'golden' ? (
                  <div className="flex justify-center mb-1">
                    <DoubleHappinessMedallion size={54} variant="red" />
                  </div>
                ) : (
                  <span
                    className={`text-[9px] sm:text-[10px] font-cinzel font-bold tracking-[0.25em] uppercase block mb-1 ${themeData.subColor}`}
                  >
                    {themeData.tagline}
                  </span>
                )}

                {/* Bride & Groom Calligraphy Script Names */}
                <h1 className="leading-tight my-1">
                  <span
                    className={`font-script text-4xl sm:text-5xl drop-shadow-md block ${themeData.titleColor}`}
                  >
                    {groomName}
                  </span>
                  <CalligraphyAmpersand color={themeData.cornerColor} className="text-2xl sm:text-3xl my-0" />
                  <span
                    className={`font-script text-4xl sm:text-5xl drop-shadow-md block ${themeData.titleColor}`}
                  >
                    {brideName}
                  </span>
                </h1>

                {/* Date & Location Line */}
                <p className={`text-[11px] font-serif italic tracking-wide mt-1.5 ${themeData.subColor}`}>
                  26.10.2026 • GEM CENTER, TP.HCM
                </p>
              </div>

              {/* Center: Realistic 3D Interactive Envelope with Wax Seal */}
              <div className="my-auto py-2 px-2 relative z-10 flex flex-col items-center">
                {/* Envelope Flap & Body Box */}
                <div
                  onClick={handleOpenEnvelope}
                  className={`group cursor-pointer relative w-64 sm:w-72 h-44 sm:h-48 rounded-2xl p-4 shadow-[0_16px_35px_rgba(0,0,0,0.5)] border-2 ${themeData.envelopeBorder} ${themeData.envelopeBg} flex flex-col items-center justify-between hover:scale-105 active:scale-95 transition-all duration-300`}
                >
                  {/* Triangular Top Flap Overlay */}
                  <div className="absolute top-0 inset-x-0 h-20 [clip-path:polygon(0_0,100%_0,50%_100%)] bg-black/15 shadow-sm border-b border-white/20 pointer-events-none" />

                  {/* Envelope Header: Tiny Monogram */}
                  <div className="w-full flex items-center justify-between text-[9px] relative z-10 opacity-75">
                    <span className="font-serif italic text-white/90">Lễ Thành Hôn</span>
                    <span className="font-mono text-white/90">26.10.2026</span>
                  </div>

                  {/* 3D Wax Seal Button */}
                  <div className="relative z-20 my-auto flex flex-col items-center">
                    <RealisticWaxSeal
                      initials="囍"
                      size={58}
                      variant={themeData.waxVariant}
                      onClick={handleOpenEnvelope}
                    />
                    <div className="mt-2 text-center">
                      <span className="text-xs font-bold uppercase tracking-widest text-amber-200 block drop-shadow-md group-hover:scale-105 transition-transform">
                        Chạm để mở thiệp
                      </span>
                      <span className="text-[9px] text-amber-300/70 block mt-0.5">
                        Tap to Open Invitation
                      </span>
                    </div>
                  </div>

                  {/* Envelope Bottom Golden Accent Line */}
                  <div className="w-full border-t border-dashed border-white/20 pt-1 text-[9px] text-white/70 italic font-serif">
                    WeddingLive Invitation
                  </div>
                </div>

                {/* Personalized Recipient Tag on Envelope Bottom */}
                <div className="mt-4 p-2.5 rounded-2xl bg-black/30 backdrop-blur-md border border-white/20 max-w-[260px] text-center shadow-lg">
                  <span
                    className={`text-[9px] uppercase tracking-[0.2em] font-cinzel font-semibold block ${themeData.subColor}`}
                  >
                    Kính gửi
                  </span>
                  <p className={`font-serif font-bold text-sm sm:text-base ${themeData.titleColor}`}>
                    {salutationParam} {guestNameParam || 'Quý Khách'}
                  </p>
                  {plusOneParam && (
                    <p className={`text-[10px] italic ${themeData.bodyColor}`}>
                      {plusOneParam}
                    </p>
                  )}
                  {companyParam && (
                    <div className="mt-0.5 inline-flex items-center gap-1 text-[9px] text-amber-300 font-medium">
                      <Building className="w-2.5 h-2.5" />
                      <span>{companyParam}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Instructions Footer */}
              <div className="pb-3 relative z-10">
                <p className={`text-[10px] italic ${themeData.subColor}`}>
                  Chạm vào con dấu sáp niêm phong để mở trọn vẹn thiệp cưới ✨
                </p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* ===================================================================== */
        /* OPEN INVITATION: FULL IMMERSIVE LUXURY WEDDING EXPERIENCE             */
        /* ===================================================================== */
        <div className="max-w-md mx-auto min-h-screen bg-[#FFFDF9] shadow-2xl border-x border-[#E8DFC8] pb-24 animate-fade-in text-stone-800">
          
          {/* Top Return to Envelope Button */}
          <div className="bg-stone-900 text-white px-4 py-2 flex items-center justify-between text-xs sticky top-0 z-40">
            <button
              type="button"
              onClick={() => setIsOpenEnvelope(false)}
              className="inline-flex items-center gap-1 text-amber-300 hover:text-white font-medium transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đóng lại phong bì</span>
            </button>
            <span className="text-[10px] text-stone-400 uppercase tracking-widest font-cinzel">
              {themeData.name}
            </span>
          </div>

          {/* Hero Banner with Couple Portrait & Monogram */}
          <div className="relative h-72 sm:h-84 bg-stone-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Ảnh cưới dâu rể"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent" />

            <div className="absolute bottom-6 inset-x-6 text-center text-white">
              <span className="text-[10px] uppercase tracking-[0.25em] font-cinzel font-semibold text-amber-300">
                SAVE THE DATE
              </span>
              <h2 className="font-script text-4xl sm:text-5xl text-[#FCEEB5] drop-shadow-md mt-1">
                {coupleNames}
              </h2>
              <p className="font-serif italic text-amber-200 text-xs mt-1">
                26 Tháng 10, 2026 • GEM Center, TP. Hồ Chí Minh
              </p>
            </div>
          </div>

          {/* Personalized Invitation Message Card */}
          <div className="px-6 py-8 text-center bg-[#FAF8F5] border-b border-[#E8DFC8] relative overflow-hidden">
            <BaroqueCorner position="top-left" color="#D4AF37" className="absolute top-2 left-2 w-8 h-8 opacity-60" />
            <BaroqueCorner position="top-right" color="#D4AF37" className="absolute top-2 right-2 w-8 h-8 opacity-60" />

            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3 text-[#B8860B]">
              <Heart className="w-5 h-5 fill-[#D4AF37]" />
            </div>

            <span className="text-[10px] uppercase font-cinzel tracking-[0.25em] text-[#B8860B] font-bold block mb-1">
              Thư Mời Trọng Thể
            </span>

            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Trân Trọng Kính Mời
            </h3>

            {/* Personalized Guest Box */}
            <div className="my-3 p-4 rounded-2xl bg-white border border-[#D4AF37]/50 shadow-sm inline-block w-full">
              <p className="font-serif text-xl sm:text-2xl font-extrabold text-[#B8860B]">
                {salutationParam} {guestNameParam || 'Quý Khách & Gia Đình'}
              </p>
              {plusOneParam && (
                <p className="font-serif italic text-xs text-stone-600 mt-1">
                  {plusOneParam}
                </p>
              )}
              {companyParam && (
                <p className="text-[11px] text-stone-500 font-medium mt-1">
                  ({companyParam})
                </p>
              )}
            </div>

            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed max-w-sm mx-auto italic font-serif">
              Đến chung vui cùng gia đình chúng mình trong ngày trọng đại và thiêng liêng nhất của cuộc đời!
            </p>
          </div>

          {/* Countdown Clock */}
          <div className="py-6 px-6 border-b border-[#E8DFC8] bg-white text-center">
            <span className="text-[10px] uppercase tracking-[0.2em] font-cinzel text-stone-500 font-semibold block mb-3">
              Đếm ngược ngày cưới
            </span>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] shadow-xs">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.days}
                </span>
                <span className="text-[9px] text-stone-500 uppercase font-semibold">Ngày</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] shadow-xs">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.hours}
                </span>
                <span className="text-[9px] text-stone-500 uppercase font-semibold">Giờ</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] shadow-xs">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.minutes}
                </span>
                <span className="text-[9px] text-stone-500 uppercase font-semibold">Phút</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8] shadow-xs">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.seconds}
                </span>
                <span className="text-[9px] text-stone-500 uppercase font-semibold">Giây</span>
              </div>
            </div>
          </div>

          {/* Wedding Event Timeline */}
          <div className="py-8 px-6 border-b border-[#E8DFC8] bg-[#FAF8F5]">
            <h4 className="font-serif text-lg font-bold text-stone-900 text-center mb-6">
              Lịch Trình Tiệc Cưới
            </h4>

            <div className="space-y-3.5 max-w-sm mx-auto text-xs">
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">17:30</span>
                <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex-1 shadow-xs">
                  <span className="font-bold block text-stone-900">Đón Khách & Chụp Ảnh</span>
                  <span className="text-[11px] text-stone-500">Chụp hình lưu niệm tại sảnh hoa cùng cô dâu & chú rể</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">18:00</span>
                <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex-1 shadow-xs">
                  <span className="font-bold block text-stone-900">Nghi Thức Lễ Thành Hôn</span>
                  <span className="text-[11px] text-stone-500">Trao nhẫn cưới & rót rượu champagne mừng hạnh phúc</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">18:30</span>
                <div className="p-3 rounded-2xl bg-white border border-stone-200/80 flex-1 shadow-xs">
                  <span className="font-bold block text-stone-900">Khai Tiệc Mừng Cưới</span>
                  <span className="text-[11px] text-stone-500">Thưởng thức ẩm thực tiệc cưới và nâng ly cùng bạn bè</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">19:30</span>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/80 flex-1 shadow-xs">
                  <span className="font-bold block text-amber-900">Chiếu Ảnh Khách Lên Màn LED</span>
                  <span className="text-[11px] text-amber-800">Quét mã QR chụp ảnh & gửi lời chúc trực tiếp lên sân khấu!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Venue & Map Location */}
          <div className="py-8 px-6 border-b border-[#E8DFC8] bg-white text-center">
            <MapPin className="w-6 h-6 text-[#B8860B] mx-auto mb-2" />
            <span className="text-[10px] uppercase tracking-[0.2em] font-cinzel text-stone-500 font-semibold block">
              Địa Điểm Tổ Chức
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-900 mt-1">
              Trung Tâm Hội Nghị GEM Center
            </h4>
            <p className="text-xs font-semibold text-stone-700 mt-0.5">
              Sảnh Grand Ballroom • Lầu 3
            </p>
            <p className="text-xs text-stone-500 mt-0.5 max-w-xs mx-auto">
              08 Nguyễn Bỉnh Khiêm, Phường Đa Kao, Quận 1, TP. Hồ Chí Minh
            </p>

            <div className="mt-4">
              <a
                href="https://maps.google.com/?q=GEM+Center+08+Nguyen+Binh+Khiem"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white text-xs font-semibold shadow-sm hover:bg-stone-800 transition-colors"
              >
                <span>Mở Bản Đồ Chỉ Đường (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5 text-amber-300" />
              </a>
            </div>
          </div>

          {/* RSVP Confirmation Form */}
          <div className="py-8 px-6 border-b border-[#E8DFC8] bg-[#FAF8F5]">
            <div className="text-center mb-5">
              <span className="text-[10px] uppercase tracking-[0.2em] font-cinzel text-[#B8860B] font-bold block">
                Phản Hồi Tham Dự
              </span>
              <h4 className="font-serif text-xl font-bold text-stone-900 mt-0.5">
                Xác Nhận Tham Dự (RSVP)
              </h4>
              <p className="text-xs text-stone-500 mt-1">
                Để dâu rể chuẩn bị chỗ ngồi và bàn tiệc chu đáo nhất
              </p>
            </div>

            {rsvpSubmitted ? (
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in shadow-xs">
                <CheckCircle2 className="w-10 h-10 text-emerald-600 mx-auto mb-2" />
                <h5 className="font-serif font-bold text-emerald-900 text-base">
                  Cảm ơn {rsvpGuestName}!
                </h5>
                <p className="text-xs text-emerald-700 mt-1">
                  Dâu rể đã nhận được xác nhận của bạn và rất háo hức chờ đón bạn trong ngày vui!
                </p>
              </div>
            ) : (
              <form onSubmit={handleRsvpSubmit} className="space-y-3.5 max-w-sm mx-auto text-xs">
                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Tên của bạn:</label>
                  <input
                    type="text"
                    required
                    value={rsvpGuestName}
                    onChange={(e) => setRsvpGuestName(e.target.value)}
                    placeholder="VD: Anh Tuấn FPT"
                    className="w-full px-3.5 py-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:border-[#D4AF37] bg-white shadow-xs"
                  />
                </div>

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Bạn sẽ tham dự chứ?</label>
                  <div className="grid grid-cols-3 gap-1.5">
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('yes_1')}
                      className={`py-2 px-1 rounded-xl text-center border font-medium transition-all ${
                        rsvpAttending === 'yes_1'
                          ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Đi 1 người
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('yes_2')}
                      className={`py-2 px-1 rounded-xl text-center border font-medium transition-all ${
                        rsvpAttending === 'yes_2'
                          ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-xs'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Đi 2 người
                    </button>
                    <button
                      type="button"
                      onClick={() => setRsvpAttending('no')}
                      className={`py-2 px-1 rounded-xl text-center border font-medium transition-all ${
                        rsvpAttending === 'no'
                          ? 'bg-stone-800 text-white border-stone-800'
                          : 'bg-white text-stone-700 border-stone-200'
                      }`}
                    >
                      Rất tiếc vắng mặt
                    </button>
                  </div>
                </div>

                {rsvpAttending !== 'no' && (
                  <div>
                    <label className="block text-stone-700 font-semibold mb-1">Khẩu vị ăn uống:</label>
                    <div className="flex gap-2">
                      <label className="flex items-center gap-1.5 cursor-pointer">
                        <input
                          type="radio"
                          name="diet"
                          checked={rsvpDiet === 'regular'}
                          onChange={() => setRsvpDiet('regular')}
                          className="text-[#D4AF37]"
                        />
                        <span>Ăn mặn (Thực đơn tiệc)</span>
                      </label>
                      <label className="flex items-center gap-1.5 cursor-pointer ml-3">
                        <input
                          type="radio"
                          name="diet"
                          checked={rsvpDiet === 'vegetarian'}
                          onChange={() => setRsvpDiet('vegetarian')}
                          className="text-[#D4AF37]"
                        />
                        <span>Ăn chay</span>
                      </label>
                    </div>
                  </div>
                )}

                <div>
                  <label className="block text-stone-700 font-semibold mb-1">Lời nhắn gửi dâu rể (tùy chọn):</label>
                  <textarea
                    rows={2}
                    value={rsvpWish}
                    onChange={(e) => setRsvpWish(e.target.value)}
                    placeholder="Chúc hai bạn mãi luôn hạnh phúc bên nhau nhé..."
                    className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs outline-none focus:border-[#D4AF37] bg-white shadow-xs"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors shadow-md"
                >
                  Xác Nhận Tham Dự
                </button>
              </form>
            )}
          </div>

          {/* WeddingLive Stage Feature Integration */}
          <div className="py-8 px-6 border-b border-[#E8DFC8] bg-gradient-to-br from-amber-50/70 to-rose-50/50 text-center">
            <span className="text-[10px] uppercase font-bold tracking-widest text-[#B8860B] block mb-1">
              Trải Nghiệm Tại Bàn Tiệc
            </span>
            <h4 className="font-serif text-xl font-bold text-stone-900">
              Chiếu Ảnh Của Bạn Lên Màn LED
            </h4>
            <p className="text-xs text-stone-600 mt-1 max-w-xs mx-auto">
              Tại tiệc cưới, bạn có thể chụp ảnh và gửi trực tiếp để ảnh xuất hiện trên màn hình LED lớn sân khấu!
            </p>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-2">
              <Link
                href="/upload"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs shadow-md hover:brightness-105 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Thử Chụp &amp; Gửi Ảnh Ngay</span>
              </Link>
            </div>
          </div>

          {/* VietQR Digital Gift Envelope */}
          <div className="py-8 px-6 text-center bg-white">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2 shadow-xs">
              <Gift className="w-6 h-6" />
            </div>
            <h4 className="font-serif text-lg font-bold text-stone-900">
              Gửi Quà Mừng Cưới (VietQR)
            </h4>
            <p className="text-xs text-stone-500 mt-1 max-w-xs mx-auto">
              Dành cho bạn bè, người thân ở xa hoặc không tiện mang phong bì tiền mặt
            </p>

            <div className="mt-4 flex flex-col items-center gap-2">
              <button
                type="button"
                onClick={() => setIsVietQRModalOpen(true)}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white border border-[#D4AF37] text-stone-900 text-xs font-bold shadow-xs hover:bg-amber-50/50 transition-colors"
              >
                <Gift className="w-4 h-4 text-rose-500" />
                <span>Mở Mã VietQR Chuyển Khoản</span>
              </button>

              <button
                type="button"
                onClick={handleCopyPersonalLink}
                className="inline-flex items-center gap-1.5 text-[11px] text-stone-500 hover:text-stone-800 transition-colors mt-2"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span>{copiedLink ? 'Đã sao chép link thiệp!' : 'Sao chép link thiệp này'}</span>
              </button>
            </div>
          </div>

          {/* Footer Note */}
          <div className="py-6 border-t border-[#E8DFC8] text-center text-xs text-stone-400 bg-[#FAF8F5]">
            <p className="italic font-serif">
              Minh Anh &amp; Tuấn Kiệt trân trọng cảm ơn tình cảm của bạn! ❤️
            </p>
          </div>
        </div>
      )}

      {/* VietQR Modal */}
      <VietQRModal
        isOpen={isVietQRModalOpen}
        onClose={() => setIsVietQRModalOpen(false)}
        coupleNames={coupleNames}
      />
    </div>
  );
}

export default function InvitationPage() {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-400 font-serif">Đang mở thiệp cưới...</div>}>
      <InvitationContent />
    </Suspense>
  );
}
