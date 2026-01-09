import { useEffect, useMemo, useReducer, useState } from 'react'
import { Toast, ToastContainer } from 'react-bootstrap'
import PostCard from './PostCard.jsx'
import MessageBoard from './MessageBoard.jsx'
import feedReducer, { initialFeedState } from '../feedReducer'
import CreatePostForm from './CreatePostForm.jsx'
import FeedSearchBar from './FeedSearchBar.jsx'

export default function Feed({ showComposer, setShowComposer }) {
  const [posts, dispatch] = useReducer(feedReducer, initialFeedState)
  const [toast, setToast] = useState({ show: false, message: '', variant: 'success' })
  const [searchTerm, setSearchTerm] = useState('')

  const filteredPosts = useMemo(() => {
    const query = searchTerm.trim().toLowerCase()
    if (!query) return posts
    return posts.filter((post) => {
      const haystack = [post.title, post.author, post.content]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return haystack.includes(query)
    })
  }, [posts, searchTerm])

  useEffect(() => {
    const displayCount = searchTerm.trim() ? filteredPosts.length : posts.length
    document.title = `ReactBook | ${displayCount} Posts`
  }, [posts.length, searchTerm, filteredPosts.length])

  const isFiltering = searchTerm.trim().length > 0

  const handleToggleLike = (id) => {
    dispatch({ type: 'TOGGLE_LIKE', payload: id })
  }

  const handleDelete = (id) => {
    dispatch({ type: 'DELETE_POST', payload: id })
    setToast({ show: true, message: 'Post supprimé', variant: 'success' })
  }

  const handleToast = (message, variant = 'success') => {
    setToast({ show: true, message, variant })
  }

  return (
    <section>
      <h2>Fil d’actualités</h2>
      <p>
        Nombre total de posts : {posts.length}
        {isFiltering ? ` • Résultats : ${filteredPosts.length}` : ''}
      </p>

      <FeedSearchBar
        value={searchTerm}
        onChange={setSearchTerm}
        onClear={() => setSearchTerm('')}
        totalCount={posts.length}
        resultsCount={filteredPosts.length}
      />

      {showComposer && (
        <CreatePostForm
          dispatch={dispatch}
          onCancel={() => setShowComposer(false)}
          onToast={handleToast}
        />
      )}

      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() => setToast((t) => ({ ...t, show: false }))}
          delay={2500}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>

      {posts.length > 0 && filteredPosts.length > 0 ? (
        filteredPosts.map((p) => (
          <div key={p.id} className="card">
            <PostCard post={p} onToggleLike={handleToggleLike} onDelete={handleDelete} />
            <div style={{ marginTop: 8 }}>
              <MessageBoard compact />
            </div>
          </div>
        ))
      ) : posts.length > 0 && filteredPosts.length === 0 ? (
        <p>Aucun post ne correspond à votre recherche.</p>
      ) : (
        <p>Pas encore de posts — soyez le premier !</p>
      )}
    </section>
  )
}
