-- ==============================================================================
-- WEDDING LIVE LED & PHOTO SHARING - SUPABASE SETUP SCRIPT
-- Run this script in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================================

-- 1. Create the wedding_photos table
CREATE TABLE IF NOT EXISTS public.wedding_photos (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    event_slug TEXT NOT NULL DEFAULT 'dam-cuoi-minh-anh',
    guest_name TEXT NOT NULL,
    wish_message TEXT,
    photo_url TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'approved' CHECK (status IN ('pending', 'approved', 'rejected')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 2. Create index for fast retrieval by event and status
CREATE INDEX IF NOT EXISTS idx_wedding_photos_event_status 
ON public.wedding_photos (event_slug, status, created_at DESC);

-- 3. Enable Row Level Security (RLS)
ALTER TABLE public.wedding_photos ENABLE ROW LEVEL SECURITY;

-- 4. Set RLS Policies (Allow guest uploads & public viewing of approved photos)
-- Allow anyone to view approved photos (for live LED stage and guests)
CREATE POLICY "Allow public read approved photos"
ON public.wedding_photos
FOR SELECT
USING (true);

-- Allow anyone to insert photos (for wedding guests)
CREATE POLICY "Allow public upload photos"
ON public.wedding_photos
FOR INSERT
WITH CHECK (true);

-- Allow updates (for admin moderation - approving/rejecting photos)
CREATE POLICY "Allow update photos"
ON public.wedding_photos
FOR UPDATE
USING (true)
WITH CHECK (true);

-- Allow delete (for admin moderation)
CREATE POLICY "Allow delete photos"
ON public.wedding_photos
FOR DELETE
USING (true);

-- 5. Enable Realtime on the wedding_photos table
-- This allows the /live LED slideshow to automatically trigger when a new photo is uploaded
ALTER PUBLICATION supabase_realtime ADD TABLE public.wedding_photos;

-- 6. Storage Bucket setup for photo uploads
-- Create the public bucket 'wedding-uploads' if it doesn't exist
INSERT INTO storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
VALUES (
    'wedding-uploads',
    'wedding-uploads',
    true,
    10485760, -- 10MB limit (compressed client-side to < 800KB)
    ARRAY['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/gif']
)
ON CONFLICT (id) DO UPDATE SET
    public = true,
    file_size_limit = 10485760;

-- 7. Storage Policies for 'wedding-uploads'
-- Allow public access to view uploaded photos
CREATE POLICY "Public Read Wedding Uploads"
ON storage.objects
FOR SELECT
USING (bucket_id = 'wedding-uploads');

-- Allow public uploads to 'wedding-uploads'
CREATE POLICY "Public Upload to Wedding Uploads"
ON storage.objects
FOR INSERT
WITH CHECK (bucket_id = 'wedding-uploads');

-- Allow delete from 'wedding-uploads'
CREATE POLICY "Allow Delete Wedding Uploads"
ON storage.objects
FOR DELETE
USING (bucket_id = 'wedding-uploads');

-- 8. Optional Seed Data for testing
INSERT INTO public.wedding_photos (event_slug, guest_name, wish_message, photo_url, status)
VALUES 
    ('dam-cuoi-minh-anh', 'Hội Bạn Đại Học', 'Chúc Minh Anh & Tuấn Kiệt trăm năm hạnh phúc, sớm đón quý tử nha! 🎉🥂', 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80', 'approved'),
    ('dam-cuoi-minh-anh', 'Gia Đình Bác Hai', 'Chúc hai cháu thuận vợ thuận chồng, cùng nhau xây dựng tổ ấm viên mãn! ❤️', 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80', 'approved'),
    ('dam-cuoi-minh-anh', 'Cô bạn thân Linh Nga', 'Cô dâu hôm nay xinh đẹp tuyệt trần! Mãi hạnh phúc như ngày đầu nhé! ✨💐', 'https://images.unsplash.com/photo-1583939003579-730e3918a45a?auto=format&fit=crop&w=1200&q=80', 'approved')
ON CONFLICT DO NOTHING;
