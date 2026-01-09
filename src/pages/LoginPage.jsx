import { useNavigate } from 'react-router-dom'
import LoginForm from '../components/LoginForm.jsx'
import { useAuth } from '../context/AuthContext.jsx'

export default function LoginPage() {
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleLogin = (username) => {
    // 🔹 Simulation d’une connexion réussie
    login(username)

    // 🔹 Redirection vers l’accueil
    navigate('/')
  }

  return (
    <div className="auth-shell">
      <div className="auth-card">
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  )
}