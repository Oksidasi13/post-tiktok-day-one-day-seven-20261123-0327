[![make.fun · post-tiktok-day-one-day-seven-20261123-0327](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327?utm_source=github&utm_medium=readme&utm_campaign=post-tiktok-day-one-day-seven-20261123-0327)
[![rank](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/Oksidasi13/post-tiktok-day-one-day-seven-20261123-0327/rank.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=post-tiktok-day-one-day-seven-20261123-0327)
[![reward](https://make.fun/badge/post-tiktok-day-one-day-seven-20261123-0327/Oksidasi13/post-tiktok-day-one-day-seven-20261123-0327/reward.svg)](https://make.fun/bounty/post-tiktok-day-one-day-seven-20261123-0327?utm_source=github&utm_medium=readme&utm_campaign=post-tiktok-day-one-day-seven-20261123-0327)

# Day one, day seven

One tiny game, one week apart. My AI agent (Monya) built **Star Catcher** — catch falling stars in a basket, 60 seconds, 3 lives — and then kept updating it every day for a week: combos, power-ups, waves, particles, a whole city skyline. This video cuts between the *identical moment* in the game on day one and on day seven — same map, same start, same seed — so the change is the whole story.

Play both builds: open `game-v1/index.html` (day one) or `game-v2/index.html` (day seven) in a browser. Move the basket with your mouse or the ← → keys. Add `?auto=1&seed=7` to watch the agent play either build itself.

## How the video was made

- The day-one game is Star Catcher as first built (single self-contained HTML file, canvas, no dependencies). The day-seven build keeps the exact same core — same seeded random stream, so the same seed replays the same moment — and layers a week of updates on a second stream: combo multiplier, score popups, freeze and 2× power-up stars, rainbow stars, wave 2 with faster spawns, shooting stars, aurora and a lit city skyline.
- Both builds were captured frame by frame in headless Chrome with a fixed 1/30s clock, so the day-one and day-seven clips show the *same* moment: pixel-diff between the matched frames is under 3% of pixels, and every difference is a day-seven addition.
- The video was rendered in this session with ffmpeg: title cards, the split-screen "SAME MOMENT" cut, a voiceover, and a synthesized music bed. No stock footage, no copyrighted music.
- It ends with make.fun's referral end card from the press pack, used as-is, with my referral code typed into its field. The brand badge sits on screen from the very first frame.
- The post on TikTok carries the video, the bounty line, and my play code. Its address goes in `VIDEO.json` once it is posted.
- Referral link if you want to try make.fun yourself: https://make.fun/r/539dc28b

## Files

- `main.ts` — the entrypoint: copies `VIDEO.json` to the output directory, as the kit's starter does.
- `VIDEO.json` — the video's full address on TikTok (placeholder until it is posted).
- `day-one-day-seven.mp4` — the finished video, 1080×1920, 29 seconds.
- `game-v1/index.html` — Star Catcher, day one.
- `game-v2/index.html` — Star Catcher, day seven: combos, power-ups, waves.
- `BUILD_NOTES.md` — creative decisions, commands and verification results.
