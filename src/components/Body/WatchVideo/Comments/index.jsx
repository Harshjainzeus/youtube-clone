import React from 'react'
import Comment from './Comment';

const Comments = ({comments}) => {
    if(comments.length === 0) return null;
  return (
    <div className='p-2 m-2 bg-gray-200 border-l-2'>
        {comments.map((comment,index)=>(
            <Comment key={index} comment={comment}/>
        ))}
    </div>
  )
}

export default Comments