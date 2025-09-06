// src/hooks/useLogout.js
import { useAuthContext } from './useAuthContext'

export const useLogout = () => {
  const { dispatch } = useAuthContext()

  const logout = () => {
   
    localStorage.removeItem('auth_token')
    localStorage.removeItem('auth_user')

    // update context
    dispatch({ type: 'LOGOUT' })
  }

  return { logout }
}