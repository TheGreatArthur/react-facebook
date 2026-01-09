import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import Header from '../components/Header.jsx'
import Feed from '../components/Feed.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function FeedPage() {
  const { isAuthenticated, logout } = useAuth()
  const [showComposer, setShowComposer] = useState(false)

  if (!isAuthenticated) return <Navigate to="/login" replace />

  const handleAddPost = () => setShowComposer((s) => !s)

  return (
    <div className="app-shell">
      <Header onAddPost={handleAddPost} onLogout={logout} />

      <div className="container">
        <main className="main main--center">
          <div className="card">
            <Feed
              showComposer={showComposer}
              setShowComposer={setShowComposer}
            />
          </div>
        </main>
      </div>
    </div>
  )
}