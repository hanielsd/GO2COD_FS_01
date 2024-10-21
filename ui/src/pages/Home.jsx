import { useEffect, useState } from 'react'
import { http } from '../services/http/http'

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
      <div className='w-1/2 space-y-4'>
        {loading && <div className=''>Loading...</div>}
        {posts &&
          posts.map((post, index) => (
            <>
              {index > 0 && <hr key={index} />}

              <div key={post._id} className='p-2 cursor-pointer group'>
                <div className='flex space-x-2 items-center'>
                  <div className='text-sm'>{post.author.firstName}</div>
                </div>
                <div className='text-xl font-medium group-hover:text-primary'>
                  {post.title}
                </div>
                <div className='text-sm'>{post.body}</div>
              </div>
            </>
          ))}
      </div>
    </div>
  )
}
