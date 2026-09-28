import * as XLSX from 'xlsx';
import { WeddingGuest, GuestSortField } from '@/types/guest';

// Sample default guests list for instant testing without uploading
export const SAMPLE_WEDDING_GUESTS: WeddingGuest[] = [
  {
    id: 'g-1',
    name: 'Nguyễn Văn Tuấn',
    salutation: 'Anh',
    company: 'Công ty FPT Software',
    address: 'Cầu Giấy, Hà Nội',
    group: 'Đồng nghiệp Chú Rể',
    tableNumber: 'Bàn 01',
    plusOne: 'và Người Thương',
    phone: '0912345678',
  },
  {
    id: 'g-2',
    name: 'Trần Thị Mai',
    salutation: 'Chị',
    company: 'Công ty FPT Software',
    address: 'Nam Từ Liêm, Hà Nội',
    group: 'Đồng nghiệp Chú Rể',
    tableNumber: 'Bàn 01',
    plusOne: 'và Gia Đình',
    phone: '0987654321',
  },
  {
    id: 'g-3',
    name: 'Lê Hoàng Long',
    salutation: 'Bạn',
    company: 'Tập đoàn Viettel',
    address: 'Hải Châu, Đà Nẵng',
    group: 'Bạn Đại Học Bách Khoa',
    tableNumber: 'Bàn 02',
    plusOne: 'và Bạn Gái',
    phone: '0905123456',
  },
  {
    id: 'g-4',
    name: 'Phạm Minh Đức',
    salutation: 'Anh',
    company: 'Tập đoàn Viettel',
    address: 'Cẩm Lệ, Đà Nẵng',
    group: 'Bạn Đại Học Bách Khoa',
    tableNumber: 'Bàn 02',
    plusOne: '',
    phone: '0905888999',
  },
  {
    id: 'g-5',
    name: 'Bác Hai Hoàng',
    salutation: 'Bác',
    company: 'Họ Hàng Nội',
    address: 'Hồng Bàng, Hải Phòng',
    group: 'Họ Hàng Nhà Trai',
    tableNumber: 'Bàn VIP 01',
    plusOne: 'và Bác Gái',
    phone: '0936111222',
  },
  {
    id: 'g-6',
    name: 'Cô Ba Phượng',
    salutation: 'Cô',
    company: 'Họ Hàng Ngoại',
    address: 'Lê Chân, Hải Phòng',
    group: 'Họ Hàng Nhà Gái',
    tableNumber: 'Bàn VIP 02',
    plusOne: 'và Chú',
    phone: '0936333444',
  },
  {
    id: 'g-7',
    name: 'Hoàng Kim Ngân',
    salutation: 'Em',
    company: 'Ngân hàng Vietcombank',
    address: 'Quận 1, TP. Hồ Chí Minh',
    group: 'Đồng nghiệp Cô Dâu',
    tableNumber: 'Bàn 03',
    plusOne: 'và Người Yêu',
    phone: '0977444555',
  },
  {
    id: 'g-8',
    name: 'Vũ Quốc Bảo',
    salutation: 'Bạn',
    company: 'Ngân hàng Vietcombank',
    address: 'Quận 3, TP. Hồ Chí Minh',
    group: 'Đồng nghiệp Cô Dâu',
    tableNumber: 'Bàn 03',
    plusOne: '',
    phone: '0977666777',
  },
];

/**
 * Normalizes string keys for flexible header matching in Vietnamese Excel files
 */
function normalizeHeader(header: string): string {
  return header
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]/g, '');
}

/**
 * Parses an Excel or CSV file buffer into an array of WeddingGuest
 */
export async function parseGuestExcel(file: File): Promise<WeddingGuest[]> {
  const data = await file.arrayBuffer();
  const workbook = XLSX.read(data, { type: 'array' });
  const firstSheetName = workbook.SheetNames[0];
  const worksheet = workbook.Sheets[firstSheetName];

  // Convert sheet to JSON array of objects
  const rawRows: Record<string, unknown>[] = XLSX.utils.sheet_to_json(worksheet, { defval: '' });

  const guests: WeddingGuest[] = [];

  for (let i = 0; i < rawRows.length; i++) {
    const row = rawRows[i];

    let name = '';
    let salutation = 'Bạn';
    let company = 'Khác';
    let address = 'Toàn quốc';
    let group = 'Khách Mời';
    let tableNumber = '';
    let plusOne = '';
    let phone = '';

    for (const [key, val] of Object.entries(row)) {
      const normalizedKey = normalizeHeader(key);
      const strVal = String(val).trim();

      if (['ten', 'hovaten', 'hoten', 'khachmoi', 'name', 'fullname'].includes(normalizedKey)) {
        name = strVal;
      } else if (['xungho', 'vaive', 'title', 'salutation', 'goi'].includes(normalizedKey)) {
        salutation = strVal || 'Bạn';
      } else if (['congty', 'coquan', 'noilamviec', 'company', 'donvi', 'donvicongtac'].includes(normalizedKey)) {
        company = strVal || 'Khác';
      } else if (['diachi', 'khuvuc', 'tinhthanh', 'address', 'city', 'noioc'].includes(normalizedKey)) {
        address = strVal || 'Toàn quốc';
      } else if (['nhom', 'quanhe', 'group', 'category', 'moiquanhe'].includes(normalizedKey)) {
        group = strVal || 'Khách Mời';
      } else if (['ban', 'soban', 'bantieck', 'table', 'tablenumber'].includes(normalizedKey)) {
        tableNumber = strVal;
      } else if (['kemtheo', 'dicung', 'nguoidicung', 'plusone', 'khachkem'].includes(normalizedKey)) {
        plusOne = strVal;
      } else if (['sdt', 'dienthoai', 'phone', 'telephone'].includes(normalizedKey)) {
        phone = strVal;
      }
    }

    if (name) {
      guests.push({
        id: `guest-${Date.now()}-${i}`,
        name,
        salutation,
        company,
        address,
        group,
        tableNumber,
        plusOne,
        phone,
      });
    }
  }

  return guests;
}

