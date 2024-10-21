import { useState } from 'react'
import { http } from '../services/http/http'

export default function Home() {
  const [posts, setPosts] = useState(null)

  const getPosts = async () => {
    // const response=await http.request({url: "posts"})
  }
  return <div>dashboard</div>
}
