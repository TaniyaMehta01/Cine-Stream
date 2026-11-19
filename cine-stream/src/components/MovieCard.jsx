import { useState } from 'react'
import { Heart, Star } from 'lucide-react'
import { Link } from 'react-router-dom'
import { isFavorite, toggleFavorite } from '../utils/favorites'
import { posterUrl } from '../api/tmdb'

export default function MovieCard({ movie }) {
  const [favorite, setFavorite] = useState(isFavorite(movie.id))
  const poster = posterUrl(movie.poster_path)
  const year = movie.release_date?.slice(0, 4) || 'N/A'

  function handleFavorite(event) {
    event.preventDefault()
    event.stopPropagation()
    setFavorite(toggleFavorite(movie))
  }

  return (
    <article className="movie-card">
      <Link to={`/movie/${movie.id}`} className="poster-link" aria-label={`View ${movie.title}`}>
        <div className="poster-wrap">
          {poster
            ? <img src={poster} alt={`${movie.title} poster`} loading="lazy" />
            : <div className="poster-placeholder"><span>🎬</span><strong>{movie.title}</strong><small>CINE STREAM</small></div>}
          <div className="poster-overlay"><span>View details</span></div>
        </div>
        <div className="movie-info">
          <h3 title={movie.title}>{movie.title}</h3>
          <div className="movie-meta"><span>{year}</span><span className="rating"><Star size={14} fill="currentColor" /> {Number(movie.vote_average || 0).toFixed(1)}</span></div>
        </div>
      </Link>
      <button className={`favorite-button ${favorite ? 'active' : ''}`} onClick={handleFavorite} aria-label={favorite ? 'Remove from favorites' : 'Add to favorites'}>
        <Heart size={18} fill={favorite ? 'currentColor' : 'none'} />
      </button>
    </article>
  )
}