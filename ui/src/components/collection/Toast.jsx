import { useEffect, useState } from 'react'
import eventEmitter from '../../eventEmitter'

export default function Toast() {
  const [messages, setMessages] = useState([])

  useEffect(() => {
    eventEmitter.on('toast', (message) => {
      setMessages((prev) => {
        setTimeout(() => handleClose(prev.length), 4000)
        return [...prev, message]
      })
    })

    return () => eventEmitter.off('toast', () => null)
  }, [])

  const handleClose = (index) => {
    setMessages((prev) => prev.filter((item, itemIndex) => itemIndex !== index))
  }

  return (
    <div className='toast toast-start z-50'>
      {messages.map((item, index) => (
        <div
          key={index}
          role='alert'
          className='alert relative pr-10'
          style={{ boxShadow: '2px 2px 10px 0px #666' }}
        >
          <svg
            xmlns='http://www.w3.org/2000/svg'
            fill='none'
            viewBox='0 0 24 24'
            className='stroke-info shrink-0 w-6 h-6'
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              strokeWidth='2'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            ></path>
          </svg>
          <div>
            <div className='font-semibold text-sm'>{item.title}</div>

            <div className='text-xs'>{item.message}</div>
          </div>

          <button
            className='btn btn-xs rounded btn-ghost absolute right-2 top-2'
            onClick={() => handleClose(index)}
          >
            ✕
          </button>
        </div>
      ))}
    </div>
  )
}
