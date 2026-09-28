'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import {
  Printer,
  Sparkles,
  Layout,
  Palette,
  Layers,
  ArrowLeft,
  CheckCircle2,
  Gift,
  ExternalLink,
  Copy,
  Info,
  FileSpreadsheet,
  Upload,
  Download,
  Filter,
  ArrowUpDown,
  Building,
  MapPin,
  Users,
  CheckSquare,
  Square,
  Search,
  Share2,
} from 'lucide-react';
import { PrintCardPreview, CardData, CardTheme, CardType } from '@/components/PrintCardPreview';
import { WeddingGuest, GuestSortField } from '@/types/guest';
import {
  SAMPLE_WEDDING_GUESTS,
  parseGuestExcel,
  downloadSampleGuestExcel,
  sortGuests,
} from '@/lib/excel-guest';

export default function PrintPage() {
  const [originUrl, setOriginUrl] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Card general settings
  const [cardType, setCardType] = useState<CardType>('envelope');
  const [theme, setTheme] = useState<CardTheme>('gold');
  const [groomName, setGroomName] = useState('Tuấn Kiệt');
  const [brideName, setBrideName] = useState('Minh Anh');
  const [weddingDate, setWeddingDate] = useState('26.10.2026');
  const [weddingTime, setWeddingTime] = useState('18:00 (Khai tiệc 18:30)');
  const [venueName, setVenueName] = useState('Trung Tâm Hội Nghị GEM Center');
  const [hallName, setHallName] = useState('Sảnh Grand Ballroom - Lầu 3');
  const [venueAddress, setVenueAddress] = useState('08 Nguyễn Bỉnh Khiêm, Đa Kao, Quận 1, TP. HCM');
  const [tableNumber, setTableNumber] = useState('BÀN SỐ 08');
  const [customNote, setCustomNote] = useState('Quét mã để chụp ảnh selfie & chúc phúc trực tiếp lên màn hình LED sân khấu!');
  
  // Toggles
  const [showQRUpload, setShowQRUpload] = useState(true);
  const [showVietQR, setShowVietQR] = useState(true);
  const [showTableNumber, setShowTableNumber] = useState(true);

  // Guests List & Excel management
  const [guests, setGuests] = useState<WeddingGuest[]>(SAMPLE_WEDDING_GUESTS);
  const [selectedGuestIds, setSelectedGuestIds] = useState<Set<string>>(
    new Set(SAMPLE_WEDDING_GUESTS.map((g) => g.id))
  );
  const [activeGuestIndex, setActiveGuestIndex] = useState(0);
  const [sortField, setSortField] = useState<GuestSortField>('company');
  const [filterCompany, setFilterCompany] = useState<string>('all');
  const [filterAddress, setFilterAddress] = useState<string>('all');
  const [searchGuest, setSearchGuest] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Mode: Single vs Batch Print
  const [isBatchMode, setIsBatchMode] = useState(true);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const origin = window.location.origin;
      setOriginUrl(`${origin}/upload`);
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Handle Excel Upload
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsImporting(true);
    try {
      const parsed = await parseGuestExcel(file);
      if (parsed.length === 0) {
        alert('Không tìm thấy danh sách khách mời trong file. Vui lòng kiểm tra lại file Excel!');
      } else {
        setGuests(parsed);
        setSelectedGuestIds(new Set(parsed.map((g) => g.id)));
        setActiveGuestIndex(0);
        showToast(`Đã nhập thành công ${parsed.length} khách mời từ file Excel!`);
      }
    } catch (err) {
      console.error('Lỗi đọc file Excel:', err);
      alert('Có lỗi khi đọc file Excel. Vui lòng đảm bảo file có định dạng .xlsx hoặc .xls hợp lệ.');
    } finally {
      setIsImporting(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  // Unique companies and addresses for filter dropdowns
  const uniqueCompanies = Array.from(new Set(guests.map((g) => g.company).filter(Boolean)));
  const uniqueAddresses = Array.from(new Set(guests.map((g) => g.address).filter(Boolean)));

  // Filter & sort guests
  const filteredGuests = sortGuests(
    guests.filter((guest) => {
      const matchCompany = filterCompany === 'all' || guest.company === filterCompany;
      const matchAddress = filterAddress === 'all' || guest.address === filterAddress;
      const matchSearch =
        searchGuest === '' ||
        guest.name.toLowerCase().includes(searchGuest.toLowerCase()) ||
        guest.company.toLowerCase().includes(searchGuest.toLowerCase()) ||
        guest.address.toLowerCase().includes(searchGuest.toLowerCase());
      return matchCompany && matchAddress && matchSearch;
    }),
    sortField
  );

  const selectedGuestsForPrint = filteredGuests.filter((g) => selectedGuestIds.has(g.id));

  // Toggle selection
  const toggleSelectGuest = (id: string) => {
    const next = new Set(selectedGuestIds);
    if (next.has(id)) next.delete(id);
    else next.add(id);
    setSelectedGuestIds(next);
  };

  const selectAllFiltered = () => {
    const next = new Set(selectedGuestIds);
    filteredGuests.forEach((g) => next.add(g.id));
    setSelectedGuestIds(next);
  };

  const deselectAllFiltered = () => {
    const next = new Set(selectedGuestIds);
    filteredGuests.forEach((g) => next.delete(g.id));
    setSelectedGuestIds(next);
  };

  const currentPreviewGuest = selectedGuestsForPrint[activeGuestIndex] || filteredGuests[0] || guests[0];

  const cardData: CardData = {
    groomName,
    brideName,
    weddingDate,
    weddingTime,
    venueName,
    venueAddress,
    hallName,
    tableNumber,
    uploadUrl: originUrl || 'https://wedding-live-theta.vercel.app/upload',
    showQRUpload,
    showVietQR,
    showTableNumber,
    customNote,
    cardType,
    theme,
    guest: currentPreviewGuest,
  };

  const themesList: { id: CardTheme; name: string; bg: string; border: string; desc: string; icon: string }[] = [
    {
      id: 'red',
      name: 'Starlit Garden (Đỏ Hỷ Truyền Thống)',
      bg: 'bg-[#6B1120]',
      border: 'border-[#E6C687]',
      desc: 'Đỏ Velvet Bordeaux, khung Baroque hoàng gia & hoa hồng nhung',
      icon: '🌹',
    },
    {
      id: 'rose',
      name: 'Golden Soirée (Hồng Phấn & Chữ Hỷ 囍)',
      bg: 'bg-[#FFF0E6]',
      border: 'border-[#FB923C]',
      desc: 'Hoa mẫu đơn cam đào watercolor & chữ Hỷ thư pháp may mắn',
      icon: '🌸',
    },
    {
      id: 'noir',
      name: 'Amber Noir (Cổ Điển Espresso)',
      bg: 'bg-[#1C1816]',
      border: 'border-[#CBB282]',
      desc: 'Tone than cà phê trầm ấm, hoa trà vintage Châu Âu',
      icon: '☕',
    },
    {
      id: 'greenery',
      name: 'Poised Romance (Xanh Đêm Hoàng Gia)',
      bg: 'bg-[#0B1A2A]',
      border: 'border-[#93C5FD]',
      desc: 'Xanh Navy đêm đầy sao, hoa dại đồng nội pastel lãng mạn',
      icon: '✨',
    },
    {
      id: 'emerald',
      name: 'Emerald Garden (Xanh Ngọc Lục Bảo)',
      bg: 'bg-[#064E3B]',
      border: 'border-[#6EE7B7]',
      desc: 'Lá khuynh diệp nhiệt đới và cành hoàng kim thanh mát',
      icon: '🌿',
    },
    {
      id: 'lavender',
      name: 'Lavender Dream (Tím Lavender Mộng Mơ)',
      bg: 'bg-[#4C1D95]',
      border: 'border-[#C084FC]',
      desc: 'Hoa tử đằng và sắc tím oải hương Pháp chung thủy ngọt ngào',
      icon: '💜',
    },
    {
      id: 'chinoiserie',
      name: 'Chinoiserie Heritage (Xanh Men Lam Cung Đình)',
      bg: 'bg-[#DBEAFE]',
      border: 'border-[#2563EB]',
      desc: 'Họa tiết gốm sứ hoa lam truyền thống hoàng gia Đông Dương',
      icon: '🏛️',
    },
    {
      id: 'terracotta',
      name: 'Sunset Terracotta (Cam Đất Hoàng Hôn Boho)',
      bg: 'bg-[#7C2D12]',
      border: 'border-[#FDBA74]',
      desc: 'Cỏ lau pampas, lá cọ khô và sắc cam đất phóng khoáng',
      icon: '🌾',
    },
    {
      id: 'minimalist',
      name: 'Modern Minimalist (Trắng Xám Tối Giản)',
      bg: 'bg-[#F8FAFC]',
      border: 'border-[#CBD5E1]',
      desc: 'Phong cách tối giản đương đại Hàn Quốc, tinh khiết tao nhã',
      icon: '🤍',
    },
    {
      id: 'gold',
      name: 'Royal Ivory (Vàng Hoàng Gia Luxury)',
      bg: 'bg-[#FAF8F5]',
      border: 'border-[#D4AF37]',
      desc: 'Giấy mỹ thuật kem ngọc trai, viền vàng dập nổi đẳng cấp',
      icon: '👑',
    },
  ];

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FAF8F5] text-stone-900 pb-20 font-sans">
      
      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-2xl bg-stone-900 text-white font-medium text-xs sm:text-sm shadow-2xl flex items-center gap-2 animate-fade-in border border-amber-400">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Controls (Hidden on Print) */}
      <div className="no-print bg-white border-b border-[#E8DFC8] px-4 sm:px-8 py-5 sticky top-0 z-30 shadow-xs backdrop-blur-md bg-white/95">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="p-2 rounded-xl border border-stone-200 hover:bg-stone-100 text-stone-600 transition-colors"
              title="Quay lại Admin"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-[#B8860B] uppercase tracking-wider mb-0.5">
                <Printer className="w-3.5 h-3.5" />
                <span>In Ấn Không Cần Viết Tay • Nhập Excel Chuẩn</span>
              </div>
              <h1 className="font-serif text-xl sm:text-2xl font-bold text-stone-900">
                Tạo Thiệp Cưới & Bảng QR Bàn Tiệc
              </h1>
            </div>
          </div>

          {/* Action Print Buttons */}
          <div className="flex items-center gap-2.5">
            <Link
              href="/invitation"
              target="_blank"
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-rose-50 text-rose-800 border border-rose-200 font-semibold text-xs hover:bg-rose-100 transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-rose-600" />
              <span>Xem Thiệp Online (Mobile)</span>
            </Link>

            <button
              onClick={handlePrint}
              disabled={selectedGuestsForPrint.length === 0}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-[#D4AF37] to-[#B8860B] text-stone-950 font-bold text-xs sm:text-sm shadow-md hover:brightness-105 active:scale-95 transition-all disabled:opacity-50"
            >
              <Printer className="w-4 h-4" />
              <span>
                {isBatchMode
                  ? `In Hàng Loạt (${selectedGuestsForPrint.length} Thiệp / Bao Thư)`
                  : 'In Bản Này Ngay (Print)'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Workspace (Hidden on Print) */}
      <div className="no-print max-w-7xl mx-auto px-4 sm:px-8 mt-6 grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Settings & Excel Guest List (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          
          {/* Card Type & Themes Selector */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DFC8] shadow-sm space-y-4">
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Layout className="w-4 h-4 text-[#B8860B]" />
                <span>1. Chọn loại ấn phẩm in</span>
              </label>
              <div className="grid grid-cols-3 gap-2">
                <button
                  type="button"
                  onClick={() => setCardType('envelope')}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold border text-center transition-all ${
                    cardType === 'envelope'
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  ✉️ In Bao Thư (Phong Bì)
                  <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                    Có tên khách & cơ quan
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardType('invitation')}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold border text-center transition-all ${
                    cardType === 'invitation'
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  📜 In Ruột Thiệp Mời
                  <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                    Khổ A5 / A6 chuẩn
                  </span>
                </button>

                <button
                  type="button"
                  onClick={() => setCardType('table_stand')}
                  className={`py-2.5 px-2 rounded-2xl text-xs font-bold border text-center transition-all ${
                    cardType === 'table_stand'
                      ? 'bg-[#D4AF37] text-white border-[#D4AF37] shadow-sm'
                      : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                  }`}
                >
                  🍽️ Bảng QR Bàn Tiệc
                  <span className="block text-[10px] font-normal opacity-90 mt-0.5">
                    Mica A6 đứng
                  </span>
                </button>
              </div>
            </div>

            {/* Themes Swatches */}
            <div>
              <label className="text-xs font-bold text-stone-700 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <Palette className="w-4 h-4 text-[#B8860B]" />
                <span>2. Chọn phong cách màu sắc</span>
              </label>
              <div className="flex flex-wrap gap-2">
                {themesList.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setTheme(item.id)}
                    className={`px-3 py-1.5 rounded-full border text-xs font-medium flex items-center gap-1.5 transition-all ${
                      theme === item.id
                        ? 'border-[#D4AF37] ring-2 ring-[#D4AF37]/30 bg-amber-50 text-[#B8860B] font-bold'
                        : 'border-stone-200 hover:bg-stone-50 text-stone-700'
                    }`}
                  >
                    <span className={`w-3 h-3 rounded-full border ${item.bg} ${item.border}`} />
                    <span>{item.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* EXCEL IMPORT & GUEST MANAGEMENT SECTION */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DFC8] shadow-sm space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-stone-100">
              <div>
                <h3 className="font-serif text-lg font-bold text-stone-900 flex items-center gap-2">
                  <FileSpreadsheet className="w-5 h-5 text-emerald-600" />
                  <span>Danh Sách Khách Mời In Thiệp ({guests.length} khách)</span>
                </h3>
                <p className="text-xs text-stone-500">
                  Tải file Excel lên để hệ thống tự điền tên từng người, không cần viết tay mỏi mệt
                </p>
              </div>

              {/* Excel Import & Sample Download Buttons */}
              <div className="flex items-center gap-2 flex-wrap">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".xlsx, .xls, .csv"
                  className="hidden"
                  onChange={handleFileUpload}
                />
                
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isImporting}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-emerald-600 text-white font-semibold text-xs hover:bg-emerald-700 transition-colors shadow-xs"
                >
                  <Upload className="w-3.5 h-3.5" />
                  <span>{isImporting ? 'Đang đọc...' : 'Tải File Excel (.xlsx)'}</span>
                </button>

                <button
                  type="button"
                  onClick={downloadSampleGuestExcel}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-stone-300 text-stone-700 font-medium text-xs hover:bg-stone-50 transition-colors"
                  title="Tải file mẫu về máy để điền"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Tải File Mẫu</span>
                </button>
              </div>
            </div>

            {/* Smart Sort & Filters Bar */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 p-3 rounded-2xl bg-[#FAF8F5] border border-stone-200/80 text-xs">
              
              {/* Sort By Field */}
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1 flex items-center gap-1">
                  <ArrowUpDown className="w-3 h-3 text-[#B8860B]" />
                  <span>Sắp xếp in theo:</span>
                </label>
                <select
                  value={sortField}
                  onChange={(e) => setSortField(e.target.value as GuestSortField)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white font-semibold text-stone-800 outline-none"
                >
                  <option value="company">🏢 Theo Công Ty / Nơi Làm Việc</option>
                  <option value="address">📍 Theo Địa Chỉ / Tỉnh Thành</option>
                  <option value="group">👥 Theo Mối Quan Hệ / Nhóm</option>
                  <option value="tableNumber">🍽️ Theo Số Bàn Tiệc</option>
                  <option value="name">🔤 Theo Tên Khách A-Z</option>
                </select>
              </div>

              {/* Filter By Company */}
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1 flex items-center gap-1">
                  <Building className="w-3 h-3 text-[#B8860B]" />
                  <span>Lọc theo Công Ty:</span>
                </label>
                <select
                  value={filterCompany}
                  onChange={(e) => setFilterCompany(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-800 outline-none"
                >
                  <option value="all">Tất cả công ty ({guests.length})</option>
                  {uniqueCompanies.map((c) => (
                    <option key={c} value={c}>
                      {c} ({guests.filter((g) => g.company === c).length})
                    </option>
                  ))}
                </select>
              </div>

              {/* Filter By Address */}
              <div>
                <label className="text-[11px] font-bold text-stone-700 block mb-1 flex items-center gap-1">
                  <MapPin className="w-3 h-3 text-[#B8860B]" />
                  <span>Lọc theo Khu Vực:</span>
                </label>
                <select
                  value={filterAddress}
                  onChange={(e) => setFilterAddress(e.target.value)}
                  className="w-full px-2.5 py-1.5 rounded-lg border border-stone-300 bg-white text-stone-800 outline-none"
                >
                  <option value="all">Tất cả địa chỉ</option>
                  {uniqueAddresses.map((a) => (
                    <option key={a} value={a}>
                      {a} ({guests.filter((g) => g.address === a).length})
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Quick Search & Bulk Select Controls */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2 pt-1">
              <div className="relative flex-1">
                <Search className="w-3.5 h-3.5 text-stone-400 absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Tìm theo tên, cơ quan, địa chỉ..."
                  value={searchGuest}
                  onChange={(e) => setSearchGuest(e.target.value)}
                  className="w-full pl-8 pr-3 py-1.5 rounded-xl border border-stone-200 text-xs outline-none bg-stone-50 focus:bg-white focus:border-[#D4AF37]"
                />
              </div>

              <div className="flex items-center gap-2 text-xs">
                <button
                  type="button"
                  onClick={selectAllFiltered}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
                >
                  Chọn tất cả
                </button>
                <button
                  type="button"
                  onClick={deselectAllFiltered}
                  className="px-2.5 py-1 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 font-medium"
                >
                  Bỏ chọn
                </button>
                <span className="text-stone-500 font-semibold">
                  Đã chọn: <span className="text-[#B8860B]">{selectedGuestsForPrint.length}</span> / {filteredGuests.length}
                </span>
              </div>
            </div>

            {/* Guest Items Table */}
            <div className="max-h-72 overflow-y-auto rounded-2xl border border-stone-200 divide-y divide-stone-100 bg-white text-xs">
              {filteredGuests.length === 0 ? (
                <div className="p-6 text-center text-stone-400 italic">
                  Không tìm thấy khách mời nào phù hợp với bộ lọc.
                </div>
              ) : (
                filteredGuests.map((guest, idx) => {
                  const isSelected = selectedGuestIds.has(guest.id);
                  const isPreviewing = currentPreviewGuest?.id === guest.id;
                  const invitationLink = `/invitation?guest=${encodeURIComponent(guest.name)}&salutation=${encodeURIComponent(guest.salutation)}&plus=${encodeURIComponent(guest.plusOne)}&company=${encodeURIComponent(guest.company)}`;

                  return (
                    <div
                      key={guest.id}
                      className={`p-3 flex items-center justify-between gap-3 hover:bg-amber-50/40 transition-colors ${
                        isPreviewing ? 'bg-amber-50/70 border-l-4 border-l-[#D4AF37]' : ''
                      }`}
                    >
                      <div className="flex items-center gap-3 min-w-0">
                        <button
                          type="button"
                          onClick={() => toggleSelectGuest(guest.id)}
                          className="text-stone-400 hover:text-[#D4AF37]"
                        >
                          {isSelected ? (
                            <CheckSquare className="w-4 h-4 text-[#D4AF37]" />
                          ) : (
                            <Square className="w-4 h-4" />
                          )}
                        </button>

                        <div className="min-w-0 cursor-pointer" onClick={() => setActiveGuestIndex(idx)}>
                          <div className="flex items-center gap-2">
                            <span className="font-serif font-bold text-stone-900 text-xs sm:text-sm">
                              {guest.salutation} {guest.name}
                            </span>
                            {guest.plusOne && (
                              <span className="text-[10px] text-stone-500 italic hidden sm:inline">
                                ({guest.plusOne})
                              </span>
                            )}
                            {guest.tableNumber && (
                              <span className="px-1.5 py-0.5 rounded text-[9px] font-bold bg-amber-100 text-amber-800">
                                {guest.tableNumber}
                              </span>
                            )}
                          </div>
                          
                          <div className="flex items-center gap-2 text-[10px] text-stone-500 mt-0.5">
                            <span className="font-medium text-stone-700">{guest.company}</span>
                            <span>•</span>
                            <span>{guest.address}</span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 flex-shrink-0">
                        <button
                          type="button"
                          onClick={() => setActiveGuestIndex(idx)}
                          className={`px-2 py-1 rounded-lg text-[10px] font-medium transition-colors ${
                            isPreviewing
                              ? 'bg-[#D4AF37] text-white'
                              : 'bg-stone-100 hover:bg-stone-200 text-stone-700'
                          }`}
                        >
                          Xem trước
                        </button>

                        <Link
                          href={invitationLink}
                          target="_blank"
                          className="p-1 rounded-lg text-rose-600 hover:bg-rose-50"
                          title="Mở link thiệp online riêng cho khách này"
                        >
                          <Share2 className="w-3.5 h-3.5" />
                        </Link>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>

          {/* Wedding Information Inputs */}
          <div className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E8DFC8] shadow-sm space-y-3">
            <h4 className="font-serif font-bold text-sm text-stone-900 uppercase tracking-wider mb-2">
              3. Thông Tin Lễ Cưới In Trên Thiệp
            </h4>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Chú rể:</label>
                <input
                  type="text"
                  value={groomName}
                  onChange={(e) => setGroomName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Cô dâu:</label>
                <input
                  type="text"
                  value={brideName}
                  onChange={(e) => setBrideName(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs font-serif font-bold focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Ngày cưới:</label>
                <input
                  type="text"
                  value={weddingDate}
                  onChange={(e) => setWeddingDate(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>
              <div>
                <label className="text-[11px] text-stone-500 block mb-1">Giờ khai tiệc:</label>
                <input
                  type="text"
                  value={weddingTime}
                  onChange={(e) => setWeddingTime(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
                />
              </div>
            </div>

            <div>
              <label className="text-[11px] text-stone-500 block mb-1">Trung tâm tiệc cưới & Địa chỉ:</label>
              <input
                type="text"
                value={venueName}
                onChange={(e) => setVenueName(e.target.value)}
                className="w-full px-3 py-2 rounded-xl border border-stone-200 text-xs focus:border-[#D4AF37] outline-none"
              />
            </div>
          </div>
        </div>

        {/* Right Column: Real-time Live Preview & Printing Trigger (5 cols) */}
        <div className="lg:col-span-5 flex flex-col items-center sticky top-24 space-y-4">
          
          <div className="w-full flex items-center justify-between px-2 text-xs font-semibold text-stone-600">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Bản Xem Trước Thực Tế</span>
            </span>
            <span className="text-[11px] text-[#B8860B] font-bold">
              {cardType === 'envelope' ? 'Khổ Bao Thư (Phong Bì)' : 'Khổ A6 (105 x 148 mm)'}
            </span>
          </div>

          {/* Interactive Card Canvas */}
          <div className="w-full flex items-center justify-center p-4 sm:p-6 bg-stone-200/50 rounded-3xl border border-dashed border-stone-300 overflow-hidden shadow-inner">
            <PrintCardPreview data={cardData} />
          </div>

          {/* Primary Batch Print Button */}
          <div className="w-full bg-white rounded-3xl p-5 border border-[#E8DFC8] shadow-sm space-y-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-stone-600 font-medium">Chế độ in hàng loạt:</span>
              <label className="flex items-center gap-1.5 cursor-pointer font-bold text-stone-800">
                <input
                  type="checkbox"
                  checked={isBatchMode}
                  onChange={(e) => setIsBatchMode(e.target.checked)}
                  className="rounded text-[#D4AF37] focus:ring-[#D4AF37]"
                />
                <span>In tất cả {selectedGuestsForPrint.length} khách đã chọn</span>
              </label>
            </div>

            <button
              onClick={handlePrint}
              disabled={selectedGuestsForPrint.length === 0}
              className="w-full py-4 px-4 rounded-2xl bg-gradient-to-r from-[#D4AF37] via-[#E2C364] to-[#B8860B] text-stone-950 font-bold text-sm sm:text-base shadow-lg hover:brightness-105 active:scale-95 transition-all flex items-center justify-center gap-2.5 disabled:opacity-50"
            >
              <Printer className="w-5 h-5" />
              <span>
                {isBatchMode
                  ? `In Ngay ${selectedGuestsForPrint.length} ${cardType === 'envelope' ? 'Bao Thư' : 'Thiệp'} Không Cần Viết Tay`
                  : 'In Bản Này Ngay (Print)'}
              </span>
            </button>

            <p className="text-[11px] text-center text-stone-500 leading-relaxed">
              💡 Máy in sẽ tự động in từng người theo thứ tự đã sắp xếp (
              <span className="font-semibold text-stone-700">
                {sortField === 'company'
                  ? 'Theo Công Ty'
                  : sortField === 'address'
                  ? 'Theo Địa Chỉ'
                  : sortField === 'group'
                  ? 'Theo Mối Quan Hệ'
                  : 'Theo Tên A-Z'}
              </span>
              ), mỗi người 1 trang in sắc nét chuẩn 300 DPI.
            </p>
          </div>

          {/* Printing Experience Tips */}
          <div className="w-full bg-amber-50/70 border border-[#E8DFC8] rounded-2xl p-4 text-xs text-stone-600 space-y-1.5">
            <div className="flex items-center gap-1.5 font-bold text-amber-900">
              <Info className="w-4 h-4 text-amber-700" />
              <span>Kinh nghiệm in thiệp cưới & bao thư:</span>
            </div>
            <ul className="list-disc pl-5 space-y-1 text-[11px] text-stone-600">
              <li>
                <strong>In bao thư:</strong> Đặt xấp phong bì cưới vào khay nạp giấy máy in, chọn khổ giấy tương ứng.
              </li>
              <li>
                <strong>Cài đặt trình duyệt:</strong> Bật tùy chọn <strong>&quot;Đồ họa nền&quot; (Background graphics)</strong> và chỉnh Lề về <strong>&quot;Không có&quot; (None / 0mm)</strong>.
              </li>
              <li>
                <strong>Chia sẻ online:</strong> Bấm biểu tượng <Share2 className="w-3 h-3 inline text-rose-600" /> ở mỗi khách để gửi link thiệp mời online cá nhân hóa qua Zalo.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* ===================================================================== */}
      {/* PRINT-ONLY CONTAINER: What the printer actually outputs!              */}
      {/* ===================================================================== */}
      <div className="hidden print:block print-only w-full">
        {isBatchMode && selectedGuestsForPrint.length > 0 ? (
          /* Batch Print personalized invitation / envelope for each selected guest */
          selectedGuestsForPrint.map((g, index) => (
            <div
              key={g.id}
              className={`mx-auto ${
                cardType === 'envelope' ? 'w-[160mm] h-[115mm]' : 'w-[105mm] h-[148mm]'
              } ${index < selectedGuestsForPrint.length - 1 ? 'print-page-break' : ''}`}
            >
              <PrintCardPreview
                data={{
                  ...cardData,
                  guest: g,
                  tableNumber: g.tableNumber || tableNumber,
                }}
                isPrintVersion={true}
              />
            </div>
          ))
        ) : (
          /* Single Card Print */
          <div
            className={`mx-auto ${
              cardType === 'envelope' ? 'w-[160mm] h-[115mm]' : 'w-[105mm] h-[148mm]'
            }`}
          >
            <PrintCardPreview data={cardData} isPrintVersion={true} />
          </div>
        )}
      </div>

    </div>
  );
}
