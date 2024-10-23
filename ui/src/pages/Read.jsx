import { useParams } from 'react-router-dom'

export default function Read() {
  const { id } = useParams()
  return <div>read article with id: {id}</div>
}
