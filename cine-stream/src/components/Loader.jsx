export default function Loader({ text = 'Loading movies...' }) {
  return <div className="loader"><span className="spinner" /><p>{text}</p></div>
}