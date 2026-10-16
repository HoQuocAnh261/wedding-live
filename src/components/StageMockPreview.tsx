'use client';

import React, { useState, useEffect } from 'react';
import { Sparkles, QrCode, Heart, Send, RefreshCw, Volume2 } from 'lucide-react';
import { triggerWeddingConfetti } from '@/lib/confetti';
import { useLanguage } from '@/context/LanguageContext';

interface MockPhoto {
  guest: string;
  wish: string;
  img: string;
  time: string;
}

const DEMO_PHOTOS_EN: MockPhoto[] = [
  {
    guest: 'College Friends & Alumni',
    wish: 'Congratulations Minh Anh & Tuấn Kiệt! Wishing you both a lifetime of love and joy! 🥂✨',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    time: 'Just now',
  },
  {
    guest: 'Uncle David & Family',
    wish: 'May your shared path always be blessed with laughter, health, and prosperity! ❤️',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    time: '1 min ago',
  },
  {
    guest: 'Bridesmaids & Emma',
    wish: 'The most stunning bride ever! So happy for you two lovers! 💐💍',
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    time: '2 mins ago',
  },
];

const DEMO_PHOTOS_VI: MockPhoto[] = [
  {
    guest: 'Hội Bạn Đại Học Bách Khoa',
    wish: 'Chúc Minh Anh & Tuấn Kiệt trăm năm hạnh phúc, sớm đón thiên thần nhỏ nha! 🎉🥂',
    img: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80',
    time: 'Vừa xong',
  },
  {
    guest: 'Gia đình Bác Hai',
    wish: 'Chúc hai cháu thuận vợ thuận chồng, cùng nhau xây dựng tổ ấm viên mãn! ❤️',
    img: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80',
    time: '1 phút trước',
  },
  {
    guest: 'Bạn Thân Cô Dâu',
    wish: 'Cô dâu hôm nay xinh đẹp tuyệt trần! Mãi hạnh phúc như ngày đầu nhé! ✨💐',
    img: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80',
    time: '2 phút trước',
  },
];

