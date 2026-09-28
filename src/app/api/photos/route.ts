import { NextRequest, NextResponse } from 'next/server';
import { WeddingPhoto, PhotoStatus } from '@/types/wedding';
import { INITIAL_WEDDING_PHOTOS } from '@/lib/mock-data';

// Server-side in-memory store so multiple devices (Phone <-> Computer) share photos
// Even when Supabase is not yet configured on Vercel
declare global {
  // eslint-disable-next-line no-var
  var __sharedWeddingPhotos: WeddingPhoto[] | undefined;
}

if (!globalThis.__sharedWeddingPhotos) {
  globalThis.__sharedWeddingPhotos = [...INITIAL_WEDDING_PHOTOS];
}

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const eventSlug = searchParams.get('eventSlug') || 'dam-cuoi-minh-anh';
  const since = searchParams.get('since');

  let photos = globalThis.__sharedWeddingPhotos || [];

  // Filter by event slug
  photos = photos.filter((p) => p.event_slug === eventSlug);

  // If client asks for photos created since a timestamp
  if (since) {
    const sinceDate = new Date(since).getTime();
    photos = photos.filter((p) => new Date(p.created_at).getTime() > sinceDate);
  }

  return NextResponse.json(photos, {
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    },
  });
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      id,
      guest_name,
      wish_message,
      photo_url,
      event_slug = 'dam-cuoi-minh-anh',
      status = 'approved',
    } = body;

    if (!guest_name || !photo_url) {
      return NextResponse.json(
        { error: 'Thiếu tên khách hoặc ảnh' },
        { status: 400 }
      );
    }

    const newPhoto: WeddingPhoto = {
      id: id || `srv-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`,
      event_slug,
      guest_name: String(guest_name).trim(),
      wish_message: wish_message ? String(wish_message).trim() : null,
      photo_url,
      status: (status as PhotoStatus) || 'approved',
      created_at: new Date().toISOString(),
    };

    if (!globalThis.__sharedWeddingPhotos) {
      globalThis.__sharedWeddingPhotos = [...INITIAL_WEDDING_PHOTOS];
    }

    // Add to top of list
    globalThis.__sharedWeddingPhotos = [newPhoto, ...globalThis.__sharedWeddingPhotos];

    return NextResponse.json(newPhoto, { status: 201 });
  } catch (err: unknown) {
    console.error('API /api/photos POST error:', err);
    return NextResponse.json({ error: 'Lỗi xử lý ảnh' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: 'Thiếu ID hoặc status' }, { status: 400 });
    }

    if (globalThis.__sharedWeddingPhotos) {
      globalThis.__sharedWeddingPhotos = globalThis.__sharedWeddingPhotos.map((p) =>
        p.id === id ? { ...p, status } : p
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('API /api/photos PATCH error:', err);
    return NextResponse.json({ error: 'Lỗi cập nhật' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Thiếu ID' }, { status: 400 });
    }

    if (globalThis.__sharedWeddingPhotos) {
      globalThis.__sharedWeddingPhotos = globalThis.__sharedWeddingPhotos.filter(
        (p) => p.id !== id
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    console.error('API /api/photos DELETE error:', err);
    return NextResponse.json({ error: 'Lỗi xóa' }, { status: 500 });
  }
}
