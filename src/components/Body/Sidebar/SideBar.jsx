import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { 
  FiHome, 
  FiCompass, 
  FiYoutube, 
  FiClock, 
  FiThumbsUp, 
  FiList, 
  FiChevronDown 
} from 'react-icons/fi';
import { MdSubscriptions, MdVideoLibrary } from 'react-icons/md';
import { AiFillFire } from 'react-icons/ai';
import { BsCollectionPlay } from 'react-icons/bs';

const SideBar = () => {
  const isMenuOpen = useSelector((state) => state.nav.isMenuOpen);
  const location = useLocation();

  const mainLinks = [
    { icon: <FiHome className="w-6 h-6" />, name: 'Home', path: '/' },
    { icon: <FiCompass className="w-6 h-6" />, name: 'Explore', path: '/explore' },
    { icon: <MdSubscriptions className="w-6 h-6" />, name: 'Subscriptions', path: '/subscriptions' },
  ];

  const secondaryLinks = [
    { icon: <MdVideoLibrary className="w-6 h-6" />, name: 'Library' },
    { icon: <FiClock className="w-6 h-6" />, name: 'History' },
    { icon: <FiYoutube className="w-6 h-6" />, name: 'Your videos' },
    { icon: <FiThumbsUp className="w-6 h-6" />, name: 'Liked videos' },
  ];

  const subscriptionLinks = [
    { icon: <AiFillFire className="w-6 h-6 text-red-600" />, name: 'Trending' },
    { icon: <BsCollectionPlay className="w-6 h-6 text-blue-500" />, name: 'Music' },
    { icon: <FiList className="w-6 h-6" />, name: 'Playlists' },
  ];

  if (!isMenuOpen) return null;

  return (
    <div className="w-64 h-full overflow-y-auto text-sm">
      <div className="p-4">
        {mainLinks.map(({ icon, name, path }) => (
          <Link
            key={name}
            to={path}
            className={`flex items-center p-2 rounded-lg hover:dark:bg-gray-500 ${
              location.pathname === path ? 'dark:bg-gray-500 font-medium' : ''
            }`}
          >
            <span className="mr-4">{icon}</span>
            <span>{name}</span>
          </Link>
        ))}
      </div>

      <div className="border-t border-gray-700 my-2"></div>

      <div className="p-4">
        <h3 className="px-2 mb-2 text-lg font-medium">You</h3>
        {secondaryLinks.map(({ icon, name }) => (
          <button
            key={name}
            className="flex items-center w-full p-2 rounded-lg hover:dark:bg-gray-500 text-left"
          >
            <span className="mr-4">{icon}</span>
            <span>{name}</span>
          </button>
        ))}
      </div>

      <div className="border-t border-gray-700 my-2"></div>

      <div className="p-4">
        <h3 className="px-2 mb-2 text-lg font-medium">Subscriptions</h3>
        {subscriptionLinks.map(({ icon, name }) => (
          <button
            key={name}
            className="flex items-center w-full p-2 rounded-lg hover:dark:bg-gray-500 text-left"
          >
            <span className="mr-4">{icon}</span>
            <span>{name}</span>
          </button>
        ))}
        <button className="flex items-center w-full p-2 rounded-lg hover:dark:bg-gray-500 text-left">
          <span className="mr-4">
            <FiChevronDown className="w-6 h-6" />
          </span>
          <span>Show more</span>
        </button>
      </div>
    </div>
  );
};

export default SideBar;