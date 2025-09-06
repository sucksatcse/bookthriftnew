// src/hooks/useLogin.js
import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { loginUser } from '../services/api'

export const useLogin = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const login = async ({ email, password }) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await loginUser(email, password)
      const { token, user } = res.data

      // save credentials to localStorage
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))

      // update context
      dispatch({ type: 'LOGIN', payload: { user, token } })

      setIsLoading(false)
      return { ok: true }
    } catch (err) {
      const msg = err?.response?.data?.error || 'লগইন করতে সমস্যা হয়েছে'
      setError(msg)
      setIsLoading(false)
      return { ok: false, error: msg }
    }
  }

  return { login, isLoading, error }
}