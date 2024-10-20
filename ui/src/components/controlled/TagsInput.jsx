import { useState } from 'react'

export default function TagsInput({
  tags = [],
  setTags,
  placeholder = 'Add tags...',
}) {
  const [inputValue, setInputValue] = useState('')

  const handleInputChange = (event) => {
    setInputValue(event.target.value)
  }

  const handleInputKeyDown = (event) => {
    if (event.key === 'Enter' && inputValue) {
      setTags([...tags, inputValue.trim()])
      setInputValue('')
    } else if (event.key === 'Backspace' && !inputValue) {
      setTags(tags.slice(0, -1))
    }
  }

  return (
    <div className='flex flex-wrap gap-2 border border-gray-300 rounded-md p-2'>
      {tags.map((tag, index) => (
        <div
          key={index}
          className='bg-blue-500 text-white rounded-md p-1 px-2 flex items-center'
        >
          {tag}
          <button
            className='ml-2 text-sm font-bold focus:outline-none hover:text-red-500'
            onClick={() => setTags(tags.filter((_, i) => i !== index))}
          >
            &times;
          </button>
        </div>
      ))}
      <input
        type='text'
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className='w-full outline-none py-1 px-2'
        placeholder={placeholder}
      />
    </div>
  )
}
