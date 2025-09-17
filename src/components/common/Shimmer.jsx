import React from 'react';

export const VideoCardShimmer = () => {
  return (
    <div className="animate-pulse space-y-3">
      {/* Thumbnail */}
      <div className="aspect-video bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
      
      {/* Video info */}
      <div className="flex gap-3">
        {/* Channel avatar */}
        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-600"></div>
        
        <div className="flex-1 space-y-2">
          {/* Title */}
          <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-4/5"></div>
          
          {/* Channel name */}
          <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
          
          {/* Metadata */}
          <div className="flex items-center space-x-2 text-sm text-gray-500">
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-16"></div>
            <span>•</span>
            <div className="h-3 bg-gray-200 dark:bg-gray-700 rounded w-20"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoCardShimmer;
