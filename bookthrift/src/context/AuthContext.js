// src/context/AuthContext.js
import { createContext, useReducer, useEffect, useMemo } from 'react'
import { loginUser, registerUser } from '../services/api'

export const AuthContext = createContext()

const initialState = {
  user: null,
  token: null,
  authReady: false
}

export const authReducer = (state, action) => {
  switch (action.type) {
    case 'INIT':
      return { ...state, user: action.payload.user, token: action.payload.token, authReady: true }
    case 'LOGIN':
      return { ...state, user: action.payload.user, token: action.payload.token }
    case 'LOGOUT':
      return { ...state, user: null, token: null }
    default:
      return state
  }
}

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState)

  // hydrate from localStorage once
  useEffect(() => {
    const savedUser = localStorage.getItem('auth_user')
    const savedToken = localStorage.getItem('auth_token')
    dispatch({
      type: 'INIT',
      payload: {
        user: savedUser ? JSON.parse(savedUser) : null,
        token: savedToken || null
      }
    })

    // sync across tabs (logout/login elsewhere)
    const onStorage = (e) => {
      if (e.key === 'auth_user' || e.key === 'auth_token') {
        const u = localStorage.getItem('auth_user')
        const t = localStorage.getItem('auth_token')
        dispatch({ type: 'INIT', payload: { user: u ? JSON.parse(u) : null, token: t || null } })
      }
    }
    window.addEventListener('storage', onStorage)
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  // helpers
  const login = async ({ email, password }) => {
    try {
      const res = await loginUser(email, password)
      const { token, user } = res.data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))
      dispatch({ type: 'LOGIN', payload: { user, token } })
      return { ok: true }
    } catch (err) {
      const msg = err?.response?.data?.error || 'লগইন করতে সমস্যা হয়েছে'
      return { ok: false, error: msg }
    }
  }

  const register = async ({ name, email, contact, password }) => {
    try {
      const res = await registerUser({ name, email, contact, password })
      const { token, user } = res.data
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))
      dispatch({ type: 'LOGIN', payload: { user, token } })
      return { ok: true }
    } catch (err) {
      const msg = err?.response?.data?.error || 'রেজিস্টার করতে সমস্যা হয়েছে'
      return { ok: false, error: msg }
    }
  }

  const logout = () => {
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')
    dispatch({ type: 'LOGOUT' })
  }

  const value = useMemo(
    () => ({
      user: state.user,
      token: state.token,
      authReady: state.authReady,
      dispatch,
      login,
      register,
      logout
    }),
    [state.user, state.token, state.authReady]
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}