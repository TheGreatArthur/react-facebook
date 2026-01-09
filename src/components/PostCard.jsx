import { Link } from 'react-router-dom'

export default function PostCard({ post, onToggleLike, onDelete }) {
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

  const time = post.createdAt
    ? new Date(post.createdAt).toLocaleString()
    : ''

  return (
    <article className="post-card">
      <header className="post-header">
        <div className="post-avatar">{initials}</div>

        <div className="author-block">
          <Link
            to={`/user/${post.author}`}
            className="author-name"
          >
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

        <button
          className="delete-btn"
          onClick={() => onDelete?.(post.id)}
        >
          Supprimer
        </button>
      </footer>
    </article>
  )
}