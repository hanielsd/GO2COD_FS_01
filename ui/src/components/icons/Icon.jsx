export function Icon({ path, size = 14, color }) {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill='none'
      viewBox='0 0 24 24'
      strokeWidth={1.5}
      stroke={color ? color : 'currentColor'}
      style={{ width: size, height: size }}
    >
      {path()}
    </svg>
  )
}
