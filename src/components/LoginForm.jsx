import { useState } from 'react'

export default function LoginForm() {
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
    setMessage('Tu es connecté mon gaté !')

    setTimeout(() => {
      setMessage('')
    }, 3000)
  }

  return (
    <form onSubmit={handleSubmit} style={{ margin: '16px 0' }}>
      <h2>Formulaire pour se connecter comme un GOAT</h2>

      <label style={{ display: 'block', marginBottom: 8 }}>
        Email :
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          placeholder="Email"
        />
      </label>

      <label style={{ display: 'block', marginBottom: 8 }}>
        Mot de passe :
        <input
          type="password"
          value={password}
          onChange={handlePasswordChange}
          placeholder="Ton mot de passe"
        />
      </label>

      <button type="submit">
        Se connecter
      </button>

      {message && (
        <p style={{ marginTop: 12, color: 'green', fontWeight: 'bold' }}>
          {message}
        </p>
      )}
    </form>
  )
}