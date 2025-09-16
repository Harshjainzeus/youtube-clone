import React from 'react'
import { Link } from 'react-router-dom'

const VideoCard = ({videoData}) => {
    
    const {snippet, statistics} = videoData;
    const {title} = snippet;
    const {viewCount} = statistics;
  return (
    <Link to={`/watch?v=${videoData.id}`}>
      <div className='w-48 border border-gray-900 shadow-2xl'>
          <img src={snippet.thumbnails.high.url} alt="" />
          <p className='font-bold text-lg'>{title}</p>
          <p>{viewCount}</p>
      </div>
    </Link>
  )
}

export default VideoCard