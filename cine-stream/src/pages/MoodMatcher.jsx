import { useState } from 'react'
import { Sparkles, WandSparkles } from 'lucide-react'
import { searchMovies } from '../api/tmdb'
import MovieGrid from '../components/MovieGrid'
import Loader from '../components/Loader'

const moodSuggestions = [
  { label: 'Need a laugh', prompt: 'I want a funny comedy', emoji: '😄' },
  { label: 'Big adventure', prompt: 'I want an exciting adventure movie', emoji: '🧭' },
  { label: 'Think deeply', prompt: 'I want a thoughtful mystery or drama', emoji: '🧠' },
  { label: 'Feel inspired', prompt: 'I want an uplifting and inspiring movie', emoji: '✨' },
]

function fallbackTitle(prompt) {
  const text = prompt.toLowerCase()
  if (/fun|laugh|happy|comedy/.test(text)) return 'comedy'
  if (/action|adventure|exciting/.test(text)) return 'adventure'
  if (/sad|cry|emotional|drama|thoughtful/.test(text)) return 'drama'
  if (/scary|fear|horror/.test(text)) return 'horror'
  if (/space|science|future/.test(text)) return 'science fiction'
  if (/mystery|think|puzzle/.test(text)) return 'mystery'
  return 'popular'
}

export default function MoodMatcher() {
  const [prompt, setPrompt] = useState('')
  const [movies, setMovies] = useState([])
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  async function matchMood(value = prompt) {
    if (!value.trim()) return
    setLoading(true)
    setMessage('')
    try {
      let title = ''
      const moodApi = import.meta.env.VITE_MOOD_API_URL?.trim()
      if (moodApi) {
        const response = await fetch(moodApi, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ prompt: value }),
        })
        if (!response.ok) throw new Error('AI recommendation service is unavailable.')
        const data = await response.json()
        title = data.title || data.movieTitle || ''
      }
      const result = await searchMovies(title || fallbackTitle(value), 1)
      setMovies(result.results || [])
      if (!title) setMessage('Showing a keyword-based suggestion. Connect your own secure AI endpoint to enable AI-generated movie titles.')
      if (!(result.results || []).length) setMessage('No exact match found. Try another mood or suggestion.')
    } catch (error) {
      setMessage(error.message || 'Could not get a recommendation.')
      setMovies([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <section className="page-heading"><span className="eyebrow">LET YOUR VIBE PICK THE FILM</span><h1><Sparkles className="heading-icon" /> Mood Matcher</h1><p>Describe how you feel and discover a movie for the moment.</p></section>
      <section className="mood-panel">
        <div className="mood-icon"><WandSparkles size={28} /></div>
        <h2>What are you in the mood for?</h2>
        <p>Tell us the kind of story you want to watch.</p>
        <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Example: I want an exciting action movie with a clever story..." rows={3} />
        <div className="mood-chips">{moodSuggestions.map((item) => <button key={item.label} onClick={() => { setPrompt(item.prompt); matchMood(item.prompt) }}>{item.emoji} {item.label}</button>)}</div>
        <button className="primary-button" onClick={() => matchMood()} disabled={loading || !prompt.trim()}><Sparkles size={17} /> Find my movie</button>
      </section>
      {loading && <Loader text="Finding a movie for your mood..." />}
      {message && <div className="notice">{message}</div>}
      {movies.length > 0 && <><div className="section-heading"><div><span className="eyebrow">YOUR MATCHES</span><h2>Picked for your mood</h2></div></div><MovieGrid movies={movies} /></>}
    </>
  )
}