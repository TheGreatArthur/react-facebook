import { useState } from 'react'
import MessageForm from './MessageForm.jsx'

export default function MessageBoard() {
  const [messages, setMessages] = useState([])

  function addMessage(newMessage) {
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  return (
    <div style={{ margin: '20px 0' }}>
      <h2>Liste des messages de mon Gate</h2>
      <MessageForm onAddMessage={addMessage} />

      {messages.length === 0 ? (
        <p>Aucun message now</p>
      ) : (
        <ul>
          {messages.map((msg, index) => (
            <li key={index}>{msg}</li>
          ))}
        </ul>
      )}
    </div>
  )
}