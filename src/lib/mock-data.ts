import { WeddingPhoto } from '@/types/wedding';

export const INITIAL_WEDDING_PHOTOS: WeddingPhoto[] = [
  {
    id: 'photo-1',
    event_slug: 'dam-cuoi-minh-anh',
    guest_name: 'Hội Bạn Đại Học Bách Khoa',
    wish_message: 'Chúc Minh Anh & Tuấn Kiệt trăm năm hạnh phúc, sớm đón thiên thần nhỏ nha! Nâng ly chúc mừng đôi bạn trẻ! 🥂✨',
    photo_url: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1600&q=85',
    status: 'approved',
    created_at: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'photo-2',
    event_slug: 'dam-cuoi-minh-anh',
    guest_name: 'Gia đình Bác Hai Sài Gòn',
    wish_message: 'Chúc hai cháu trăm năm đầu bạc, thuận vợ thuận chồng tát biển đông cũng cạn! Hạnh phúc viên mãn nhé! ❤️',
    photo_url: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1600&q=85',
    status: 'approved',
    created_at: new Date(Date.now() - 1000 * 60 * 18).toISOString(),
  },
  {
    id: 'photo-3',
    event_slug: 'dam-cuoi-minh-anh',
    guest_name: 'Team Đồng Nghiệp Cty Tech',
    wish_message: 'Hôm nay chú rể Kiệt bảnh bao nhất quả đất, cô dâu Minh Anh xinh xuất sắc! Quẩy hết mình đêm nay nào ae 🚀🍾',
    photo_url: 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1600&q=85',
    status: 'approved',
    created_at: new Date(Date.now() - 1000 * 60 * 12).toISOString(),
  },
  {
    id: 'photo-4',
    event_slug: 'dam-cuoi-minh-anh',
    guest_name: 'Cô bạn thân Linh Nga & Nhóm Phù Dâu',
    wish_message: 'Nhìn hai bạn hạnh phúc bên nhau mà rớt nước mắt. Chúc cô dâu của tớ mãi luôn được cưng chiều như công chúa! 💐💍',
    photo_url: 'https://images.unsplash.com/photo-1519225429980-715cb0215aed?auto=format&fit=crop&w=1600&q=85',
    status: 'approved',
    created_at: new Date(Date.now() - 1000 * 60 * 6).toISOString(),
  },
  {
    id: 'photo-5',
    event_slug: 'dam-cuoi-minh-anh',
    guest_name: 'Anh Em Hội Xe Côn Tay',
    wish_message: 'Chúc mừng ông bạn chí cốt chính thức rời hội độc thân! Chúc đôi bạn tình sâu nghĩa nặng! 🏍️🎉',
    photo_url: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?auto=format&fit=crop&w=1600&q=85',
    status: 'pending',
    created_at: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
  },
];

export const DEFAULT_BANK_INFO = {
  bankId: process.env.NEXT_PUBLIC_BANK_ID || 'MB',
  accountNo: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NO || '0988888888',
  accountName: process.env.NEXT_PUBLIC_BANK_ACCOUNT_NAME || 'NGUYEN TUAN KIET',
  bankNameDisplay: 'Ngân hàng Quân Đội (MB Bank)',
};
