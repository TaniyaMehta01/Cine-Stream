import { useEffect, useState } from 'react'
import { NavLink, Route, Routes } from 'react-router-dom'
import { Clapperboard, Heart, House, Sparkles } from 'lucide-react'
import Home from './pages/Home'
import Favorites from './pages/Favorites'
import MoodMatcher from './pages/MoodMatcher'
import MovieDetails from './pages/MovieDetails'
import { getFavorites } from './utils/favorites'

export default function App() {
  const [favoriteCount, setFavoriteCount] = useState(getFavorites().length)

  useEffect(() => {
    const update = () => setFavoriteCount(getFavorites().length)
    window.addEventListener('favorites-updated', update)
    window.addEventListener('storage', update)
    return () => {
      window.removeEventListener('favorites-updated', update)
      window.removeEventListener('storage', update)
    }
  }, [])

  return (
    <div className="app-shell">
      <header className="topbar">
        <NavLink to="/" className="brand">
          <span className="brand-icon"><Clapperboard size={22} /></span>
          <span>CINE<span className="brand-accent">STREAM</span></span>
        </NavLink>
        <nav className="nav-links">
          <NavLink to="/" end><House size={17} /> <span>Discover</span></NavLink>
          <NavLink to="/favorites"><Heart size={17} /> <span>Favorites</span><span className="count">{favoriteCount}</span></NavLink>
          <NavLink to="/mood"><Sparkles size={17} /> <span>Mood Matcher</span></NavLink>
        </nav>
      </header>

      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorites" element={<Favorites />} />
          <Route path="/mood" element={<MoodMatcher />} />
          <Route path="/movie/:id" element={<MovieDetails />} />
          <Route path="*" element={<div className="empty-state"><h2>Page not found</h2><NavLink to="/">Go to Discover</NavLink></div>} />
        </Routes>
      </main>

      <footer className="footer">
        <p>© {new Date().getFullYear()} Cine-Stream · Discover your next favorite film.</p>
        <p>Movie data provided by TMDB. This product uses the TMDB API but is not endorsed or certified by TMDB.</p>
      </footer>
    </div>
  )
}