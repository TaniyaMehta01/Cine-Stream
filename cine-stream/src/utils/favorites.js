const STORAGE_KEY = 'cine-stream-favorites'

export function getFavorites() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    return saved ? JSON.parse(saved) : []
  } catch {
    return []
  }
}

function saveFavorites(items) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  window.dispatchEvent(new Event('favorites-updated'))
}

export function isFavorite(id) {
  return getFavorites().some((movie) => String(movie.id) === String(id))
}

export function toggleFavorite(movie) {
  const items = getFavorites()
  const exists = items.some((item) => String(item.id) === String(movie.id))
  const updated = exists ? items.filter((item) => String(item.id) !== String(movie.id)) : [movie, ...items]
  saveFavorites(updated)
  return !exists
}

export function removeFavorite(id) {
  saveFavorites(getFavorites().filter((movie) => String(movie.id) !== String(id)))
}