import Avatar from '../collection/Avatar'

export default function Post({ post }) {
  const authorName = post.author.firstName + ' ' + post.author.lastName
  return (
    <div className='p-2 cursor-pointer group'>
      <div className='flex space-x-2 items-center'>
        <Avatar name={authorName} size={22} />
        <div className='text-sm'>{authorName}</div>
      </div>
      <div className='text-xl font-medium group-hover:text-primary'>
        {post.title}
      </div>
      <div className='text-sm'>{post.body}</div>
    </div>
  )
}
