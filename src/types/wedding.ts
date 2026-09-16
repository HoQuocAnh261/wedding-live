export type PhotoStatus = 'pending' | 'approved' | 'rejected';

export interface WeddingPhoto {
  id: string;
  event_slug: string;
  guest_name: string;
  wish_message: string | null;
  photo_url: string;
  status: PhotoStatus;
  created_at: string;
}

export interface UploadPhotoPayload {
  event_slug?: string;
  guest_name: string;
  wish_message?: string;
  file: File;
}

export interface BankConfig {
  bankId: string;
  accountNo: string;
  accountName: string;
  defaultAmount?: number;
  description?: string;
}

export interface EventConfig {
  slug: string;
  title: string;
  coupleNames: string;
  weddingDate: string;
  venue?: string;
  autoApprove: boolean;
}
