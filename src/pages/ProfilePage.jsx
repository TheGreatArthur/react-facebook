import { Navigate, useParams } from 'react-router-dom'
import Header from '../components/Header.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function ProfilePage() {
  const { isAuthenticated, logout } = useAuth()
  const { username } = useParams()

  if (!isAuthenticated) return <Navigate to="/login" replace />

  return (
    <div className="app-shell">
      <Header onAddPost={() => {}} onLogout={logout} />

      <div className="container">
        <main className="main main--center">
          <div className="card">
            <h2 style={{ marginBottom: 12 }}>
              Profil de @{username}
            </h2>

            {/* Optionnel */}
            <p>
              Nom d’utilisateur : <strong>{username}</strong>
            </p>

          </div>
        </main>
      </div>
    </div>
  )
}