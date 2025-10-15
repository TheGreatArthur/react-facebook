import { useState } from 'react'

export default function PostCard({ author, content, initialLikes }) {
  const [likes, setLikes] = useState(initialLikes)

  const handleLike = () => {
    setLikes(prevLikes => prevLikes + 1)
  }

  const handleReset = () => {
    setLikes(initialLikes)
  }

  return (
    <article
      style={{
        border: '1px solid #ddd',
        borderRadius: 8,
        padding: 16,
        marginBottom: 12,
        backgroundColor: 'white',
        boxShadow: '0 1px 2px rgba(0,0,0,0.05)'
      }}
    >
      <p style={{ marginBottom: 8 }}>{content}</p>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <small>Auteur : {author}</small>
        <div>
          <button 
            onClick={handleLike} 
            style={{
              marginRight: 8,
              border: 'none',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: '#007bff',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            J’aime ♡
          </button>

          <button 
            onClick={handleReset}
            style={{
              marginRight: 8,
              border: 'none',
              padding: '6px 10px',
              borderRadius: 6,
              backgroundColor: '#6c757d',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            Réinitialiser
          </button>

          <small>{likes} likes</small>
        </div>
      </div>
    </article>
  )
}