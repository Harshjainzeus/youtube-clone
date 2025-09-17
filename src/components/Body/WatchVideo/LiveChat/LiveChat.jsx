import React, { useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addChat } from '../../../../utils/chatSlice';
import { generate, generateRandomText } from '../../../../utils/helper/randomGenerator';
import { BsEmojiSmile, BsGift, BsThreeDots } from 'react-icons/bs';
import { FiSend } from 'react-icons/fi';
import Chat from './Chat';

const LiveChat = ({ onClose }) => {
  const dispatch = useDispatch();
  const chat = useSelector((state) => state.chat);
  const messagesEndRef = useRef(null);
  const [message, setMessage] = React.useState('');
  const [isPaused, setIsPaused] = React.useState(false);
  const [showChatOptions, setShowChatOptions] = React.useState(false);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  // Add new message to chat
  const handleSendMessage = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(addChat({
        name: 'You',
        message: message.trim(),
        isYou: true,
        timestamp: new Date().toISOString()
      }));
      setMessage('');
      scrollToBottom();
    }
  };

  // Simulate incoming messages
  useEffect(() => {
    if (isPaused) return;
    
    const timer = setInterval(() => {
      dispatch(addChat({
        name: generate(),
        message: generateRandomText(Math.floor(Math.random() * 30) + 10),
        timestamp: new Date().toISOString(),
        isYou: false
      }));
    }, 2000);

    return () => clearInterval(timer);
  }, [dispatch, isPaused]);

  // Auto-scroll when new messages arrive
  useEffect(() => {
    if (!isPaused) {
      scrollToBottom();
    }
  }, [chat, isPaused]);

  // Pause auto-scroll when user scrolls up
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;
    
    if (!isNearBottom && !isPaused) {
      setIsPaused(true);
    } else if (isNearBottom && isPaused) {
      setIsPaused(false);
    }
  };

  // Scroll to bottom button click handler
  const handleScrollToBottom = () => {
    scrollToBottom();
    setIsPaused(false);
  };

  return (
    <div className="flex flex-col h-full">
      {/* Chat header */}
      <div className="flex items-center justify-between p-3 border-b border-gray-700 bg-gray-900">
        <div className="flex items-center">
          <h3 className="font-medium">Live chat</h3>
          <div className="ml-2 px-2 py-0.5 bg-red-600 text-xs rounded-full flex items-center">
            <span className="w-2 h-2 bg-white rounded-full mr-1"></span>
            LIVE
          </div>
        </div>
        <div className="flex items-center space-x-2 text-gray-400">
          <span className="text-xs">{chat.length} watching</span>
          <button 
            className="p-1 hover:dark:bg-gray-500  rounded-full"
            onClick={() => setShowChatOptions(!showChatOptions)}
          >
            <BsThreeDots className="w-4 h-4" />
          </button>
          {onClose && (
            <button 
              className="p-1 hover:dark:bg-gray-500  rounded-full"
              onClick={onClose}
            >
              ×
            </button>
          )}
        </div>
      </div>

      {/* Chat messages */}
      <div 
        className="flex-1 overflow-y-auto p-3 space-y-3 dark:bg-gray-500 "
        onScroll={handleScroll}
      >
        {chat?.messages?.map((item, index) => (
          <Chat 
            key={index} 
            name={item.name} 
            message={item.message} 
            isYou={item.isYou}
            timestamp={item.timestamp}
          />
        ))}
        <div ref={messagesEndRef} />
        
        {isPaused && (
          <button 
            onClick={handleScrollToBottom}
            className="fixed bottom-24 right-4 bg-gray-900 text-white text-xs px-3 py-1.5 rounded-full border border-gray-600 flex items-center shadow-lg hover:dark:bg-gray-500 "
          >
            <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
            New messages
            <span className="ml-2">↓</span>
          </button>
        )}
      </div>

      {/* Chat input */}
      <div className="p-3 border-t border-gray-700 bg-gray-900">
        <form onSubmit={handleSendMessage} className="flex items-center">
          <div className="relative flex-1">
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Chat something..."
              className="w-full dark:bg-gray-500  text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
              <button 
                type="button" 
                className="text-gray-400 hover:text-white"
                onClick={() => {}}
              >
                <BsEmojiSmile className="w-5 h-5" />
              </button>
            </div>
          </div>
          <button 
            type="submit"
            disabled={!message.trim()}
            className={`ml-2 p-2 rounded-full ${message.trim() ? 'text-blue-500' : 'text-gray-500'}`}
          >
            <FiSend className="w-5 h-5" />
          </button>
        </form>
        <div className="flex items-center justify-between mt-2 text-xs text-gray-400">
          <div className="flex items-center space-x-2">
            <button className="hover:dark:bg-gray-500  p-1 rounded">
              <BsGift className="w-4 h-4" />
            </button>
            <span>Super Chat</span>
          </div>
          <span>Press Enter to send</span>
        </div>
      </div>
    </div>
  );
};

export default LiveChat;