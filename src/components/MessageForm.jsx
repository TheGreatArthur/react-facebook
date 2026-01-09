import { useEffect, useState } from 'react'

export default function MessageForm({
  onAddMessage,
  onUpdateMessage,
  onDeleteMessage,
  editingMessage,
  onCancelEdit,
  compact = false,
}) {
  const [message, setMessage] = useState('')

  useEffect(() => {
    if (editingMessage) setMessage(editingMessage.content)
  }, [editingMessage])

  const handleSubmit = (event) => {
    event.preventDefault()
    const text = message.trim()
    if (!text) return

    if (editingMessage) {
      onUpdateMessage?.(editingMessage.id, text)
    } else {
      onAddMessage?.(text)
    }

    setMessage('')
  }

  return (
    <form onSubmit={handleSubmit} className="message-form">
      <input
        className="message-input"
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Écrire un commentaire..."
        aria-label="Champ de message"
      />

      <button type="submit" aria-label="Publier le message">
        {editingMessage ? 'Modifier' : 'Publier'}
      </button>

      {editingMessage && (
        <>
          <button type="button" onClick={() => { setMessage(''); onCancelEdit?.() }}>
            Annuler
          </button>
          <button type="button" onClick={() => onDeleteMessage?.(editingMessage.id)}>
            Supprimer
          </button>
        </>
      )}
    </form>
  )
}