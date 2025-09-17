import { useDispatch } from "react-redux";
import { closeMenu } from "../../../utils/navSlice";
import { useEffect, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Comments from "./Comments";
import LiveChat from "./LiveChat/LiveChat";
import { generate } from "../../../utils/helper/randomGenerator";
import { addChat } from "../../../utils/chatSlice";
import { 

  FiShare2, 

  FiChevronDown,

} from 'react-icons/fi';
import { BsThreeDots, BsEmojiSmile, BsGift, BsCollection } from 'react-icons/bs';
import { BiDislike, BiLike } from 'react-icons/bi';
import { RiLiveLine } from 'react-icons/ri';

const videoData = {
  title: "This is a sample video title that might be very long and need to be truncated",
  channel: "Channel Name",
  subscribers: "1.2M",
  views: "1,234,567 views",
  uploadDate: "2 days ago",
  likes: "123K",
  description: "This is a detailed description of the video. It might contain multiple lines of text that explain what the video is about, who it's for, and other relevant information. The description can be quite long, so we'll implement a show more/less functionality to handle longer text."
};

const WatchVideo = () => {
  const dispatch = useDispatch();
  const [searchParams] = useSearchParams();
  const [input, setInput] = useState('');
  const [showMoreDescription, setShowMoreDescription] = useState(false);
  const [liked, setLiked] = useState(false);
  const [disliked, setDisliked] = useState(false);
  const [subscribed, setSubscribed] = useState(() => {
    // Check local storage for subscription status
    const savedSubs = JSON.parse(localStorage.getItem('youtube-subscriptions') || '{}');
    return savedSubs[videoData?.channelId] || false;
  });
  const [showSubscribeDialog, setShowSubscribeDialog] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const videoId = searchParams.get("v");

  useEffect(() => {
    dispatch(closeMenu());
    window.scrollTo(0, 0);
  }, [dispatch, videoId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      dispatch(addChat({ name: generate(), message: input }));
      setInput('');
    }
  };

  const toggleLike = () => {
    if (liked) {
      setLiked(false);
    } else {
      setLiked(true);
      setDisliked(false);
    }
  };

  const toggleDislike = () => {
    if (disliked) {
      setDisliked(false);
    } else {
      setDisliked(true);
      setLiked(false);
    }
  };

  const toggleSubscribe = () => {
    if (!subscribed) {
      setShowSubscribeDialog(true);
    } else {
      updateSubscription(false);
    }
  };

  const confirmSubscribe = () => {
    updateSubscription(true);
    setShowSubscribeDialog(false);
  };

  const updateSubscription = (isSubscribed) => {
    setSubscribed(isSubscribed);
    // Save to local storage
    const savedSubs = JSON.parse(localStorage.getItem('youtube-subscriptions') || '{}');
    if (isSubscribed) {
      savedSubs[videoData.channelId] = true;
    } else {
      delete savedSubs[videoData.channelId];
    }
    localStorage.setItem('youtube-subscriptions', JSON.stringify(savedSubs));
  };

  const toggleSave = () => {
    setSaved(!saved);
  };

  // Mock video data - replace with actual data
  

  return (
    <div className="flex flex-col lg:flex-row dark:bg-gray-900 text-white p-4">
      {/* Main Video Section */}
      <div className="w-full lg:w-2/3 lg:pr-4">
        {/* Video Player */}
        <div className="w-full aspect-video bg-black rounded-xl overflow-hidden">
          <iframe
            width="100%"
            height="100%"
            src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="w-full h-full"
          ></iframe>
        </div>

        {/* Video Title and Actions */}
        <div className="mt-4">
          <h1 className="text-xl font-medium">
            {videoData.title.length > 60 
              ? `${videoData.title.substring(0, 60)}...` 
              : videoData.title}
          </h1>
          
          <div className="flex flex-wrap justify-between items-center mt-3">
            <div className="flex items-center text-sm text-gray-400">
              <span>{videoData.views}</span>
              <span className="mx-2">•</span>
              <span>{videoData.uploadDate}</span>
            </div>
            
            <div className="flex items-center space-x-2 mt-2 sm:mt-0">
              <button 
                onClick={toggleLike}
                className={`flex items-center px-3 py-1.5 rounded-full ${liked ? 'text-blue-500' : 'text-gray-300 hover:dark:bg-gray-500'}`}
              >
                <BiLike className="w-5 h-5 mr-1.5" />
                <span>{liked ? 'Liked' : 'Like'}</span>
              </button>
              
              <button 
                onClick={toggleDislike}
                className={`p-2 rounded-full ${disliked ? 'text-blue-500' : 'text-gray-300 hover:dark:bg-gray-500'}`}
              >
                <BiDislike className="w-5 h-5" />
              </button>
              
              <button className="flex items-center px-3 py-1.5 rounded-full text-gray-300 hover:dark:bg-gray-500">
                <FiShare2 className="w-5 h-5 mr-1.5" />
                <span>Share</span>
              </button>
              
              <button 
                onClick={toggleSave}
                className="flex items-center px-3 py-1.5 rounded-full text-gray-300 hover:dark:bg-gray-500-secondary"
              >
                <BsCollection className="w-5 h-5 mr-1.5" />
                <span>{saved ? 'Saved' : 'Save'}</span>
              </button>
              
              <button className="p-2 rounded-full text-gray-300 hover:dark:bg-gray-500 ">
                <BsThreeDots className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>

        {/* Channel Info */}
        <div className="mt-4 pt-4 border-t border-gray-700">
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="w-10 h-10 rounded-full bg-gray-600 mr-3 overflow-hidden">
                <img 
                  src={`https://ui-avatars.com/api/?name=${encodeURIComponent(videoData.channel)}&background=random&color=fff`}
                  alt={videoData.channel}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y';
                  }}
                />
              </div>
              <div>
                <div className="font-medium">{videoData.channel}</div>
                <div className="text-sm text-gray-400">{videoData.subscribers} subscribers</div>
              </div>
            </div>
            <div className="relative">
              <button 
                onClick={toggleSubscribe}
                className={`px-4 py-2 rounded-full font-medium flex items-center ${subscribed ? 'bg-gray-200 text-gray-800 hover:bg-gray-300' : 'bg-red-600 text-white hover:bg-red-700'}`}
              >
                {subscribed ? (
                  <>
                    <span>Subscribed</span>
                    <FiChevronDown className="ml-1" />
                  </>
                ) : 'Subscribe'}
              </button>
              
              {/* Subscription dropdown menu */}
              {subscribed && (
                <div className="absolute right-0 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 z-10">
                  <button 
                    onClick={() => updateSubscription(false)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    Unsubscribe
                  </button>
                </div>
              )}
              
              {/* Subscription confirmation dialog */}
              {showSubscribeDialog && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-96">
                    <h3 className="text-lg font-medium mb-4">Subscribe to {videoData.channel}?</h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-6">
                      Subscribe to see all their videos and updates.
                    </p>
                    <div className="flex justify-end space-x-3">
                      <button 
                        onClick={() => setShowSubscribeDialog(false)}
                        className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md"
                      >
                        Cancel
                      </button>
                      <button 
                        onClick={confirmSubscribe}
                        className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md"
                      >
                        Subscribe
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          
          {/* Video Description */}
          <div className={`mt-3 dark:bg-gray-500  rounded-lg p-3 text-sm ${showMoreDescription ? '' : 'max-h-24 overflow-hidden'}`}>
            <div className="flex items-center text-sm text-gray-400 mb-2">
              <span>{videoData.views} views</span>
              <span className="mx-2">•</span>
              <span>{videoData.uploadDate}</span>
            </div>
            <p className="whitespace-pre-line">
              {showMoreDescription 
                ? videoData.description 
                : `${videoData.description.substring(0, 150)}...`}
            </p>
            <button 
              onClick={() => setShowMoreDescription(!showMoreDescription)}
              className="text-gray-400 hover:text-white font-medium mt-1"
            >
              {showMoreDescription ? 'Show less' : 'Show more'}
            </button>
          </div>
        </div>

        {/* Comments Section */}
        <Comments/>
      </div>

      {/* Live Chat & Recommended Videos */}
      <div className="w-full lg:w-1/3 mt-6 lg:mt-0 lg:pl-4">
        <div className="dark:bg-gray-500  rounded-xl overflow-hidden">
          <div className="p-3 border-b border-gray-700 flex items-center justify-between bg-gray-900">
            <div className="flex items-center">
              <RiLiveLine className="text-red-500 w-5 h-5 mr-2" />
              <span className="font-medium">Live chat</span>
            </div>
            <div className="flex items-center text-sm text-gray-400">
              <span>1.2K watching</span>
              <FiChevronDown className="w-4 h-4 ml-1" />
            </div>
          </div>
          
          <LiveChat />
          
          <div className="p-3 border-t border-gray-700 bg-gray-900">
            <form onSubmit={handleSubmit} className="flex items-center">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Chat something..."
                  className="w-full dark:bg-gray-500  text-white rounded-full py-2 pl-4 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
                <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex space-x-1">
                  <button type="button" className="text-gray-400 hover:text-white">
                    <BsEmojiSmile className="w-5 h-5" />
                  </button>
                  <button type="button" className="text-gray-400 hover:text-white">
                    <BsGift className="w-5 h-5" />
                  </button>
                </div>
              </div>
              {input && (
                <button 
                  type="submit"
                  className="ml-2 text-blue-500 font-medium px-3 py-1 hover:dark:bg-gray-500  rounded-full"
                >
                  Send
                </button>
              )}
            </form>
          </div>
        </div>
        
        {/* Recommended Videos */}
        <div className="mt-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Up next</h3>
          <div className="space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex cursor-pointer group">
                <div className="w-40 h-24 bg-gray-700 rounded-lg overflow-hidden flex-shrink-0">
                  <div className="w-full h-full bg-gray-600"></div>
                </div>
                <div className="ml-2 flex-1 min-w-0">
                  <h4 className="text-sm font-medium line-clamp-2 group-hover:text-blue-400">
                    Recommended video title {i} that might be long and need to be truncated
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">Channel Name</p>
                  <div className="flex items-center text-xs text-gray-400">
                    <span>123K views</span>
                    <span className="mx-1">•</span>
                    <span>2 days ago</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchVideo;
