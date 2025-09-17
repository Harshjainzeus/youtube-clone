import { useEffect, useState } from 'react';
import { api_url } from '../../../utils/constants';
import VideoCard from '../../common/VideoCard';

const MainContainer = () => {
  const [videos, setVideos] = useState(
    Array.from({ length: 20 }, (_, index) => ({
      id: `shimmer-${index}`,
      isLoading: true
    }))
  );
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(api_url);
        if (!response.ok) {
          throw new Error('Failed to fetch videos');
        }
        const json = await response.json();
        setVideos(json.items || []);
      } catch (err) {
        console.error('Error fetching videos:', err);
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchVideos();
  }, []);

  if (error) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="text-red-500 text-lg font-medium mb-2">Error loading videos</div>
        <p className="text-gray-400 mb-4">{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-400">
        No videos found
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-y-auto p-4">
      {/* Categories */}
      <div className="flex space-x-2 mb-4 overflow-x-auto pb-2 scrollbar-hide">
        {['All', 'Music', 'Gaming', 'Live', 'Computer Science', 'Podcasts', 'Cooking', 'Recently uploaded', 'Watched'].map((category) => (
          <button
            key={category}
            className="px-3 py-1 text-sm whitespace-nowrap rounded-full dark:bg-gray-500 text-white hover:bg-gray-600 transition-colors"
          >
            {category}
          </button>
        ))}
      </div>

      {/* Videos Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {videos.map((video) => (
          <VideoCard key={video.id} videoData={video} isLoading={isLoading} />
        ))}
      </div>
    </div>
  );
};

export default MainContainer;
