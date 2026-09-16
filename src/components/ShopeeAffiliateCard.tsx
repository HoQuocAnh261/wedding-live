'use client';

import React from 'react';
import { ShoppingBag, ExternalLink, Sparkles, CheckCircle2, Star } from 'lucide-react';

export function ShopeeAffiliateCard() {
  const shopeeItems = [
    {
      title: 'Combo 10-20 Chân Đế Mica Acrylic A6 Đứng Để Bàn Tiệc Cưới',
      rating: 4.9,
      sales: '2.4k+ đã bán',
      price: '18.500đ / cái',
      discount: '-25%',
      link: 'https://shopee.vn/search?keyword=chân+đế+mica+a6+để+bàn+tiệc+cưới',
      image: 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
      tag: 'Khuyên Dùng Cho Bàn Tiệc',
    },
    {
      title: 'Giấy Mỹ Thuật In Mã QR Cưới Ép Kim Vàng Gold Sang Trọng (A6)',
      rating: 5.0,
      sales: '1.1k+ đã bán',
      price: '4.200đ / tờ',
      discount: '-15%',
      link: 'https://shopee.vn/search?keyword=giấy+mỹ+thuật+a6+ép+kim+bàn+tiệc+cưới',
      image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80',
      tag: 'Ép Kim Cao Cấp',
    },
  ];

  return (
    <div className="bg-gradient-to-br from-amber-50/80 via-white to-orange-50/50 rounded-2xl p-6 border border-[#E8DFC8] shadow-sm">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 pb-3 border-b border-stone-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-[#EE4D2D] to-[#FF7337] flex items-center justify-center text-white shadow-sm">
            <ShoppingBag className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-serif font-bold text-stone-900 text-base sm:text-lg flex items-center gap-2">
              Vật Tư Bàn Tiệc Đề Xuất
              <span className="text-[11px] font-sans font-medium px-2 py-0.5 rounded-full bg-orange-100 text-orange-700">
                Shopee Affiliate
              </span>
            </h4>
            <p className="text-xs text-stone-500">
              Đặt chân đế Mica A6 để khách dễ dàng quét mã QR gửi ảnh & mừng cưới tại mỗi bàn tiệc
            </p>
          </div>
        </div>

        <div className="flex items-center gap-1 text-xs text-amber-700 bg-amber-100/60 px-2.5 py-1 rounded-full self-start sm:self-auto">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Tăng 300% lượng ảnh chụp</span>
        </div>
      </div>

      {/* Product List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {shopeeItems.map((item, idx) => (
          <div
            key={idx}
            className="flex flex-col sm:flex-row items-start sm:items-center gap-3 p-3 rounded-xl bg-white border border-stone-200/80 hover:border-amber-300 hover:shadow-md transition-all group"
          >
            <div className="w-full sm:w-20 h-28 sm:h-20 rounded-lg overflow-hidden relative flex-shrink-0 bg-stone-100">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform"
              />
              <span className="absolute top-1 left-1 text-[9px] bg-red-600 text-white font-bold px-1.5 py-0.5 rounded">
                {item.discount}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <div className="inline-block text-[10px] font-semibold text-amber-800 bg-amber-50 px-2 py-0.5 rounded mb-1">
                {item.tag}
              </div>
              <h5 className="text-xs font-medium text-stone-900 line-clamp-2 group-hover:text-[#EE4D2D] transition-colors">
                {item.title}
              </h5>

              <div className="flex items-center gap-2 mt-1 text-[11px] text-stone-500">
                <span className="flex items-center text-amber-500 font-semibold">
                  <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                  {item.rating}
                </span>
                <span>•</span>
                <span>{item.sales}</span>
              </div>

              <div className="flex items-center justify-between mt-2 pt-1 border-t border-stone-100">
                <span className="font-bold text-sm text-[#EE4D2D]">{item.price}</span>
                <a
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-medium text-stone-700 bg-stone-100 hover:bg-[#EE4D2D] hover:text-white px-2.5 py-1 rounded-lg transition-colors"
                >
                  <span>Xem Shopee</span>
                  <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="mt-3 flex flex-wrap items-center gap-4 text-[11px] text-stone-500 pt-2 border-t border-stone-200/60">
        <span className="flex items-center gap-1 text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5" /> Khổ A6 chuẩn đẹp không che khuất tầm nhìn
        </span>
        <span className="flex items-center gap-1 text-emerald-700">
          <CheckCircle2 className="w-3.5 h-3.5" /> Tái sử dụng được nhiều lần
        </span>
        <span className="text-stone-400">
          * Đặt trước 3-5 ngày trước ngày cưới để kịp in mã QR
        </span>
      </div>
    </div>
  );
}
