'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Heart, Sparkles, Gift, Camera, Mail, Building, MapPin } from 'lucide-react';
import { DEFAULT_BANK_INFO } from '@/lib/mock-data';
import { WeddingGuest } from '@/types/guest';
import {
  BaroqueCorner,
  FloralSpray,
  DoubleHappinessMedallion,
  RealisticWaxSeal,
  ArchitecturalDateBadge,
  CalligraphyAmpersand,
} from '@/components/WeddingOrnaments';

export type CardTheme =
  | 'gold'
  | 'red'
  | 'rose'
  | 'greenery'
  | 'noir'
  | 'starlit'
  | 'golden'
  | 'amber'
  | 'poised'
  | 'emerald'
  | 'lavender'
  | 'chinoiserie'
  | 'terracotta'
  | 'minimalist';
export type CardType = 'table_stand' | 'invitation' | 'envelope';

export interface CardData {
  groomName: string;
  brideName: string;
  weddingDate: string;
  weddingTime: string;
  venueName: string;
  venueAddress: string;
  hallName: string;
  tableNumber: string;
  uploadUrl: string;
  showQRUpload: boolean;
  showVietQR: boolean;
  showTableNumber: boolean;
  customNote: string;
  cardType: CardType;
  theme: CardTheme;
  guest?: WeddingGuest;
}

interface PrintCardPreviewProps {
  data: CardData;
  scale?: number;
  isPrintVersion?: boolean;
}

