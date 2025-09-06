import { useState } from 'react'
import { useAuthContext } from './useAuthContext'
import { registerUser } from '../services/api'

export const useRegister = () => {
  const [error, setError] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const { dispatch } = useAuthContext()

  const register = async ({ name, email, contact, password }) => {
    setIsLoading(true)
    setError(null)

    try {
      const res = await registerUser({ name, email, contact, password })
      const { token, user } = res.data

      // Save to storage
      localStorage.setItem('auth_token', token)
      localStorage.setItem('auth_user', JSON.stringify(user))

      // Update state
      dispatch({ type: 'LOGIN', payload: { user, token } })

      setIsLoading(false)
      return { ok: true }
    } catch (err) {
      const msg = err?.response?.data?.error || 'রেজিস্টার করতে সমস্যা হয়েছে'
      setError(msg)
      setIsLoading(false)
      return { ok: false, error: msg }
    }
  }

  return { register, isLoading, error }
}