import MovieCard from './MovieCard'

export default function MovieGrid({ movies }) {
  if (!movies.length) return <div className="empty-state"><div className="empty-icon">🎞️</div><h2>No movies found</h2><p>Try another title or check back later.</p></div>
  return <div className="movie-grid">{movies.map((movie) => <MovieCard key={movie.id} movie={movie} />)}</div>
}