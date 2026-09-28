'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  Printer,
  Sparkles,
  QrCode,
  Layout,
  Palette,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Gift,
  ExternalLink,
  Copy,
  Info,
} from 'lucide-react';
import { PrintCardPreview, CardData, CardTheme, CardType } from '@/components/PrintCardPreview';

export default function PrintPage() {
  const [originUrl, setOriginUrl] = useState('');

  // Default card settings
  const [cardType, setCardType] = useState<CardType>('table_stand');
  const [theme, setTheme] = useState<CardTheme>('gold');
  const [groomName, setGroomName] = useState('Tuấn Kiệt');
  const [brideName, setBrideName] = useState('Minh Anh');
  const [weddingDate, setWeddingDate] = useState('26.10.2026');
  const [weddingTime, setWeddingTime] = useState('18:00 (Khai tiệc 18:30)');
  const [venueName, setVenueName] = useState('Trung Tâm Hội Nghị GEM Center');
  const [hallName, setHallName] = useState('Sảnh Grand Ballroom - Lầu 3');
  const [venueAddress, setVenueAddress] = useState('08 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, TP. HCM');
  const [tableNumber, setTableNumber] = useState('BÀN SỐ 08');
  const [customNote, setCustomNote] = useState('Quét mã để chụp ảnh selfie & chúc phúc trực tiếp lên màn hình LED sân khấu!');
  
  // Toggles
  const [showQRUpload, setShowQRUpload] = useState(true);
  const [showVietQR, setShowVietQR] = useState(true);
  const [showTableNumber, setShowTableNumber] = useState(true);

  // Batch Printing mode
  const [isBatchMode, setIsBatchMode] = useState(false);
  const [batchStart, setBatchStart] = useState(1);
  const [batchEnd, setBatchEnd] = useState(15);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setOriginUrl(`${origin}/upload`);
    }
  }, []);

  const cardData: CardData = {
    groomName,
    brideName,
    weddingDate,
    weddingTime,
    venueName,
    venueAddress,
    hallName,
    tableNumber,
    uploadUrl: originUrl || 'https://wedding-live-theta.vercel.app/upload',
    showQRUpload,
    showVietQR,
    showTableNumber,
    customNote,
    cardType,
    theme,
  };

  const themesList: { id: CardTheme; name: string; bg: string; border: string; desc: string }[] = [
    {
      id: 'gold',
      name: 'Vàng Hoàng Gia',
      bg: 'bg-[#FAF8F5]',
      border: 'border-[#D4AF37]',
      desc: 'Tone kem champagne sang trọng, quý phái',
    },
    {
      id: 'red',
      name: 'Đỏ Hỷ Truyền Thống',
      bg: 'bg-[#991B1B]',
      border: 'border-[#FCD34D]',
      desc: 'Màu đỏ may mắn với họa tiết chữ Song Hỷ 囍 mạ vàng',
    },
    {
      id: 'rose',
      name: 'Hồng Pastel Lãng Mạn',
      bg: 'bg-[#FFF5F7]',
      border: 'border-[#FDA4AF]',
      desc: 'Hoa hồng dịu ngọt, phong cách đám cưới hiện đại',
    },
    {
      id: 'greenery',
      name: 'Xanh Botanical Tối Giản',
      bg: 'bg-[#FAFCFA]',
      border: 'border-[#86EFAC]',
      desc: 'Lá khuynh diệp và cành ô-liu tươi mát, tinh khôi',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  // Generate batch tables array if in batch mode
  const batchTables = isBatchMode
    ? Array.from(
        { length: Math.max(1, batchEnd - batchStart + 1) },
        (_, i) => `BÀN SỐ ${String(batchStart + i).padStart(2, '0')}`
      )
    : [];

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-20">
      
      {/* Top Header Controls (Hidden on Print) */}
      <div className="no-print bg-white border-b border-[#E8DFC8] px-4 sm:px-8 py-5 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
              title="Quay lại Admin"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8860B] uppercase tracking-wider mb-0.5">
                <Printer className="w-3.5 h-3.5" />
                <span>Công Cụ Thiết Kế In Ấn Chuẩn A6 / A5</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Tạo Thiệp Cưới & Bảng QR Bàn Tiệc
              </h1>
            </div>
          </div>

          {/* Action Print Buttons */}
          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
            >
              <Printer className="w-4 h-4" />
              <span>
                {isBatchMode
                  ? `In Ngay ${batchTables.length} Bảng Bàn (A6)`
                  : 'In Bản Này Ngay (Print)'}
              </span>
            </button>

            <a
              href="https://shopee.vn/search?keyword=chân+đế+mica+a6+để+bàn+tiệc+cưới"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-50 transition-colors"
            >
              <span>Mua Chân Đế Mica A6</span>
              <ExternalLink className="w-3 h-3 text-orange-500" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Workspace (Hidden on Print) */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Control Panel (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DFC8] shadow-sm space-y-6">
          
          {/* 1. Mode Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Layout className="w-4 h-4 text-[#B8860B]" />
              <span>1. Chọn loại ấn phẩm</span>
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setCardType('table_stand')}
                className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border text-center transition-all ${
                  cardType === 'table_stand'
                    ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Bảng QR Để Bàn A6
                <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                  Đặt vào chân mica bàn tiệc
                </span>
              </button>

              <button
                type="button"
                onClick={() => setCardType('invitation')}
                className={`py-2.5 px-3 rounded-2xl text-xs font-semibold border text-center transition-all ${
                  cardType === 'invitation'
                    ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                    : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                }`}
              >
                Thiệp Mời Cưới Trọng Thể
                <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                  Mời khách & kèm mã QR
                </span>
              </button>
            </div>
          </div>

          {/* 2. Theme Selector */}
          <div>
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
              <Palette className="w-4 h-4 text-[#B8860B]" />
              <span>2. Chọn phong cách thiết kế</span>
            </label>
            <div className="grid grid-cols-2 gap-2.5">
              {themesList.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTheme(item.id)}
                  className={`p-3 rounded-2xl border text-left transition-all relative ${
                    theme === item.id
                      ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 bg-amber-50/30 shadow-xs'
                      : 'border-stone-200 hover:border-stone-300 bg-white'
                  }`}
                >
                  <div className="flex items-center gap-2 mb-1">
                    <span className={`w-3.5 h-3.5 rounded-full border ${item.bg} ${item.border}`} />
                    <span className="font-serif font-bold text-xs text-stone-900">{item.name}</span>
                  </div>
                  <p className="text-[10px] text-stone-500 line-clamp-2 leading-relaxed">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* 3. Couple Information Form */}
          <div className="space-y-3 pt-2 border-t border-stone-100">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block flex items-center gap-1.5">
              <Sparkles className="w-4 h-4 text-[#B8860B]" />
              <span>3. Thông tin dâu rể & ngày cưới</span>
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Chú rể:</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Cô dâu:</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Ngày tổ chức:</label>
                <input
                  type="text"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Giờ tiệc:</label>
                <input
                  type="text"
                  value={weddingTime}
                  onChange={(e) => setWeddingTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            {cardType === 'invitation' && (
              <>
                <div>
                  <label className="text-[11px] text-stone-500 block mb-1">Địa điểm / Nhà hàng:</label>
                  <input
                    type="text"
                    value={venueName}
                    onChange={(e) => setVenueName(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                  />
                </div>
                <div className="grid grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Tên sảnh:</label>
                    <input
                      type="text"
                      value={hallName}
                      onChange={(e) => setHallName(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] text-stone-500 block mb-1">Địa chỉ:</label>
                    <input
                      type="text"
                      value={venueAddress}
                      onChange={(e) => setVenueAddress(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                    />
                  </div>
                </div>
              </>
            )}
          </div>

          {/* 4. Table Numbering & Batch Options (for Table Stand mode) */}
          {cardType === 'table_stand' && (
            <div className="space-y-3 pt-2 border-t border-stone-100">
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block flex items-center justify-between">
                <span className="flex items-center gap-1.5">
                  <Layers className="w-4 h-4 text-[#B8860B]" />
                  <span>4. Thiết lập số bàn tiệc</span>
                </span>
                <label className="flex items-center gap-1.5 text-xs font-normal text-stone-600 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={isBatchMode}
                    onChange={(e) => setIsBatchMode(e.target.checked)}
                    className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                  />
                  <span>In hàng loạt nhiều bàn</span>
                </label>
              </label>

              {isBatchMode ? (
                <div className="p-3 rounded-2xl bg-amber-50/60 border border-amber-200 text-xs space-y-2">
                  <div className="flex items-center gap-2">
                    <span className="text-stone-700">In từ:</span>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={batchStart}
                      onChange={(e) => setBatchStart(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg border border-stone-300 text-center font-bold bg-white"
                    />
                    <span className="text-stone-700">đến:</span>
                    <input
                      type="number"
                      min={1}
                      max={99}
                      value={batchEnd}
                      onChange={(e) => setBatchEnd(Number(e.target.value))}
                      className="w-16 px-2 py-1 rounded-lg border border-stone-300 text-center font-bold bg-white"
                    />
                    <span className="text-[#B8860B] font-bold">
                      ({batchTables.length} bàn A6)
                    </span>
                  </div>
                  <p className="text-[11px] text-stone-500">
                    💡 Khi bấm &quot;In Ngay&quot;, máy in sẽ tự động in lần lượt từng bàn tiệc từ Bàn {batchStart} tới Bàn {batchEnd} trên từng trang A6 riêng biệt.
                  </p>
                </div>
              ) : (
                <div>
                  <input
                    type="text"
                    value={tableNumber}
                    onChange={(e) => setTableNumber(e.target.value)}
                    placeholder="VD: BÀN SỐ 08 hoặc BÀN KHÁCH VIP"
                    className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-bold focus:border-[#D4AF37] outline-none"
                  />
                </div>
              )}
            </div>
          )}

          {/* 5. Toggles & QR settings */}
          <div className="space-y-2 pt-2 border-t border-stone-100 text-xs text-stone-700">
            <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-1">
              5. Tùy chọn hiển thị
            </label>

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showQRUpload}
                onChange={(e) => setShowQRUpload(e.target.checked)}
                className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span>Hiển thị Mã QR gửi ảnh lên màn hình LED</span>
            </label>

            {cardType === 'table_stand' && (
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={showVietQR}
                  onChange={(e) => setShowVietQR(e.target.checked)}
                  className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>Kèm góc nhỏ mã VietQR mừng cưới</span>
              </label>
            )}

            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showTableNumber}
                onChange={(e) => setShowTableNumber(e.target.checked)}
                className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
              />
              <span>Hiển thị huy hiệu số bàn tiệc</span>
            </label>
          </div>

          {/* Direct Print Button */}
          <div className="pt-2">
            <button
              onClick={handlePrint}
              className="w-full py-3.5 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>
                {isBatchMode
                  ? `In Hàng Loạt ${batchTables.length} Trang Bàn Tiệc (A6)`
                  : 'Bấm Để In Ngay (Khổ A6 / A5)'}
              </span>
            </button>
            <p className="text-[11px] text-center text-stone-500 mt-2">
              Chế độ in tự động căn lề 0mm và xuất chất lượng sắc nét 300 DPI
            </p>
          </div>
        </div>

        {/* Right Live Preview Workspace (7 cols) */}
        <div className="lg:col-span-7 flex flex-col items-center sticky top-24">
          <div className="w-full flex items-center justify-between mb-3 px-2">
            <div className="flex items-center gap-2 text-xs font-semibold text-stone-600">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bản Xem Trước Thực Tế (Khổ A6 đứng: 105 x 148 mm)</span>
            </div>
            <span className="text-[11px] text-stone-500 bg-stone-100 px-2 py-0.5 rounded-full">
              Tỉ lệ 1:1 Chuẩn Chân Mica A6
            </span>
          </div>

          {/* Card Preview Container */}
          <div className="w-full flex items-center justify-center p-4 sm:p-6 bg-stone-200/50 rounded-3xl border border-dashed border-stone-300 overflow-hidden shadow-inner">
            <PrintCardPreview data={cardData} />
          </div>

          {/* Practical Printing Tips Box */}
          <div className="mt-5 w-full bg-amber-50/70 border border-[#E8DFC8] rounded-2xl p-4 text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Kinh nghiệm in bảng để bàn tiệc cưới đạt chuẩn đẹp nhất:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-stone-600">
              <li>
                <strong>Loại giấy:</strong> Sử dụng giấy ảnh bóng (Photo Glossy) hoặc giấy mỹ thuật định lượng <strong>200 - 250 gsm</strong> để màu sắc và mã QR in ra nét nhất.
              </li>
              <li>
                <strong>Cài đặt máy in:</strong> Khi hộp thoại In hiện lên, chọn Khổ giấy là <strong>A6</strong> (hoặc in 4 bản A6 trên 1 tờ A4), bật &quot;Đồ họa nền&quot; (Background graphics).
              </li>
              <li>
                <strong>Chân đế Mica:</strong> Đặt chân đế Mica chữ T hoặc chữ L khổ A6 đứng (10x15cm) để dựng thẳng trên bàn tiệc.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* PRINT-ONLY CONTAINER: This is what the printer actually prints!       */}
      {/* ===================================================================== */}
      <div className="hidden print:block print-only w-full">
        {isBatchMode && batchTables.length > 0 ? (
          /* Batch Print multiple A6 table cards */
          batchTables.map((tbl, index) => (
            <div
              key={tbl}
              className={`w-[105mm] h-[148mm] mx-auto ${
                index < batchTables.length - 1 ? 'print-page-break' : ''
              }`}
            >
              <PrintCardPreview
                data={{
                  ...cardData,
                  tableNumber: tbl,
                }}
                isPrintVersion={true}
              />
            </div>
          ))
        ) : (
          /* Single Card Print */
          <div className="w-[105mm] h-[148mm] mx-auto">
            <PrintCardPreview data={cardData} isPrintVersion={true} />
          </div>
        )}
      </div>

    </div>
  );
}
