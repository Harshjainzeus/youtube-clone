import React, { useState } from 'react'
import Comments from './index';

const Comment = ({comment}) => {
    const [showReplies,setShowReplies] = useState(false);

  return (
    <div>
                <p>{comment.name}</p>
                <p>{comment.comment}</p>
                <p>{comment.likes}</p>
                <button onClick={()=>setShowReplies(!showReplies)}>Reply</button>
                {showReplies && <Comments comments={comment.replies}/>}
            </div>
  )
}

export default Comment