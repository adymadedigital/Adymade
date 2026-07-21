import { createClient } from '@supabase/supabase-js';
import { readdirSync, readFileSync } from 'fs';
import path from 'path';
import 'dotenv/config';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!SUPABASE_URL || !SERVICE_ROLE_KEY) {
    console.error('Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env');
    process.exit(1);
}

// service_role key bypasses RLS - only use this in local scripts, never in browser code
const supabase = createClient(SUPABASE_URL, SERVICE_ROLE_KEY);

function titleFromFilename(filename) {
    return path
        .parse(filename)
        .name.replace(/[_-]+/g, ' ')
        .replace(/\s+/g, ' ')
        .trim();
}

function getContentType(filename) {
    const ext = path.extname(filename).toLowerCase();
    if (ext === '.mp4') return 'video/mp4';
    if (ext === '.png') return 'image/png';
    if (ext === '.jpg' || ext === '.jpeg') return 'image/jpeg';
    return undefined;
}

async function uploadFile(localFilePath, storagePath, filename) {
    const fileBuffer = readFileSync(localFilePath);
    const contentType = getContentType(filename);

    const { error } = await supabase.storage
        .from('gallery')
        .upload(storagePath, fileBuffer, {
            upsert: true,
            contentType
        });

    if (error) {
        console.error(`Upload failed: ${filename} -> ${error.message}`);
        return false;
    }

    console.log(`Uploaded: ${storagePath}`);
    return true;
}

async function insertRow(row) {
    const { error } = await supabase.from('gallery_items').insert(row);
    if (error) {
        console.error(`DB insert failed: ${row.title} -> ${error.message}`);
    } else {
        console.log(`  row added: ${row.title}`);
    }
}

async function processVideosFolder(localFolder, bucketFolder) {
    const files = readdirSync(localFolder).filter((f) => f.toLowerCase().endsWith('.mp4'));
    let order = 0;

    for (const file of files) {
        const localFilePath = path.join(localFolder, file);
        const storagePath = `${bucketFolder}/${file}`;

        const ok = await uploadFile(localFilePath, storagePath, file);
        if (!ok) continue;

        await insertRow({
            type: 'video',
            media_type: null,
            title: titleFromFilename(file),
            file_path: storagePath,
            sort_order: order++
        });
    }
}

async function processPostsFolder(localFolder, bucketFolder) {
    const files = readdirSync(localFolder).filter((f) =>
        ['.mp4', '.jpg', '.jpeg', '.png'].includes(path.extname(f).toLowerCase())
    );
    let order = 0;

    for (const file of files) {
        const localFilePath = path.join(localFolder, file);
        const storagePath = `${bucketFolder}/${file}`;
        const ext = path.extname(file).toLowerCase();
        const mediaType = ext === '.mp4' ? 'video' : 'image';

        const ok = await uploadFile(localFilePath, storagePath, file);
        if (!ok) continue;

        await insertRow({
            type: 'post',
            media_type: mediaType,
            title: titleFromFilename(file),
            file_path: storagePath,
            sort_order: order++
        });
    }
}

async function main() {
    console.log('--- Uploading videos ---');
    await processVideosFolder('static/gallery/videos-compressed', 'videos');

    console.log('--- Uploading posts ---');
    await processPostsFolder('static/gallery/posts-compressed', 'posts');

    console.log('All done!');
}

main();