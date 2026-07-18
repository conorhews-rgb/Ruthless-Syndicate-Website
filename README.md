# Ruthless Syndicate

Marketing website for **Ruthless Syndicate** — apparel for fighters, lifters, and purpose-driven athletes, and the Official Platinum Sponsor of Combat Zone MMA.

> Loyalty. Discipline. Ruthless Pursuit.

## Stack

Pure static site — no build step, no dependencies.

- `index.html` — page structure and copy
- `styles.css` — design system (black / white / dark-green, gritty-modern theme)
- `script.js` — content data (products, athletes, team) and interactions

## Features

- Gritty-modern aesthetic: film-grain texture, condensed display type, dark-green accent
- Hover interactions: image zoom, button shine + colour shift
- Shop grid with category filters and add-to-cart counter
- Sponsored athletes and Combat Zone MMA event spotlight
- Fully responsive with a mobile slide-out menu
- Respects `prefers-reduced-motion`

## Run locally

Any static file server works, e.g.:

```bash
python3 -m http.server 4601
```

Then open http://localhost:4601
