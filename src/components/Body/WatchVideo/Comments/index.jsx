import React, { useState, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Comment from './Comment';
import { initialComments } from '../../../../utils/constants';

const Comments = () => {
  const [comments, setComments] = useState(() => {
    const saved = localStorage.getItem('youtube-comments');
    return saved ? JSON.parse(saved) : initialComments;
  });
  const [newComment, setNewComment] = useState('');
  const [sortBy, setSortBy] = useState('newest');

  // Save comments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('youtube-comments', JSON.stringify(comments));
  }, [comments]);

  // Add a new top-level comment
  const addComment = (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;

    const comment = {
      id: uuidv4(),
      author: 'Current User',
      authorImage: 'https://i.pravatar.cc/150?u=currentuser',
      text: newComment.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    setComments([comment, ...comments]);
    setNewComment('');
  };

  // Add a reply to a comment
  const addReply = (commentId, text) => {
    const newReply = {
      id: `${commentId}-${Date.now()}`,
      author: 'Current User',
      authorImage: 'https://i.pravatar.cc/150?u=currentuser',
      text: text.trim(),
      timestamp: new Date().toISOString(),
      likes: 0,
      replies: []
    };

    const updateComments = (comments, targetId) => {
      return comments.map(comment => {
        if (comment.id === targetId) {
          return {
            ...comment,
            replies: [newReply, ...comment.replies]
          };
        }

        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateComments(comment.replies, targetId)
          };
        }

        return comment;
      });
    };

    setComments(updateComments(comments, commentId));
  };

  // Edit a comment or reply
  const editComment = (commentId, newText) => {
    const updateComments = (comments, targetId, text) => {
      return comments.map(comment => {
        if (comment.id === targetId) {
          return { ...comment, text };
        }

        if (comment.replies && comment.replies.length > 0) {
          return {
            ...comment,
            replies: updateComments(comment.replies, targetId, text)
          };
        }

        return comment;
      });
    };

    setComments(updateComments(comments, commentId, newText));
  };

  // Delete a comment or reply
  const deleteComment = (commentId) => {
    const removeComment = (comments, targetId) => {
      return comments.reduce((acc, comment) => {
        if (comment.id === targetId) {
          return acc;
        }

        if (comment.replies && comment.replies.length > 0) {
          return [...acc, {
            ...comment,
            replies: removeComment(comment.replies, targetId)
          }];
        }

        return [...acc, comment];
      }, []);
    };

    setComments(removeComment(comments, commentId));
  };

  // Sort comments
  const sortComments = (comments, sortBy) => {
    const sorted = [...comments];
    
    switch (sortBy) {
      case 'newest':
        sorted.sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
        break;
      case 'oldest':
        sorted.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        break;
      case 'top':
        sorted.sort((a, b) => (b.likes || 0) - (a.likes || 0));
        break;
      default:
        break;
    }

    // Sort replies
    return sorted.map(comment => ({
      ...comment,
      replies: comment.replies ? sortComments(comment.replies, sortBy) : []
    }));
  };

  const sortedComments = sortComments(comments, sortBy);

  return (
    <div className="mt-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-medium">Comments • {comments.length}</h2>
        <div className="flex items-center">
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="bg-gray-800 text-white text-sm rounded px-3 py-1 border border-gray-600 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            <option value="newest">Newest first</option>
            <option value="oldest">Oldest first</option>
            <option value="top">Top comments</option>
          </select>
        </div>
      </div>

      {/* Add Comment */}
      <div className="flex mb-6">
        <div className="w-10 h-10 rounded-full bg-gray-600 flex-shrink-0"></div>
        <div className="ml-3 flex-1">
          <form onSubmit={addComment}>
            <input
              type="text"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
              className="w-full bg-transparent border-b border-gray-600 pb-2 focus:outline-none focus:border-blue-500 text-white"
            />
            <div className="flex justify-end mt-2">
              <button
                type="button"
                onClick={() => setNewComment('')}
                className="px-4 py-1 text-sm text-gray-300 hover:text-white mr-2"
                disabled={!newComment.trim()}
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={!newComment.trim()}
                className={`px-4 py-1 text-sm rounded-full ${newComment.trim() ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
              >
                Comment
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Comments List */}
      <div className="space-y-4">
        {sortedComments.length > 0 ? (
          sortedComments.map((comment) => (
            <Comment
              key={comment.id}
              comment={comment}
              onReply={addReply}
              onEdit={editComment}
              onDelete={deleteComment}
            />
          ))
        ) : (
          <div className="text-center py-8 text-gray-400">
            No comments yet. Be the first to comment!
          </div>
        )}
      </div>
    </div>
  );
};

export default Comments;