'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Heart, Sparkles, Maximize, Minimize, Play, Pause, RefreshCw } from 'lucide-react';
import { WeddingPhoto } from '@/types/wedding';
import { getPhotos, supabase, isSupabaseConfigured, getDemoBroadcastChannel } from '@/lib/supabase';
import { triggerStageCelebration } from '@/lib/confetti';
import { INITIAL_WEDDING_PHOTOS } from '@/lib/mock-data';

export default function LiveStagePage() {
  const [photos, setPhotos] = useState<WeddingPhoto[]>(INITIAL_WEDDING_PHOTOS);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [uploadUrl, setUploadUrl] = useState('');
  
  // Interrupt / Priority display when a new photo arrives
  const [priorityPhoto, setPriorityPhoto] = useState<WeddingPhoto | null>(null);
  const [isInterrupting, setIsInterrupting] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const slideTimerRef = useRef<NodeJS.Timeout | null>(null);

  const coupleNames = process.env.NEXT_PUBLIC_EVENT_NAME || 'Minh Anh & Tuấn Kiệt';
  const weddingDate = process.env.NEXT_PUBLIC_EVENT_DATE || '26.10.2026';
  const eventSlug = process.env.NEXT_PUBLIC_DEFAULT_EVENT_SLUG || 'dam-cuoi-minh-anh';

  // Load photos on mount
  const loadApprovedPhotos = useCallback(async () => {
    try {
      const data = await getPhotos(eventSlug);
      const approvedOnly = data.filter((p) => p.status === 'approved');
      if (approvedOnly.length > 0) {
        setPhotos(approvedOnly);
      }
    } catch (err) {
      console.warn('Error loading photos for live display:', err);
    }
  }, [eventSlug]);

  // Set upload URL for dynamic QR code on client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setUploadUrl(`${origin}/upload`);
    }
  }, []);

  // Fetch photos initially
  useEffect(() => {
    loadApprovedPhotos();
  }, [loadApprovedPhotos]);

  // Trigger priority interrupt display
  const triggerPriorityDisplay = useCallback((newPhoto: WeddingPhoto) => {
    setPriorityPhoto(newPhoto);
    setIsInterrupting(true);
    triggerStageCelebration();

    // Add to list if not already there
    setPhotos((prev) => {
      const exists = prev.some((p) => p.id === newPhoto.id);
      if (exists) return prev;
      return [newPhoto, ...prev];
    });

    // Hold on screen with priority for 7 seconds, then resume normal cycle
    setTimeout(() => {
      setIsInterrupting(false);
      setPriorityPhoto(null);
      setCurrentIndex(0);
    }, 7000);
  }, []);

  // 1. Supabase Realtime Subscription
  useEffect(() => {
    if (!isSupabaseConfigured()) return;

    const channel = supabase
      .channel('wedding_photos_live')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'wedding_photos',
          filter: `event_slug=eq.${eventSlug}`,
        },
        (payload) => {
          const newPhoto = payload.new as WeddingPhoto;
          if (newPhoto.status === 'approved') {
            triggerPriorityDisplay(newPhoto);
          }
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'wedding_photos',
          filter: `event_slug=eq.${eventSlug}`,
        },
        (payload) => {
          const updatedPhoto = payload.new as WeddingPhoto;
          if (updatedPhoto.status === 'approved') {
            triggerPriorityDisplay(updatedPhoto);
          } else if (updatedPhoto.status === 'rejected') {
            // Remove rejected photo
            setPhotos((prev) => prev.filter((p) => p.id !== updatedPhoto.id));
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [eventSlug, triggerPriorityDisplay]);

  // 2. Cross-tab BroadcastChannel for Offline / Demo Mode
  useEffect(() => {
    const channel = getDemoBroadcastChannel();
    if (!channel) return;

    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'NEW_PHOTO' && event.data.photo?.status === 'approved') {
        triggerPriorityDisplay(event.data.photo);
      } else if (event.data?.type === 'UPDATE_STATUS') {
        loadApprovedPhotos();
      } else if (event.data?.type === 'DELETE_PHOTO') {
        setPhotos((prev) => prev.filter((p) => p.id !== event.data.id));
      }
    };

    channel.addEventListener('message', handleMessage);
    return () => {
      channel.removeEventListener('message', handleMessage);
    };
  }, [triggerPriorityDisplay, loadApprovedPhotos]);

  // Slideshow Auto-Advance Timer (every 5 seconds)
  useEffect(() => {
    if (isPaused || isInterrupting || photos.length <= 1) return;

    slideTimerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % photos.length);
    }, 5000);

    return () => {
      if (slideTimerRef.current) clearInterval(slideTimerRef.current);
    };
  }, [isPaused, isInterrupting, photos.length]);

  // Fullscreen toggle handler
  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.warn('Fullscreen request failed:', err);
      });
      setIsFullscreen(true);
    } else {
      document.exitFullscreen().catch(console.warn);
      setIsFullscreen(false);
    }
  };

  // Keyboard shortcut listener ('F' for fullscreen, Space for pause)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'f' || e.key === 'F') {
        toggleFullscreen();
      } else if (e.code === 'Space') {
        e.preventDefault();
        setIsPaused((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activePhoto = priorityPhoto || photos[currentIndex] || photos[0];

  return (
    <div
      ref={containerRef}
      className="relative w-screen h-screen bg-black overflow-hidden flex items-center justify-center select-none font-sans"
    >
      {/* Dynamic Ambient Blurred Background */}
      {activePhoto && (
        <div
          key={`bg-${activePhoto.id}`}
          className="absolute inset-0 bg-cover bg-center filter blur-3xl opacity-35 scale-115 transition-all duration-1000 ease-out"
          style={{ backgroundImage: `url(${activePhoto.photo_url})` }}
        />
      )}
      
      {/* Dark Vignette Overlay for Crisp Stage Contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/70 pointer-events-none" />

      {/* Main 16:9 Central Projection Area */}
      <div className="relative z-10 w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-12">
        {activePhoto ? (
          <div
            key={activePhoto.id}
            className="relative max-h-full max-w-full flex items-center justify-center animate-fade-in"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={activePhoto.photo_url}
              alt={activePhoto.guest_name}
              className="max-h-[82vh] max-w-[86vw] object-contain rounded-2xl sm:rounded-3xl shadow-[0_0_50px_rgba(0,0,0,0.9)] border-2 border-white/20 transition-transform duration-700 hover:scale-[1.01]"
            />
          </div>
        ) : (
          <div className="text-center text-stone-400">
            <RefreshCw className="w-10 h-10 animate-spin mx-auto mb-3 text-[#D4AF37]" />
            <p className="font-serif text-xl text-white">Đang chuẩn bị trình chiếu ảnh cưới...</p>
          </div>
        )}
      </div>

      {/* Top Banner: Couple Names & Live Badge */}
      <header className="absolute top-6 inset-x-8 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex items-center gap-3 bg-black/60 backdrop-blur-md px-5 py-2.5 rounded-full border border-white/20 shadow-2xl">
          <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold shadow-md">
            <Heart className="w-4 h-4 fill-stone-950" />
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold text-white tracking-wide">
              {coupleNames}
            </h1>
            <p className="text-[11px] text-amber-200/90 font-serif italic">
              Lễ Thành Hôn • {weddingDate}
            </p>
          </div>
        </div>

        {/* Live Status Pill */}
        <div className="flex items-center gap-2 bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 text-xs text-stone-200">
          <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
          <span className="font-bold tracking-widest text-white uppercase text-[11px]">
            TRỰC TIẾP
          </span>
          <span className="text-stone-400 font-mono">
            {photos.length > 0 ? `(${currentIndex + 1}/${photos.length})` : ''}
          </span>
        </div>
      </header>

      {/* Priority Interrupt Celebration Header Banner */}
      {isInterrupting && (
        <div className="absolute top-24 inset-x-0 z-40 flex items-center justify-center pointer-events-none animate-bounce">
          <div className="bg-gradient-to-r from-amber-500 via-rose-500 to-amber-500 text-white px-8 py-3 rounded-full shadow-[0_10px_40px_rgba(245,158,11,0.6)] flex items-center gap-3 border-2 border-white/60">
            <Sparkles className="w-6 h-6 text-yellow-200 animate-spin" />
            <span className="font-serif text-lg sm:text-xl font-bold tracking-wide">
              🎉 Khoảnh khắc mới từ {activePhoto?.guest_name}!
            </span>
          </div>
        </div>
      )}

      {/* Bottom-Left Overlay: Guest Name & Wish Badge */}
      {activePhoto && (
        <div className="absolute bottom-8 left-8 right-60 sm:right-80 md:right-96 z-30 pointer-events-none">
          <div className="bg-black/75 backdrop-blur-xl p-4 sm:p-6 rounded-3xl border border-white/20 shadow-2xl max-w-2xl animate-slide-up">
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="px-3 py-1 rounded-full bg-[#D4AF37] text-stone-950 font-bold text-xs sm:text-sm font-serif shadow-sm">
                {activePhoto.guest_name}
              </span>
              <span className="text-xs text-stone-400">gửi gắm chúc phúc</span>
            </div>
            
            {activePhoto.wish_message ? (
              <p className="font-serif italic text-white text-sm sm:text-lg md:text-xl leading-relaxed mt-1 drop-shadow-md">
                &ldquo;{activePhoto.wish_message}&rdquo;
              </p>
            ) : (
              <p className="text-xs text-stone-300 italic">
                Chúc mừng hạnh phúc Minh Anh & Tuấn Kiệt! ❤️
              </p>
            )}
          </div>
        </div>
      )}

      {/* Persistent Bottom-Right QR Card: "Quét mã để chia sẻ khoảnh khắc!" */}
      <div className="absolute bottom-8 right-8 z-30 bg-white/95 backdrop-blur-xl p-3.5 sm:p-4 rounded-3xl shadow-2xl border-2 border-[#D4AF37] flex items-center gap-3.5 max-w-[240px] sm:max-w-[280px]">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-white p-1 rounded-2xl border border-stone-200 shadow-sm flex items-center justify-center flex-shrink-0">
          <QRCodeSVG
            value={uploadUrl || 'https://weddinglive.vn/upload'}
            size={72}
            level="M"
            fgColor="#1C1917"
          />
        </div>
        <div className="text-left">
          <span className="block font-serif font-extrabold text-stone-900 text-xs sm:text-sm leading-snug">
            Quét mã để chia sẻ khoảnh khắc!
          </span>
          <span className="block text-[11px] text-[#B8860B] font-semibold mt-1">
            Chiếu ngay lên LED
          </span>
        </div>
      </div>

      {/* Stage Technician Hidden Control Bar (hover to reveal) */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-40 opacity-0 hover:opacity-100 transition-opacity bg-black/80 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 flex items-center gap-3 text-white text-xs">
        <button
          onClick={() => setIsPaused((prev) => !prev)}
          className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          title={isPaused ? 'Tiếp tục trình chiếu (Space)' : 'Tạm dừng (Space)'}
        >
          {isPaused ? <Play className="w-4 h-4 text-emerald-400" /> : <Pause className="w-4 h-4 text-amber-400" />}
        </button>

        <button
          onClick={loadApprovedPhotos}
          className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          title="Tải lại danh sách ảnh"
        >
          <RefreshCw className="w-4 h-4" />
        </button>

        <button
          onClick={toggleFullscreen}
          className="p-1.5 hover:bg-white/20 rounded-full transition-colors"
          title="Toàn màn hình sân khấu (Phím F)"
        >
          {isFullscreen ? <Minimize className="w-4 h-4" /> : <Maximize className="w-4 h-4" />}
        </button>

        <span className="text-[10px] text-stone-400 border-l border-white/20 pl-2">
          Phím F: Fullscreen | Space: Dừng
        </span>
      </div>
    </div>
  );
}
