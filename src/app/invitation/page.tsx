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
  ChevronDown,
} from 'lucide-react';
import { triggerWeddingConfetti } from '@/lib/confetti';
import { VietQRModal } from '@/components/VietQRModal';

function InvitationContent() {
  const searchParams = useSearchParams();

  // Personalized guest URL parameters
  const guestNameParam = searchParams.get('guest') || '';
  const salutationParam = searchParams.get('salutation') || 'Bạn';
  const plusOneParam = searchParams.get('plus') || '';
  const companyParam = searchParams.get('company') || '';

  const [isOpenEnvelope, setIsOpenEnvelope] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(false);
  const [isVietQRModalOpen, setIsVietQRModalOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // RSVP Form State
  const [rsvpGuestName, setRsvpGuestName] = useState(guestNameParam || '');
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

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#F3E5AB]">
      
      {/* Floating Audio Toggle */}
      <button
        type="button"
        onClick={() => setIsPlayingMusic((prev) => !prev)}
        className="fixed top-20 right-4 z-40 p-3 rounded-full bg-white/90 backdrop-blur-md shadow-lg border border-[#D4AF37]/50 text-[#B8860B] hover:scale-105 transition-all"
        title={isPlayingMusic ? 'Tắt nhạc nền' : 'Bật nhạc nền'}
      >
        {isPlayingMusic ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
      </button>

      {/* ===================================================================== */}
      {/* COVER VIEW: INTERACTIVE WAX SEAL ENVELOPE (Phong bì niêm phong sáp)    */}
      {/* ===================================================================== */}
      {!isOpenEnvelope ? (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-gradient-to-b from-[#1C1917] via-[#292524] to-[#1C1917] text-white">
          <div className="w-full max-w-sm sm:max-w-md text-center animate-fade-in">
            
            {/* Header Greeting */}
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/20 border border-[#D4AF37]/40 text-amber-300 text-xs font-semibold mb-4 tracking-wider uppercase">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Thiệp Mời Cưới Trực Tuyến</span>
            </div>

            <h1 className="font-serif text-3xl sm:text-4xl font-bold tracking-tight text-white mb-2">
              {coupleNames}
            </h1>
            <p className="font-serif italic text-amber-200/90 text-sm mb-6">
              26.10.2026 • Lễ Thành Hôn
            </p>

            {/* Personalized Guest Pill */}
            {guestNameParam && (
              <div className="mb-6 p-3 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 inline-block max-w-xs">
                <span className="text-[11px] uppercase tracking-widest text-amber-300 block">Kính gửi</span>
                <span className="font-serif font-bold text-base sm:text-lg text-white">
                  {salutationParam} {guestNameParam}
                </span>
                {plusOneParam && (
                  <span className="text-xs block text-stone-300 italic">{plusOneParam}</span>
                )}
                {companyParam && (
                  <span className="text-[10px] text-amber-200/80 block mt-0.5">({companyParam})</span>
                )}
              </div>
            )}

            {/* Envelope Illustration Box */}
            <div
              onClick={handleOpenEnvelope}
              className="cursor-pointer group relative mx-auto w-72 sm:w-80 h-48 sm:h-52 rounded-2xl bg-[#8E1616] p-4 shadow-2xl border-2 border-[#D4AF37] flex flex-col items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300"
            >
              {/* Envelope Flap triangle */}
              <div className="absolute top-0 inset-x-0 h-24 bg-[#7A1313] rounded-t-2xl [clip-path:polygon(0_0,100%_0,50%_100%)] shadow-md" />

              {/* Gold Wax Seal Button */}
              <div className="relative z-10 w-16 h-16 rounded-full bg-gradient-to-tr from-[#B8860B] via-[#D4AF37] to-[#F3E5AB] shadow-xl flex items-center justify-center border-2 border-[#FFFBEB] group-hover:scale-110 transition-transform">
                <div className="w-12 h-12 rounded-full border border-dashed border-[#78350F] flex items-center justify-center font-serif font-bold text-lg text-[#78350F]">
                  囍
                </div>
              </div>

              <div className="relative z-10 mt-3">
                <span className="text-xs font-bold uppercase tracking-widest text-amber-200 block drop-shadow-sm">
                  Chạm để mở thiệp
                </span>
                <span className="text-[10px] text-amber-300/70 block mt-0.5">
                  Tap to Open Invitation
                </span>
              </div>
            </div>

            <p className="text-xs text-stone-400 mt-6 italic">
              Bấm vào phong bì để mở thiệp cưới & xem lời chúc
            </p>
          </div>
        </div>
      ) : (
        /* ===================================================================== */
        /* OPEN INVITATION FULL EXPERIENCE                                       */
        /* ===================================================================== */
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-2xl border-x border-[#E8DFC8] pb-24 animate-fade-in">
          
          {/* Top Hero Banner */}
          <div className="relative h-72 sm:h-80 bg-stone-900 overflow-hidden">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80"
              alt="Ảnh cưới dâu rể"
              className="w-full h-full object-cover opacity-85"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            
            <div className="absolute bottom-6 inset-x-6 text-center text-white">
              <span className="text-xs uppercase tracking-widest font-semibold text-amber-300">
                SAVE THE DATE
              </span>
              <h2 className="font-serif text-3xl sm:text-4xl font-bold mt-1 tracking-tight">
                {coupleNames}
              </h2>
              <p className="font-serif italic text-amber-200 text-xs mt-1">
                26 Tháng 10, 2026 • GEM Center, TP. Hồ Chí Minh
              </p>
            </div>
          </div>

          {/* Personalized Invitation Message Box */}
          <div className="px-6 py-8 text-center bg-[#FAF8F5] border-b border-[#E8DFC8]">
            <div className="w-10 h-10 rounded-full bg-[#D4AF37]/20 flex items-center justify-center mx-auto mb-3 text-[#B8860B]">
              <Heart className="w-5 h-5 fill-[#D4AF37]" />
            </div>

            <span className="text-xs uppercase tracking-widest text-[#B8860B] font-bold block mb-1">
              Thư Mời Trọng Thể
            </span>

            <h3 className="font-serif text-2xl font-bold text-stone-900">
              Trân Trọng Kính Mời
            </h3>

            <div className="my-2.5 p-3 rounded-2xl bg-white border border-[#D4AF37]/40 shadow-xs inline-block w-full">
              <p className="font-serif text-xl sm:text-2xl font-bold text-[#B8860B]">
                {salutationParam} {guestNameParam || 'Quý Khách'}
              </p>
              {plusOneParam && (
                <p className="font-serif italic text-xs text-stone-600 mt-0.5">
                  {plusOneParam}
                </p>
              )}
              {companyParam && (
                <p className="text-[11px] text-stone-500 mt-0.5">
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
            <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold block mb-3">
              Đếm ngược ngày cưới
            </span>
            <div className="grid grid-cols-4 gap-2 max-w-xs mx-auto">
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.days}
                </span>
                <span className="text-[10px] text-stone-500 uppercase">Ngày</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.hours}
                </span>
                <span className="text-[10px] text-stone-500 uppercase">Giờ</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.minutes}
                </span>
                <span className="text-[10px] text-stone-500 uppercase">Phút</span>
              </div>
              <div className="p-2.5 rounded-2xl bg-[#FAF8F5] border border-[#E8DFC8]">
                <span className="font-mono text-xl sm:text-2xl font-bold text-[#B8860B] block">
                  {timeLeft.seconds}
                </span>
                <span className="text-[10px] text-stone-500 uppercase">Giây</span>
              </div>
            </div>
          </div>

          {/* Wedding Event Timeline */}
          <div className="py-8 px-6 border-b border-[#E8DFC8]">
            <h4 className="font-serif text-lg font-bold text-stone-900 text-center mb-6">
              Lịch Trình Tiệc Cưới
            </h4>

            <div className="space-y-4 max-w-sm mx-auto text-xs">
              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">17:30</span>
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex-1">
                  <span className="font-bold block text-stone-900">Đón Khách & Chụp Ảnh</span>
                  <span className="text-[11px] text-stone-500">Chụp hình lưu niệm tại sảnh hoa cùng cô dâu & chú rể</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">18:00</span>
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex-1">
                  <span className="font-bold block text-stone-900">Nghi Thức Lễ Thành Hôn</span>
                  <span className="text-[11px] text-stone-500">Trao nhẫn cưới & rót rượu champagne mừng hạnh phúc</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">18:30</span>
                <div className="p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 flex-1">
                  <span className="font-bold block text-stone-900">Khai Tiệc Mừng Cưới</span>
                  <span className="text-[11px] text-stone-500">Thưởng thức ẩm thực tiệc cưới và nâng ly cùng bạn bè</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <span className="font-mono font-bold text-sm text-[#B8860B] w-12 flex-shrink-0 pt-0.5">19:30</span>
                <div className="p-3 rounded-2xl bg-amber-50 border border-amber-300/80 flex-1">
                  <span className="font-bold block text-amber-900">Chiếu Ảnh Khách Lên Màn LED</span>
                  <span className="text-[11px] text-amber-800">Quét mã QR chụp ảnh & gửi lời chúc trực tiếp lên sân khấu!</span>
                </div>
              </div>
            </div>
          </div>

          {/* Venue & Map Location */}
          <div className="py-8 px-6 border-b border-[#E8DFC8] bg-[#FAF8F5] text-center">
            <MapPin className="w-6 h-6 text-[#B8860B] mx-auto mb-2" />
            <span className="text-[11px] uppercase tracking-widest text-stone-500 font-semibold block">Địa Điểm Tổ Chức</span>
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
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white border border-stone-300 text-stone-800 text-xs font-semibold shadow-xs hover:bg-stone-50 transition-colors"
              >
                <span>Mở Bản Đồ Chỉ Đường (Google Maps)</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>

          {/* RSVP Confirmation Form */}
          <div className="py-8 px-6 border-b border-[#E8DFC8]">
            <div className="text-center mb-5">
              <span className="text-[11px] uppercase tracking-widest text-[#B8860B] font-bold block">
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
              <div className="p-5 rounded-2xl bg-emerald-50 border border-emerald-200 text-center animate-fade-in">
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
                    className="w-full px-3 py-2.5 rounded-xl border border-stone-300 text-xs outline-none focus:border-[#D4AF37]"
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
                          ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
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
                          ? 'bg-[#D4AF37] text-white border-[#D4AF37]'
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
                    className="w-full px-3 py-2 rounded-xl border border-stone-300 text-xs outline-none focus:border-[#D4AF37]"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl bg-stone-900 text-white font-bold text-xs hover:bg-stone-800 transition-colors shadow-sm"
                >
                  Xác Nhận Tham Dự
                </button>
              </form>
            )}
          </div>

          {/* WeddingLive LED Stage Feature Integration */}
          <div className="py-8 px-6 border-b border-[#E8DFC8] bg-gradient-to-br from-amber-50/60 to-rose-50/40 text-center">
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
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs shadow-md hover:brightness-105 transition-all"
              >
                <Camera className="w-4 h-4" />
                <span>Thử Chụp & Gửi Ảnh Ngay</span>
              </Link>
            </div>
          </div>

          {/* VietQR Digital Gift Envelope */}
          <div className="py-8 px-6 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center mx-auto mb-2">
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
          <div className="py-6 border-t border-[#E8DFC8] text-center text-xs text-stone-400">
            <p className="italic font-serif">
              Minh Anh & Tuấn Kiệt trân trọng cảm ơn tình cảm của bạn! ❤️
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
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center text-stone-500 font-serif">Đang mở thiệp cưới...</div>}>
      <InvitationContent />
    </Suspense>
  );
}
