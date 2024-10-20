import { forwardRef } from 'react'

const BaseTextArea = forwardRef(
  ({ className, label, placeholder = '', error = '', ...rest }, ref) => {
    return (
      <div className={'form-control ' + className}>
        <label className='label'>
          <span className='label-text uppercase'>{label}</span>
        </label>
        <textarea
          className={
            'textarea textarea-bordered ' + (error ? 'textarea-error' : '')
          }
          placeholder={placeholder}
          ref={ref}
          {...rest}
        ></textarea>

        {error && <div className='text-red-600 pt-1 text-sm'>{error}</div>}
      </div>
    )
  },
)

export default BaseTextArea
