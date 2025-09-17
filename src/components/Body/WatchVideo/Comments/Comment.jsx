import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FaReply, FaEdit, FaTrash, FaCheck, FaTimes } from 'react-icons/fa';
import { formatDistanceToNow } from 'date-fns';
import { BiLike, BiDislike } from 'react-icons/bi';
import { FiChevronDown } from 'react-icons/fi';

const Comment = ({ 
  comment, 
  onReply, 
  onEdit, 
  onDelete, 
  level = 0 
}) => {
  const [isReplying, setIsReplying] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [editedText, setEditedText] = useState(comment.text);
  const [showReplies, setShowReplies] = useState(true);
  const hasReplies = comment.replies && comment.replies.length > 0;

  const handleReply = () => {
    if (replyText.trim()) {
      onReply(comment.id, replyText);
      setReplyText('');
      setIsReplying(false);
    }
  };

  const handleEdit = () => {
    if (editedText.trim() && editedText !== comment.text) {
      onEdit(comment.id, editedText);
      setIsEditing(false);
    }
  };

  return (
    <div 
      className={`mt-3 ${level > 0 ? 'ml-8 border-l-2 border-gray-600 pl-4' : ''}`}
      style={{ maxWidth: '100%', wordBreak: 'break-word' }}
      data-testid={`comment-${comment.id}`}
    >
      <div className="flex items-start">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0 overflow-hidden">
          <img 
            src={comment.authorImage} 
            alt={comment.author}
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(comment.author)}&background=random`;
            }}
          />
        </div>
        <div className="ml-3 flex-1">
          <div className="flex items-center">
            <span className="font-medium text-white">{comment.author}</span>
            <span className="text-xs text-gray-400 ml-2">
              {formatDistanceToNow(new Date(comment.timestamp), { addSuffix: true })}
            </span>
          </div>
          
          {isEditing ? (
            <div className="mt-1">
              <textarea
                value={editedText}
                onChange={(e) => setEditedText(e.target.value)}
                className="w-full bg-gray-800 text-white rounded p-2"
                rows="3"
                autoFocus
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button 
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 text-sm rounded hover:bg-gray-700"
                >
                  <FaTimes />
                </button>
                <button 
                  onClick={handleEdit}
                  className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  <FaCheck />
                </button>
              </div>
            </div>
          ) : (
            <p className="mt-1 text-white">{comment.text}</p>
          )}
          
          <div className="flex items-center mt-2 text-sm text-gray-400">
            <button className="flex items-center hover:text-white">
              <BiLike className="w-4 h-4" />
              <span className="ml-1">{comment.likes || 0}</span>
            </button>
            <button className="flex items-center ml-4 hover:text-white">
              <BiDislike className="w-4 h-4" />
            </button>
            
            <button 
              onClick={() => setIsReplying(!isReplying)}
              className="ml-4 hover:text-white flex items-center"
            >
              <FaReply className="w-3 h-3 mr-1" />
              <span>Reply</span>
            </button>
            
            <button 
              onClick={() => {
                setEditedText(comment.text);
                setIsEditing(true);
              }}
              className="ml-4 hover:text-white flex items-center"
            >
              <FaEdit className="w-3 h-3 mr-1" />
              <span>Edit</span>
            </button>
            
            <button 
              onClick={() => onDelete(comment.id)}
              className="ml-4 text-red-400 hover:text-red-300 flex items-center"
            >
              <FaTrash className="w-3 h-3 mr-1" />
              <span>Delete</span>
            </button>
          </div>
          
          {isReplying && (
            <div className="mt-3">
              <textarea
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Write a reply..."
                className="w-full bg-gray-800 text-white rounded p-2 text-sm"
                rows="2"
                autoFocus
              />
              <div className="flex justify-end mt-2 space-x-2">
                <button 
                  onClick={() => setIsReplying(false)}
                  className="px-3 py-1 text-sm text-gray-300 hover:text-white"
                >
                  Cancel
                </button>
                <button 
                  onClick={handleReply}
                  className="px-4 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
                >
                  Reply
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
      
      {hasReplies && (
        <div className="mt-2">
          <button 
            onClick={() => setShowReplies(!showReplies)}
            className="text-blue-500 text-sm flex items-center"
            aria-expanded={showReplies}
            aria-label={showReplies ? 'Hide replies' : `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
          >
            {showReplies ? 'Hide replies' : `Show ${comment.replies.length} ${comment.replies.length === 1 ? 'reply' : 'replies'}`}
            <FiChevronDown 
              className={`ml-1 w-4 h-4 transition-transform duration-200 ${showReplies ? 'transform rotate-180' : ''}`} 
              aria-hidden="true"
            />
          </button>
          
          {showReplies && (
            <div className="mt-2">
              {comment.replies.map(reply => (
                <Comment
                  key={reply.id}
                  comment={reply}
                  onReply={onReply}
                  onEdit={onEdit}
                  onDelete={onDelete}
                  level={level + 1}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired,
    timestamp: PropTypes.string.isRequired,
    likes: PropTypes.number,
    replies: PropTypes.arrayOf(PropTypes.object)
  }).isRequired,
  onReply: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  level: PropTypes.number
};

Comment.defaultProps = {
  level: 0
};

export default React.memo(Comment);
