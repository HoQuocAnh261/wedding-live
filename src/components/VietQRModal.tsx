'use client';

import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Gift, Heart, ExternalLink, CreditCard, DollarSign } from 'lucide-react';
import { DEFAULT_BANK_INFO } from '@/lib/mock-data';
import { useLanguage } from '@/context/LanguageContext';

interface VietQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleNames?: string;
}

export function VietQRModal({ isOpen, onClose, coupleNames = 'Minh Anh & Tuấn Kiệt' }: VietQRModalProps) {
  const { lang, t } = useLanguage();
  const [activeTab, setActiveTab] = useState<'us' | 'vn'>(lang === 'en' ? 'us' : 'vn');
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<number | ''>(500000);
  const [message, setMessage] = useState('Wedding Gift for Newlyweds');

  if (!isOpen) return null;

  const bankInfo = DEFAULT_BANK_INFO;
  const sanitizedAddInfo = encodeURIComponent(message.replace(/[^a-zA-Z0-9 ]/g, ''));
  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNo}-compact2.png?amount=${amount || 0}&addInfo=${sanitizedAddInfo}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  const handleCopy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const presetAmountsVn = [200000, 500000, 1000000, 2000000];
  const presetAmountsUs = [50, 100, 200, 500];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div
        className="relative w-full max-w-lg bg-[#FAF8F5] rounded-3xl p-6 shadow-2xl border border-[#D4AF37]/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-white/80 rounded-full transition-colors"
          aria-label={t.giftModal.closeBtn}
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-4">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F3E5AB] text-[#B8860B] mb-2 shadow-inner">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            {t.giftModal.modalTitle}
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            {t.giftModal.modalSubtitle} • <span className="font-semibold text-[#B8860B]">{coupleNames}</span>
          </p>
        </div>

        {/* Tabs: US E-Wallets / Registry vs Domestic Bank Transfer */}
        <div className="grid grid-cols-2 gap-2 mb-4 p-1 bg-stone-200/60 rounded-2xl">
          <button
            type="button"
            onClick={() => setActiveTab('us')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'us'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🇺🇸</span>
            <span>{t.giftModal.tabRegistryUs}</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vn')}
            className={`py-2 px-3 rounded-xl text-xs font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeTab === 'vn'
                ? 'bg-white text-stone-900 shadow-sm'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            <span>🇻🇳</span>
            <span>{t.giftModal.tabBankVn}</span>
          </button>
        </div>

        {activeTab === 'us' ? (
          /* ================================================================ */
          /* US MARKET GIFT OPTIONS: Venmo, Zelle, Cash App, Honeyfund / Zola */
          /* ================================================================ */
          <div className="space-y-4">
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-xs space-y-3">
              <span className="text-[11px] font-bold text-stone-500 uppercase tracking-wider block">
                {t.giftModal.usRegistryNotice}
              </span>

              {/* Venmo Option */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-blue-50/70 border border-blue-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-blue-600 text-white font-bold flex items-center justify-center text-xs">
                    V
                  </div>
                  <div>
                    <span className="font-bold text-xs text-blue-950 block">Venmo</span>
                    <span className="font-mono text-xs text-blue-800">@TuanKiet-Wedding</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('@TuanKiet-Wedding')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-blue-300 text-blue-800 font-semibold text-xs shadow-xs hover:bg-blue-50 transition-colors"
                >
                  {copied ? t.giftModal.copied : 'Copy'}
                </button>
              </div>

              {/* Zelle Option */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-purple-50/70 border border-purple-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-purple-700 text-white font-bold flex items-center justify-center text-xs">
                    Z
                  </div>
                  <div>
                    <span className="font-bold text-xs text-purple-950 block">Zelle</span>
                    <span className="font-mono text-xs text-purple-800">wedding.kiet@gmail.com</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('wedding.kiet@gmail.com')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-purple-300 text-purple-800 font-semibold text-xs shadow-xs hover:bg-purple-50 transition-colors"
                >
                  {copied ? t.giftModal.copied : 'Copy'}
                </button>
              </div>

              {/* Cash App Option */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-emerald-50/70 border border-emerald-200/80">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-emerald-600 text-white font-bold flex items-center justify-center text-xs">
                    $
                  </div>
                  <div>
                    <span className="font-bold text-xs text-emerald-950 block">Cash App</span>
                    <span className="font-mono text-xs text-emerald-800">$WeddingKiet</span>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => handleCopy('$WeddingKiet')}
                  className="px-2.5 py-1 rounded-lg bg-white border border-emerald-300 text-emerald-800 font-semibold text-xs shadow-xs hover:bg-emerald-50 transition-colors"
                >
                  {copied ? t.giftModal.copied : 'Copy'}
                </button>
              </div>
            </div>

            {/* Wedding Registry Direct Links */}
            <div className="bg-[#FAF8F5] p-4 rounded-2xl border border-stone-200 text-xs space-y-2">
              <span className="font-bold text-stone-700 uppercase tracking-wider block text-[10px]">
                {t.giftModal.registryLinksLabel}
              </span>
              <div className="grid grid-cols-2 gap-2">
                <a
                  href="https://www.zola.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] font-semibold text-stone-800 flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>{t.giftModal.registryZola}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                </a>
                <a
                  href="https://www.honeyfund.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-white border border-stone-200 hover:border-[#D4AF37] font-semibold text-stone-800 flex items-center justify-between transition-colors shadow-xs"
                >
                  <span>{t.giftModal.registryHoneyfund}</span>
                  <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
                </a>
              </div>
            </div>
          </div>
        ) : (
          /* ================================================================ */
          /* VIETNAM DOMESTIC VIETQR BANK TRANSFER                            */
          /* ================================================================ */
          <div>
            {/* Dynamic VietQR Image Container */}
            <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center">
              <div className="w-56 h-56 sm:w-60 sm:h-60 relative bg-stone-50 rounded-xl overflow-hidden flex items-center justify-center border border-dashed border-stone-300">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={qrUrl}
                  alt="Mã VietQR Chuyển Khoản Mừng Cưới"
                  className="w-full h-full object-contain p-2"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=vietqr-bank-${bankInfo.bankId}-${bankInfo.accountNo}`;
                  }}
                />
              </div>
              <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2">
                <QrCode className="w-3.5 h-3.5 text-[#B8860B]" />
                <span>{t.giftModal.bankTransferHint}</span>
              </div>
            </div>

            {/* Quick Amount Selector */}
            <div className="mt-3">
              <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                {t.giftModal.quickSelectAmount}
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {presetAmountsVn.map((amt) => (
                  <button
                    key={amt}
                    type="button"
                    onClick={() => setAmount(amt)}
                    className={`py-1.5 px-1 rounded-xl text-xs font-medium border transition-all ${
                      amount === amt
                        ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                        : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    {(amt / 1000).toLocaleString('vi-VN')}k
                  </button>
                ))}
              </div>
            </div>

            {/* Bank Account Details */}
            <div className="mt-3 bg-[#F5EFE6]/70 rounded-2xl p-3.5 border border-[#E8DFC8] space-y-2 text-xs">
              <div className="flex justify-between items-center text-stone-600">
                <span>Ngân hàng:</span>
                <span className="font-semibold text-stone-900">{bankInfo.bankNameDisplay}</span>
              </div>

              <div className="flex justify-between items-center text-stone-600">
                <span>Chủ tài khoản:</span>
                <span className="font-bold text-stone-900 uppercase">{bankInfo.accountName}</span>
              </div>

              <div className="flex justify-between items-center pt-1 border-t border-[#E8DFC8]">
                <span>Số tài khoản:</span>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-[#B8860B] tracking-wider">
                    {bankInfo.accountNo}
                  </span>
                  <button
                    type="button"
                    onClick={() => handleCopy(bankInfo.accountNo)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors text-[11px] shadow-xs"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700 font-semibold">{t.giftModal.copied}</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-stone-500" />
                        <span>{t.giftModal.copyAccountBtn}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-stone-500 italic flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            <span>{coupleNames} sincerely appreciates your blessings!</span>
          </p>
        </div>
      </div>
    </div>
  );
}

// Export alias for backward compatibility with existing imports
export const WeddingGiftModal = VietQRModal;
