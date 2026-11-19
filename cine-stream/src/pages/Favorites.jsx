import { useEffect, useState } from 'react'
import { Heart } from 'lucide-react'
import { getFavorites, removeFavorite } from '../utils/favorites'
import MovieGrid from '../components/MovieGrid'

export default function Favorites() {
  const [movies, setMovies] = useState(getFavorites)
  useEffect(() => {
    const update = () => setMovies(getFavorites())
    window.addEventListener('favorites-updated', update)
    return () => window.removeEventListener('favorites-updated', update)
  }, [])
  return (
    <>
      <section className="page-heading"><span className="eyebrow">YOUR PERSONAL COLLECTION</span><h1><Heart className="heading-icon" /> My Favorites</h1><p>Movies you saved for another movie night.</p></section>
      <MovieGrid movies={movies} />
      {movies.length > 0 && <button className="text-button clear-button" onClick={() => { movies.forEach((movie) => removeFavorite(movie.id)); setMovies([]) }}>Clear favorites</button>}
    </>
  )
}