# satnamenergy.com

The Satnam Energy site: a homepage that lists the work, and one page per interactive piece. Next.js, no CSS framework.

```
npm install
npm run dev      # http://localhost:3000
npm run build
```

## Where things are

| What | Where |
|---|---|
| Homepage | `src/app/page.jsx` |
| Top bar, About and footer (every page) | `src/app/layout.jsx` |
| Colours, type and layout (Satnam design kit v3.0) | `src/app/globals.css` |
| The featured piece and the "More work" list | `src/content/work.js` |
| Article: Southeast Asia's energy outlooks | `src/app/work/southeast-asia-energy-outlooks/page.jsx` |
| Data behind that article's charts | `src/content/outlooks.js` |
| Charts | `src/components/charts/` |
| Logo, cover map, paper texture | `public/brand/` |
| Hosted PDFs | `public/reports/` |

## Adding work

Add an entry to `WORK` in `src/content/work.js` (newest first). To change the featured piece, edit `FEATURED` in the same file.

Addresses from the previous site (`/insights`, `/services`, `/about` and so on) redirect; the list is in `next.config.js`.
