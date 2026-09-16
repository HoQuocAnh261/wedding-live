'use client';

import React, { useState, useEffect, useCallback } from 'react';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  Download,
  Trash2,
  Clock,
  Check,
  RefreshCw,
  Image as ImageIcon,
  Sparkles,
  ExternalLink,
  Search,
  Filter,
} from 'lucide-react';
import { WeddingPhoto, PhotoStatus } from '@/types/wedding';
import { getPhotos, updatePhotoStatus, deletePhoto } from '@/lib/supabase';
import { ShopeeAffiliateCard } from '@/components/ShopeeAffiliateCard';
import { INITIAL_WEDDING_PHOTOS } from '@/lib/mock-data';

export default function AdminPage() {
  const [photos, setPhotos] = useState<WeddingPhoto[]>(INITIAL_WEDDING_PHOTOS);
  const [activeTab, setActiveTab] = useState<'pending' | 'approved'>('pending');
  const [isLoading, setIsLoading] = useState(false);
  const [isZipping, setIsZipping] = useState(false);
  const [zipProgress, setZipProgress] = useState<string>('');
  const [searchTerm, setSearchTerm] = useState('');
  const [actionSuccessMessage, setActionSuccessMessage] = useState<string | null>(null);

  const eventSlug = process.env.NEXT_PUBLIC_DEFAULT_EVENT_SLUG || 'dam-cuoi-minh-anh';
  const coupleNames = process.env.NEXT_PUBLIC_EVENT_NAME || 'Minh Anh & Tuấn Kiệt';

  // Fetch photos
  const fetchPhotosList = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getPhotos(eventSlug);
      setPhotos(data);
    } catch (err) {
      console.warn('Error fetching photos in admin:', err);
    } finally {
      setIsLoading(false);
    }
  }, [eventSlug]);

  useEffect(() => {
    fetchPhotosList();
  }, [fetchPhotosList]);

  // Show temporary action toast
  const showToast = (msg: string) => {
    setActionSuccessMessage(msg);
    setTimeout(() => setActionSuccessMessage(null), 3000);
  };

  // Handle Approve
  const handleApprove = async (id: string) => {
    const success = await updatePhotoStatus(id, 'approved');
    if (success) {
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'approved' } : p)));
      showToast('Đã duyệt ảnh thành công! Ảnh sẽ hiện trên màn hình LED.');
    }
  };

  // Handle Reject
  const handleReject = async (id: string) => {
    const success = await updatePhotoStatus(id, 'rejected');
    if (success) {
      setPhotos((prev) => prev.map((p) => (p.id === id ? { ...p, status: 'rejected' } : p)));
      showToast('Đã từ chối ảnh.');
    }
  };

  // Handle Delete
  const handleDelete = async (id: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa vĩnh viễn ảnh này?')) return;
    const success = await deletePhoto(id);
    if (success) {
      setPhotos((prev) => prev.filter((p) => p.id !== id));
      showToast('Đã xóa ảnh.');
    }
  };

  // Bulk Download all approved photos as a ZIP file using JSZip
  const handleDownloadAllZip = async () => {
    const approvedPhotos = photos.filter((p) => p.status === 'approved');
    if (approvedPhotos.length === 0) {
      alert('Chưa có ảnh nào được duyệt để tải về.');
      return;
    }

    setIsZipping(true);
    setZipProgress('Đang khởi tạo gói nén ZIP...');

    try {
      const zip = new JSZip();
      const folder = zip.folder(`Anh-Cuoi-${eventSlug}`) || zip;

      let completedCount = 0;
      setZipProgress(`Đang tải ảnh (0/${approvedPhotos.length})...`);

      // Download each image blob and add to ZIP
      for (let i = 0; i < approvedPhotos.length; i++) {
        const photo = approvedPhotos[i];
        try {
          const res = await fetch(photo.photo_url, { mode: 'cors' });
          const blob = await res.blob();
          const cleanGuestName = photo.guest_name.replace(/[^a-zA-Z0-9_-]/g, '_').substring(0, 20);
          const fileName = `${i + 1}_${cleanGuestName}_${photo.id.substring(0, 6)}.jpg`;
          folder.file(fileName, blob);
        } catch (downloadErr) {
          console.warn(`Could not download image ${photo.photo_url}`, downloadErr);
        }

        completedCount++;
        setZipProgress(`Đang tải ảnh (${completedCount}/${approvedPhotos.length})...`);
      }

      setZipProgress('Đang nén file ZIP, vui lòng đợi giây lát...');
      const zipContent = await zip.generateAsync({ type: 'blob' }, (metadata) => {
        setZipProgress(`Đang tạo file nén: ${Math.round(metadata.percent)}%`);
      });

      saveAs(zipContent, `Album-Cuoi-${eventSlug}-${new Date().toISOString().slice(0, 10)}.zip`);
      showToast(`Đã tải xuống thành công ${completedCount} ảnh!`);
    } catch (err) {
      console.error('ZIP download error:', err);
      alert('Có lỗi khi tạo file ZIP. Bạn có thể tải từng ảnh trực tiếp.');
    } finally {
      setIsZipping(false);
      setZipProgress('');
    }
  };

  // Filter photos based on activeTab and searchTerm
  const filteredPhotos = photos.filter((photo) => {
    const matchesTab = photo.status === activeTab;
    const matchesSearch =
      photo.guest_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (photo.wish_message && photo.wish_message.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchesTab && matchesSearch;
  });

  const pendingCount = photos.filter((p) => p.status === 'pending').length;
  const approvedCount = photos.filter((p) => p.status === 'approved').length;

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-20">
      {/* Top Header */}
      <div className="bg-white border-b border-[#E8DFC8] px-4 sm:px-8 py-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-[#B8860B] uppercase tracking-wider mb-1">
              <ShieldCheck className="w-4 h-4" />
              <span>Hệ Thống Kiểm Duyệt Tiệc Cưới</span>
            </div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-stone-900">
              Quản Trị Ảnh & Màn Hình Sân Khấu
            </h1>
            <p className="text-xs sm:text-sm text-stone-500 mt-1">
              Sự kiện: <span className="font-semibold text-stone-800">{coupleNames}</span> ({eventSlug})
            </p>
          </div>

          {/* Action Bar: Download ZIP & Live Link */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={handleDownloadAllZip}
              disabled={isZipping || approvedCount === 0}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#C29B27] text-stone-950 font-bold text-xs sm:text-sm shadow-sm hover:brightness-105 transition-all disabled:opacity-50 active:scale-95"
            >
              {isZipping ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>{zipProgress || 'Đang nén ZIP...'}</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" />
                  <span>Tải Về Toàn Bộ Ảnh (.ZIP)</span>
                </>
              )}
            </button>

            <a
              href="/live"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-stone-900 text-white font-medium text-xs sm:text-sm hover:bg-stone-800 transition-colors shadow-xs"
            >
              <span>Mở Màn LED Sân Khấu</span>
              <ExternalLink className="w-3.5 h-3.5 text-amber-400" />
            </a>

            <button
              onClick={fetchPhotosList}
              disabled={isLoading}
              className="p-2.5 rounded-xl bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
              title="Làm mới danh sách"
            >
              <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {/* Stats Counter Bar */}
        <div className="max-w-7xl mx-auto grid grid-cols-2 sm:grid-cols-4 gap-3 mt-6">
          <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-4">
            <span className="text-xs text-amber-800 font-medium block">Đang Chờ Duyệt</span>
            <span className="text-2xl sm:text-3xl font-bold text-amber-900 font-mono mt-0.5 block">
              {pendingCount}
            </span>
          </div>

          <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-4">
            <span className="text-xs text-emerald-800 font-medium block">Đã Chiếu Lên LED</span>
            <span className="text-2xl sm:text-3xl font-bold text-emerald-900 font-mono mt-0.5 block">
              {approvedCount}
            </span>
          </div>

          <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4">
            <span className="text-xs text-stone-600 font-medium block">Tổng Ảnh Nhận Được</span>
            <span className="text-2xl sm:text-3xl font-bold text-stone-900 font-mono mt-0.5 block">
              {photos.length}
            </span>
          </div>

          <div className="bg-purple-50/70 border border-purple-200/80 rounded-2xl p-4">
            <span className="text-xs text-purple-800 font-medium block">Lời Chúc Chúc Phúc</span>
            <span className="text-2xl sm:text-3xl font-bold text-purple-900 font-mono mt-0.5 block">
              {photos.filter((p) => Boolean(p.wish_message)).length}
            </span>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 mt-6">
        {/* Toast Notification */}
        {actionSuccessMessage && (
          <div className="mb-5 p-3 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs sm:text-sm font-medium flex items-center gap-2 animate-fade-in">
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
            <span>{actionSuccessMessage}</span>
          </div>
        )}

        {/* Shopee Affiliate Upsell Card Component */}
        <div className="mb-8">
          <ShopeeAffiliateCard />
        </div>

        {/* Tab Selection & Filter Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-6">
          {/* Tabs */}
          <div className="inline-flex p-1 rounded-2xl bg-stone-200/80 max-w-fit">
            <button
              onClick={() => setActiveTab('pending')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'pending'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Clock className="w-4 h-4 text-amber-500" />
              <span>Chờ Duyệt</span>
              {pendingCount > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[11px] bg-amber-500 text-white font-bold">
                  {pendingCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('approved')}
              className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all ${
                activeTab === 'approved'
                  ? 'bg-white text-stone-900 shadow-sm'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <CheckCircle2 className="w-4 h-4 text-emerald-500" />
              <span>Đã Duyệt (Đang Chiếu)</span>
              <span className="px-2 py-0.5 rounded-full text-[11px] bg-stone-200 text-stone-700 font-bold">
                {approvedCount}
              </span>
            </button>
          </div>

          {/* Search Input */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Tìm theo tên khách hoặc lời chúc..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 rounded-xl border border-stone-300 text-xs sm:text-sm focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37] outline-none bg-white"
            />
          </div>
        </div>

        {/* Photos Grid Feed */}
        {filteredPhotos.length === 0 ? (
          <div className="bg-white rounded-3xl p-12 text-center border border-dashed border-stone-300">
            <div className="w-16 h-16 rounded-full bg-stone-100 flex items-center justify-center mx-auto mb-3 text-stone-400">
              <ImageIcon className="w-8 h-8" />
            </div>
            <h3 className="font-serif text-lg font-bold text-stone-700">
              {activeTab === 'pending'
                ? 'Không có ảnh nào đang chờ duyệt!'
                : 'Chưa có ảnh nào được duyệt.'}
            </h3>
            <p className="text-xs text-stone-500 mt-1">
              {activeTab === 'pending'
                ? 'Tất cả ảnh gửi lên đã được duyệt hoặc chế độ tự động duyệt đang hoạt động.'
                : 'Ảnh sau khi được duyệt sẽ hiển thị tại đây và chiếu lên màn hình LED.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
            {filteredPhotos.map((photo) => (
              <div
                key={photo.id}
                className="bg-white rounded-2xl overflow-hidden border border-stone-200/90 shadow-sm hover:shadow-md transition-all flex flex-col group"
              >
                {/* Photo Image Container */}
                <div className="relative aspect-4/3 w-full bg-stone-100 overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={photo.photo_url}
                    alt={photo.guest_name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />
                  <span
                    className={`absolute top-2.5 left-2.5 px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider backdrop-blur-md ${
                      photo.status === 'approved'
                        ? 'bg-emerald-600/90 text-white'
                        : 'bg-amber-500/90 text-white'
                    }`}
                  >
                    {photo.status === 'approved' ? 'Đang chiếu' : 'Chờ duyệt'}
                  </span>
                </div>

                {/* Photo Info */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="font-serif font-bold text-stone-900 text-sm line-clamp-1">
                      {photo.guest_name}
                    </h4>
                    {photo.wish_message && (
                      <p className="text-xs text-stone-600 italic mt-1.5 line-clamp-3 bg-stone-50 p-2 rounded-lg border border-stone-100">
                        &ldquo;{photo.wish_message}&rdquo;
                      </p>
                    )}
                    <span className="text-[10px] text-stone-400 block mt-2">
                      {new Date(photo.created_at).toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                        day: '2-digit',
                        month: '2-digit',
                      })}
                    </span>
                  </div>

                  {/* One-Click Action Buttons */}
                  <div className="mt-4 pt-3 border-t border-stone-100 flex items-center gap-1.5">
                    {photo.status === 'pending' ? (
                      <>
                        <button
                          onClick={() => handleApprove(photo.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-semibold text-xs transition-colors flex items-center justify-center gap-1 shadow-xs"
                        >
                          <Check className="w-3.5 h-3.5" />
                          <span>Duyệt Ngay</span>
                        </button>
                        <button
                          onClick={() => handleReject(photo.id)}
                          className="py-2 px-3 rounded-xl bg-stone-100 hover:bg-rose-50 hover:text-rose-600 text-stone-600 text-xs transition-colors"
                          title="Từ chối"
                        >
                          <XCircle className="w-4 h-4" />
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleReject(photo.id)}
                          className="flex-1 py-2 px-3 rounded-xl bg-stone-100 hover:bg-amber-50 hover:text-amber-700 text-stone-700 text-xs font-medium transition-colors flex items-center justify-center gap-1"
                        >
                          <span>Ẩn khỏi màn LED</span>
                        </button>
                        <button
                          onClick={() => handleDelete(photo.id)}
                          className="p-2 rounded-xl bg-stone-100 hover:bg-rose-100 text-stone-500 hover:text-rose-700 transition-colors"
                          title="Xóa vĩnh viễn"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
