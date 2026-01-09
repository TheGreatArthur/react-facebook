import React from 'react'
import useFormInput from '../hooks/useFormInput'
import { Form, Button } from 'react-bootstrap'

export default function CreatePostForm({ dispatch, onCancel }) {
  const content = useFormInput('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const value = (content && content.value) || ''
    const trimmed = value.toString().trim()
    if (!trimmed) return
    dispatch({ type: 'ADD_POST', payload: { content: trimmed, author: 'Vous' } })
    // reset
    content.onChange('')
    if (typeof onCancel === 'function') onCancel()
  }

  return (
    <section className="composer">
      <h3>Créer un post</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control as="textarea" rows={3} placeholder="Quoi de neuf ?" {...content} />
        </Form.Group>
        <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
          <Button type="submit">Publier</Button>
          <Button variant="secondary" type="button" onClick={onCancel}>Annuler</Button>
        </div>
      </Form>
    </section>
  )
}
