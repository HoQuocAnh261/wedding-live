'use client';

import React, { useState, useRef } from 'react';
import { Camera, ImagePlus, Heart, Send, CheckCircle, AlertCircle, Sparkles, Gift, RefreshCw } from 'lucide-react';
import { compressWeddingPhoto } from '@/lib/compression';
import { uploadWeddingPhoto } from '@/lib/supabase';
import { triggerWeddingConfetti } from '@/lib/confetti';
import { VietQRModal } from '@/components/VietQRModal';
import { useLanguage } from '@/context/LanguageContext';

export default function UploadPage() {
  const { lang, t } = useLanguage();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [guestName, setGuestName] = useState('');
  const [wishMessage, setWishMessage] = useState('');

  // Status states
  const [isProcessing, setIsProcessing] = useState(false);
  const [statusMessage, setStatusMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isGiftModalOpen, setIsGiftModalOpen] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const coupleNames = process.env.NEXT_PUBLIC_EVENT_NAME || 'Minh Anh & Tuấn Kiệt';
  const weddingDate = process.env.NEXT_PUBLIC_EVENT_DATE || (lang === 'en' ? 'Oct 26, 2026' : '26.10.2026');
  const eventSlug = process.env.NEXT_PUBLIC_DEFAULT_EVENT_SLUG || 'dam-cuoi-minh-anh';

  // Handle image selection
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setErrorMessage(
        lang === 'en'
          ? 'Please select a valid image file (JPG, PNG, HEIC).'
          : 'Vui lòng chọn một tệp hình ảnh hợp lệ (JPG, PNG, HEIC).'
      );
      return;
    }

    setErrorMessage(null);
    setSelectedFile(file);
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
  };

  const handleRetake = () => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setSelectedFile(null);
    setPreviewUrl(null);
    setErrorMessage(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
    if (cameraInputRef.current) cameraInputRef.current.value = '';
  };

  // Submit flow
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedFile) {
      setErrorMessage(t.upload.errorSelectPhoto);
      return;
    }

    if (!guestName.trim()) {
      setErrorMessage(
        lang === 'en'
          ? 'Please enter your name or nickname so the couple knows who sent it!'
          : 'Vui lòng nhập tên hoặc biệt danh của bạn để dâu rể nhận ra nhé!'
      );
      return;
    }

    setIsProcessing(true);
    setErrorMessage(null);
    setStatusMessage(lang === 'en' ? 'Optimizing photo for fast streaming...' : 'Đang nén ảnh để tải lên nhanh hơn...');

    try {
      // 1. Client-side compression targeting < 800KB
      const compressedFile = await compressWeddingPhoto(selectedFile, {
        maxSizeMB: 0.78,
        onProgress: (percent) => {
          setStatusMessage(
            lang === 'en'
              ? `Compressing photo (${Math.round(percent)}%)...`
              : `Đang tối ưu ảnh (${Math.round(percent)}%)...`
          );
        },
      });

      // 2. Upload to Supabase / Local storage with defensive retry & timeout
      setStatusMessage(lang === 'en' ? 'Streaming live to big screen...' : 'Đang truyền ảnh lên màn hình LED...');

      await uploadWeddingPhoto({
        file: compressedFile,
        guestName: guestName.trim(),
        wishMessage: wishMessage.trim() || undefined,
        eventSlug,
        autoApprove: true,
      });

      // 3. Success state
      setIsProcessing(false);
      setIsSuccess(true);
      triggerWeddingConfetti();
    } catch (err: unknown) {
      console.error('Submit error:', err);
      setIsProcessing(false);
      const errText =
        err instanceof Error
          ? err.message
          : t.upload.errorSlowNetwork;
      setErrorMessage(errText);
    }
  };

  const handleResetForAnotherPhoto = () => {
    handleRetake();
    setWishMessage('');
    setIsSuccess(false);
    setStatusMessage('');
    setErrorMessage(null);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-16">
      {/* Wedding Cover Header */}
      <div className="relative overflow-hidden bg-gradient-to-b from-[#F5EFE6] via-[#FAF8F5] to-[#FAF8F5] border-b border-[#E8DFC8]/60 pt-8 pb-6 px-4 text-center">
        <div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#D4AF37]/10 blur-xl pointer-events-none" />
        <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-[#E11D48]/5 blur-xl pointer-events-none" />

        <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#D4AF37]/15 text-[#B8860B] text-xs font-semibold tracking-wider mb-2 uppercase">
          <Sparkles className="w-3.5 h-3.5" />
          <span>{t.upload.pageTitle}</span>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-stone-900 tracking-tight">
          {coupleNames}
        </h1>

        <p className="font-serif italic text-stone-600 text-sm mt-1">
          {weddingDate} • {lang === 'en' ? 'Thank you for celebrating with us' : 'Cảm ơn quý khách đã chung vui'}
        </p>

        {/* Gift Trigger Button */}
        <div className="mt-3.5 flex items-center justify-center">
          <button
            type="button"
            onClick={() => setIsGiftModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#D4AF37] text-stone-800 text-xs font-semibold shadow-xs hover:bg-[#F3E5AB]/30 transition-all active:scale-95"
          >
            <Gift className="w-4 h-4 text-rose-500" />
            <span>{t.upload.giftBtn}</span>
          </button>
        </div>
      </div>

      {/* Main Upload Form Container */}
      <div className="max-w-md mx-auto px-4 mt-5">
        {isSuccess ? (
          /* Success Screen */
          <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl border border-[#D4AF37]/40 text-center animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center mb-4 shadow-inner">
              <CheckCircle className="w-10 h-10" />
            </div>

            <h2 className="font-serif text-2xl font-bold text-stone-900">
              {t.upload.successTitle}
            </h2>
            <p className="text-stone-600 text-xs sm:text-sm mt-2 leading-relaxed">
              {t.upload.successDesc}
            </p>

            {previewUrl && (
              <div className="mt-5 relative w-48 h-48 mx-auto rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-md">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={previewUrl}
                  alt={t.upload.previewAlt}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleResetForAnotherPhoto}
                className="w-full py-3.5 px-4 rounded-2xl bg-[#D4AF37] hover:bg-[#C29B27] text-white font-bold text-sm shadow-md transition-all active:scale-95 flex items-center justify-center gap-2"
              >
                <Camera className="w-4 h-4" />
                <span>{t.upload.uploadAnother}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsGiftModalOpen(true)}
                className="w-full py-2.5 px-4 rounded-2xl bg-[#F5EFE6] text-stone-800 font-medium text-xs hover:bg-[#E8DFC8] transition-colors flex items-center justify-center gap-2"
              >
                <Gift className="w-4 h-4 text-rose-500" />
                <span>{t.upload.giftBtn}</span>
              </button>
            </div>
          </div>
        ) : (
          /* Normal Upload Form */
          <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-5 sm:p-7 shadow-lg border border-[#E8DFC8]">
            {/* Camera / Gallery Selection Area */}
            <div className="mb-5">
              <label className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-2">
                {lang === 'en' ? '1. Your Candid Memory' : '1. Khoảnh khắc của bạn'} <span className="text-rose-500">*</span>
              </label>

              {previewUrl ? (
                /* Image Preview Mode */
                <div className="relative rounded-2xl overflow-hidden border-2 border-[#D4AF37] shadow-inner bg-stone-100 group">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={previewUrl}
                    alt={t.upload.previewAlt}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={handleRetake}
                      className="px-4 py-2 rounded-xl bg-white/90 text-stone-900 font-semibold text-xs shadow-lg hover:bg-white flex items-center gap-1.5"
                    >
                      <RefreshCw className="w-3.5 h-3.5" />
                      <span>{t.upload.changePhoto}</span>
                    </button>
                  </div>
                  {/* Small mobile retake pill */}
                  <button
                    type="button"
                    onClick={handleRetake}
                    className="absolute bottom-2.5 right-2.5 px-3 py-1.5 rounded-lg bg-black/70 backdrop-blur-sm text-white text-[11px] font-medium flex items-center gap-1 sm:hidden"
                  >
                    <RefreshCw className="w-3 h-3" />
                    <span>{t.upload.changePhoto}</span>
                  </button>
                </div>
              ) : (
                /* Big Choice Buttons */
                <div className="space-y-3">
                  {/* Hidden Inputs */}
                  <input
                    ref={cameraInputRef}
                    type="file"
                    accept="image/*"
                    capture="environment" // Mobile rear camera trigger
                    className="hidden"
                    onChange={handleFileSelect}
                  />
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleFileSelect}
                  />

                  {/* Big Button 1: Mobile Camera Direct Snap */}
                  <button
                    type="button"
                    onClick={() => cameraInputRef.current?.click()}
                    className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] to-[#E6C35C] text-stone-950 font-bold text-sm shadow-md hover:shadow-lg transition-all active:scale-98 flex items-center justify-center gap-3 border border-[#F3E5AB]"
                  >
                    <div className="w-8 h-8 rounded-full bg-white/30 flex items-center justify-center">
                      <Camera className="w-5 h-5 text-stone-900" />
                    </div>
                    <div className="text-left">
                      <span className="block text-sm font-extrabold">
                        {lang === 'en' ? 'Open Rear Camera' : 'Chụp ảnh ngay'}
                      </span>
                      <span className="block text-[10px] text-stone-800 font-normal">
                        {lang === 'en' ? 'Snap live with mobile camera' : 'Mở camera sau điện thoại'}
                      </span>
                    </div>
                  </button>

                  {/* Big Button 2: Choose from Album/Gallery */}
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full py-3.5 px-4 rounded-2xl bg-[#FAF8F5] text-stone-800 font-semibold text-xs sm:text-sm border border-stone-200 hover:border-[#D4AF37] hover:bg-[#F3E5AB]/20 transition-all flex items-center justify-center gap-2.5"
                  >
                    <ImagePlus className="w-4 h-4 text-[#B8860B]" />
                    <span>{t.upload.cameraBtn}</span>
                  </button>

                  <p className="text-[11px] text-center text-stone-500 italic">
                    💡 {lang === 'en' ? 'Fast client-side compression under 800KB for smooth uploads' : 'Hệ thống tự động nén ảnh tối ưu dưới 800KB để gửi mượt mà qua 4G'}
                  </p>
                </div>
              )}
            </div>

            {/* Guest Name Input */}
            <div className="mb-4">
              <label htmlFor="guestName" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5">
                {lang === 'en' ? '2. Your Name or Nickname' : '2. Tên hoặc biệt danh của bạn'} <span className="text-rose-500">*</span>
              </label>
              <input
                id="guestName"
                type="text"
                required
                maxLength={40}
                placeholder={t.upload.namePlaceholder}
                value={guestName}
                onChange={(e) => setGuestName(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm transition-colors placeholder:text-stone-400 bg-stone-50/50"
              />
            </div>

            {/* Wish Message Textarea */}
            <div className="mb-5">
              <label htmlFor="wishMessage" className="block text-xs font-bold text-stone-700 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span>{lang === 'en' ? '3. Message for Newlyweds' : '3. Lời chúc gửi dâu rể'}</span>
                <span className="text-[10px] text-stone-500 font-normal">
                  {lang === 'en' ? 'Optional' : 'Tùy chọn'}
                </span>
              </label>
              <textarea
                id="wishMessage"
                rows={3}
                maxLength={200}
                placeholder={t.upload.wishPlaceholder}
                value={wishMessage}
                onChange={(e) => setWishMessage(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl border border-stone-300 focus:border-[#D4AF37] focus:ring-2 focus:ring-[#D4AF37]/20 outline-none text-sm transition-colors placeholder:text-stone-400 bg-stone-50/50 resize-none"
              />
            </div>

            {/* Error Message */}
            {errorMessage && (
              <div className="mb-4 p-3 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Status Message */}
            {statusMessage && isProcessing && (
              <div className="mb-4 p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-center justify-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 animate-spin text-amber-600" />
                <span>{statusMessage}</span>
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isProcessing}
              className={`w-full py-4 px-6 rounded-2xl font-bold text-base shadow-lg transition-all flex items-center justify-center gap-2 ${
                isProcessing
                  ? 'bg-stone-400 text-white cursor-not-allowed'
                  : 'bg-gradient-to-r from-[#D4AF37] via-[#DFBD50] to-[#D4AF37] hover:brightness-105 text-stone-950 active:scale-98 shadow-[#D4AF37]/30'
              }`}
            >
              {isProcessing ? (
                <>
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  <span>{t.upload.submitting}</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5 text-stone-950" />
                  <span>{t.upload.submitBtn}</span>
                </>
              )}
            </button>
          </form>
        )}

        {/* Footer Note */}
        <div className="mt-6 text-center text-xs text-stone-500">
          <p className="flex items-center justify-center gap-1">
            <span>{lang === 'en' ? 'Powered by' : 'Được vận hành bởi'}</span>
            <span className="font-semibold text-stone-700">WeddingLive</span>
            <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
          </p>
          <p className="text-[10px] text-stone-500 mt-0.5">
            {lang === 'en' ? 'Zero app download • Instant web experience' : 'Không cần tải app • Không cần đăng nhập'}
          </p>
        </div>
      </div>

      {/* Gift & Registry Modal */}
      <VietQRModal
        isOpen={isGiftModalOpen}
        onClose={() => setIsGiftModalOpen(false)}
        coupleNames={coupleNames}
      />
    </div>
  );
}
