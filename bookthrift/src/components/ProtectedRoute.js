import { Navigate } from 'react-router-dom'
import { useAuthContext } from '../hooks/useAuthContext'

const ProtectedRoute = ({ children }) => {
  const { user, authReady } = useAuthContext()

  if (!authReady) return null // wait until context finished initializing

  return user ? (
    children
  ) : (
    <Navigate
      to="/"
      replace
      state={{ msg: "⚠️ অনুগ্রহ করে আগে লগইন অথবা রেজিস্টার করুন" }}
    />
  )
}

export default ProtectedRoute