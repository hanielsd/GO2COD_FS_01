import { forwardRef } from 'react'

const BaseTextArea = forwardRef(
  ({ className, label, placeholder = '', ...rest }, ref) => {
    return (
      <div className={'form-control ' + className}>
        <label className='label'>
          <span className='label-text uppercase'>{label}</span>
        </label>
        <textarea
          className='textarea textarea-bordered'
          placeholder={placeholder}
          ref={ref}
          {...rest}
        ></textarea>
      </div>
    )
  },
)

export default BaseTextArea
