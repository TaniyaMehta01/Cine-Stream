# CINE-STREAM – React Movie Explorer

A responsive React single-page movie discovery app built with Vite and the TMDB REST API.

## Features
- Popular movie grid and movie search
- 500ms debounced search (does not request on every keystroke)
- Infinite scroll using `IntersectionObserver`
- Favorites saved in `localStorage`, including after refresh
- Favorites page and movie details route
- Lazy-loaded poster images
- Mood Matcher with an optional secure AI endpoint and a keyword-based fallback
- Responsive layout for desktop, tablet, and mobile
- Demo mode with sample data when no TMDB key is configured

## Requirements
- Node.js (LTS recommended) and npm
- VS Code (recommended)
- Free TMDB API key: https://developer.themoviedb.org/

## Setup in VS Code
1. Extract the ZIP file.
2. Open VS Code.
3. Select **File → Open Folder** and choose the `cine-stream` folder.
4. Open **Terminal → New Terminal**.
5. Run:

```bash
npm install
```

6. Copy `.env.example` to a new file named `.env`.
7. Open `.env` and add your TMDB key:

```env
VITE_TMDB_API_KEY=your_actual_tmdb_api_key
```

8. Start the development server:

```bash
npm run dev
```

9. Open the local URL printed in the terminal (usually `http://localhost:5173`).

To create a production build:

```bash
npm run build
```

## Node.js Standalone ZIP on Windows
If you use the official Node.js standalone ZIP:
1. Extract it to a permanent folder, for example `C:\\nodejs`.
2. Add the folder containing `node.exe` and `npm.cmd` to Windows **Environment Variables → Path**.
3. Close and reopen VS Code.
4. Verify:

```bash
node -v
npm -v
```

If `npm` is not found, check that the extracted folder contains `npm.cmd` and the `node_modules\\npm\\bin` folder. The official Node.js ZIP is expected to include npm; do not add only the folder containing `node.exe` if `npm.cmd` is elsewhere.

## Main folders
```text
cine-stream/
├── public/
├── src/
│   ├── api/tmdb.js
│   ├── components/
│   ├── pages/
│   ├── utils/
│   ├── App.jsx
│   ├── main.jsx
│   └── styles.css
├── .env.example
├── index.html
├── package.json
└── README.md
```

## API key safety
Vite exposes variables prefixed with `VITE_` in browser code. TMDB's developer API key is used here as a client-side demo key; do not use a private API secret in frontend code. For a production application, proxy API requests through a backend. Never place Gemini/OpenAI secret keys in a `VITE_` variable.

## Mood Matcher AI integration
The Mood Matcher works in fallback keyword mode by default. To connect a real AI model, create your own backend endpoint that:
- accepts `POST { "prompt": "..." }`
- calls Gemini/OpenAI on the server using a secret stored only on the server
- returns JSON such as `{ "title": "Movie title" }`

Then set `VITE_MOOD_API_URL` in `.env` to that endpoint and restart Vite. Do not put an AI provider secret key in this React app.

## Routes
- `/` – Discover
- `/favorites` – Saved movies
- `/mood` – Mood Matcher
- `/movie/:id` – Movie details

## Notes
- Without a TMDB key, the app runs with sample demo data.
- TMDB may limit requests or reject an invalid key. Check the key and API status if live movies do not load.
- The app is not affiliated with or endorsed by TMDB.
