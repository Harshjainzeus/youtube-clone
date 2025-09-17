import React from 'react';
import { formatDistanceToNow } from 'date-fns';

const Chat = ({ name, message, isYou, timestamp }) => {
  // Format the timestamp
  const formatTimeAgo = (dateString) => {
    try {
      return formatDistanceToNow(new Date(dateString), { addSuffix: true });
    } catch {
      return '';
    }
  };

  // Generate a consistent color based on the username
  const getColorFromName = (str) => {
    if (!str) return 'bg-gray-500';
    const colors = [
      'bg-red-500', 'bg-blue-500', 'bg-green-500', 'bg-yellow-500',
      'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500'
    ];
    const hash = str.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    return colors[hash % colors.length];
  };

  // Get initials for avatar
  const getInitials = (nameStr) => {
    if (!nameStr) return '?';
    return nameStr
      .split(' ')
      .slice(0, 2)
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className={`flex items-start p-2 rounded-lg hover:bg-gray-700 transition-colors ${isYou ? 'bg-gray-700' : ''}`}>
      <div className="flex-shrink-0 mr-3">
        <div 
          className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-xs font-medium ${getColorFromName(name)}`}
          title={name}
        >
          {getInitials(name)}
        </div>
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline">
          <span className="text-sm font-medium text-gray-200 mr-2 truncate">
            {isYou ? 'You' : name}
          </span>
          {timestamp && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              {formatTimeAgo(timestamp)}
            </span>
          )}
        </div>
        
        <p className="text-sm text-gray-300 break-words">
          {message}
          {isYou && (
            <span className="ml-1 inline-flex items-center justify-center w-4 h-4 text-gray-400">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3">
                <path fillRule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zm13.36-1.814a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z" clipRule="evenodd" />
              </svg>
            </span>
          )}
        </p>
        
        <div className="flex items-center mt-1 space-x-3 text-xs text-gray-400">
          <button className="flex items-center hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
            <span>1</span>
          </button>
          
          <button className="flex items-center hover:text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 transform rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
            </svg>
          </button>
          
          <button className="hover:text-white">Reply</button>
        </div>
      </div>
      
      <button className="ml-2 text-gray-400 hover:text-white opacity-0 group-hover:opacity-100">
        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      </button>
    </div>
  );
};

Chat.defaultProps = {
  isYou: false,
  timestamp: null,
};

export default Chat;