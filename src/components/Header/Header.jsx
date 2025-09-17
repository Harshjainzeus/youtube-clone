import React, { useEffect, useCallback, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleMenu } from '../../utils/navSlice';
import { search_api_url } from '../../utils/constants';
import { storeResults } from '../../utils/searchSlice';
import { FiMenu, FiSearch, FiMic, FiVideo, FiBell, FiUser } from 'react-icons/fi';
import { FaYoutube } from 'react-icons/fa';

const Header = () => {
  const dispatch = useDispatch();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSuggestion, setShowSuggestion] = useState(false);
  const cache = useSelector((state) => state.search);

  const fetchSuggestion = useCallback(
    async (query) => {
      const data = await fetch(search_api_url + '&q=' + query);
      const json = await data.json();
      dispatch(storeResults({ [query]: json.items }));
    },
    [dispatch]
  );

  useEffect(() => {
    if (cache[searchQuery]) return;
    const timer = setTimeout(() => searchQuery && fetchSuggestion(searchQuery), 500);
    return () => clearTimeout(timer);
  }, [searchQuery, cache, fetchSuggestion]);

  const handleChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle search submission
  };

  return (
    <header className="sticky top-0 z-50 dark:bg-gray-900 text-white">
      <div className="flex items-center justify-between px-4 h-14">
        {/* Left section */}
        <div className="flex items-center">
          <button
            onClick={() => dispatch(toggleMenu())}
            className="p-2 mx-1 rounded-full hover:dark:bg-gray-500 "
            aria-label="Menu"
          >
            <FiMenu className="w-6 h-6" />
          </button>
          <div className="flex items-center cursor-pointer ml-2">
            <FaYoutube className="text-red-600 text-2xl" />
            <span className="ml-1 text-xl font-semibold">YouTube</span>
          </div>
        </div>

        {/* Middle section - Search */}
        <div className="flex items-center justify-center flex-1 max-w-2xl mx-4">
          <form onSubmit={handleSubmit} className="flex w-full">
            <div className="relative flex w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleChange}
                onFocus={() => setShowSuggestion(true)}
                onBlur={() => setTimeout(() => setShowSuggestion(false), 200)}
                className="w-full px-4 py-2 text-black bg-white border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Search"
              />
              <button
                type="submit"
                className="px-6 py-2 text-gray-700 bg-gray-100 border border-l-0 border-gray-300 rounded-r-full hover:bg-gray-200 focus:outline-none"
              >
                <FiSearch className="w-5 h-5" />
              </button>
            </div>
            <button
              type="button"
              className="p-2 ml-4 text-gray-200 dark:bg-gray-500  rounded-full hover:bg-opacity-80 focus:outline-none"
              aria-label="Search with your voice"
            >
              <FiMic className="w-5 h-5" />
            </button>
          </form>
        </div>

        {/* Right section */}
        <div className="flex items-center">
          <button className="p-2 mx-1 rounded-full hover:dark:bg-gray-500 " aria-label="Create">
            <FiVideo className="w-6 h-6" />
          </button>
          <button className="p-2 mx-1 rounded-full hover:dark:bg-gray-500  relative" aria-label="Notifications">
            <FiBell className="w-6 h-6" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-blue-500 rounded-full"></span>
          </button>
          <button className="p-1 ml-1 rounded-full hover:dark:bg-gray-500 " aria-label="Account">
            <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
              <FiUser className="text-white" />
            </div>
          </button>
        </div>
      </div>

      {/* Search Suggestions */}
      {showSuggestion && searchQuery && (
        <div className="absolute left-0 right-0 z-10 mx-auto mt-1 dark:bg-gray-500  rounded-lg shadow-lg w-full max-w-2xl">
          {cache[searchQuery]?.map((item, index) => (
            <div
              key={index}
              className="px-4 py-2 hover:bg-gray-700 cursor-pointer flex items-center"
            >
              <FiSearch className="w-4 h-4 mr-3 text-gray-400" />
              <span>{item.snippet?.title || item.snippet?.channelTitle || ''}</span>
            </div>
          ))}
        </div>
      )}
    </header>
  );
};

export default Header;