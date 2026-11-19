const BASE_URL = 'https://api.themoviedb.org/3'
const API_KEY = import.meta.env.VITE_TMDB_API_KEY?.trim()
const DEMO_MODE = !API_KEY || API_KEY === 'your_tmdb_api_key_here'

export const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500'
export const BACKDROP_BASE = 'https://image.tmdb.org/t/p/w1280'

const demoMovies = [
  { id: 1, title: 'The Grand Adventure', overview: 'A group of friends sets out on an unforgettable journey across mysterious landscapes.', poster_path: null, backdrop_path: null, release_date: '2024-05-17', vote_average: 8.2, genre_ids: [12, 18] },
  { id: 2, title: 'Midnight Signal', overview: 'A late-night radio host receives a message that changes everything.', poster_path: null, backdrop_path: null, release_date: '2023-10-06', vote_average: 7.8, genre_ids: [53, 9648] },
  { id: 3, title: 'Beyond the Horizon', overview: 'An ambitious crew explores a distant world and discovers a new beginning.', poster_path: null, backdrop_path: null, release_date: '2025-02-14', vote_average: 8.5, genre_ids: [878, 12] },
  { id: 4, title: 'The Last Laugh', overview: 'An aspiring comedian finds friendship and confidence in an unexpected place.', poster_path: null, backdrop_path: null, release_date: '2022-08-19', vote_average: 7.1, genre_ids: [35, 18] },
  { id: 5, title: 'Hidden Kingdom', overview: 'A young explorer uncovers the secrets of an ancient kingdom.', poster_path: null, backdrop_path: null, release_date: '2024-11-01', vote_average: 7.9, genre_ids: [14, 12] },
  { id: 6, title: 'City of Echoes', overview: 'A detective follows a trail of clues through a city full of secrets.', poster_path: null, backdrop_path: null, release_date: '2023-04-21', vote_average: 7.6, genre_ids: [80, 9648] },
  { id: 7, title: 'Summer Notes', overview: 'A heartwarming story about music, family, and new beginnings.', poster_path: null, backdrop_path: null, release_date: '2021-06-11', vote_average: 7.4, genre_ids: [10749, 18] },
  { id: 8, title: 'Orbit One', overview: 'A space mission faces its greatest challenge far from Earth.', poster_path: null, backdrop_path: null, release_date: '2025-01-10', vote_average: 8.0, genre_ids: [878, 53] },
]

async function request(path, params = {}) {
  if (DEMO_MODE) return null
  const url = new URL(`${BASE_URL}${path}`)
  url.search = new URLSearchParams({ api_key: API_KEY, language: 'en-US', ...params })
  const response = await fetch(url)
  if (!response.ok) {
    const message = response.status === 401 ? 'TMDB API key is invalid. Check your .env file.' : `TMDB request failed (${response.status}).`
    throw new Error(message)
  }
  return response.json()
}

export function isDemoMode() {
  return DEMO_MODE
}

export async function getPopularMovies(page = 1) {
  const data = await request('/movie/popular', { page })
  if (data) return data
  return { page, results: page === 1 ? demoMovies : demoMovies.map((movie) => ({ ...movie, id: movie.id + page * 100 })), total_pages: 5 }
}

export async function searchMovies(query, page = 1) {
  const data = await request('/search/movie', { query, page, include_adult: 'false' })
  if (data) return data
  const results = demoMovies.filter((movie) => movie.title.toLowerCase().includes(query.toLowerCase()))
  return { page, results, total_pages: 1 }
}

export async function getMovieDetails(id) {
  const data = await request(`/movie/${id}`)
  if (data) return data
  return demoMovies.find((movie) => String(movie.id) === String(id)) || demoMovies[0]
}

export function posterUrl(path) {
  return path ? `${IMAGE_BASE}${path}` : ''
}

export function backdropUrl(path) {
  return path ? `${BACKDROP_BASE}${path}` : ''
}