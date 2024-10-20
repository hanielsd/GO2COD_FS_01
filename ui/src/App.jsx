import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import Header from './components/layout/Header'
import { useSelector } from 'react-redux'
import Login from './pages/publik/Login'
import Protected from './components/route-hocs/Protected'
import OnlyWhenLoggedOut from './components/route-hocs/OnlyWhenLoggedOut'

import Toast from './components/collection/Toast'
import _401Handler from './components/auth/_401Handler'
import Dashboard from './pages/Dashboard'
import Signup from './pages/publik/Signup'
import Profile from './pages/Profile'

function App() {
  const { theme } = useSelector((state) => state.theme)
  const auth = useSelector((state) => state.auth)

  return (
    <div className='h-screen overflow-y-auto' data-theme={theme}>
      <Toast />

      {auth.signedIn && <_401Handler />}

      <Header />
      <Routes>
        <Route
          exact
          path=''
          element={<Protected component={<Dashboard />} />}
        />
        <Route path='profile' element={<Protected component={<Profile />} />} />

        <Route
          path='login'
          element={<OnlyWhenLoggedOut component={<Login />} />}
        />
        <Route
          path='signup'
          element={<OnlyWhenLoggedOut component={<Signup />} />}
        />

        <Route path='*' element={<OnlyWhenLoggedOut component={<Login />} />} />
      </Routes>
    </div>
  )
}

export default App
