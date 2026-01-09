import React, { createContext, useContext, useReducer, useEffect } from 'react'

const THEME_STORAGE_KEY = 'react-facebook:theme'

export const ThemeContext = createContext(null)

const initialState = { theme: 'light' }

function themeReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_THEME':
      return { theme: state.theme === 'light' ? 'dark' : 'light' }
    case 'SET_THEME':
      return { theme: action.payload === 'dark' ? 'dark' : 'light' }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialState)

  // 1) restore theme from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem(THEME_STORAGE_KEY)
      if (saved === 'dark' || saved === 'light') {
        dispatch({ type: 'SET_THEME', payload: saved })
      }
    } catch (e) {}
  }, [])

  // 2) persist
  useEffect(() => {
    try {
      localStorage.setItem(THEME_STORAGE_KEY, state.theme)
    } catch (e) {}
  }, [state.theme])

  // ✅ 3) APPLY CLASS TO BODY (c’est ça qui manquait)
  useEffect(() => {
    document.body.classList.remove('light', 'dark')
    document.body.classList.add(state.theme)
  }, [state.theme])

  return (
    <ThemeContext.Provider value={{ theme: state.theme, dispatch }}>
      {children}
    </ThemeContext.Provider>
  )
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) throw new Error('useTheme must be used within a ThemeProvider')
  return ctx
}