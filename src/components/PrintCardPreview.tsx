'use client';

import React from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Heart, Sparkles, Gift, Camera } from 'lucide-react';
import { DEFAULT_BANK_INFO } from '@/lib/mock-data';

export type CardTheme = 'gold' | 'red' | 'rose' | 'greenery';
export type CardType = 'table_stand' | 'invitation';

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
    theme,
  } = data;

  const bankInfo = DEFAULT_BANK_INFO;
  const vietQrUrl = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNo}-compact.png?amount=500000&addInfo=MungCuoi&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  // Theme styling definitions
  const themeStyles = {
    gold: {
      bg: 'bg-[#FAF8F5]',
      border: 'border-[#D4AF37]',
      innerBorder: 'border-[#E8DFC8]',
      titleColor: 'text-[#B8860B]',
      bodyColor: 'text-stone-800',
      subColor: 'text-stone-500',
      badgeBg: 'bg-[#D4AF37]',
      badgeText: 'text-stone-950',
      qrFg: '#1C1917',
      goldAccent: 'text-[#D4AF37]',
    },
    red: {
      bg: 'bg-[#8F1414]',
      border: 'border-[#FCD34D]',
      innerBorder: 'border-[#F59E0B]/60',
      titleColor: 'text-[#FCD34D]',
      bodyColor: 'text-amber-50',
      subColor: 'text-amber-200/80',
      badgeBg: 'bg-[#FCD34D]',
      badgeText: 'text-[#7F1D1D]',
      qrFg: '#000000',
      goldAccent: 'text-[#FCD34D]',
    },
    rose: {
      bg: 'bg-[#FFF5F7]',
      border: 'border-[#FDA4AF]',
      innerBorder: 'border-[#FECDD3]',
      titleColor: 'text-[#BE185D]',
      bodyColor: 'text-stone-800',
      subColor: 'text-stone-500',
      badgeBg: 'bg-[#BE185D]',
      badgeText: 'text-white',
      qrFg: '#881337',
      goldAccent: 'text-[#F43F5E]',
    },
    greenery: {
      bg: 'bg-[#FAFCFA]',
      border: 'border-[#86EFAC]',
      innerBorder: 'border-[#BBF7D0]',
      titleColor: 'text-[#166534]',
      bodyColor: 'text-stone-800',
      subColor: 'text-stone-500',
      badgeBg: 'bg-[#166534]',
      badgeText: 'text-white',
      qrFg: '#14532D',
      goldAccent: 'text-[#16A34A]',
    },
  }[theme];

  return (
    <div
      className={`relative mx-auto rounded-3xl overflow-hidden shadow-2xl transition-all duration-300 print:shadow-none print:rounded-none select-none flex flex-col justify-between ${themeStyles.bg} ${
        isPrintVersion
          ? 'w-[105mm] h-[148mm] p-[6mm] print:m-0 print:p-[5mm]'
          : 'w-[360px] sm:w-[390px] h-[510px] sm:h-[552px] p-5 border-4 sm:border-8 ' + themeStyles.border
      }`}
      style={{
        boxSizing: 'border-box',
      }}
    >
      {/* Decorative Outer Border */}
      <div
        className={`absolute inset-2 sm:inset-3 border-2 border-dashed rounded-2xl pointer-events-none ${themeStyles.innerBorder}`}
      />

      {/* Traditional Double Happiness Emblem for Red Theme */}
      {theme === 'red' && (
        <div className="absolute top-4 left-4 w-9 h-9 rounded-full bg-[#B91C1C] border border-[#FCD34D] flex items-center justify-center text-[#FCD34D] font-serif font-bold text-lg shadow-sm">
          囍
        </div>
      )}

      {/* Decorative Top Flourish */}
      <div className="text-center pt-2 sm:pt-3 relative z-10">
        <div className="flex items-center justify-center gap-1.5 mb-1">
          <Sparkles className={`w-3.5 h-3.5 ${themeStyles.goldAccent}`} />
          <span className={`text-[10px] sm:text-xs font-bold uppercase tracking-widest ${themeStyles.titleColor}`}>
            {cardType === 'table_stand' ? 'BẢNG CHIA SẺ KHOẢNH KHẮC' : 'THIỆP MỜI TRỌNG THỂ'}
          </span>
          <Sparkles className={`w-3.5 h-3.5 ${themeStyles.goldAccent}`} />
        </div>

        {/* Couple Names */}
        <h2 className={`font-serif text-2xl sm:text-3xl font-bold tracking-tight leading-tight ${themeStyles.bodyColor}`}>
          {groomName} & {brideName}
        </h2>

        {/* Date & Ceremony details */}
        <p className={`text-[11px] sm:text-xs font-serif italic mt-0.5 ${themeStyles.subColor}`}>
          Ngày {weddingDate} • {weddingTime}
        </p>

        {/* Table Number Badge for Table Stand */}
        {cardType === 'table_stand' && showTableNumber && tableNumber && (
          <div className="mt-2 inline-block">
            <span
              className={`px-4 py-1 rounded-full text-xs sm:text-sm font-extrabold uppercase tracking-wider font-serif shadow-sm ${themeStyles.badgeBg} ${themeStyles.badgeText}`}
            >
              {tableNumber}
            </span>
          </div>
        )}
      </div>

      {/* Central Content Section */}
      <div className="my-auto py-2 flex flex-col items-center justify-center relative z-10">
        {cardType === 'table_stand' ? (
          /* Table Stand Card View: Prominent QR code */
          <div className="w-full flex flex-col items-center">
            {showQRUpload && (
              <div className="bg-white p-3 rounded-2xl shadow-md border border-stone-200/80 flex flex-col items-center">
                <div className="p-1 rounded-xl bg-white flex items-center justify-center">
                  <QRCodeSVG
                    value={uploadUrl || 'https://wedding-live-theta.vercel.app/upload'}
                    size={150}
                    level="H"
                    fgColor={themeStyles.qrFg}
                    includeMargin={false}
                  />
                </div>
                <div className="mt-1.5 flex items-center gap-1 text-[10px] font-semibold text-stone-600">
                  <Camera className="w-3 h-3 text-[#B8860B]" />
                  <span>Mở Camera quét mã để gửi ảnh</span>
                </div>
              </div>
            )}

            {/* Instruction Callout */}
            <div className="mt-2.5 text-center max-w-[280px]">
              <p className={`font-serif font-bold text-xs sm:text-sm leading-snug ${themeStyles.titleColor}`}>
                Chiếu Ảnh Trực Tiếp Lên Màn LED
              </p>
              <p className={`text-[10px] sm:text-[11px] mt-0.5 leading-relaxed ${themeStyles.subColor}`}>
                {customNote || 'Chụp ảnh selfie hoặc cùng bàn tiệc để gửi gắm lời chúc hạnh phúc đến cô dâu & chú rể!'}
              </p>
            </div>
          </div>
        ) : (
          /* Formal Invitation Card View */
          <div className="w-full px-4 text-center space-y-2">
            <div className={`p-3 rounded-2xl border ${themeStyles.innerBorder} bg-white/60 backdrop-blur-xs`}>
              <span className={`text-[10px] uppercase font-bold tracking-widest block mb-1 ${themeStyles.titleColor}`}>
                Trân Trọng Kính Mời
              </span>
              <p className={`text-xs sm:text-sm font-serif italic ${themeStyles.bodyColor}`}>
                Đến chung vui cùng gia đình chúng tôi tại:
              </p>
              <h3 className={`font-serif font-bold text-base sm:text-lg mt-1 ${themeStyles.titleColor}`}>
                {venueName}
              </h3>
              <p className={`text-xs font-semibold ${themeStyles.bodyColor}`}>
                {hallName}
              </p>
              <p className={`text-[10px] sm:text-[11px] mt-0.5 ${themeStyles.subColor}`}>
                {venueAddress}
              </p>
            </div>

            {/* Mini QR for guest RSVP & photo gallery */}
            {showQRUpload && (
              <div className="flex items-center justify-center gap-3 pt-1">
                <div className="bg-white p-1.5 rounded-xl border border-stone-200 shadow-xs flex-shrink-0">
                  <QRCodeSVG
                    value={uploadUrl || 'https://wedding-live-theta.vercel.app/upload'}
                    size={64}
                    level="M"
                    fgColor={themeStyles.qrFg}
                  />
                </div>
                <div className="text-left text-[10px] sm:text-[11px] leading-tight">
                  <span className={`font-bold block ${themeStyles.titleColor}`}>
                    Mã QR Tiệc Cưới
                  </span>
                  <span className={`block ${themeStyles.subColor} mt-0.5`}>
                    Quét để xem hình cưới & gửi ảnh chúc mừng
                  </span>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Optional VietQR Gift Corner / Strip */}
        {showVietQR && cardType === 'table_stand' && (
          <div className="mt-2.5 pt-2 border-t border-dashed w-full max-w-[280px] border-stone-300/80 flex items-center justify-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={vietQrUrl}
              alt="VietQR Mừng Cưới"
              className="w-9 h-9 object-contain bg-white rounded p-0.5 border border-stone-200"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = 'none';
              }}
            />
            <div className="text-left text-[9px] leading-tight">
              <span className={`font-bold flex items-center gap-1 ${themeStyles.titleColor}`}>
                <Gift className="w-2.5 h-2.5 text-rose-500" />
                Mừng Cưới Online (VietQR)
              </span>
              <span className={`block font-mono font-semibold ${themeStyles.subColor}`}>
                {bankInfo.bankId} • {bankInfo.accountNo}
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Footer Branding Note */}
      <div className="text-center pb-1 relative z-10">
        <p className={`text-[9px] sm:text-[10px] italic flex items-center justify-center gap-1 ${themeStyles.subColor}`}>
          <Heart className="w-2.5 h-2.5 text-rose-500 fill-rose-500" />
          <span>Sự hiện diện của quý khách là niềm vinh hạnh cho chúng tôi!</span>
        </p>
        <span className="text-[8px] text-stone-400 block tracking-wider uppercase mt-0.5">
          WeddingLive • Eventoly Style
        </span>
      </div>
    </div>
  );
}
