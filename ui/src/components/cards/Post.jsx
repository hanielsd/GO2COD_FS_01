import { useSelector } from 'react-redux'
import { timeAgo } from '../../../utils'
import Avatar from '../collection/Avatar'

export default function Post({ post }) {
  const authorName = post.author.firstName + ' ' + post.author.lastName
  const { user, signedIn } = useSelector((state) => state.auth)
  const isItYou = signedIn && user.id === post.author._id

  return (
    <div className='p-2 cursor-pointer group space-y-1'>
      <div className='flex space-x-2 items-center'>
        <Avatar name={authorName} size={22} />
        <div className='text-[13px]'>{authorName}</div>
        {isItYou && (
          <div className='px-2 bg-gray-300 text-gray-600 text-xs rounded-full'>
            You
          </div>
        )}
      </div>
      <div>
        <div className='text-xl font-medium group-hover:text-primary'>
          {post.title}
        </div>
        <div className='text-sm'>{post.body}</div>
      </div>
      <div className='text-xs pt-1'>{timeAgo(post.createdAt)}</div>
    </div>
  )
}
