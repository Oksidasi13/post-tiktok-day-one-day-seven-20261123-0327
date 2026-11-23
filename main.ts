// Entrypoint for the day-one / day-seven TikTok bounty entry (Node 22, stdlib only).
//
// What it does, in order:
//   1. Reads VIDEO.json out of the repository root and checks that its "url"
//      names a real TikTok video: host www.tiktok.com and a path shaped like
//      /@handle/video/<digits>. The video id is pulled out of that path.
//   2. Checks the entry's video file, day-one-day-seven.mp4, sits in the same
//      root and is between 1 and 100 MiB.
//   3. Checks README.md links back to this bounty's page on make.fun.
//   4. Copies VIDEO.json into the output directory, where the gate reads it.
//
// The repository root and the output directory are /bot and /output inside the
// grader's container; outside it, set MAKEFUN_BOT_DIR and MAKEFUN_OUTPUT_DIR
// to point at a local checkout and a local output folder instead:
//   mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
//
// Any failed check prints its reason to stderr and exits 1. On success it
// prints one summary line and exits 0.

import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync } from 'node:fs';
import { join } from 'node:path';

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? '/bot';
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? '/output';

const VIDEO_FILE = 'day-one-day-seven.mp4';
const BOUNTY_LINK = 'https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327';
const MIN_VIDEO_BYTES = 1 * 1024 * 1024;
const MAX_VIDEO_BYTES = 100 * 1024 * 1024;

function fail(message: string): never {
  console.error(`main.ts: ${message}`);
  process.exit(1);
}

function readVideoUrl(): { url: string; videoId: string } {
  let raw: string;
  try {
    raw = readFileSync(join(BOT_DIR, 'VIDEO.json'), 'utf8');
  } catch (err) {
    fail(`cannot read VIDEO.json in ${BOT_DIR}: ${(err as Error).message}`);
  }
  let parsed: unknown;
  try {
    parsed = JSON.parse(raw!);
  } catch (err) {
    fail(`VIDEO.json is not valid JSON: ${(err as Error).message}`);
  }
  const url = (parsed as { url?: unknown }).url;
  if (typeof url !== 'string' || url.length === 0) {
    fail('VIDEO.json has no "url" string');
  }
  let videoId: string;
  try {
    const link = new URL(url);
    const match = /^\/@[^/]+\/video\/(\d+)$/.exec(link.pathname);
    if (link.protocol !== 'https:' || link.hostname !== 'www.tiktok.com' || !match) {
      fail(`VIDEO.json url is not a TikTok video address: ${url}`);
    }
    videoId = match[1];
  } catch (err) {
    if (err instanceof Error && err.message.startsWith('VIDEO.json url')) throw err;
    fail(`VIDEO.json url does not parse: ${url}`);
  }
  return { url, videoId: videoId! };
}

function checkVideoFile(): number {
  const path = join(BOT_DIR, VIDEO_FILE);
  if (!existsSync(path)) {
    fail(`${VIDEO_FILE} is missing from ${BOT_DIR}`);
  }
  const size = statSync(path).size;
  if (size < MIN_VIDEO_BYTES || size > MAX_VIDEO_BYTES) {
    fail(`${VIDEO_FILE} is ${size} bytes, outside the 1-100 MiB range`);
  }
  return size;
}

function checkReadmeLink(): void {
  let text: string;
  try {
    text = readFileSync(join(BOT_DIR, 'README.md'), 'utf8');
  } catch (err) {
    fail(`cannot read README.md in ${BOT_DIR}: ${(err as Error).message}`);
  }
  if (!text!.includes(BOUNTY_LINK)) {
    fail(`README.md does not link to ${BOUNTY_LINK}`);
  }
}

function deliverVideoJson(): void {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  try {
    copyFileSync(join(BOT_DIR, 'VIDEO.json'), join(OUTPUT_DIR, 'VIDEO.json'));
  } catch (err) {
    fail(`could not copy VIDEO.json to ${OUTPUT_DIR}: ${(err as Error).message}`);
  }
}

const { videoId } = readVideoUrl();
const videoBytes = checkVideoFile();
checkReadmeLink();
deliverVideoJson();
console.log(
  `main.ts: entry ok — video ${videoId}, ${VIDEO_FILE} ${(videoBytes / 1024 / 1024).toFixed(2)} MiB, VIDEO.json copied to ${OUTPUT_DIR}.`,
);
