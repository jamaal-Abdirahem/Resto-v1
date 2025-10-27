# Resto v1 — Restaurant System Landing

A modern, responsive React + Vite landing site for Resto — a $0/month, all‑in‑one restaurant management system (POS, KDS, Analytics, Inventory, Self‑Service, CRM, SMS). Built with Tailwind CSS v4 and React Router, includes a video hero, feature showcases with real screenshots, testimonials, and a contact page with a working email flow and precise map coordinates.

## Features

- Responsive header and footer with real navigation
- Hero with background video and readability overlay
- 2‑minute tour video with custom controls (play/pause, ±10s, timeline, formatted time)
- Benefits grid and “Win‑win partnership” section
- Why Choose Us with real images (from `public/media`)
- All‑in‑one features list with real screenshots (feature 1–7)
- Testimonials slider (1 card on mobile, 2 on desktop)
- Bold CTAs, including “Profitability’s Secret Ingredient” with a real image
- Contact page with styled form, EmailJS integration (optional), and exact map coordinates

## Tech Stack

- React 19 + Vite 7
- Tailwind CSS v4 (via `@import "tailwindcss"`)
- React Router v6
- lucide-react (icons)
- EmailJS (optional client‑side email) with mailto fallback

## Project Structure

```
.
├─ public/
│  └─ media/
│     ├─ 1026(1).webm
│     ├─ CTA img.jpg
│     ├─ feature 1.png … feature 7.png
│     ├─ picture 1.png, picture 2.png, picture 3.png
│
└─ src/
	 ├─ App.jsx
	 ├─ main.jsx
	 ├─ index.css
	 ├─ components/
	 │  ├─ Header.jsx
	 │  └─ Footer.jsx
	 └─ pages/
			├─ Home.jsx
			├─ Feature.jsx
			├─ About.jsx
			└─ Contact.jsx
```

## Routes

- `/` — Home (hero, tour, benefits, why, features list, testimonials, CTAs)
- `/features` — Feature overview (POS, KDS, Analytics, Inventory, Self‑Service, Customers, SMS)
- `/aboutus` — About/“How it works” consolidated content
- `/contact` — Contact form, direct contact info, and map

## Setup

Prerequisites:

- Node.js 18+ and npm

Install dependencies:

```powershell
npm install
```

Start dev server (Windows PowerShell):

```powershell
npm run dev
```

Build for production:

```powershell
npm run build
```

Preview production build locally:

```powershell
npm run preview
```

## Environment Variables (optional for email)

Create a `.env` file in the project root to enable EmailJS and/or override the contact email address used for mailto.

```
# EmailJS (optional but recommended for sending without opening an email client)
VITE_EMAILJS_SERVICE_ID=your_service_id
VITE_EMAILJS_TEMPLATE_ID=your_template_id
VITE_EMAILJS_PUBLIC_KEY=your_public_key

# Contact email used for mailto fallback and UI links
VITE_CONTACT_EMAIL=hello@resto.so
```

Restart the dev server after adding or changing env variables.

### EmailJS Setup

1. Create an EmailJS account and a service.
2. Create a template with these variables (you can rename as you wish):
   - `from_name`, `from_email`, `phone`, `message`, `subject`, `to_email`
3. Copy your Service ID, Template ID, and Public Key to `.env`.
4. The Contact form will automatically try EmailJS first; if not configured, it falls back to `mailto:`.

## Styling

- Tailwind CSS v4 utilities for layout and spacing.
- Consistent typography with small utility classes defined in `src/index.css`:
  - `.title` — large section headings
  - `.title-sm` — medium/card headings
  - `.body` — paragraph text
  - `.eyebrow` — small uppercase labels

## Assets

- All images and video live in `public/media/`:
  - Hero video: `1026(1).webm`
  - Features: `feature 1.png` … `feature 7.png`
  - Why choose us: `picture 1.png`, `picture 2.png`, `picture 3.png`
  - CTA image: `CTA img.jpg`

## Map Coordinates (Contact)

- Exact coordinates used: `2.038639, 45.29825` (from 2°02'19.1"N 45°17'53.7"E).
- The map iframe uses those coordinates and includes an "Open in Google Maps" shortcut.

## Troubleshooting

- Dev server won’t start (port in use):
  - Stop other Vite/dev servers; or set a different port, e.g., `vite --port 5174`.
- Styles not applying:
  - Ensure `src/index.css` is imported in `main.jsx` and Tailwind is properly set up.
- Email not sending:
  - Check `.env` has correct `VITE_EMAILJS_*` keys, and the template has matching fields. If not configured, the form will fall back to your default contact email via `mailto:`.
- Images not loading:
  - Confirm assets are in `public/media` and referenced via `/media/<file>` URLs.

## Scripts

- `npm run dev` — Start the development server
- `npm run build` — Build the production bundle
- `npm run preview` — Preview the production build locally

## License

This project is for demonstration and internal use. Add your license of choice if you plan to distribute.
