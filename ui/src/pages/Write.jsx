import { useForm } from 'react-hook-form'
import BaseInput from '../components/controlled/BaseInput'
import { useState } from 'react'
import { http } from '../services/http/http'
import Spinner from '../components/collection/Spinner'
import BaseTextArea from '../components/controlled/BaseTextArea'

export default function Write() {
  const {
    handleSubmit,
    register,
    formState: { errors },
    reset,
  } = useForm()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePublish = async (data) => {
    if (loading) return

    const response = await http.request({
      method: 'post',
      url: 'posts',
      data,
    })

    if (!response.isError) {
      setSuccess(true)
      reset({ title: '', body: '' })
    } else setError('Something went wrong, try again later!')
    setLoading(false)
  }

  return (
    <div className='flex justify-center items-center min-h-full py-2 bg-gray-100'>
      <div className='w-3/5 bg-white rounded-lg px-6 py-6 pb-10 shadow-2xl'>
        <div className='text-lg uppercase pb-4'>Create Post</div>
        <div className='space-y-3'>
          <div className='space-y-2'>
            {error && <div className='text-red-600 text-sm'>{error}</div>}
            {success && (
              <div className='text-sm space-y-2 py-2 text-green-600'>
                Your post has been published.
              </div>
            )}

            <BaseInput
              label='Title'
              placeholder='Enter title'
              {...register('title', {
                required: 'Title is required',
              })}
              error={errors.title && errors.title.message}
            />
            <BaseTextArea
              label='Body'
              placeholder='Write the content here...'
              rows={3}
              {...register('body', {
                required: 'Body is required',
              })}
              error={errors.body && errors.body.message}
            />
          </div>

          <div>
            <button
              className='btn btn-block uppercase bg-primary text-white hover:bg-primary hover:text-white hover:opacity-75'
              onClick={handleSubmit(handlePublish)}
            >
              {loading && <Spinner />}
              {loading ? 'Publishing' : 'Publish'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