export function PrintCardPreview({ data, isPrintVersion = false }: PrintCardPreviewProps) {
  const {
    groomName,
    brideName,
    weddingDate,
    weddingTime,
    venueName,
    venueAddress,
    hallName,
    tableNumber,
    uploadUrl,
    showQRUpload,
    showVietQR,
    showTableNumber,
    customNote,
    cardType,
    theme: rawTheme,
    guest,
  } = data;

  const bankInfo = DEFAULT_BANK_INFO;
  const vietQrUrl = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNo}-compact.png?amount=500000&addInfo=MungCuoi&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  // Normalize theme keys (mapping legacy themes to their luxury counterparts)
  const normalizedTheme:
    | 'starlit'
    | 'golden'
    | 'amber'
    | 'poised'
    | 'emerald'
    | 'lavender'
    | 'chinoiserie'
    | 'terracotta'
    | 'minimalist'
    | 'gold' =
    rawTheme === 'red' || rawTheme === 'starlit'
      ? 'starlit'
      : rawTheme === 'rose' || rawTheme === 'golden'
      ? 'golden'
      : rawTheme === 'noir' || rawTheme === 'amber'
      ? 'amber'
      : rawTheme === 'greenery' || rawTheme === 'poised'
      ? 'poised'
      : rawTheme === 'emerald'
      ? 'emerald'
      : rawTheme === 'lavender'
      ? 'lavender'
      : rawTheme === 'chinoiserie'
      ? 'chinoiserie'
      : rawTheme === 'terracotta'
      ? 'terracotta'
      : rawTheme === 'minimalist'
      ? 'minimalist'
      : 'gold';

  // Effective table number from guest if available
  const effectiveTable = guest?.tableNumber || tableNumber;

  // Luxury Theme Visual Configurations (10 distinct styles)
  const themeConfig = {
    // 1. Starlit Garden (Đỏ Velvet Bordeaux & Vàng Kim Hoàng Gia)
    starlit: {
      bg: 'bg-gradient-to-br from-[#4A0A14] via-[#6B1120] to-[#3B070F]',
      outerBorder: 'border-[#E6C687]',
      innerBorder: 'border-[#E6C687]/60',
      cornerColor: '#E6C687',
      floralVariant: 'crimson' as const,
      waxVariant: 'gold' as const,
      waxInitials: '囍',
      titleColor: 'text-[#FCEEB5]',
      bodyColor: 'text-[#FFF8E7]',
      subColor: 'text-[#F3D798]/80',
      badgeBg: 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B]',
      badgeText: 'text-[#3B070F]',
      badgeBorder: 'border-[#FFF4D0]',
      cardBg: 'bg-[#580D18]/90 backdrop-blur-md',
      qrFg: '#000000',
      accentColor: 'text-[#FCEEB5]',
      envelopeFlap: 'bg-[#580D18]',
      isDark: true,
    },
    // 2. Golden Soirée (Hồng Phấn Đào & Chữ Hỷ 囍 Thư Pháp)
    golden: {
      bg: 'bg-gradient-to-br from-[#FFFDF9] via-[#FFF7F2] to-[#FFF0E6]',
      outerBorder: 'border-[#FDBA74]',
      innerBorder: 'border-[#FB923C]/50',
      cornerColor: '#E07A5F',
      floralVariant: 'peach' as const,
      waxVariant: 'rose' as const,
      waxInitials: '囍',
      titleColor: 'text-[#C2410C]',
      bodyColor: 'text-[#431407]',
      subColor: 'text-[#9A3412]/80',
      badgeBg: 'bg-gradient-to-r from-[#F97316] to-[#EA580C]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#FFEDD5]',
      cardBg: 'bg-white/85 backdrop-blur-sm',
      qrFg: '#7C2D12',
      accentColor: 'text-[#EA580C]',
      envelopeFlap: 'bg-[#FFE4D6]',
      isDark: false,
    },
    // 3. Amber Noir (Cổ Điển Vintage Espresso Châu Âu)
    amber: {
      bg: 'bg-gradient-to-br from-[#1C1816] via-[#29221D] to-[#120F0D]',
      outerBorder: 'border-[#CBB282]',
      innerBorder: 'border-[#CBB282]/50',
      cornerColor: '#CBB282',
      floralVariant: 'vintage' as const,
      waxVariant: 'amber' as const,
      waxInitials: '囍',
      titleColor: 'text-[#EFE2CE]',
      bodyColor: 'text-[#F7EFE5]',
      subColor: 'text-[#D0BC9E]/80',
      badgeBg: 'bg-gradient-to-r from-[#CBB282] to-[#9E8254]',
      badgeText: 'text-[#1C1816]',
      badgeBorder: 'border-[#F7EFE5]',
      cardBg: 'bg-[#26201B]/90 backdrop-blur-md',
      qrFg: '#000000',
      accentColor: 'text-[#EFE2CE]',
      envelopeFlap: 'bg-[#26201B]',
      isDark: true,
    },
    // 4. Poised Romance (Xanh Đêm Hoàng Gia & Hoa Dạ Thảo)
    poised: {
      bg: 'bg-gradient-to-br from-[#0B1A2A] via-[#10273E] to-[#08121D]',
      outerBorder: 'border-[#93C5FD]',
      innerBorder: 'border-[#60A5FA]/40',
      cornerColor: '#93C5FD',
      floralVariant: 'wildflower' as const,
      waxVariant: 'navy' as const,
      waxInitials: '囍',
      titleColor: 'text-[#E0F2FE]',
      bodyColor: 'text-white',
      subColor: 'text-[#BAE6FD]/80',
      badgeBg: 'bg-gradient-to-r from-[#38BDF8] to-[#0284C7]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#E0F2FE]',
      cardBg: 'bg-[#0E2235]/90 backdrop-blur-md',
      qrFg: '#000000',
      accentColor: 'text-[#7DD3FC]',
      envelopeFlap: 'bg-[#0E2235]',
      isDark: true,
    },
    // 5. Emerald Garden (Xanh Ngọc Lục Bảo & Lá Khuynh Diệp)
    emerald: {
      bg: 'bg-gradient-to-br from-[#042F2E] via-[#064E3B] to-[#022C22]',
      outerBorder: 'border-[#6EE7B7]',
      innerBorder: 'border-[#34D399]/40',
      cornerColor: '#A7F3D0',
      floralVariant: 'emerald' as const,
      waxVariant: 'emerald' as const,
      waxInitials: '囍',
      titleColor: 'text-[#D1FAE5]',
      bodyColor: 'text-[#ECFDF5]',
      subColor: 'text-[#A7F3D0]/80',
      badgeBg: 'bg-gradient-to-r from-[#10B981] to-[#059669]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#D1FAE5]',
      cardBg: 'bg-[#064E3B]/90 backdrop-blur-md',
      qrFg: '#022C22',
      accentColor: 'text-[#6EE7B7]',
      envelopeFlap: 'bg-[#064E3B]',
      isDark: true,
    },
    // 6. Lavender Dream (Tím Lavender & Hoa Tử Đằng)
    lavender: {
      bg: 'bg-gradient-to-br from-[#2E1065] via-[#4C1D95] to-[#1E1B4B]',
      outerBorder: 'border-[#C084FC]',
      innerBorder: 'border-[#A855F7]/40',
      cornerColor: '#E9D5FF',
      floralVariant: 'lavender' as const,
      waxVariant: 'purple' as const,
      waxInitials: '囍',
      titleColor: 'text-[#F3E8FF]',
      bodyColor: 'text-[#FAF5FF]',
      subColor: 'text-[#E9D5FF]/80',
      badgeBg: 'bg-gradient-to-r from-[#A855F7] to-[#7E22CE]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#F3E8FF]',
      cardBg: 'bg-[#4C1D95]/90 backdrop-blur-md',
      qrFg: '#2E1065',
      accentColor: 'text-[#D8B4FE]',
      envelopeFlap: 'bg-[#4C1D95]',
      isDark: true,
    },
    // 7. Chinoiserie Heritage (Xanh Men Lam Cung Đình & Gốm Sứ)
    chinoiserie: {
      bg: 'bg-gradient-to-br from-[#EFF6FF] via-[#DBEAFE] to-[#BFDBFE]',
      outerBorder: 'border-[#2563EB]',
      innerBorder: 'border-[#1D4ED8]/40',
      cornerColor: '#1D4ED8',
      floralVariant: 'chinoiserie' as const,
      waxVariant: 'navy' as const,
      waxInitials: '囍',
      titleColor: 'text-[#1E3A8A]',
      bodyColor: 'text-[#1E40AF]',
      subColor: 'text-[#3B82F6]/90',
      badgeBg: 'bg-gradient-to-r from-[#2563EB] to-[#1D4ED8]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#DBEAFE]',
      cardBg: 'bg-white/90 backdrop-blur-sm',
      qrFg: '#1E3A8A',
      accentColor: 'text-[#2563EB]',
      envelopeFlap: 'bg-[#DBEAFE]',
      isDark: false,
    },
    // 8. Sunset Terracotta (Cam Đất Hoàng Hôn & Boho)
    terracotta: {
      bg: 'bg-gradient-to-br from-[#451A03] via-[#7C2D12] to-[#361304]',
      outerBorder: 'border-[#FDBA74]',
      innerBorder: 'border-[#FB923C]/50',
      cornerColor: '#FDBA74',
      floralVariant: 'terracotta' as const,
      waxVariant: 'terracotta' as const,
      waxInitials: '囍',
      titleColor: 'text-[#FFEDD5]',
      bodyColor: 'text-[#FFF7ED]',
      subColor: 'text-[#FED7AA]/80',
      badgeBg: 'bg-gradient-to-r from-[#EA580C] to-[#C2410C]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#FFEDD5]',
      cardBg: 'bg-[#7C2D12]/90 backdrop-blur-md',
      qrFg: '#361304',
      accentColor: 'text-[#FDBA74]',
      envelopeFlap: 'bg-[#7C2D12]',
      isDark: true,
    },
    // 9. Modern Minimalist (Trắng Tinh Khôi & Xám Bạc Hàn Quốc)
    minimalist: {
      bg: 'bg-gradient-to-br from-[#FFFFFF] via-[#F8FAFC] to-[#F1F5F9]',
      outerBorder: 'border-[#CBD5E1]',
      innerBorder: 'border-[#94A3B8]/40',
      cornerColor: '#94A3B8',
      floralVariant: 'vintage' as const,
      waxVariant: 'pearl' as const,
      waxInitials: '囍',
      titleColor: 'text-[#0F172A]',
      bodyColor: 'text-[#334155]',
      subColor: 'text-[#64748B]',
      badgeBg: 'bg-gradient-to-r from-[#475569] to-[#1E293B]',
      badgeText: 'text-white',
      badgeBorder: 'border-[#E2E8F0]',
      cardBg: 'bg-white/95 backdrop-blur-sm',
      qrFg: '#0F172A',
      accentColor: 'text-[#475569]',
      envelopeFlap: 'bg-[#F1F5F9]',
      isDark: false,
    },
    // 10. Royal Ivory Gold (Kem Ngọc Trai & Viền Vàng Dập Nổi)
    gold: {
      bg: 'bg-gradient-to-br from-[#FAF8F5] via-[#FFFDF9] to-[#F5EFEB]',
      outerBorder: 'border-[#D4AF37]',
      innerBorder: 'border-[#D4AF37]/50',
      cornerColor: '#D4AF37',
      floralVariant: 'peach' as const,
      waxVariant: 'gold' as const,
      waxInitials: '囍',
      titleColor: 'text-[#854D0E]',
      bodyColor: 'text-[#292524]',
      subColor: 'text-[#78716C]',
      badgeBg: 'bg-gradient-to-r from-[#D4AF37] to-[#B8860B]',
      badgeText: 'text-[#292524]',
      badgeBorder: 'border-[#FEF3C7]',
      cardBg: 'bg-white/85 backdrop-blur-sm',
      qrFg: '#1C1917',
      accentColor: 'text-[#B8860B]',
      envelopeFlap: 'bg-[#F5EFEB]',
      isDark: false,
    },
  }[normalizedTheme];

  // =========================================================================
  // VIEW 1: ENVELOPE (Bao thư thiệp cưới có tên khách, cơ quan, con dấu sáp 3D)
  // =========================================================================
  if (cardType === 'envelope') {
    return (
      <div
        className={`relative mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 print:shadow-none print:rounded-none select-none flex flex-col justify-between ${themeConfig.bg} ${
          isPrintVersion
            ? 'w-[160mm] h-[115mm] p-[6mm] print:m-0 print:p-[5mm]'
            : 'w-[440px] sm:w-[480px] h-[310px] sm:h-[340px] p-6 border-4 ' + themeConfig.outerBorder
        }`}
        style={{ boxSizing: 'border-box' }}
      >
        {/* Ornate Gold Filigree Corners */}
        <BaroqueCorner position="top-left" color={themeConfig.cornerColor} className="absolute top-2 left-2 w-12 h-12" />
        <BaroqueCorner position="top-right" color={themeConfig.cornerColor} className="absolute top-2 right-2 w-12 h-12" />
        <BaroqueCorner position="bottom-left" color={themeConfig.cornerColor} className="absolute bottom-2 left-2 w-12 h-12" />
        <BaroqueCorner position="bottom-right" color={themeConfig.cornerColor} className="absolute bottom-2 right-2 w-12 h-12" />

        {/* Dual Hairline Inner Gold Border */}
        <div
          className={`absolute inset-3 border border-double border-2 rounded-2xl pointer-events-none ${themeConfig.innerBorder}`}
        />

        {/* Watercolor Floral Sprays on Corners */}
        <FloralSpray
          variant={themeConfig.floralVariant}
          position="bottom-left"
          className="absolute -bottom-4 -left-4 w-28 h-28 opacity-80 pointer-events-none"
        />
        <FloralSpray
          variant={themeConfig.floralVariant}
          position="top-right"
          className="absolute -top-4 -right-4 w-24 h-24 opacity-75 pointer-events-none"
        />

        {/* Top Header: Couple Monogram Crest & Postage Stamp */}
        <div className="flex items-center justify-between relative z-10 pt-1 px-3">
          {/* Monogram Crest */}
          <div className="flex items-center gap-2.5">
            <div
              className={`w-9 h-9 rounded-full border-2 flex items-center justify-center font-serif font-black text-xs shadow-md ${themeConfig.outerBorder} ${themeConfig.titleColor} bg-white/20 backdrop-blur-xs`}
            >
              {groomName.charAt(0)}&amp;{brideName.charAt(0)}
            </div>
            <div>
              <span className={`font-serif font-bold text-sm tracking-wide block ${themeConfig.bodyColor}`}>
                {groomName} &amp; {brideName}
              </span>
              <span className={`text-[10px] block font-serif italic ${themeConfig.subColor}`}>
                Lễ Thành Hôn • {weddingDate}
              </span>
            </div>
          </div>

          {/* Vintage Postage Stamp / Seal Badge */}
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest border shadow-xs ${themeConfig.outerBorder} ${themeConfig.titleColor} bg-white/10 backdrop-blur-xs flex items-center gap-1`}
            >
              <Sparkles className="w-2.5 h-2.5" />
              <span>Hỷ Sự</span>
            </div>
          </div>
        </div>

        {/* Envelope Center: Personalized Guest Recipient */}
        <div className="my-auto py-2 px-6 relative z-10 text-center">
          <div className="inline-flex items-center gap-2 mb-1.5 opacity-90">
            <div className={`h-[1px] w-6 bg-current ${themeConfig.accentColor}`} />
            <span
              className={`text-[10px] sm:text-xs uppercase font-cinzel font-semibold tracking-[0.25em] ${themeConfig.subColor}`}
            >
              Kính gửi
            </span>
            <div className={`h-[1px] w-6 bg-current ${themeConfig.accentColor}`} />
          </div>

          {/* Guest Name in Flowing Romantic Script or Luxury Serif */}
          <h3
            className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-wide leading-tight drop-shadow-xs ${themeConfig.titleColor}`}
          >
            {guest ? `${guest.salutation} ${guest.name}` : 'Quý Khách & Gia Đình'}
          </h3>

          {/* Plus One Companion */}
          {guest?.plusOne && (
            <p className={`text-xs sm:text-sm font-serif italic mt-1 ${themeConfig.bodyColor}`}>
              {guest.plusOne}
            </p>
          )}

          {/* Company / Workplace & City Tag Pill */}
          {(guest?.company || guest?.address) && (
            <div className="mt-2.5 inline-flex items-center gap-2 text-[10px] sm:text-[11px] px-3.5 py-1 rounded-full bg-white/30 backdrop-blur-md border border-white/40 shadow-xs">
              {guest.company && (
                <span className={`flex items-center gap-1 font-semibold ${themeConfig.bodyColor}`}>
                  <Building className="w-3 h-3 text-[#E6C687]" />
                  <span>{guest.company}</span>
                </span>
              )}
              {guest.company && guest.address && (
                <span className={`opacity-60 ${themeConfig.bodyColor}`}>•</span>
              )}
              {guest.address && (
                <span className={`flex items-center gap-1 opacity-90 ${themeConfig.bodyColor}`}>
                  <MapPin className="w-3 h-3 text-rose-400" />
                  <span>{guest.address}</span>
                </span>
              )}
            </div>
          )}
        </div>

        {/* Envelope Bottom Details & Table Number */}
        <div
          className={`flex items-center justify-between text-[10px] relative z-10 pb-1 border-t border-dashed px-3 pt-2 ${themeConfig.innerBorder}`}
        >
          <span className={`italic font-serif ${themeConfig.subColor} truncate max-w-[260px]`}>
            {venueName} {hallName ? `• ${hallName}` : ''}
          </span>

          {effectiveTable && (
            <span
              className={`font-bold px-3 py-0.5 rounded-full shadow-sm border text-[10px] tracking-wider uppercase font-serif ${themeConfig.badgeBg} ${themeConfig.badgeText} ${themeConfig.badgeBorder}`}
            >
              {effectiveTable}
            </span>
          )}
        </div>
      </div>
    );
  }

  // =========================================================================
  // VIEW 2 & 3: TABLE STAND (Bảng QR Để Bàn A6) & INVITATION (Thiệp Mời A6/A5)
  // =========================================================================
  return (
    <div
      className={`relative mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 print:shadow-none print:rounded-none select-none flex flex-col justify-between ${themeConfig.bg} ${
        isPrintVersion
          ? 'w-[105mm] h-[148mm] p-[6mm] print:m-0 print:p-[5mm]'
          : 'w-[360px] sm:w-[390px] h-[520px] sm:h-[560px] p-5 border-4 sm:border-6 ' + themeConfig.outerBorder
      }`}
      style={{ boxSizing: 'border-box' }}
    >
      {/* Ornate Gold Filigree Corners */}
      <BaroqueCorner position="top-left" color={themeConfig.cornerColor} className="absolute top-2 left-2 w-12 h-12" />
      <BaroqueCorner position="top-right" color={themeConfig.cornerColor} className="absolute top-2 right-2 w-12 h-12" />
      <BaroqueCorner position="bottom-left" color={themeConfig.cornerColor} className="absolute bottom-2 left-2 w-12 h-12" />
      <BaroqueCorner position="bottom-right" color={themeConfig.cornerColor} className="absolute bottom-2 right-2 w-12 h-12" />

      {/* Dual Hairline Gold Frame */}
      <div
        className={`absolute inset-3 border border-double border-2 rounded-2xl pointer-events-none ${themeConfig.innerBorder}`}
      />

      {/* Watercolor Floral Sprays */}
      <FloralSpray
        variant={themeConfig.floralVariant}
        position="top-right"
        className="absolute -top-3 -right-3 w-28 h-28 opacity-80 pointer-events-none"
      />
      <FloralSpray
        variant={themeConfig.floralVariant}
        position="bottom-left"
        className="absolute -bottom-3 -left-3 w-32 h-32 opacity-85 pointer-events-none"
      />

      {/* Top Section: Monogram, Ceremony Heading & Couple Names */}
      <div className="text-center pt-2 sm:pt-3 relative z-10 px-3">
        
        {/* Double Happiness Emblem for Golden / Starlit */}
        {normalizedTheme === 'golden' ? (
          <div className="flex justify-center mb-1">
            <DoubleHappinessMedallion size={46} variant="red" />
          </div>
        ) : normalizedTheme === 'starlit' ? (
          <div className="flex justify-center mb-1">
            <DoubleHappinessMedallion size={44} variant="gold" />
          </div>
        ) : null}

        {/* Small Top Badge */}
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className={`w-3 h-3 ${themeConfig.accentColor}`} />
          <span
            className={`text-[9px] sm:text-[10px] font-cinzel font-bold uppercase tracking-[0.25em] ${themeConfig.titleColor}`}
          >
            {cardType === 'table_stand' ? 'BẢNG CHIA SẺ KHOẢNH KHẮC' : 'THIỆP MỜI TRỌNG THỂ'}
          </span>
          <Sparkles className={`w-3 h-3 ${themeConfig.accentColor}`} />
        </div>

        {/* Couple Names in Flowing Romantic Script or Regal Serif */}
        <h2 className="leading-tight my-1">
          <span className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-tight ${themeConfig.titleColor}`}>
            {groomName}
          </span>
          <CalligraphyAmpersand color={themeConfig.cornerColor} className="text-xl sm:text-2xl" />
          <span className={`font-serif text-2xl sm:text-3xl font-extrabold tracking-tight ${themeConfig.titleColor}`}>
            {brideName}
          </span>
        </h2>

        {/* Date & Ceremony details */}
        <p className={`text-[10px] sm:text-[11px] font-serif italic ${themeConfig.subColor}`}>
          Ngày {weddingDate} • {weddingTime}
        </p>

        {/* Prominent Table Number Badge for Table Stand */}
        {cardType === 'table_stand' && showTableNumber && effectiveTable && (
          <div className="mt-2 inline-block">
            <span
              className={`px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif shadow-md border ${themeConfig.badgeBg} ${themeConfig.badgeText} ${themeConfig.badgeBorder}`}
            >
              {effectiveTable}
            </span>
          </div>
        )}
      </div>

      {/* Central Content Section */}
      <div className="my-auto py-1 flex flex-col items-center justify-center relative z-10 px-4">
        {cardType === 'table_stand' ? (
          /* ================================================================= */
          /* TABLE STAND VIEW: High Contrast QR Code for Easy Guest Scanning   */
          /* ================================================================= */
          <div className="w-full flex flex-col items-center">
            {showQRUpload && (
              <div className="bg-white p-3.5 rounded-2xl shadow-xl border-2 border-[#D4AF37]/50 flex flex-col items-center max-w-[200px]">
                <div className="p-1 rounded-xl bg-white flex items-center justify-center">
                  <QRCodeSVG
                    value={uploadUrl || 'https://wedding-live-theta.vercel.app/upload'}
                    size={140}
                    level="H"
                    fgColor={themeConfig.qrFg}
                    includeMargin={false}
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-bold text-stone-700">
                  <Camera className="w-3.5 h-3.5 text-[#B8860B]" />
                  <span>Mở Camera quét mã gửi ảnh</span>
                </div>
              </div>
            )}

            {/* Instruction Callout */}
            <div className="mt-2.5 text-center max-w-[270px]">
              <p className={`font-serif font-bold text-xs sm:text-sm leading-snug ${themeConfig.titleColor}`}>
                Chiếu Ảnh Trực Tiếp Lên Màn LED
              </p>
              <p className={`text-[10px] mt-0.5 leading-relaxed ${themeConfig.subColor}`}>
                {customNote || 'Chụp ảnh selfie hoặc cùng bàn tiệc để gửi gắm lời chúc hạnh phúc đến cô dâu & chú rể!'}
              </p>
            </div>
          </div>
        ) : (
          /* ================================================================= */
          /* FORMAL INVITATION CARD VIEW with Personalized Guest Recipient     */
          /* ================================================================= */
          <div className="w-full text-center space-y-2">
            <div
              className={`p-3.5 rounded-2xl border ${themeConfig.innerBorder} ${themeConfig.cardBg} shadow-sm`}
            >
              <span
                className={`text-[9px] uppercase font-cinzel font-bold tracking-[0.25em] block mb-1 ${themeConfig.titleColor}`}
              >
                Trân Trọng Kính Mời
              </span>

              {/* Personalized Guest Name */}
              <div className="my-1.5 pb-1 border-b border-dashed border-current opacity-90">
                <h4
                  className={`font-serif text-xl sm:text-2xl font-extrabold tracking-wide ${themeConfig.titleColor}`}
                >
                  {guest ? `${guest.salutation} ${guest.name}` : 'Quý Khách & Gia Đình'}
                </h4>
                {guest?.plusOne && (
                  <p className={`text-[11px] font-serif italic mt-0.5 ${themeConfig.bodyColor}`}>
                    {guest.plusOne}
                  </p>
                )}
                {guest?.company && (
                  <p className={`text-[10px] font-medium opacity-85 mt-0.5 ${themeConfig.subColor}`}>
                    {guest.company} {guest.address ? `• ${guest.address}` : ''}
                  </p>
                )}
              </div>

              {/* Architectural Date Badge */}
              <div className="my-2">
                <ArchitecturalDateBadge
                  dateStr={weddingDate}
                  textColor={themeConfig.titleColor}
                  subTextColor={themeConfig.subColor}
                  borderColor={themeConfig.innerBorder}
                />
              </div>

              <p className={`text-[11px] font-serif italic ${themeConfig.bodyColor}`}>
                Đến chung vui cùng gia đình chúng tôi tại:
              </p>
              <h3 className={`font-serif font-bold text-sm sm:text-base mt-0.5 ${themeConfig.titleColor}`}>
                {venueName}
              </h3>
              <p className={`text-[11px] font-semibold ${themeConfig.bodyColor}`}>
                {hallName}
              </p>
              <p className={`text-[10px] mt-0.5 ${themeConfig.subColor} max-w-[280px] mx-auto`}>
                {venueAddress}
              </p>

              {effectiveTable && (
                <div className="mt-2">
                  <span
                    className={`inline-block px-3 py-0.5 rounded-full text-[10px] font-bold uppercase font-serif tracking-wider ${themeConfig.badgeBg} ${themeConfig.badgeText} ${themeConfig.badgeBorder}`}
                  >
                    Bàn Tiệc: {effectiveTable}
                  </span>
                </div>
              )}
            </div>

            {/* Mini QR for guest upload & RSVP */}
            {showQRUpload && (
              <div className="flex items-center justify-center gap-2.5 pt-1">
                <div className="bg-white p-1 rounded-xl border border-stone-200 shadow-sm flex-shrink-0">
                  <QRCodeSVG
                    value={uploadUrl || 'https://wedding-live-theta.vercel.app/upload'}
                    size={52}
                    level="M"
                    fgColor={themeConfig.qrFg}
                  />
                </div>
                <div className="text-left text-[9px] leading-tight max-w-[200px]">
                  <span className={`font-bold block ${themeConfig.titleColor}`}>
                    Mã QR Tiệc Cưới
                  </span>
                  <span className={`block ${themeConfig.subColor} mt-0.5`}>
                    Quét để gửi ảnh lên màn LED & gửi lời chúc
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Optional VietQR Gift Corner / Strip */}
        {showVietQR && cardType === 'table_stand' && (
          <div
            className={`mt-2 pt-1.5 border-t border-dashed w-full max-w-[270px] flex items-center justify-center gap-2 ${themeConfig.innerBorder}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vietQrUrl}
              alt="VietQR Mừng Cưới"
              className="w-8 h-8 object-contain bg-white rounded p-0.5 border border-stone-200 shadow-xs"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="text-left text-[9px] leading-tight">
              <span className={`font-bold flex items-center gap-1 ${themeConfig.titleColor}`}>
                <Gift className="w-2.5 h-2.5 text-rose-500" />
                Mừng Cưới Online (VietQR)
              </span>
              <span className={`block font-mono font-semibold ${themeConfig.subColor}`}>
                {bankInfo.bankId} • {bankInfo.accountNo}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding Note */}
      <div className="text-center pb-1 relative z-10">
        <p className={`text-[9px] italic flex items-center justify-center gap-1 ${themeConfig.subColor}`}>
          <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
          <span>Sự hiện diện của quý khách là niềm vinh hạnh cho chúng tôi!</span>
        </p>
        <span className="text-[8px] opacity-60 block tracking-widest uppercase mt-0.5 font-cinzel">
          WeddingLive • Luxury Wedding Tech
        </span>
      </div>
    </div>
  );
}
