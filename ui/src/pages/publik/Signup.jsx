import { useForm } from 'react-hook-form'
import BaseInput from '../../components/controlled/BaseInput'
import { useState } from 'react'
import Logo from '../../assets/logo/transparent-logo.png'
import { http } from '../../services/http/http'
import { Icon } from '../../components/icons/Icon'
import Spinner from '../../components/collection/Spinner'

export default function Signup() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const handleLogin = async (data) => {
    setLoading(true)
    const response = await http.request({
      method: 'post',
      url: 'users',
      data,
    })

    if (!response.isError) {
      //redirect to login
    } else setError('something went wrong!')
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

            <BaseInput
              label='First Name'
              placeholder='Enter first name'
              {...register('firstName', { required: 'First name is required' })}
              error={errors.firstName && errors.firstName.message}
            />
            <BaseInput
              label='Last Name'
              placeholder='Enter last name'
              {...register('lastName', { required: 'Last name is required' })}
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
              {loading ? 'Creating Account' : 'Create Account'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
