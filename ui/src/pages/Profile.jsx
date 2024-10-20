import { useForm } from 'react-hook-form'
import BaseInput from '../components/controlled/BaseInput'
import { useState } from 'react'
import { http } from '../services/http/http'
import Spinner from '../components/collection/Spinner'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../store/slices/authSlice'

export default function Profile() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: user.firstName,
      lastName: user.lastName,
    },
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleUpdate = async ({ email, ...data }) => {
    if (loading) return

    setLoading(true)
    if (data.password === '') delete data.password

    const response = await http.request({
      method: 'put',
      url: 'users/' + user.id,
      data,
    })

    if (!response.isError) {
      dispatch(
        setUser({
          user: { ...user, firstName: data.firstName, lastName: data.lastName },
        }),
      )
      setSuccess(true)
    } else setError('Something went wrong, try again later!')
    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center min-h-full py-2 bg-gray-100'>
      <div className='w-2/5 bg-white rounded-lg px-6 py-6 pb-10 shadow-2xl'>
        <div className='space-y-3'>
          <div className='space-y-2'>
            {error && <div className='text-red-600 text-sm'>{error}</div>}
            {success && (
              <div className='text-sm space-y-2 py-2 text-green-600'>
                Your account has been updated.
              </div>
            )}

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
              disabled
              placeholder='Your email'
              value={user.email}
            />
            <BaseInput
              type='password'
              label='Password'
              placeholder='Passowrd'
              {...register('password')}
              onEnter={handleSubmit(handleUpdate)}
            />
          </div>

          <div className=''>
            <button
              className='btn btn-block uppercase bg-primary text-white hover:bg-primary hover:text-white hover:opacity-75'
              onClick={handleSubmit(handleUpdate)}
            >
              {loading && <Spinner />}
              {loading ? 'Updating' : 'Update'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
