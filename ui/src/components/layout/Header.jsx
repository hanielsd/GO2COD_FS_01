import { useDispatch, useSelector } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { Icon } from '../icons/Icon'
import { Pencil, User } from '../icons/icons'
import auth from '../../services/http/auth'
import { setStatus, setUser } from '../../store/slices/authSlice'
import Logo from '../../assets/logo/transparent-logo.png'

export default function Header() {
  const navigate = useNavigate()
  const location = useLocation()

  const dispatch = useDispatch()

  const { user, signedIn } = useSelector((state) => state.auth)

  const handleLogout = () => {
    dispatch(setUser({ user: null }))
    dispatch(setStatus({ signedIn: false }))
    auth.signOut()
  }

  return (
    <div className='flex items-center border-b space-x-3 py-2 px-6'>
      <div className='cursor-pointer' onClick={() => navigate('/')}>
        <img src={Logo} className='h-10' />
      </div>
      <div className='flex-auto flex items-center justify-end px-1 space-x-3'>
        <input
          type='text'
          className='w-72 px-4 py-[6px] text-sm border border-gray-300 rounded-full focus:outline-none focus:ring-1 focus:ring-primary'
          placeholder='Search for blog posts...'
        />
        <div
          className={
            'text-sm hover:bg-gray-100 hover:text-primary py-[6px] px-3 cursor-pointer rounded flex space-x-1 items-center ' +
            (location.pathname === '/write' ? 'text-primary' : '')
          }
          onClick={() => navigate('/write')}
        >
          <Icon path={Pencil} size={12} />
          <div>Write</div>
        </div>
      </div>

      {!signedIn && (
        <div className='flex space-x-3 items-center'>
          <div
            className={
              'text-sm hover:bg-gray-100 hover:text-primary py-[6px] px-3 cursor-pointer rounded ' +
              (location.pathname === '/login' ? 'text-primary' : '')
            }
            onClick={() => navigate('/login')}
          >
            <div>Sing in</div>
          </div>

          <div
            className={
              'text-sm bg-primary text-white py-[6px] px-4 cursor-pointer rounded-full hover:opacity-80 ' +
              (location.pathname === '/signup' ? 'text-primary' : '')
            }
            onClick={() => navigate('/signup')}
          >
            <div>Get started</div>
          </div>
        </div>
      )}

      {signedIn && (
        <div className='flex space-x-3 items-center'>
          <div className='text-sm'>Hi, {user.firstName}</div>

          <div className='dropdown dropdown-end'>
            <div
              tabIndex={0}
              className='p-2 bg-gray-200 hover:text-primary rounded-full cursor-pointer hover:opacity-75 active:opacity-100'
            >
              <Icon path={User} size={16} />
            </div>

            <div
              tabIndex={0}
              className='dropdown-content z-[1] text-sm p-2 space-y-1 shadow bg-base-100 w-52'
            >
              <div className='p-2 hover:bg-base-200 hover:text-primary cursor-pointer transform active:scale-105'>
                Your Profile
              </div>
              <div
                className='p-2 hover:bg-base-200 hover:text-primary cursor-pointer transform active:scale-105'
                onClick={handleLogout}
              >
                Log out
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
