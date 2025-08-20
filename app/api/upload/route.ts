import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, serviceKey);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const userId = formData.get('userId') as string;

    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    if (!userId) {
      return NextResponse.json({ error: 'User ID required' }, { status: 400 });
    }

    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      return NextResponse.json({ error: 'File too large. Maximum size is 50MB.' }, { status: 400 });
    }

    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'video/mp4', 'video/quicktime', 'video/x-msvideo'];
    if (!allowedTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Unsupported file type' }, { status: 400 });
    }

    const fileExt = file.name.split('.').pop();
    const fileName = `${userId}-${Date.now()}.${fileExt}`;
    const filePath = `posts/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from('post-files')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    if (uploadError) {
      console.error('Upload error:', uploadError);
      
      if (uploadError.message.includes('Bucket not found')) {
        const { error: bucketError } = await supabase.storage.createBucket('post-files', {
          public: true,
          allowedMimeTypes: allowedTypes,
          fileSizeLimit: maxSize
        });
        
        if (bucketError) {
          console.error('Bucket creation error:', bucketError);
          return NextResponse.json({ error: 'Storage configuration error' }, { status: 500 });
        }

        const { error: retryError } = await supabase.storage
          .from('post-files')
          .upload(filePath, file, {
            cacheControl: '3600',
            upsert: false
          });

        if (retryError) {
          console.error('Retry upload error:', retryError);
          return NextResponse.json({ error: 'Failed to upload file after bucket creation' }, { status: 500 });
        }
      } else {
        return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
      }
    }

    const { data } = supabase.storage
      .from('post-files')
      .getPublicUrl(filePath);

    return NextResponse.json({ 
      fileUrl: data.publicUrl,
      fileName,
      fileType: file.type
    });

  } catch (error) {
    console.error('Upload API error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}