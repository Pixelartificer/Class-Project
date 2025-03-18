import React from 'react'
import SideBar from '../HomeComponents/SideBar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
      <div className="bg-purple-100 p-5 flex justify-between gap-x-3">
        <div>
          <SideBar />
        </div>
        <div className=" w-full h-[95vh] rounded-2xl ">
            <Outlet />
        
        
        </div>
      </div>
    </>
  )
}

export default RootLayout