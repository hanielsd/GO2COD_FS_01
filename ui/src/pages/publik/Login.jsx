import { useForm } from 'react-hook-form'
import BaseInput from '../../components/controlled/BaseInput'
import { useState } from 'react'
import auth from '../../services/http/auth'
import { useDispatch } from 'react-redux'
import { setStatus, setUser } from '../../store/slices/authSlice'
import Logo from '../../assets/logo/transparent-logo.png'
import Spinner from '../../components/collection/Spinner'

export default function Login() {
  const dispatch = useDispatch()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (data) => {
    if (loading) return

    setLoading(true)
    const response = await auth.signIn({
      method: 'post',
      url: 'auth/login',
      data,
    })

    if (!response.isError) {
      dispatch(setUser({ user: response.user }))
      dispatch(setStatus({ signedIn: true }))
      window.location.reload()
    } else setError('Incorrect email or password!')
    setLoading(false)
  }
  return (
    <div className='flex justify-center items-center h-full py-2 bg-gray-100'>
      <div className='w-2/5 bg-white -mt-10 rounded-lg px-6 py-6 pb-10 shadow-2xl'>
        <div className='flex items-center justify-center pb-6'>
          <img src={Logo} className='h-14' />
        </div>

        <div className='pb-2'>
          <div className='text-lg uppercase'>Welcome back!</div>
          <div className='text-sm text-gray-600'>Login to continue</div>
        </div>

        <div className='space-y-3'>
          <div className='space-y-2'>
            {error && <div className='text-red-600 text-sm'>{error}</div>}
            <BaseInput
              label='Email'
              placeholder='Your email'
              {...register('email', { required: 'Email is required' })}
              error={errors.email && errors.email.message}
            />
            <BaseInput
              type='password'
              label='Password'
              placeholder='Passowrd'
              {...register('password', { required: 'Password is required' })}
              error={errors.password && errors.password.message}
              onEnter={handleSubmit(handleLogin)}
            />
          </div>

          <div className=''>
            <button
              className='btn btn-block uppercase bg-primary text-white hover:bg-primary hover:text-white hover:opacity-75'
              onClick={handleSubmit(handleLogin)}
            >
              {loading && <Spinner />}
              log in
            </button>
          </div>
          <div className='cursor-pointer hover:text-primary'>
            Forgot password?
          </div>
        </div>
      </div>
    </div>
  )
}
