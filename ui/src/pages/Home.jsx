import { useEffect, useState } from 'react'
import { http } from '../services/http/http'
import Post from '../components/cards/Post'

const truncateHTML = (htmlContent, maxLen = 30) => {
  const parser = new DOMParser()
  const doc = parser.parseFromString(htmlContent, 'text/html')

  let text = ''
  for (let i = 0; i < doc.body.childNodes.length; i++) {
    let node = doc.body.childNodes[i]
    let innerText =
      node.nodeType === Node.ELEMENT_NODE ? node.innerText.trim() : ''
    if (innerText) text += innerText + ' '
    if (text.length > maxLen) break
  }
  text = text.trim()
  if (text.length > maxLen) return text.slice(0, maxLen) + '...'

  return text
}

export default function Home() {
  const [posts, setPosts] = useState(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log({ posts })
  }, [posts])

  const getPosts = async () => {
    setLoading(true)
    const response = await http.request({ url: 'posts?populate=author' })
    if (!response.isError)
      setPosts(
        response.map(({ body, ...rest }) => ({
          ...rest,
          body: truncateHTML(body, 190),
        })),
      )
    else setError('Something went wrong, try again later')
    setLoading(false)
  }

  useEffect(() => {
    getPosts()
  }, [])
  return (
    <div className='flex justify-center py-4'>
      <div className='w-1/2 space-y-3'>
        {loading && <div className=''>Loading...</div>}
        {posts &&
          posts.map((post, index) => (
            <>
              {index > 0 && <hr key={index} />}
              <Post key={post._id} post={post} />
            </>
          ))}
      </div>
    </div>
  )
}
