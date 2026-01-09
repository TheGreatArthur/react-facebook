import { useEffect, useReducer } from 'react'
import PostCard from './PostCard.jsx'
import MessageBoard from './MessageBoard.jsx'
import feedReducer, { initialFeedState } from '../feedReducer'
import CreatePostForm from './CreatePostForm.jsx'

export default function Feed({ showComposer, setShowComposer }) {
  const [posts, dispatch] = useReducer(feedReducer, initialFeedState)

  useEffect(() => {
    document.title = `ReactBook | ${posts.length} Posts`
  }, [posts.length])

  const handleToggleLike = (id) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: id })
  }

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_POST', payload: id })
  }

  return (
    <section>
      <h2>Fil d’actualités</h2>
      <p>Nombre total de posts : {posts.length}</p>

      {showComposer && (
        <CreatePostForm dispatch={dispatch} onCancel={() => setShowComposer(false)} />
      )}

      {/* Affiche les posts gérés localement */}
      {posts && posts.length > 0 ? (
        posts.map((p) => (
          <div key={p.id} className="card">
            <PostCard post={p} onToggleLike={handleToggleLike} onDelete={handleDelete} />
            <div style={{ marginTop: 8 }}>
              <MessageBoard compact />
            </div>
          </div>
        ))
      ) : (
        <p>Pas encore de posts — soyez le premier !</p>
      )}
    </section>
  )
}