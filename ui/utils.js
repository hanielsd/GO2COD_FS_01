import moment from 'moment'

export function timeAgo(date) {
  return moment(date).fromNow()
}

export function formatDate(date) {
  date = new Date(date)
  // return date.getFullYear() + '-' + date.getMonth() + '-' + date.getDate()
  return (
    (date.getDate() > 9 ? date.getDate() : '0' + date.getDate()) +
    '-' +
    (date.getMonth() > 8 ? date.getMonth() + 1 : '0' + (date.getMonth() + 1)) +
    '-' +
    date.getFullYear()
  )
}

export function getByPath(obj, path) {
  const keys = path.split('.')

  for (const key of keys) {
    if (!obj || typeof obj !== 'object' || !(key in obj)) {
      return undefined
    }
    obj = obj[key]
  }

  return obj
}

export function truncate(text, maxLength = 150) {
  if (text.length > maxLength) return text.substring(0, maxLength) + '...'

  return text
}

export function beautifyNumber(number) {
  if (Number.isInteger(number))
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')

  return number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')
}
