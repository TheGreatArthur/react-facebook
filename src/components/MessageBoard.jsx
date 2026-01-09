import { useState } from 'react'
import MessageForm from './MessageForm.jsx'
import { ListGroup, Form, Button } from 'react-bootstrap'

export default function MessageBoard({ compact = false }) {
  const [messages, setMessages] = useState([])

  function addMessage(newMessage) {
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  // compact: used when displayed under a post (no heading, smaller input)
  if (compact) {
    return (
      <div>
        <MessageForm onAddMessage={addMessage} />
        <ListGroup className="mt-2">
          {messages.map((msg, index) => (
            <ListGroup.Item key={index} className="comment">{msg}</ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    )
  }

  return (
    <div className="card">
      <h2>Mur de messages</h2>
      <MessageForm onAddMessage={addMessage} />

      {messages.length === 0 ? (
        <p>Aucun message pour le moment</p>
      ) : (
        <ListGroup className="mt-2">
          {messages.map((msg, index) => (
            <ListGroup.Item key={index}>{msg}</ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  )
}