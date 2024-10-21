import BaseInput from '../components/controlled/BaseInput'
import { useState } from 'react'
import { http } from '../services/http/http'
import Spinner from '../components/collection/Spinner'

import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'

export default function Write() {
  const [title, setTitle] = useState('')
  const [body, setBody] = useState('')
  const [initial, setInitial] = useState(true)

  const handleSubmit = (cb) => {
    return () => {
      setInitial(false)
      let invalid = !title || !body
      if (invalid) return

      cb({ title, body })
    }
  }

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handlePublish = async (data) => {
    if (loading) return

    setLoading(true)
    const response = await http.request({
      method: 'post',
      url: 'posts',
      data,
    })

    if (!response.isError) {
      setSuccess(true)
      setTitle('')
      setBody('')
      setInitial(true)
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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              error={title || initial ? '' : 'Title is required'}
            />

            <div
              className={
                'rounded ring-[#FF5861] p-[2px] -m-[2px] ' +
                (body || initial ? '' : 'focus-within:ring-2')
              }
            >
              <div
                className={
                  'space-y-1 p-2 rounded border ' +
                  (body || initial ? '' : 'border-[#FF5861]')
                }
              >
                <label className='label'>
                  <span className='label-text uppercase'>Body</span>
                </label>
                <ReactQuill
                  value={body}
                  onChange={setBody}
                  modules={{
                    toolbar: [
                      [{ header: [1, 2, false] }],
                      ['bold', 'italic', 'underline'],

                      [{ list: 'ordered' }, { list: 'bullet' }],
                    ],
                  }}
                />
                {!initial && !body && (
                  <div className='text-red-600 pt-1 text-sm'>
                    Body is required
                  </div>
                )}
              </div>
            </div>
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
