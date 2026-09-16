'use client';

import React, { useState } from 'react';
import { X, Copy, Check, QrCode, Gift, Heart } from 'lucide-react';
import { DEFAULT_BANK_INFO } from '@/lib/mock-data';

interface VietQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  coupleNames?: string;
}

export function VietQRModal({ isOpen, onClose, coupleNames = 'Minh Anh & Tuấn Kiệt' }: VietQRModalProps) {
  const [copied, setCopied] = useState(false);
  const [amount, setAmount] = useState<number | ''>(500000);
  const [message, setMessage] = useState('Mung cuoi Minh Anh Tuan Kiet');

  if (!isOpen) return null;

  const bankInfo = DEFAULT_BANK_INFO;
  const sanitizedAddInfo = encodeURIComponent(message.replace(/[^a-zA-Z0-9 ]/g, ''));
  const qrUrl = `https://img.vietqr.io/image/${bankInfo.bankId}-${bankInfo.accountNo}-compact2.png?amount=${amount || 0}&addInfo=${sanitizedAddInfo}&accountName=${encodeURIComponent(bankInfo.accountName)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(bankInfo.accountNo);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const presetAmounts = [200000, 500000, 1000000, 2000000];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-md bg-[#FAF8F5] rounded-3xl p-6 shadow-2xl border border-[#D4AF37]/30 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-stone-400 hover:text-stone-700 bg-white/80 rounded-full transition-colors"
          aria-label="Đóng"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="text-center mb-5">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#F3E5AB] text-[#B8860B] mb-2 shadow-inner">
            <Gift className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-stone-900">
            Gửi Quà Mừng Cưới
          </h3>
          <p className="text-xs text-stone-500 mt-1">
            Gửi gắm lời chúc & món quà mừng tới <span className="font-semibold text-[#B8860B]">{coupleNames}</span>
          </p>
        </div>

        {/* Dynamic VietQR Image Container */}
        <div className="bg-white p-4 rounded-2xl border border-stone-200 shadow-sm flex flex-col items-center">
          <div className="w-56 h-56 sm:w-64 sm:h-64 relative bg-stone-50 rounded-xl overflow-hidden flex items-center justify-center border border-dashed border-stone-300">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={qrUrl}
              alt="Mã VietQR Chuyển Khoản Mừng Cưới"
              className="w-full h-full object-contain p-2"
              onError={(e) => {
                // Fallback placeholder if offline
                (e.target as HTMLImageElement).src = `https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=vietqr-bank-${bankInfo.bankId}-${bankInfo.accountNo}`;
              }}
            />
          </div>
          <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-2">
            <QrCode className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Mở app ngân hàng bất kỳ để quét mã VietQR tự động</span>
          </div>
        </div>

        {/* Quick Amount Selector */}
        <div className="mt-4">
          <label className="text-[11px] font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
            Chọn nhanh số tiền mừng:
          </label>
          <div className="grid grid-cols-4 gap-1.5">
            {presetAmounts.map((amt) => (
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
        <div className="mt-4 bg-[#F5EFE6]/70 rounded-2xl p-4 border border-[#E8DFC8] space-y-2.5 text-xs">
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
                onClick={handleCopy}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-white border border-stone-200 text-stone-700 hover:bg-stone-50 transition-colors text-[11px] shadow-xs"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-semibold">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5 text-stone-500" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div className="mt-4 text-center">
          <p className="text-xs text-stone-500 italic flex items-center justify-center gap-1">
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-rose-500 inline" />
            Minh Anh & Tuấn Kiệt trân trọng cảm ơn tấm lòng của bạn!
          </p>
        </div>
      </div>
    </div>
  );
}
