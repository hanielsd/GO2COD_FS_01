import { useEffect } from 'react'
import eventEmitter from '../../eventEmitter'
import { useDispatch } from 'react-redux'
import { setStatus, setUser } from '../../store/slices/authSlice'
import auth from '../../services/http/auth'

export default function _401Handler() {
  const dispatch = useDispatch()

  const handleLogout = () => {
    dispatch(setUser({ user: null }))
    dispatch(setStatus({ signedIn: false }))
    auth.signOut()
    window.location.reload()
  }

  useEffect(() => {
    eventEmitter.on('sign-out', handleLogout)

    return () => eventEmitter.off('sign-out', () => null)
  }, [])

  return null
}