/**
 * Generates and downloads a sample Excel template for wedding guest list
 */
export function downloadSampleGuestExcel() {
  const sampleData = [
    {
      'Xưng Hô': 'Anh',
      'Họ và Tên': 'Nguyễn Văn Tuấn',
      'Đi Cùng': 'và Người Thương',
      'Công Ty / Nơi Làm Việc': 'Công ty FPT Telecom',
      'Địa Chỉ / Khu Vực': 'Cầu Giấy, Hà Nội',
      'Mối Quan Hệ / Nhóm': 'Đồng Nghiệp',
      'Số Bàn Tiệc': 'Bàn 01',
      'Số Điện Thoại': '0912345678',
    },
    {
      'Xưng Hô': 'Chị',
      'Họ và Tên': 'Trần Thị Mai',
      'Đi Cùng': 'và Gia Đình',
      'Công Ty / Nơi Làm Việc': 'Công ty FPT Telecom',
      'Địa Chỉ / Khu Vực': 'Nam Từ Liêm, Hà Nội',
      'Mối Quan Hệ / Nhóm': 'Đồng Nghiệp',
      'Số Bàn Tiệc': 'Bàn 01',
      'Số Điện Thoại': '0987654321',
    },
    {
      'Xưng Hô': 'Bác',
      'Họ và Tên': 'Lê Văn Hoàng',
      'Đi Cùng': 'và Bác Gái',
      'Công Ty / Nơi Làm Việc': 'Họ Hàng Nội',
      'Địa Chỉ / Khu Vực': 'Hồng Bàng, Hải Phòng',
      'Mối Quan Hệ / Nhóm': 'Họ Hàng Nhà Trai',
      'Số Bàn Tiệc': 'Bàn VIP 01',
      'Số Điện Thoại': '0936111222',
    },
    {
      'Xưng Hô': 'Bạn',
      'Họ và Tên': 'Phạm Minh Đức',
      'Đi Cùng': 'và Bạn Gái',
      'Công Ty / Nơi Làm Việc': 'Tập đoàn Viettel',
      'Địa Chỉ / Khu Vực': 'Hải Châu, Đà Nẵng',
      'Mối Quan Hệ / Nhóm': 'Bạn Đại Học',
      'Số Bàn Tiệc': 'Bàn 02',
      'Số Điện Thoại': '0905111333',
    },
    {
      'Xưng Hô': 'Em',
      'Họ và Tên': 'Hoàng Kim Ngân',
      'Đi Cùng': 'và Người Yêu',
      'Công Ty / Nơi Làm Việc': 'Ngân hàng Vietcombank',
      'Địa Chỉ / Khu Vực': 'Quận 1, TP. Hồ Chí Minh',
      'Mối Quan Hệ / Nhóm': 'Đồng Nghiệp Cô Dâu',
      'Số Bàn Tiệc': 'Bàn 03',
      'Số Điện Thoại': '0977444555',
    },
  ];

  const worksheet = XLSX.utils.json_to_sheet(sampleData);

  // Set column widths for readability
  worksheet['!cols'] = [
    { wch: 10 }, // Xưng Hô
    { wch: 22 }, // Họ và Tên
    { wch: 18 }, // Đi Cùng
    { wch: 26 }, // Công Ty
    { wch: 24 }, // Địa Chỉ
    { wch: 22 }, // Mối Quan Hệ
    { wch: 14 }, // Số Bàn
    { wch: 16 }, // SĐT
  ];

  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh Sách Khách Mời');

  // Trigger file download
  XLSX.writeFile(workbook, 'Danh_Sach_Khach_Moi_Mau_WeddingLive.xlsx');
}

/**
 * Sorts guests array by various criteria (Company, Address, Group, Table, Name)
 */
export function sortGuests(guests: WeddingGuest[], sortField: GuestSortField): WeddingGuest[] {
  return [...guests].sort((a, b) => {
    switch (sortField) {
      case 'company':
        return a.company.localeCompare(b.company, 'vi', { sensitivity: 'base' }) ||
               a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
      case 'address':
        return a.address.localeCompare(b.address, 'vi', { sensitivity: 'base' }) ||
               a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
      case 'group':
        return a.group.localeCompare(b.group, 'vi', { sensitivity: 'base' }) ||
               a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
      case 'tableNumber':
        return a.tableNumber.localeCompare(b.tableNumber, 'vi', { numeric: true }) ||
               a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
      case 'name':
      default:
        return a.name.localeCompare(b.name, 'vi', { sensitivity: 'base' });
    }
  });
}
