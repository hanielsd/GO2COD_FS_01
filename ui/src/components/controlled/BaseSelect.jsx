import { forwardRef } from 'react'

const BaseSelect = forwardRef(
  ({ className, label, items, size, ...rest }, ref) => {
    return (
      <div className={'form-control ' + className}>
        {label && (
          <label className='label'>
            <span className='label-text uppercase'>{label}</span>
          </label>
        )}
        <div className='hidden select-sm select-xs'></div>
        <select
          className={'select select-bordered' + (size ? ' select-' + size : '')}
          ref={ref}
          {...rest}
        >
          {items.map((item, index) => (
            <option key={index} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
      </div>
    )
  },
)

export default BaseSelect
