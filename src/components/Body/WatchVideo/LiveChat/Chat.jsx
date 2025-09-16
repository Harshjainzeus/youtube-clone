import React from 'react'

const Chat = ({name, message}) => {
  return (
    <div className='flex border-b-2 border-gray-400'>
        <div className=' w-10 h-10'>
            <img src="https://icons.veryicon.com/png/o/miscellaneous/two-color-webpage-small-icon/user-244.png" alt="" />
        </div>
        <div>
            <p className='text-sm'>{name}</p>
            <p className='text-xs'>{message}</p>
        </div>
    </div>
  )
}

export default Chat