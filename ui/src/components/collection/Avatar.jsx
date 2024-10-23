const colors = ['bg-blue-500', 'bg-red-500', 'bg-green-500', 'bg-yellow-500']

export default function Avatar({ name, size = 48 }) {
  const getInitials = (name) => {
    const [firstName, lastName] = name.split(' ')
    return `${firstName[0]}${lastName[0]}`.toUpperCase()
  }
  const getColor = (initials) => {
    const charCodeSum = initials.charCodeAt(0) + initials.charCodeAt(1)
    return colors[charCodeSum % colors.length]
  }

  const initials = getInitials(name)
  const bgColor = getColor(initials)

  return (
    <div
      className={
        bgColor +
        ' text-white rounded-full flex items-center justify-center font-bold'
      }
      style={{ width: size, height: size, fontSize: size / 2.2 }}
    >
      {initials}
    </div>
  )
}
