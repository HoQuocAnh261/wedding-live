import { createClient } from '@supabase/supabase-js';
import { WeddingPhoto, PhotoStatus } from '@/types/wedding';
import { INITIAL_WEDDING_PHOTOS } from './mock-data';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Fallback dummy credentials if not yet set in environment
const validUrl = supabaseUrl && supabaseUrl.startsWith('http') ? supabaseUrl : 'https://placeholder.supabase.co';
const validKey = supabaseAnonKey && supabaseAnonKey.length > 10 ? supabaseAnonKey : 'placeholder-anon-key';

export const supabase = createClient(validUrl, validKey, {
  auth: {
    persistSession: false,
  },
  realtime: {
    params: {
      eventsPerSecond: 10,
    },
  },
});

export const isSupabaseConfigured = (): boolean => {
  return Boolean(
    supabaseUrl &&
    supabaseAnonKey &&
    supabaseUrl.startsWith('http') &&
    !supabaseUrl.includes('your-project-id') &&
    supabaseAnonKey.length > 20
  );
};

// Local storage key for offline / mock testing mode
const LOCAL_PHOTOS_KEY = 'wedding_photos_cache';

// BroadcastChannel for cross-tab communication in offline/mock demo mode
let demoBroadcastChannel: BroadcastChannel | null = null;
if (typeof window !== 'undefined') {
  try {
    demoBroadcastChannel = new BroadcastChannel('wedding_realtime_demo');
  } catch (e) {
    console.warn('BroadcastChannel not supported in this browser', e);
  }
}

export const getDemoBroadcastChannel = () => demoBroadcastChannel;

/**
 * Fetch photos by event slug and optional status filter
 */
export async function getPhotos(eventSlug = 'dam-cuoi-minh-anh'): Promise<WeddingPhoto[]> {
  if (isSupabaseConfigured()) {
    try {
      const { data, error } = await supabase
        .from('wedding_photos')
        .select('*')
        .eq('event_slug', eventSlug)
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase getPhotos error:', error);
        return getServerOrLocalPhotos(eventSlug);
      }
      return (data as WeddingPhoto[]) || [];
    } catch (err) {
      console.warn('Error fetching from Supabase, falling back to server/local photos:', err);
      return getServerOrLocalPhotos(eventSlug);
    }
  } else {
    return getServerOrLocalPhotos(eventSlug);
  }
}

async function getServerOrLocalPhotos(eventSlug: string): Promise<WeddingPhoto[]> {
  if (typeof window !== 'undefined') {
    try {
      const res = await fetch(`/api/photos?eventSlug=${encodeURIComponent(eventSlug)}`, {
        cache: 'no-store',
      });
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          return data;
        }
      }
    } catch (err) {
      console.warn('Could not fetch from /api/photos, using local storage:', err);
    }
  }
  return getLocalPhotos();
}

/**
 * Upload photo and insert into database
 */
