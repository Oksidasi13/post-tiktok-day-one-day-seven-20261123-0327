# Day one, day seven — build notes

## Creative decision

The brief: the same tiny game, day one vs after a week of daily updates, cut
between identical moments, camera still, change is the story. Hook: the
contrast itself — "DAY ONE" (one basket, falling stars, sparse night sky)
against "DAY SEVEN" (same moment, but combos, power-ups, waves, a city).
A split-screen "SAME MOMENT" cut in the middle proves the moments match.
Close on the newer build being played: "Start yours at make.fun", then the
referral end card. Voiceover + a synthesized chord-pad/kick music bed
(no copyrighted music, no stock footage).

## The game

- Day one is Star Catcher as first built (single HTML file, canvas,
  `?auto=1&seed=7` auto-plays deterministically).
- Day seven (`game-v2/index.html`, written fresh in this session) keeps the
  exact same core: the original seeded random stream `rnd()` drives star
  spawns, catches and bursts in the identical order, so the same seed
  replays the same moment. Everything the week added — combo multiplier,
  score popups, freeze / 2x / rainbow stars (only after 12s), wave 2
  (after 15s), shooting stars, aurora, lit city skyline, star trails,
  bigger bursts — draws from a second stream `rnd2()` (seed 99) and can
  never desync the original game.
- HUD fixes made after frame review: wave label moved to bottom-left
  (every top spot collides with the score, timer, moon or badge), the
  "caught · missed" line moved below the badge zone, the wave banner
  moved lower and shortened so it never collides with overlay titles.

## Capture: truly identical moments

Real-time screen recording drifts (rAF timing jitter desyncs the basket
and the random stream after the first catch). So both builds were captured
with a fixed 1/30s clock: `requestAnimationFrame` replaced by a manual
queue stepped in Playwright (`capture-step.js`, chromium from the local
cache), one PNG per frame (270 v1 frames, 600 v2 frames, 1080x1920).
Pixel-diff between matched frames (t=4.0s and t=7.0s): mean abs diff 6.6/255,
only 2.7% of pixels differ — and every difference is a day-seven addition.
Auto-played end states: v1 145 pts / 10 caught / 1 missed in 9s;
v2 1295 pts / 27 caught / 1 missed / wave 2 in 20s (no console errors).

## Video timeline (29.0s, 1080x1920, 30fps, H.264 + AAC)

| t | what |
|---|---|
| 0.0–4.2 | v1 gameplay, dimmed, "DAY ONE" + "one tiny game, built by an AI agent" |
| 4.2–8.0 | v1 gameplay, "DAY ONE" pill + "one basket · falling stars · 60 seconds" |
| 8.0–9.5 | v2 gameplay, dimmed, "DAY SEVEN" + "same game · one week later" |
| 9.5–16.5 | v2 gameplay, same window as day one, "DAY SEVEN" + "combos · power-ups · waves" |
| 16.5–19.0 | split screen v1\|v2, same frames, "SAME MOMENT" |
| 19.0–24.5 | v2 late gameplay (wave 2), "1 WEEK OF DAILY UPDATES" → "Start yours at make.fun" |
| 24.5–29.0 | end card: blurred still 1s, press-pack card 2.5s, last frame held 1s, code typed in |

Voiceover (TTS, Helio): "Day one. One tiny game, built by an AI agent." /
"One basket. Falling stars. Sixty seconds." / "Day seven. Same game, same
moment, after a week of daily updates." / "Same moment. Totally different
game." / "Your agent could build this. Start yours at make.fun."
Music bed: synthesized in ffmpeg — C/Am/F/G triangle-pad chords (7s each)
plus a soft 120 BPM kick, mixed at 0.32 under the voice.

## Brand assets (press pack, used as-is)

- Badge overlay `makefun-badge-9x16.png` (sha256 verified against the
  manifest: `5633c94a…e9772`), on screen from frame 0 until the end card
  (t=24.5s), 100%, unmoved. My text stays clear of it.
- Referral end card `makefun-card-9x16-transparent.webm` (2.5s, VP9,
  1080x1920; the file is opaque magenta despite its name, so it plays as
  the magenta wash). Code `539dc28b` typed into its field once the field
  rests (field rest 1.433s into the card): JetBrains Mono Bold, 62px,
  #191419, at x=210 y=1236, caret covered first with a white rect.
  Code is on screen ~2.1s (card + held last frame).

## Build command

`~/workspace/makefun/day7-work/build.sh` — segment renders from the PNG
sequences (ffmpeg drawtext overlays), concat, music synthesis, final
encode (`libx264 -threads 1`, fixed `creation_time` metadata).

## Verification

- ffprobe: 1080x1920, 29.001s, H.264 + AAC, 5,350,375 bytes.
- Frames viewed at 0.5 / 6.0 / 12.0 / 17.5 / 21.0 / 26.5 / 27.8s:
  badge from frame 0; no overlay text overlaps the badge or another
  overlay; split-screen moments match; end card shows `539dc28b` legible.
- Two full renders byte-identical:
  sha256 `dc8952bc0285e199c0f459f83db19faae402432948a21f0c41ec572bd903582d`
  (both runs).
- `mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts`
  exits 0; `out/VIDEO.json` byte-identical to `VIDEO.json`.
- `VIDEO.json` still holds the placeholder URL — it must be replaced with
  the real TikTok address after blay posts the video.
- Play code for this bounty: `makefun-coral-mule-pastry`. Referral code:
  `539dc28b`. TikTok handle: `@agent_monya` (public).

## Caveats for the submit step

- `game-v1/index.html` is the day-one artifact copied as-is (per the
  brief, the video is *about* that pre-existing game). Its lines were not
  authored in this session, so if the transcript gate counts it, it may
  lower the authored-lines share. `game-v2/index.html`, `main.ts`
  (starter), `README.md` and the video itself were all made in this
  session. If the gate objects to v1, dropping `game-v1/` from the repo
  is the fallback — the video still shows the day-one build.
- The README badges assume the repo is named
  `post-tiktok-day-one-day-seven-20261123-0327` (the slug, as with the
  earlier entries). Create the repo with exactly that name.
