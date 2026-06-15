#!/usr/bin/env node
/* =====================================================================
 * Lấy danh sách video mới nhất của kênh từ RSS feed của YouTube
 * và ghi vào data/videos.json (chạy trong CI, không cần API key).
 *
 * Cách dùng:  node scripts/fetch-videos.mjs
 *
 * Đọc data/config.json:
 *   - channelId  : id kênh dạng UC... (nếu để trống sẽ tự tìm từ channelUrl)
 *   - channelUrl : link kênh, vd https://www.youtube.com/@bienac
 *   - maxVideos  : số video tối đa ghi ra
 * ===================================================================== */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
const CONFIG_PATH = path.join(ROOT, 'data', 'config.json');
const OUT_PATH = path.join(ROOT, 'data', 'videos.json');

const UA = 'Mozilla/5.0 (compatible; bienac-site/1.0)';

async function fetchText(url) {
  const res = await fetch(url, { headers: { 'user-agent': UA } });
  if (!res.ok) throw new Error(`HTTP ${res.status} khi tải ${url}`);
  return res.text();
}

/** Tìm channelId (UC...) từ trang kênh khi config chưa điền sẵn. */
async function resolveChannelId(channelUrl) {
  const html = await fetchText(channelUrl);
  const m =
    html.match(/"channelId"\s*:\s*"(UC[\w-]+)"/) ||
    html.match(/channel_id=(UC[\w-]+)/) ||
    html.match(/"externalId"\s*:\s*"(UC[\w-]+)"/);
  if (!m) throw new Error(`Không tìm thấy channelId trong ${channelUrl}`);
  return m[1];
}

function decodeXml(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

function parseFeed(xml) {
  const videos = [];
  const entries = xml.match(/<entry>[\s\S]*?<\/entry>/g) || [];
  for (const entry of entries) {
    const id = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/)?.[1];
    const title = entry.match(/<title>([^<]*)<\/title>/)?.[1];
    if (id && title) videos.push({ id, title: decodeXml(title) });
  }
  return videos;
}

/**
 * Kiểm tra một video có phải Short hay không.
 * RSS feed không phân biệt Short với video thường, nên ta thử mở URL
 * dạng /shorts/<id>: Short thật trả 200, còn video thường bị redirect (3xx)
 * sang trang /watch. Lỗi mạng → coi như không phải Short để khỏi bỏ sót.
 */
async function isShort(id) {
  try {
    const res = await fetch(`https://www.youtube.com/shorts/${id}`, {
      method: 'HEAD',
      headers: { 'user-agent': UA },
      redirect: 'manual',
    });
    return res.status === 200;
  } catch {
    return false;
  }
}

async function main() {
  const config = JSON.parse(await readFile(CONFIG_PATH, 'utf8'));

  if (config.autoFetchVideos === false) {
    console.log('autoFetchVideos = false trong data/config.json — bỏ qua.');
    return;
  }

  let channelId = config.channelId;
  if (!channelId) {
    console.log(`channelId trống — đang tìm từ ${config.channelUrl}...`);
    channelId = await resolveChannelId(config.channelUrl);
    console.log(`Tìm thấy channelId: ${channelId}`);
  }

  const feedUrl = `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  console.log(`Đang tải feed: ${feedUrl}`);
  const xml = await fetchText(feedUrl);

  const max = Number(config.maxVideos) > 0 ? Number(config.maxVideos) : 6;

  // Lọc bỏ Short, chỉ giữ video thường, cho tới khi đủ `max` video.
  const candidates = parseFeed(xml);
  const videos = [];
  for (const v of candidates) {
    if (videos.length >= max) break;
    if (await isShort(v.id)) {
      console.log(`Bỏ qua Short: ${v.title}`);
      continue;
    }
    videos.push(v);
  }
  if (!videos.length) throw new Error('Feed không có video thường nào (toàn Short?).');

  await writeFile(OUT_PATH, JSON.stringify(videos, null, 2) + '\n', 'utf8');
  console.log(`Đã ghi ${videos.length} video vào data/videos.json`);
}

main().catch((err) => {
  console.error(`Lỗi: ${err.message}`);
  process.exit(1);
});
