import React from 'react'
import Sidebar from './Sidebar/SideBar'
import { Outlet } from 'react-router-dom'

  // need to provide router to parent of outlet ie body 

const Body = () => {

  return (
    <div className='grid grid-flow-col my-2 w-full '>
        <Sidebar />
        <Outlet />
    </div>
  )
}

export default Body