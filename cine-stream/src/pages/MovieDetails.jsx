import { useEffect, useState } from 'react'
import { ArrowLeft, Heart, Star } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { backdropUrl, getMovieDetails, posterUrl } from '../api/tmdb'
import { isFavorite, toggleFavorite } from '../utils/favorites'
import Loader from '../components/Loader'

export default function MovieDetails() {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [favorite, setFavorite] = useState(false)
  const [error, setError] = useState('')
  useEffect(() => {
    let active = true
    getMovieDetails(id).then((data) => {
      if (active) { setMovie(data); setFavorite(isFavorite(data.id)) }
    }).catch((err) => active && setError(err.message))
    return () => { active = false }
  }, [id])
  if (error) return <div className="error-box">{error}</div>
  if (!movie) return <Loader />
  const backdrop = backdropUrl(movie.backdrop_path)
  return (
    <article className="details-page">
      <Link to="/" className="back-link"><ArrowLeft size={17} /> Back to Discover</Link>
      <div className="details-hero" style={backdrop ? { backgroundImage: `linear-gradient(90deg, #090d18 10%, rgba(9,13,24,.82) 55%, rgba(9,13,24,.35)), url(${backdrop})` } : {}}>
        <div className="details-poster">{posterUrl(movie.poster_path) ? <img src={posterUrl(movie.poster_path)} alt={`${movie.title} poster`} /> : <div className="poster-placeholder"><span>🎬</span><strong>{movie.title}</strong></div>}</div>
        <div className="details-copy"><span className="eyebrow">MOVIE DETAILS</span><h1>{movie.title}</h1><div className="details-meta"><span>{movie.release_date?.slice(0, 4) || 'Release date N/A'}</span><span><Star size={15} fill="currentColor" /> {Number(movie.vote_average || 0).toFixed(1)} / 10</span><span>{movie.runtime ? `${movie.runtime} min` : ''}</span></div><p>{movie.overview || 'No description is available for this title.'}</p><button className={`primary-button ${favorite ? 'saved' : ''}`} onClick={() => setFavorite(toggleFavorite(movie))}><Heart size={17} fill={favorite ? 'currentColor' : 'none'} /> {favorite ? 'Saved to Favorites' : 'Add to Favorites'}</button></div>
      </div>
    </article>
  )
}