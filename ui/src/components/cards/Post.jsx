export default function Post({ post }) {
  return (
    <div className='p-2 cursor-pointer group'>
      <div className='flex space-x-2 items-center'>
        <div className='text-sm'>{post.author.firstName}</div>
      </div>
      <div className='text-xl font-medium group-hover:text-primary'>
        {post.title}
      </div>
      <div className='text-sm'>{post.body}</div>
    </div>
  )
}
