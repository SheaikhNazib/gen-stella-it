/**
 * Quick Cloudinary credential test.
 * Run:  npx tsx scripts/test-cloudinary.ts
 *
 * Uploads a 1×1 transparent PNG and prints either the secure URL or the
 * full error payload so you can tell whether your CLOUDINARY_URL is valid.
 */
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { v2 as cloudinary } from 'cloudinary';

// Load .env manually (no dotenv dependency needed)
const envPath = resolve(process.cwd(), '.env');
const envContent = readFileSync(envPath, 'utf-8');
for (const line of envContent.split('\n')) {
  const trimmed = line.trim();
  if (!trimmed || trimmed.startsWith('#')) continue;
  const eqIdx = trimmed.indexOf('=');
  if (eqIdx === -1) continue;
  const key = trimmed.slice(0, eqIdx).trim();
  let val = trimmed.slice(eqIdx + 1).trim();
  if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
    val = val.slice(1, -1);
  }
  if (!process.env[key]) process.env[key] = val;
}

// Re-configure after env is loaded (import hoisting means SDK read env before our code ran)
const cloudinaryUrl = process.env.CLOUDINARY_URL;
if (cloudinaryUrl) {
  // Parse cloudinary://API_KEY:API_SECRET@CLOUD_NAME
  const match = cloudinaryUrl.match(/^cloudinary:\/\/(\d+):([^@]+)@(.+)$/);
  if (match) {
    cloudinary.config({
      cloud_name: match[3],
      api_key: match[1],
      api_secret: match[2],
      secure: true,
    });
  }
} else {
  cloudinary.config({ secure: true });
}

const cfg = cloudinary.config();
console.log('--- Cloudinary config check ---');
console.log('  cloud_name :', cfg.cloud_name ?? '(missing)');
console.log('  api_key    :', cfg.api_key ?? '(missing)');
console.log('  api_secret :', cfg.api_secret ? '***set***' : '(missing)');

if (!cfg.cloud_name || !cfg.api_key || !cfg.api_secret) {
  console.error('\n❌ CLOUDINARY_URL env var is missing or malformed.');
  process.exit(1);
}

// 1×1 transparent PNG (68 bytes)
const TINY_PNG =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAC0lEQVQI12NgAAIABQAB' +
  'Nl7BcQAAAABJRU5ErkJggg==';

(async () => {
  try {
    console.log('\nUploading 1×1 test image …');
    const result = await cloudinary.uploader.upload(TINY_PNG, {
      folder: 'gen-stella-it/_test',
      resource_type: 'auto',
    });
    console.log('✅ Upload succeeded!');
    console.log('   secure_url:', result.secure_url);

    // Clean up test image
    await cloudinary.uploader.destroy(result.public_id);
    console.log('   (test image deleted)');
  } catch (err: any) {
    console.error('\n❌ Upload FAILED:');
    console.error('   message   :', err.message);
    console.error('   http_code :', err.http_code);
    console.error('   name      :', err.name);
    if (err.http_code === 403) {
      console.error('\n   → 403 means your API key/secret pair is rejected.');
      console.error('   → Go to Cloudinary Dashboard → API Keys and either:');
      console.error('     a) verify the secret matches, or');
      console.error('     b) regenerate the key and update CLOUDINARY_URL in .env');
    }
    process.exit(1);
  }
})();
