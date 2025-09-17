import React from 'react';
import { Link } from 'react-router-dom';
import { FiMoreVertical, FiClock } from 'react-icons/fi';
import { formatDistanceToNow } from 'date-fns';

const VideoCard = ({ videoData }) => {
  const { snippet, statistics, contentDetails } = videoData;
  const { title, channelTitle, thumbnails, publishedAt } = snippet;
  const { viewCount } = statistics;
  const { duration } = contentDetails || {};

  // Format view count
  const formatViewCount = (count) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count;
  };

  // Format duration (assuming ISO 8601 duration format)
  const formatDuration = (duration) => {
    if (!duration) return '';
    
    const match = duration.match(/PT(\d+H)?(\d+M)?(\d+S)?/);
    if (!match) return '';
    
    const hours = (match[1] ? match[1].slice(0, -1) : '0').padStart(2, '0');
    const minutes = (match[2] ? match[2].slice(0, -1) : '0').padStart(2, '0');
    const seconds = (match[3] ? match[3].slice(0, -1) : '0').padStart(2, '0');
    
    if (hours !== '00') {
      return `${hours}:${minutes}:${seconds}`;
    }
    return `${minutes}:${seconds}`;
  };

  // Format published date
  const formatPublishedDate = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return '';
    }
  };

  return (
    <div className="group">
      <Link to={`/watch?v=${videoData.id}`} className="block">
        <div className="relative">
          <img
            src={thumbnails.medium?.url || thumbnails.high?.url || ''}
            alt={title}
            className="w-full rounded-xl object-cover aspect-video transition-transform duration-200 group-hover:rounded-none"
            loading="lazy"
          />
          {duration && (
            <div className="absolute bottom-2 right-2 bg-black bg-opacity-80 text-white text-xs px-1.5 py-0.5 rounded">
              {formatDuration(duration)}
            </div>
          )}
        </div>
        
        <div className="mt-3 flex">
          <div className="flex-shrink-0 mr-3">
            <div className="w-9 h-9 rounded-full bg-gray-600 overflow-hidden">
              <img 
                src={`https://ui-avatars.com/api/?name=${encodeURIComponent(channelTitle)}&background=random&color=fff`}
                alt={channelTitle}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                }}
              />
            </div>
          </div>
          
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-medium text-white line-clamp-2 leading-tight">
              {title}
            </h3>
            <div className="mt-1 text-xs text-gray-400">
              <div>{channelTitle}</div>
              <div className="flex items-center">
                <span>{formatViewCount(viewCount)} views</span>
                <span className="mx-1">•</span>
                <span>{formatPublishedDate(publishedAt)}</span>
              </div>
            </div>
          </div>
          
          <button 
            className="ml-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              // Handle more options
            }}
          >
            <FiMoreVertical className="w-5 h-5" />
          </button>
        </div>
      </Link>
    </div>
  );
};

export default VideoCard;