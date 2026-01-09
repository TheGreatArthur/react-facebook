import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Toast, ToastContainer } from 'react-bootstrap'

export default function PostCard({ post, onToggleLike, onDelete }) {
  const [showToast, setShowToast] = useState(false)

  const count =
    typeof post.likesCount === 'number'
      ? post.likesCount
      : Array.isArray(post.likes)
      ? post.likes.length
      : 0

  const liked = Boolean(post.liked)

  const initials = (post.author || 'A')
    .split(' ')
    .map((s) => s[0])
    .slice(0, 2)
    .join('')
    .toUpperCase()

  const time = post.createdAt ? new Date(post.createdAt).toLocaleString() : ''

  const handleDelete = () => {
    onDelete?.(post.id)
    setShowToast(true)
  }

  return (
    <>
      <article className="post-card">
        <header className="post-header">
          <div className="post-avatar">{initials}</div>

          <div className="author-block">
            <Link to={`/user/${encodeURIComponent(post.author)}`} className="author-name">
              {post.author}
            </Link>
            <span className="post-time">{time}</span>
          </div>
        </header>

        <p className="post-content">{post.content}</p>

        <footer className="post-footer">
          <div className="post-actions">
            <button
              className="like-btn"
              aria-pressed={liked}
              onClick={() => onToggleLike?.(post.id)}
            >
              {liked ? '❤️' : '🤍'}
            </button>

            <span className="likes-count">
              {count} {count > 1 ? 'likes' : 'like'}
            </span>
          </div>

          <button className="delete-btn" onClick={handleDelete}>
            Supprimer
          </button>
        </footer>
      </article>

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg="success"
          show={showToast}
          onClose={() => setShowToast(false)}
          delay={2000}
          autohide
        >
          <Toast.Body className="text-white">Post supprimé</Toast.Body>
        </Toast>
      </ToastContainer>
    </>
  )
}