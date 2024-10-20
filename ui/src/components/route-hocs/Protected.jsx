import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
export default function Protected({ component, roles = [] }) {
  // roles: roles allowed to see this page
  const auth = useSelector((state) => state.auth)

  if (!auth.signedIn) return <Navigate to='/login' replace={true} />

  // if (!roles.includes(auth.user.role)) return <Navigate to="/" replace={true} />

  return component
}
