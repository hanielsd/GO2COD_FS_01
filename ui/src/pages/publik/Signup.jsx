import { useForm } from 'react-hook-form'
import BaseInput from '../../components/controlled/BaseInput'
import { useEffect, useState } from 'react'
import Logo from '../../assets/logo/transparent-logo.png'
import { http } from '../../services/http/http'
import { Icon } from '../../components/icons/Icon'
import Spinner from '../../components/collection/Spinner'
import { useNavigate } from 'react-router-dom'

export default function Signup() {
  const navigate = useNavigate()
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const [count, setCount] = useState(5)
  const [isCounting, setIsCounting] = useState(false)

  useEffect(() => {
    let timer
    if (isCounting && count > 0) {
      timer = setInterval(() => {
        setCount((prev) => prev - 1)
      }, 1000)
    } else if (count === 0) {
      setIsCounting(false)
      navigate('/login')
    }

    return () => clearInterval(timer)
  }, [isCounting, count])

  const handleRegister = async (data) => {
    if (loading) return

    setLoading(true)
    const response = await http.request({
      method: 'post',
      url: 'users',
      data,
    })

    if (!response.isError) {
      setSuccess(true)
      setIsCounting(true)
    } else setError('Something went wrong, try again later!')
    setLoading(false)
  }
  return (
    <div className='flex justify-center items-center min-h-full py-2 bg-gray-100'>
      <div className='w-2/5 bg-white rounded-lg px-6 py-6 pb-10 shadow-2xl'>
        <div className='flex items-center justify-center pb-6'>
          <img src={Logo} className='h-14' />
        </div>

        <div className='pb-2'>
          <div className='text-lg uppercase'>Join us!</div>
          <div className='text-sm text-gray-600'>
            Create account to share your ideas
          </div>
        </div>

        <div className='space-y-3'>
          <div className='space-y-2'>
            {error && <div className='text-red-600 text-sm'>{error}</div>}
            {success && (
              <div className='text-sm space-y-2 py-6'>
                <div className='text-green-600'>
                  Congrats! Your account has been created.
                </div>
                <div>Redirecting you to login page in {count} sec</div>
                <div className='flex space-x-2 items-center'>
                  <div>OR click</div>
                  <div
                    className='px-2 py-1 text-sm bg-gray-100 hover:text-primary cursor-pointer rounded'
                    onClick={() => navigate('/login')}
                  >
                    Log in
                  </div>
                </div>
              </div>
            )}

            {!success && (
              <>
                <BaseInput
                  label='First Name'
                  placeholder='Enter first name'
                  {...register('firstName', {
                    required: 'First name is required',
                  })}
                  error={errors.firstName && errors.firstName.message}
                />
                <BaseInput
                  label='Last Name'
                  placeholder='Enter last name'
                  {...register('lastName', {
                    required: 'Last name is required',
                  })}
                  error={errors.lastName && errors.lastName.message}
                />
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
                  {...register('password', {
                    required: 'Password is required',
                  })}
                  error={errors.password && errors.password.message}
                  onEnter={handleSubmit(handleRegister)}
                />
              </>
            )}
          </div>

          {!success && (
            <div className=''>
              <button
                className='btn btn-block uppercase bg-primary text-white hover:bg-primary hover:text-white hover:opacity-75'
                onClick={handleSubmit(handleRegister)}
              >
                {loading && <Spinner />}
                {loading ? 'Creating Account' : 'Create Account'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
