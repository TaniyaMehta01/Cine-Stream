import { useCallback, useEffect, useRef, useState } from 'react'
import { Search, X } from 'lucide-react'
import { getPopularMovies, isDemoMode, searchMovies } from '../api/tmdb'
import { useDebouncedValue } from '../utils/debounce'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'

export default function Home() {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebouncedValue(query, 500)
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)
  const [loadingMore, setLoadingMore] = useState(false)
  const [error, setError] = useState('')
  const sentinel = useRef(null)
  const requestId = useRef(0)

  const loadFirstPage = useCallback(async () => {
    const id = ++requestId.current
    setLoading(true)
    setError('')
    setPage(1)
    try {
      const data = debouncedQuery.trim()
        ? await searchMovies(debouncedQuery.trim(), 1)
        : await getPopularMovies(1)
      if (id !== requestId.current) return
      setMovies(data.results || [])
      setTotalPages(Math.min(data.total_pages || 1, 500))
    } catch (err) {
      if (id === requestId.current) setError(err.message || 'Unable to load movies.')
    } finally {
      if (id === requestId.current) setLoading(false)
    }
  }, [debouncedQuery])

  useEffect(() => { loadFirstPage() }, [loadFirstPage])

  const loadMore = useCallback(async () => {
    if (loading || loadingMore || page >= totalPages) return
    setLoadingMore(true)
    const nextPage = page + 1
    try {
      const data = query.trim() ? await searchMovies(query.trim(), nextPage) : await getPopularMovies(nextPage)
      setMovies((current) => {
        const known = new Set(current.map((movie) => movie.id))
        return [...current, ...(data.results || []).filter((movie) => !known.has(movie.id))]
      })
      setPage(nextPage)
    } catch (err) {
      setError(err.message || 'Could not load more movies.')
    } finally {
      setLoadingMore(false)
    }
  }, [loading, loadingMore, page, totalPages, query])

  useEffect(() => {
    const node = sentinel.current
    if (!node) return
    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) loadMore()
    }, { rootMargin: '300px' })
    observer.observe(node)
    return () => observer.disconnect()
  }, [loadMore])

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <span className="eyebrow">YOUR NEXT MOVIE NIGHT STARTS HERE</span>
          <h1>Stories worth<br /><span className="gradient-text">staying in for.</span></h1>
          <p>Explore popular movies, find hidden gems, and keep your favorites close.</p>
          <div className="search-box">
            <Search size={20} />
            <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search movies..." aria-label="Search movies" />
            {query && <button onClick={() => setQuery('')} aria-label="Clear search"><X size={18} /></button>}
            <span className="search-shortcut">500ms</span>
          </div>
          <small className="search-hint">Search waits until you stop typing before requesting results.</small>
        </div>
        <div className="hero-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="clapper">▶</div><span className="floating-star">✦</span></div>
      </section>

      <section className="section-heading">
        <div><span className="eyebrow">{query ? 'FIND YOUR FILM' : 'HANDPICKED FOR YOU'}</span><h2>{query ? `Results for “${query}”` : 'Popular right now'}</h2></div>
        <span className="result-label">{movies.length} titles loaded</span>
      </section>

      {isDemoMode() && <div className="notice"><strong>Demo mode:</strong> Add your TMDB API key to the <code>.env</code> file to load live movie data. Sample movies are shown for now.</div>}
      {error && <div className="error-box">{error} <button onClick={loadFirstPage}>Try again</button></div>}
      {loading ? <Loader /> : <MovieGrid movies={movies} />}
      {loadingMore && <Loader text="Finding more movies..." />}
      {!loading && page < totalPages && <div ref={sentinel} className="scroll-sentinel" aria-hidden="true" />}
      {!loading && page >= totalPages && movies.length > 0 && <p className="end-message">You’re all caught up. Happy watching!</p>}
    </>
  )
}