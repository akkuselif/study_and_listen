# Study & Listen

> Step inside the world's most beautiful libraries. Watch. Listen. Study like you're really there.

Inspired by [Drive & Listen](https://driveandlisten.app), Study & Listen pairs video footage of iconic world libraries with ambient sound so you can study as if you're really there.

---

## Features

- 8 beautiful libraries across 7 countries
- Library ambience or lo-fi music audio layer
- Live clock in the video overlay
- Pomodoro timer with customizable focus/break durations
- Focus mode — hides everything, shows only the clock and timer
- Keyboard shortcuts: `Space` = start/pause, `F` = focus mode, `Esc` = exit focus

---

## Deploy to GitHub Pages (free, ~5 minutes)

1. **Create a GitHub account** at [github.com](https://github.com) if you don't have one.

2. **Create a new repository**
   - Go to github.com → click the `+` → "New repository"
   - Name it: `study-and-listen`
   - Set to **Public**
   - Click "Create repository"

3. **Upload the files**
   - Click "uploading an existing file"
   - Drag and drop all 3 files: `index.html`, `style.css`, `app.js`
   - Click "Commit changes"

4. **Enable GitHub Pages**
   - Go to your repo → Settings → Pages (left sidebar)
   - Under "Source", select `Deploy from a branch`
   - Branch: `main`, folder: `/ (root)`
   - Click Save

5. **Your site goes live at:**
   `https://YOUR-USERNAME.github.io/study-and-listen`
   (takes ~1 minute to deploy)

---

## Get a custom domain later

When you're ready for `studyandlisten.com`:
1. Buy the domain at [Namecheap](https://namecheap.com) (~$10/year)
2. In GitHub Pages settings, add your custom domain
3. In Namecheap DNS, add a CNAME record pointing to `YOUR-USERNAME.github.io`

---

## Files

```
study-and-listen/
├── index.html   — page structure
├── style.css    — all styling
└── app.js       — libraries data, Pomodoro, clock, sound logic
```

---

## Adding more libraries

In `app.js`, add an entry to the `LIBRARIES` array:

```js
{
  name: "Bibliothèque nationale",
  loc:  "Paris, France",
  country: "France",
  vid:  "YOUTUBE_VIDEO_ID",   // the part after watch?v=
  desc: "Short description of the library",
},
```

Find a good YouTube walking tour of the library, copy the video ID from the URL, and paste it in.