export async function uploadWeddingPhoto({
  file,
  guestName,
  wishMessage,
  eventSlug = 'dam-cuoi-minh-anh',
  autoApprove = true,
}: {
  file: File | Blob;
  guestName: string;
  wishMessage?: string;
  eventSlug?: string;
  autoApprove?: boolean;
}): Promise<WeddingPhoto> {
  const fileExt = file.type.split('/')[1] || 'jpg';
  const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}.${fileExt}`;
  const filePath = `${eventSlug}/${fileName}`;

  if (isSupabaseConfigured()) {
    // 1. Upload to Supabase Storage Bucket
    const { error: uploadError } = await supabase.storage
      .from('wedding-uploads')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false,
        contentType: file.type,
      });

    if (uploadError) {
      console.error('Storage upload error:', uploadError);
      throw new Error(`Lỗi tải ảnh lên: ${uploadError.message}`);
    }

    // 2. Get Public URL
    const { data: publicUrlData } = supabase.storage
      .from('wedding-uploads')
      .getPublicUrl(filePath);

    const photoUrl = publicUrlData.publicUrl;

    // 3. Insert Record in wedding_photos table
    const { data, error: insertError } = await supabase
      .from('wedding_photos')
      .insert([
        {
          event_slug: eventSlug,
          guest_name: guestName.trim(),
          wish_message: wishMessage?.trim() || null,
          photo_url: photoUrl,
          status: autoApprove ? 'approved' : 'pending',
        },
      ])
      .select()
      .single();

    if (insertError) {
      console.error('Database insert error:', insertError);
      throw new Error(`Lỗi lưu thông tin ảnh: ${insertError.message}`);
    }

    return data as WeddingPhoto;
  } else {
    // Self-hosted / Server Sync mode: Convert file to Base64
    const base64Url = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(file);
    });

    const newPhoto: WeddingPhoto = {
      id: `local-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      event_slug: eventSlug,
      guest_name: guestName.trim(),
      wish_message: wishMessage?.trim() || null,
      photo_url: base64Url,
      status: autoApprove ? 'approved' : 'pending',
      created_at: new Date().toISOString(),
    };

    saveLocalPhoto(newPhoto);

    // Sync to /api/photos so other devices (e.g. computer/projector) get this photo!
    if (typeof window !== 'undefined') {
      try {
        await fetch('/api/photos', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(newPhoto),
        });
      } catch (postErr) {
        console.warn('Could not POST to /api/photos:', postErr);
      }
    }

    // Broadcast to /live tab in demo mode on same device
    if (demoBroadcastChannel) {
      demoBroadcastChannel.postMessage({
        type: 'NEW_PHOTO',
        photo: newPhoto,
      });
    }

    return newPhoto;
  }
}

/**
 * Update photo status (moderation: approve / reject)
 */
export async function updatePhotoStatus(id: string, status: PhotoStatus): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('wedding_photos')
      .update({ status })
      .eq('id', id);

    if (error) {
      console.error('Update status error:', error);
      return false;
    }
    return true;
  } else {
    updateLocalPhotoStatus(id, status);
    if (typeof window !== 'undefined') {
      fetch('/api/photos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      }).catch(console.warn);
    }
    if (demoBroadcastChannel) {
      demoBroadcastChannel.postMessage({
        type: 'UPDATE_STATUS',
        id,
        status,
      });
    }
    return true;
  }
}

/**
 * Delete photo
 */
export async function deletePhoto(id: string): Promise<boolean> {
  if (isSupabaseConfigured()) {
    const { error } = await supabase
      .from('wedding_photos')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete photo error:', error);
      return false;
    }
    return true;
  } else {
    deleteLocalPhoto(id);
    if (typeof window !== 'undefined') {
      fetch(`/api/photos?id=${encodeURIComponent(id)}`, {
        method: 'DELETE',
      }).catch(console.warn);
    }
    if (demoBroadcastChannel) {
      demoBroadcastChannel.postMessage({
        type: 'DELETE_PHOTO',
        id,
      });
    }
    return true;
  }
}

// -------------------------------------------------------------
// Local Storage helpers for demo / development without Supabase
// -------------------------------------------------------------
function getLocalPhotos(): WeddingPhoto[] {
  if (typeof window === 'undefined') return INITIAL_WEDDING_PHOTOS;
  try {
    const saved = localStorage.getItem(LOCAL_PHOTOS_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      if (Array.isArray(parsed) && parsed.length > 0) return parsed;
    }
    localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify(INITIAL_WEDDING_PHOTOS));
    return INITIAL_WEDDING_PHOTOS;
  } catch {
    return INITIAL_WEDDING_PHOTOS;
  }
}

function saveLocalPhoto(photo: WeddingPhoto) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalPhotos();
    const updated = [photo, ...current];
    localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not save to localStorage (maybe quota exceeded for base64):', err);
  }
}

function updateLocalPhotoStatus(id: string, status: PhotoStatus) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalPhotos();
    const updated = current.map((p) => (p.id === id ? { ...p, status } : p));
    localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not update status in localStorage:', err);
  }
}

function deleteLocalPhoto(id: string) {
  if (typeof window === 'undefined') return;
  try {
    const current = getLocalPhotos();
    const updated = current.filter((p) => p.id !== id);
    localStorage.setItem(LOCAL_PHOTOS_KEY, JSON.stringify(updated));
  } catch (err) {
    console.warn('Could not delete in localStorage:', err);
  }
}