export function StageMockPreview() {
  const { lang } = useLanguage();
  const demoList = lang === 'en' ? DEMO_PHOTOS_EN : DEMO_PHOTOS_VI;
  const [photos, setPhotos] = useState<MockPhoto[]>(demoList);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isInterrupting, setIsInterrupting] = useState(false);
  const [isSendingMock, setIsSendingMock] = useState(false);

  useEffect(() => {
    setPhotos(demoList);
  }, [lang]);

  // Auto-advance slideshow every 5 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      if (!isInterrupting) {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }
    }, 5000);
    return () => clearInterval(timer);
  }, [photos.length, isInterrupting]);

  const handleSimulateGuestUpload = () => {
    if (isSendingMock) return;
    setIsSendingMock(true);

    setTimeout(() => {
      const newMock: MockPhoto = {
        guest: lang === 'en' ? 'Table 8 - Tech Co-workers' : 'Bàn số 8 - Team Đồng Nghiệp',
        wish:
          lang === 'en'
            ? 'Cheers to the best couple! Wishing you endless adventures together! 🚀🎉🍾'
            : 'Cả team chúc 2 bạn trăm năm hòa hợp, viên mãn hạnh phúc nha! 🚀🎉🍾',
        img: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=1200&q=80',
        time: lang === 'en' ? 'Just now' : 'Vừa xong',
      };

      setPhotos((prev) => [newMock, ...prev]);
      setCurrentIndex(0);
      setIsInterrupting(true);
      triggerWeddingConfetti();
      setIsSendingMock(false);

      setTimeout(() => {
        setIsInterrupting(false);
      }, 4000);
    }, 600);
  };

  const activePhoto = photos[currentIndex] || photos[0];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Decorative LED Screen Outer Frame */}
      <div className="relative rounded-3xl p-3 sm:p-4 bg-gradient-to-b from-stone-900 via-stone-800 to-stone-950 shadow-2xl border-2 border-[#D4AF37]/50">
        
        {/* Stage Bezel Top Indicator */}
        <div className="flex items-center justify-between px-3 py-2 text-xs text-stone-400 border-b border-stone-800/80 mb-2">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-stone-300 tracking-wider">
              {lang === 'en'
                ? 'LIVE STAGE 16:9 • BIG SCREEN BANQUET WALL'
                : 'LIVE STAGE 16:9 • MÀN HÌNH LED SÂN KHẤU'}
            </span>
          </div>
          <div className="flex items-center gap-3 text-[11px]">
            <span className="text-amber-400 font-medium">
              {lang === 'en' ? 'Auto-slides every 5s' : 'Tự động chuyển mỗi 5s'}
            </span>
            <div className="flex items-center gap-1 bg-stone-800 px-2 py-0.5 rounded text-stone-300">
              <Volume2 className="w-3 h-3 text-emerald-400" />
              <span>Real-time Sync</span>
            </div>
          </div>
        </div>

        {/* 16:9 Screen Display Container */}
        <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-black flex items-center justify-center select-none shadow-inner">
          
          {/* Ambient Blurred Background */}
          <div
            className="absolute inset-0 bg-cover bg-center filter blur-2xl opacity-40 scale-110 transition-all duration-1000"
            style={{ backgroundImage: `url(${activePhoto.img})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/40" />

          {/* Main Sharp Photo */}
          <div className="relative z-10 w-full h-full flex items-center justify-center p-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.img}
              alt={activePhoto.guest}
              className="max-h-full max-w-full object-contain rounded-xl shadow-2xl transition-all duration-700 animate-fade-in"
            />
          </div>

          {/* Interrupt Banner when new photo arrives */}
          {isInterrupting && (
            <div className="absolute top-4 inset-x-4 z-30 flex items-center justify-center animate-bounce">
              <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white px-5 py-2 rounded-full shadow-2xl flex items-center gap-2 border border-white/40">
                <Sparkles className="w-4 h-4 text-yellow-200 animate-spin" />
                <span className="font-bold text-xs sm:text-sm tracking-wide">
                  {lang === 'en'
                    ? '🎉 New moment just streamed to the stage screen!'
                    : '🎉 Khoảnh khắc mới vừa được gửi lên sân khấu!'}
                </span>
              </div>
            </div>
          )}

          {/* Couple Header Badge on LED */}
          <div className="absolute top-4 left-4 z-20 flex items-center gap-2 bg-black/50 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/20">
            <Heart className="w-3.5 h-3.5 text-rose-400 fill-rose-400" />
            <span className="text-white font-serif text-xs tracking-wider">
              Minh Anh & Tuấn Kiệt
            </span>
          </div>

          {/* Persistent QR Card at Bottom Right */}
          <div className="absolute bottom-4 right-4 z-20 bg-white/95 backdrop-blur-md p-2.5 rounded-2xl shadow-2xl border border-[#D4AF37] flex items-center gap-2.5 max-w-[190px] sm:max-w-[220px]">
            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-stone-100 rounded-lg p-1 border border-stone-200 flex-shrink-0">
              <div className="w-full h-full bg-[#1A1A1A] rounded flex items-center justify-center text-white">
                <QrCode className="w-8 h-8 text-amber-300" />
              </div>
            </div>
            <div className="text-left leading-tight">
              <span className="text-[10px] sm:text-xs font-bold text-stone-900 block font-serif">
                {lang === 'en' ? 'Scan to share photo' : 'Quét mã để gửi ảnh'}
              </span>
              <span className="text-[9px] text-stone-500 block mt-0.5">
                {lang === 'en' ? 'Streams live to stage LED' : 'Lên màn hình LED tiệc cưới'}
              </span>
            </div>
          </div>

          {/* Guest Wish Overlay at Bottom Left */}
          <div className="absolute bottom-4 left-4 right-48 sm:right-64 z-20">
            <div className="bg-black/65 backdrop-blur-md p-3 sm:p-4 rounded-2xl border border-white/20 text-white max-w-lg shadow-xl">
              <div className="flex items-center gap-2 mb-1">
                <span className="font-serif font-bold text-amber-300 text-xs sm:text-sm">
                  {activePhoto.guest}
                </span>
                <span className="text-[10px] text-stone-400">• {activePhoto.time}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-100 line-clamp-2 italic font-sans leading-relaxed">
                &ldquo;{activePhoto.wish}&rdquo;
              </p>
            </div>
          </div>
        </div>

        {/* Interactive Try-It Toolbar */}
        <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 px-2">
          <div className="text-xs text-stone-400 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-amber-400" />
            <span>
              {lang === 'en'
                ? `Streaming ${currentIndex + 1} of ${photos.length} moments`
                : `Đang chiếu ${currentIndex + 1} / ${photos.length} khoảnh khắc`}
            </span>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              onClick={() => setCurrentIndex((prev) => (prev + 1) % photos.length)}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs transition-colors"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>{lang === 'en' ? 'Next Slide' : 'Đổi ảnh tiếp theo'}</span>
            </button>

            <button
              onClick={handleSimulateGuestUpload}
              disabled={isSendingMock}
              className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#F59E0B] text-stone-950 font-semibold text-xs shadow-lg hover:brightness-110 active:scale-95 transition-all"
            >
              <Send className="w-3.5 h-3.5" />
              <span>
                {isSendingMock
                  ? lang === 'en'
                    ? 'Streaming...'
                    : 'Đang gửi...'
                  : lang === 'en'
                  ? '⚡ Try Live Photo Stream'
                  : '⚡ Bấm thử gửi ảnh lên sân khấu'}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
