// Tooltip.js
import Tippy from '@tippyjs/react'
import 'tippy.js/dist/tippy.css'
import './tooltip-themes.css'

import { useEffect, useRef, useState } from 'react'

const Tooltip = ({ trigger, Content }) => {
  const [visible, setVisible] = useState(false)

  const toggle = () => {
    setVisible((prev) => !prev)
  }

  const tooltipRef = useRef(null)
  const handleOutsideClick = (event) => {
    if (tooltipRef.current && !tooltipRef.current.contains(event.target)) {
      setVisible(false)
    }
  }
  const handleEscapeKey = (event) => {
    if (event.key === 'Escape') {
      setVisible(false)
    }
  }

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick)
    document.addEventListener('keydown', handleEscapeKey)

    return () => {
      document.removeEventListener('click', handleOutsideClick)
      document.removeEventListener('keydown', handleEscapeKey)
    }
  }, [])

  return (
    <div ref={tooltipRef}>
      <Tippy
        interactive={true}
        placement='left'
        visible={visible}
        className='shadow-2xl'
        arrow={true}
        theme='h-light'
        content={<Content toggle={toggle} />}
      >
        <div className='' onClick={toggle}>
          {' '}
          {trigger}
        </div>
      </Tippy>
    </div>
  )
}

export default Tooltip
