'use client';

import React from 'react';
import Link from 'next/link';
import {
  QrCode,
  Camera,
  Tv,
  Sparkles,
  Heart,
  CheckCircle2,
  Gift,
  ArrowRight,
  ShieldCheck,
  Zap,
  Download,
  Star,
  Users,
  Smartphone,
} from 'lucide-react';
import { StageMockPreview } from '@/components/StageMockPreview';
import { useLanguage } from '@/context/LanguageContext';

export default function LandingPage() {
  const { lang, t } = useLanguage();

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 font-sans selection:bg-[#F3E5AB] selection:text-stone-900">
      {/* 1. HERO SECTION */}
      <section className="relative overflow-hidden pt-12 sm:pt-20 pb-16 px-4 sm:px-6">
        {/* Ambient Glow Circles */}
        <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-gradient-to-b from-[#F3E5AB]/40 to-transparent rounded-full blur-3xl pointer-events-none -z-10" />

        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37]/40 shadow-xs mb-6 text-xs sm:text-sm font-medium text-stone-800">
            <span className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse" />
            <span className="text-[#B8860B] font-bold">{t.hero.badgeTech}</span>
            <span className="text-stone-300">|</span>
            <span>{t.hero.badgeLive}</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.15]">
            {t.hero.titleLine1}
            <br />
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent italic">
              {t.hero.titleLine2}
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            {t.hero.subtitle}
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/upload"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E2C364] to-[#D4AF37] text-stone-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-95 transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>{t.hero.ctaUpload}</span>
            </Link>

            <Link
              href="/live"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-stone-900 text-white font-bold text-sm sm:text-base shadow-lg hover:bg-stone-800 active:scale-95 transition-all"
            >
              <Tv className="w-5 h-5 text-amber-400" />
              <span>{t.hero.ctaLive}</span>
            </Link>
          </div>

          {/* Micro Perks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> {t.hero.perkNoApp}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> {t.hero.perkCompress}
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> {t.hero.perkGift}
            </span>
          </div>
        </div>

        {/* 2. INTERACTIVE DEMO PREVIEW (Mock stage screen) */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider">
              {t.hero.demoTitle}
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              {t.hero.demoSubtitle}
            </h3>
          </div>
          <StageMockPreview />
        </div>
      </section>

      {/* 3. 3-STEP HOW IT WORKS */}
      <section className="py-16 sm:py-24 bg-white border-y border-[#E8DFC8]/70 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-[#B8860B] uppercase tracking-widest bg-[#F3E5AB]/40 px-3 py-1 rounded-full mb-3">
              {t.steps.sectionBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {t.steps.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3">
              {t.steps.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8DFC8] relative group hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold font-serif text-xl mb-6 shadow-sm">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                {t.steps.step1Title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.steps.step1Desc}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#B8860B]">
                <QrCode className="w-4 h-4" />
                <span>Zero App Downloads</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8DFC8] relative group hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold font-serif text-xl mb-6 shadow-sm">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                {t.steps.step2Title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.steps.step2Desc}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#B8860B]">
                <Camera className="w-4 h-4" />
                <span>Instant 4G Compression</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8DFC8] relative group hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold font-serif text-xl mb-6 shadow-sm">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                {t.steps.step3Title}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {t.steps.step3Desc}
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#B8860B]">
                <Tv className="w-4 h-4" />
                <span>Full-Res .ZIP Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. VALUE PROPOSITION FEATURES */}
      <section className="py-16 sm:py-24 bg-[#FAF8F5] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-[#B8860B] uppercase tracking-widest bg-[#F3E5AB]/40 px-3 py-1 rounded-full mb-3">
              {lang === 'en' ? 'Built for High-End Weddings' : 'Đỉnh Cao Công Nghệ'}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {lang === 'en'
                ? 'Everything You Need for a Flawless Reception'
                : 'Trải Nghiệm Cưới Đáng Nhớ Nhất'}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              {lang === 'en'
                ? 'Designed for ballroom banquet halls, outdoor vineyards, and modern wedding celebrations.'
                : 'Tạo dấu ấn cá nhân độc đáo và gắn kết mọi khách mời trong khán phòng tiệc cưới.'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Smartphone className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                {lang === 'en' ? 'Zero Login, Zero App Install' : 'Không Đăng Nhập, Không Tải App'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Guests open their standard camera app to scan and shoot immediately. Compatible with 100% of modern iOS and Android devices.'
                  : 'Khách chỉ cần dùng camera quét mã là chụp và gửi được ngay. Tương thích 100% iPhone và Android.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                {lang === 'en' ? 'Client-Side Fast Compression' : 'Nén Ảnh Client Dưới 800KB'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Automatically compresses heavy photos directly inside the browser before upload, ensuring lightning-fast uploads even on congested venue 4G.'
                  : 'Tự động nén ảnh trực tiếp trên trình duyệt của khách trước khi tải lên, giúp gửi cực nhanh ngay cả khi sóng 4G nhà hàng bị nghẽn.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                {lang === 'en' ? 'Smart Host Moderation' : 'Chế Độ Kiểm Duyệt Thông Minh'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Your wedding planner or MC can enable approval mode: photos only appear on the projector after approval, ensuring a safe and elegant banquet display.'
                  : 'Người điều phối hoặc MC tiệc cưới có thể bật chế độ duyệt ảnh: ảnh chỉ xuất hiện trên màn hình LED sau khi được admin bấm duyệt.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Download className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                {lang === 'en' ? 'Full-Res .ZIP Gallery Download' : 'Tải Trọn Gói File ZIP Gốc'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'After the wedding, download all guest memories in full original resolution with a single click as an organized ZIP archive.'
                  : 'Sau tiệc cưới, dâu rể bấm 1 nút để tải toàn bộ ảnh từ khách mời dưới dạng file nén ZIP dung lượng gốc, không lo thất lạc kỷ niệm.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Tv className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                {lang === 'en' ? '16:9 Projector & Stage Optimized' : 'Chuẩn 16:9 Máy Chiếu & Màn LED'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Optimized for high-resolution stage LED screens with crossfade transitions, ambient blurred backdrops, and fullscreen key shortcut (F).'
                  : 'Giao diện màn hình lớn tối ưu chuẩn tỉ lệ 16:9 sắc nét, hiệu ứng mờ ambient nền tạo chiều sâu nghệ thuật, phím tắt F mở toàn màn hình.'}
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                {lang === 'en' ? 'Real-Time Priority Interrupt' : 'Pháo Giấy & Hiệu Ứng Ưu Tiên'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {lang === 'en'
                  ? 'Whenever a new guest photo arrives, the big screen auto-interrupts the slideshow loop to priority-display the new photo with confetti!'
                  : 'Mỗi khi có khách gửi ảnh mới, màn hình LED sẽ ngắt luồng tự động để ưu tiên phát sáng ảnh mới kèm hiệu ứng pháo giấy chúc mừng.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING TIERS (USD for US market, VND for VN) */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#E8DFC8] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-[#B8860B] uppercase tracking-widest bg-[#F3E5AB]/40 px-3 py-1 rounded-full mb-3">
              {t.pricing.sectionBadge}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              {t.pricing.sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              {t.pricing.sectionSubtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Tier 1 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {t.pricing.tier1Name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{t.pricing.tier1Desc}</p>
                <div className="mt-6 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
                    {t.pricing.tier1Price}
                  </span>
                  <span className="text-xs text-stone-500 block mt-1">/ {t.pricing.tier1Period}</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                  {t.pricing.tier1Features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/upload"
                  className="w-full py-3 px-4 rounded-xl bg-white border border-stone-300 hover:border-[#D4AF37] text-stone-800 font-semibold text-xs sm:text-sm transition-colors block text-center"
                >
                  {t.pricing.btnChoose}
                </Link>
              </div>
            </div>

            {/* Tier 2: Most Popular */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl relative flex flex-col justify-between scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                {t.pricing.tier2Badge}
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">
                  {t.pricing.tier2Name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{t.pricing.tier2Desc}</p>

                <div className="mt-6 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#B8860B] font-serif">
                    {t.pricing.tier2Price}
                  </span>
                  <span className="text-xs text-stone-500 block mt-1">/ {t.pricing.tier2Period}</span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-stone-800">
                  {t.pricing.tier2Features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2 font-medium">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/admin"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all block text-center"
                >
                  {t.pricing.btnChoose}
                </Link>
              </div>
            </div>

            {/* Tier 3: Complete Suite */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">
                  {t.pricing.tier3Name}
                </h3>
                <p className="text-xs text-stone-500 mt-1">{t.pricing.tier3Desc}</p>
                <div className="mt-6 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">
                    {t.pricing.tier3Price}
                  </span>
                  <span className="text-xs text-stone-500 block mt-1">/ {t.pricing.tier3Period}</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                  {t.pricing.tier3Features.map((f, idx) => (
                    <li key={idx} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/print"
                  className="w-full py-3 px-4 rounded-xl bg-white border border-stone-300 hover:border-[#D4AF37] text-stone-800 font-semibold text-xs sm:text-sm transition-colors block text-center"
                >
                  {t.pricing.btnChoose}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-[#E8DFC8] bg-[#FAF8F5] text-center text-xs text-stone-500">
        <p className="font-serif italic text-stone-600">
          WeddingLive • Eventoly Style Wedding Technology for Modern Celebrations
        </p>
        <p className="mt-1 text-[11px] text-stone-400">
          © 2026 WeddingLive Inc. All rights reserved. Available in the United States & Vietnam.
        </p>
      </footer>
    </div>
  );
}
