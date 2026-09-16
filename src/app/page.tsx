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

export default function LandingPage() {
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
            <span className="text-[#B8860B] font-bold">Wedding Tech 2026</span>
            <span className="text-stone-300">|</span>
            <span>Trực Tiếp Chiếu Ảnh Tiệc Cưới Real-time</span>
          </div>

          {/* Main Title */}
          <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight text-stone-900 leading-[1.15]">
            Khách Chụp Khoảnh Khắc.
            <br />
            <span className="bg-gradient-to-r from-[#B8860B] via-[#D4AF37] to-[#B8860B] bg-clip-text text-transparent italic">
              Chiếu Ngay Lên Màn LED
            </span>
          </h1>

          {/* Subtitle */}
          <p className="max-w-2xl mx-auto mt-6 text-base sm:text-lg text-stone-600 leading-relaxed font-normal">
            Trải nghiệm tiệc cưới chuẩn phong cách quốc tế (Eventoly). Khách chỉ cần quét mã QR tại bàn, chụp ảnh trên điện thoại và ảnh sẽ lập tức xuất hiện hoành tráng trên màn hình LED sân khấu!
          </p>

          {/* CTA Buttons */}
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <Link
              href="/upload"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E2C364] to-[#D4AF37] text-stone-950 font-bold text-sm sm:text-base shadow-xl hover:shadow-2xl hover:brightness-105 active:scale-95 transition-all"
            >
              <Camera className="w-5 h-5" />
              <span>Trải Nghiệm Khách Gửi Ảnh</span>
            </Link>

            <Link
              href="/live"
              target="_blank"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-4 rounded-2xl bg-stone-900 text-white font-bold text-sm sm:text-base shadow-lg hover:bg-stone-800 active:scale-95 transition-all"
            >
              <Tv className="w-5 h-5 text-amber-400" />
              <span>Xem Màn LED Sân Khấu 16:9</span>
            </Link>
          </div>

          {/* Micro Perks */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-5 sm:gap-8 text-xs text-stone-500">
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Không cần cài app
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Nén ảnh tự động &lt;800KB
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-[#D4AF37]" /> Tích hợp VietQR mừng cưới
            </span>
          </div>
        </div>

        {/* 2. INTERACTIVE DEMO PREVIEW (Mock stage screen) */}
        <div className="mt-14 max-w-5xl mx-auto">
          <div className="text-center mb-4">
            <span className="text-xs font-semibold text-[#B8860B] uppercase tracking-wider">
              Mô Phỏng Trực Tiếp
            </span>
            <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-900 mt-1">
              Thử Nghiệm Màn Hình LED Sân Khấu Ngay Bây Giờ
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
              Quy Trình Đơn Giản
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              3 Bước Thắp Sáng Sân Khấu Tiệc Cưới
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-3">
              Không cần hướng dẫn rườm rà. Bất kỳ ai từ thanh niên đến cô chú lớn tuổi đều sử dụng được chỉ trong 5 giây!
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {/* Step 1 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8DFC8] relative group hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold font-serif text-xl mb-6 shadow-sm">
                01
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Quét Mã QR Bàn Tiệc
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Mỗi bàn tiệc được đặt 1 bảng Mica A6 in mã QR. Khách chỉ cần giơ điện thoại (iOS / Android) quét mã là mở ngay trang web. Không cần đăng nhập tài khoản.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#B8860B]">
                <QrCode className="w-4 h-4" />
                <span>Nhanh chóng & Tiện lợi</span>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8DFC8] relative group hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold font-serif text-xl mb-6 shadow-sm">
                02
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Chụp Ảnh & Gửi Lời Chúc
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Khách chụp lại nụ cười rạng rỡ, bàn tiệc quây quần hoặc chọn ảnh đẹp từ album. Tự do viết lời chúc trăm năm hạnh phúc gửi cô dâu chú rể.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#B8860B]">
                <Camera className="w-4 h-4" />
                <span>Nén ảnh tốc độ cao qua 4G</span>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-[#E8DFC8] relative group hover:border-[#D4AF37] hover:shadow-lg transition-all">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#D4AF37] to-[#F3E5AB] flex items-center justify-center text-stone-950 font-bold font-serif text-xl mb-6 shadow-sm">
                03
              </div>
              <h3 className="font-serif text-xl font-bold text-stone-900 mb-2">
                Chiếu Lên Màn LED & Tải Toàn Bộ
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Ảnh xuất hiện ngay lập tức trên màn hình LED sân khấu tiệc cưới với hiệu ứng chuyển cảnh điện ảnh. Sau tiệc, cặp đôi tải file ZIP toàn bộ ảnh gốc về làm kỷ niệm.
              </p>
              <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#B8860B]">
                <Tv className="w-4 h-4" />
                <span>Realtime Supabase Sync</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. KEY FEATURES GRID */}
      <section className="py-16 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Tính Năng May Đo Riêng Cho Đám Cưới Việt
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              Kết hợp hoàn hảo giữa công nghệ hiện đại và phong tục văn hóa cưới hỏi Việt Nam.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Gift className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                Tích Hợp VietQR Mừng Cưới
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Khách không tiện mang phong bì tiền mặt có thể mở popup VietQR, quét mã chuyển khoản mừng cưới siêu nhanh và sao chép số tài khoản trong 1 chạm.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Zap className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                Nén Ảnh Client Dưới 800KB
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Ứng dụng tự động nén dung lượng ảnh trực tiếp trên trình duyệt của khách trước khi tải lên, giúp gửi cực nhanh ngay cả khi sóng 4G nhà hàng tiệc cưới bị nghẽn.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <ShieldCheck className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                Chế Độ Kiểm Duyệt Thông Minh
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Người điều phối hoặc MC tiệc cưới có thể bật chế độ duyệt ảnh: ảnh chỉ xuất hiện trên màn hình LED sau khi được admin bấm duyệt, tránh sự cố ngoài ý muốn.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Download className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                Tải Trọn Gói File ZIP Gốc
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Sau tiệc cưới, dâu rể bấm 1 nút để tải toàn bộ ảnh từ khách mời dưới dạng file nén ZIP dung lượng gốc, không lo thất lạc những góc ảnh tự nhiên độc đáo.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Tv className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                Chuẩn 16:9 Máy Chiếu & Màn LED
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Giao diện màn hình lớn tối ưu chuẩn tỉ lệ 16:9 sắc nét, hiệu ứng mờ ambient nền tạo chiều sâu nghệ thuật, phím tắt F mở toàn màn hình không viền.
              </p>
            </div>

            <div className="p-6 rounded-3xl bg-white border border-[#E8DFC8] shadow-xs">
              <div className="w-10 h-10 rounded-xl bg-amber-100 text-[#B8860B] flex items-center justify-center mb-4">
                <Sparkles className="w-5 h-5" />
              </div>
              <h4 className="font-serif font-bold text-stone-900 text-lg mb-1.5">
                Pháo Giấy & Hiệu Ứng Ưu Tiên
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                Mỗi khi có khách gửi ảnh mới, màn hình LED sẽ ngắt luồng tự động để ưu tiên phát sáng ảnh mới kèm hiệu ứng pháo giấy chúc mừng náo nức cả khán phòng.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING TIERS IN VND */}
      <section className="py-16 sm:py-24 bg-white border-t border-[#E8DFC8] px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-xs font-bold text-[#B8860B] uppercase tracking-widest bg-[#F3E5AB]/40 px-3 py-1 rounded-full mb-3">
              Bảng Giá Minh Bạch
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
              Chi Phí Nhỏ Cho Kỷ Niệm Cả Đời
            </h2>
            <p className="text-sm sm:text-base text-stone-600 mt-2">
              Thanh toán một lần duy nhất theo sự kiện. Không phát sinh chi phí ẩn.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch">
            {/* Tier 1: Gói Cơ Bản */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Gói Cơ Bản</h3>
                <p className="text-xs text-stone-500 mt-1">Phù hợp cho tiệc báo hỷ hoặc tiệc nhỏ dưới 15 bàn</p>
                <div className="mt-6 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">399.000đ</span>
                  <span className="text-xs text-stone-500 block mt-1">/ trọn gói 1 sự kiện</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>Giới hạn tối đa 500 ảnh chất lượng cao</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>Mã QR bàn tiệc tự động</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>Lưu trữ ảnh trực tuyến 30 ngày</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>Tích hợp VietQR nhận mừng cưới</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/upload"
                  className="w-full py-3 px-4 rounded-xl bg-white border border-stone-300 hover:border-[#D4AF37] text-stone-800 font-semibold text-xs sm:text-sm transition-colors block text-center"
                >
                  Chọn Gói Này
                </Link>
              </div>
            </div>

            {/* Tier 2: Gói Live Stage (Popular) */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border-2 border-[#D4AF37] shadow-xl relative flex flex-col justify-between scale-105 z-10">
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-white text-[11px] font-bold uppercase tracking-wider px-4 py-1 rounded-full shadow-sm">
                Phổ Biến Nhất Cho Tiệc Cưới
              </div>

              <div>
                <h3 className="font-serif text-2xl font-bold text-stone-900">Gói Live Stage</h3>
                <p className="text-xs text-stone-500 mt-1">Chuẩn Eventoly dành cho tiệc cưới từ 20-80 bàn</p>
                
                <div className="mt-6 mb-6">
                  <span className="text-4xl sm:text-5xl font-extrabold text-[#B8860B] font-serif">699.000đ</span>
                  <span className="text-xs text-stone-500 block mt-1">/ trọn gói không giới hạn ảnh</span>
                </div>

                <ul className="space-y-3.5 text-xs sm:text-sm text-stone-800">
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Không giới hạn số lượng ảnh gửi lên</span>
                  </li>
                  <li className="flex items-center gap-2 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Màn hình LED Real-time chiếu tức thì</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Hiệu ứng ngắt luồng ưu tiên ảnh mới</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Bảng điều khiển duyệt ảnh cho MC / Host</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Tải về file ZIP toàn bộ ảnh gốc</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                    <span>Lưu trữ ảnh trọn đời không xóa</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/admin"
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all block text-center"
                >
                  Bắt Đầu Sự Kiện Ngay
                </Link>
              </div>
            </div>

            {/* Tier 3: Gói Studio & Wedding Planner */}
            <div className="bg-[#FAF8F5] rounded-3xl p-8 border border-stone-200 flex flex-col justify-between">
              <div>
                <h3 className="font-serif text-xl font-bold text-stone-900">Studio & Planner</h3>
                <p className="text-xs text-stone-500 mt-1">Dành cho Wedding Planner, Studio ảnh cưới & Trung tâm tiệc</p>
                <div className="mt-6 mb-6">
                  <span className="text-3xl sm:text-4xl font-extrabold text-stone-900 font-serif">1.499.000đ</span>
                  <span className="text-xs text-stone-500 block mt-1">/ tháng (5 sự kiện)</span>
                </div>

                <ul className="space-y-3 text-xs sm:text-sm text-stone-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>5 sự kiện tiệc cưới mỗi tháng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>Gắn logo thương hiệu Studio riêng</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>File thiết kế in ấn bảng Mica A6 chuẩn</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-[#B8860B] flex-shrink-0" />
                    <span>Hỗ trợ kỹ thuật trực tiếp qua Zalo 24/7</span>
                  </li>
                </ul>
              </div>

              <div className="mt-8">
                <Link
                  href="/admin"
                  className="w-full py-3 px-4 rounded-xl bg-white border border-stone-300 hover:border-[#D4AF37] text-stone-800 font-semibold text-xs sm:text-sm transition-colors block text-center"
                >
                  Liên Hệ Hợp Tác
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION FOOTER BANNER */}
      <section className="py-16 px-4 sm:px-6 bg-gradient-to-b from-[#FAF8F5] to-[#F3E5AB]/30 text-center">
        <div className="max-w-3xl mx-auto">
          <div className="w-12 h-12 rounded-full bg-[#D4AF37]/20 text-[#B8860B] flex items-center justify-center mx-auto mb-4">
            <Heart className="w-6 h-6 fill-[#D4AF37]" />
          </div>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900">
            Sẵn Sàng Biến Tiệc Cưới Thành Khoảnh Khắc Khó Quên?
          </h2>
          <p className="text-sm sm:text-base text-stone-600 mt-3 max-w-xl mx-auto">
            Không cần chuẩn bị máy móc phức tạp. Chỉ cần chiếc laptop kết nối màn hình LED sân khấu là sự kiện của bạn đã sẵn sàng!
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link
              href="/upload"
              className="px-8 py-3.5 rounded-2xl bg-[#D4AF37] text-stone-950 font-bold text-sm shadow-md hover:brightness-105 transition-all"
            >
              Thử Chụp & Gửi Ảnh Ngay
            </Link>
            <Link
              href="/admin"
              className="px-6 py-3.5 rounded-2xl bg-white border border-stone-300 text-stone-800 font-semibold text-sm hover:bg-stone-50 transition-colors"
            >
              Vào Bảng Quản Trị
            </Link>
          </div>
        </div>
      </section>

      {/* 7. FOOTER */}
      <footer className="py-8 border-t border-[#E8DFC8] bg-white text-xs text-stone-500 text-center px-4">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="font-serif font-bold text-stone-800 text-sm">WeddingLive Vietnam</span>
            <span>• Nền tảng chia sẻ ảnh cưới trực tiếp số 1</span>
          </div>
          <div>
            <span>Cảm hứng từ Eventoly.com • Tối ưu văn hóa tiệc cưới Việt Nam</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
