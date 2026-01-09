import { useState } from 'react'

export default function MessageForm({ onAddMessage }) {
  const [message, setMessage] = useState('')

  const handleSubmit = (event) => {
    event.preventDefault()
    if (message.trim() === '') return
    onAddMessage(message)
    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        className="message-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrire un message..."
        aria-label="Champ de message"
      />
      <button type="submit" aria-label="Publier le message">Publier</button>
    </form>
  )
}