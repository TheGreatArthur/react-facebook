import React, { useContext, useMemo } from 'react'
import { AuthContext } from '../context/AuthContext'
import { ThemeContext } from '../context/ThemeContext'

function getInitials(name = '') {
  const parts = String(name).trim().split(/\s+/).filter(Boolean)
  if (!parts.length) return '?'
  const first = parts[0]?.[0] ?? ''
  const last = parts.length > 1 ? parts[parts.length - 1]?.[0] ?? '' : ''
  return (first + last).toUpperCase()
}

export default function Header({ onAddPost, onLogout }) {
  const auth = useContext(AuthContext)
  const user = auth?.user ?? null

  const themeCtx = useContext(ThemeContext)
  const theme = themeCtx?.theme ?? 'light'
  const dispatch = themeCtx?.dispatch

  const toggleTheme = () => {
    if (typeof dispatch === 'function') dispatch({ type: 'TOGGLE_THEME' })
  }

  const displayName = useMemo(() => {
    return user?.name || user?.username || user?.email || 'Invité'
  }, [user])

  const initials = useMemo(() => getInitials(displayName), [displayName])

  return (
    <header className="app-header">
      <div className="header-inner">
        <div className="brand">
          <div className="logo">RS</div>
          <div className="brand-text">
            <div className="brand-title">Mon Réseau Social</div>
            <div className="brand-subtitle">Fil d’actualité</div>
          </div>
        </div>

        <div className="header-right">
          {/* Profil dans le header */}
          <div className="userchip" title={displayName}>
            <div className="avatar">{initials}</div>
            <div className="userchip-text">
              <div className="userchip-name">{displayName}</div>
              {user?.email ? <div className="userchip-sub">{user.email}</div> : null}
            </div>
          </div>

          <div className="header-actions">
            <button className="btn ghost" onClick={toggleTheme}>
              {theme === 'light' ? '🌙 Dark' : '☀️ Light'}
            </button>

            <button className="btn" onClick={onAddPost}>
              Ajouter un post
            </button>

            <button className="btn danger" onClick={onLogout}>
              Déconnexion
            </button>
          </div>
        </div>
      </div>
    </header>
  )
}