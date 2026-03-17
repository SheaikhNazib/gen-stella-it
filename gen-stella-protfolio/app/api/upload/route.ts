import { NextResponse } from 'next/server';
import { v2 as cloudinary } from 'cloudinary';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';

// The SDK auto-reads CLOUDINARY_URL from the environment.
// Force HTTPS for all generated URLs.
cloudinary.config({ secure: true });

export async function POST(request: Request) {
  try {
    // Verify Cloudinary credentials are loaded
    const cfg = cloudinary.config();
    if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
      console.error('CLOUDINARY_CONFIG_MISSING:', {
        cloud_name: !!cfg.cloud_name,
        api_key: !!cfg.api_key,
        api_secret: !!cfg.api_secret,
      });
      return NextResponse.json(
        { error: 'Server misconfiguration', details: 'Cloudinary credentials are not configured.' },
        { status: 500 }
      );
    }

    const session = await getServerSession(authOptions);
    if (!session || session.user?.role !== 'ADMIN') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileBase64 = buffer.toString('base64');
    const fileUri = `data:${file.type || 'image/jpeg'};base64,${fileBase64}`;

    const result = await cloudinary.uploader.upload(fileUri, {
      folder: 'gen-stella-it',
      resource_type: 'auto',
    });
    return NextResponse.json(result);
  } catch (error: any) {
    const cfg = cloudinary.config();
    console.error('SERVER_UPLOAD_ERROR:', {
      message: error?.message,
      http_code: error?.http_code,
      name: error?.name,
      cloud_name: cfg.cloud_name,
      api_key_len: cfg.api_key?.length,
      api_secret_set: !!cfg.api_secret,
    });
    return NextResponse.json(
      { error: 'Error uploading file', details: error?.message || 'Unknown server error during upload.' }, 
      { status: 500 }
    );
  }
}

