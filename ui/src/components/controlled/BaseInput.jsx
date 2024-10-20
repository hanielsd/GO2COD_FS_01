import { forwardRef } from 'react'

const BaseInput = forwardRef(
  (
    {
      className,
      label,
      type = 'text',
      placeholder = '',
      error = '',
      onEnter,
      size = '',
      ...rest
    },
    ref,
  ) => {
    const handleKeyDown = (event) => {
      if (event.key === 'Enter' && onEnter) onEnter()
    }
    return (
      <div className={'form-control ' + className}>
        {label && (
          <label className='label'>
            <span className='label-text uppercase'>{label}</span>
          </label>
        )}
        <input
          type={type}
          placeholder={placeholder}
          className={
            'input input-bordered w-full ' +
            (error ? 'input-error' : '') +
            (size ? ' input-' + size : '')
          }
          ref={ref}
          {...rest}
          onKeyDown={handleKeyDown}
        />

        {error && <div className='text-red-600 pt-1 text-sm'>{error}</div>}
      </div>
    )
  },
)
export default BaseInput
