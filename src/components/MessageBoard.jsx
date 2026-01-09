import { useState } from 'react'
import MessageForm from './MessageForm.jsx'
import { ListGroup, Button } from 'react-bootstrap'

export default function MessageBoard({ compact = false }) {
  const [messages, setMessages] = useState([])
  const [editingMessage, setEditingMessage] = useState(null)

  function addMessage(content) {
    setMessages((prev) => [...prev, { id: Date.now(), content }])
  }

  function updateMessage(id, content) {
    setMessages((prev) => prev.map((m) => (m.id === id ? { ...m, content } : m)))
    setEditingMessage(null)
  }

  function deleteMessage(id) {
    setMessages((prev) => prev.filter((m) => m.id !== id))
    setEditingMessage(null)
  }

  function cancelEdit() {
    setEditingMessage(null)
  }

  const list = (
    <ListGroup className="mt-2">
      {messages.map((m) => (
        <ListGroup.Item key={m.id} className={compact ? 'comment' : undefined}>
          <div className="d-flex justify-content-between align-items-center gap-2">
            <span>{m.content}</span>
            <div className="d-flex gap-2">
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={() => setEditingMessage(m)}
              >
                Modifier
              </Button>
              <Button
                variant="outline-danger"
                size="sm"
                onClick={() => deleteMessage(m.id)}
              >
                Supprimer
              </Button>
            </div>
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  )

  if (compact) {
    return (
      <div>
        <MessageForm
          onAddMessage={addMessage}
          onUpdateMessage={updateMessage}
          onDeleteMessage={deleteMessage}
          editingMessage={editingMessage}
          onCancelEdit={cancelEdit}
          compact
        />
        {messages.length > 0 && list}
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Mur de messages</h2>

      <MessageForm
        onAddMessage={addMessage}
        onUpdateMessage={updateMessage}
        onDeleteMessage={deleteMessage}
        editingMessage={editingMessage}
        onCancelEdit={cancelEdit}
      />

      {messages.length === 0 ? <p>Aucun message pour le moment</p> : list}
    </div>
  )
}