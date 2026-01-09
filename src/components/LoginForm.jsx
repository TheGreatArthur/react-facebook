import { useState } from 'react'

export default function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleEmailChange = (event) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    console.log({ email, password })
    // simple validation
    if (!email || !password) {
      setMessage('Veuillez remplir email et mot de passe')
      return
    }

    setMessage('Tu es connecté mon gaté !')
    // notify parent that login succeeded (simulation)
    if (typeof onLogin === 'function') onLogin({ email })

    setTimeout(() => {
      setMessage('')
    }, 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2>Formulaire pour se connecter comme un GOAT</h2>

      <label className="form-row">
        Email :
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
          required
        />
      </label>

      <label className="form-row">
        Mot de passe :
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Ton mot de passe"
          required
        />
      </label>

      <button type="submit">Se connecter</button>

      {message && (
        <p className="form-note">{message}</p>
      )}
    </form>
  )
}