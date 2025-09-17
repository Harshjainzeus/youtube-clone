import React from 'react';
import Sidebar from './Sidebar/SideBar';
import { Outlet } from 'react-router-dom';

const Body = () => {
  return (
    <div className="flex h-[calc(100vh-56px)] overflow-hidden">
      {/* Sidebar - Hidden on mobile, shown on larger screens */}
      
        <Sidebar />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-y-auto dark:bg-gray-900 text-white p-4">
        <div className="max-w-screen-2xl mx-auto">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Body;