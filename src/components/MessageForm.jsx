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
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrire le message juste la gate"
        style={{ marginRight: 8 }}
      />
      <button type="submit">PUBLIER</button>
    </form>
  )
}