import React from 'react'
import SideBar from '../HomeComponents/SideBar'
import { Outlet } from 'react-router'

const RootLayout = () => {
  return (
    <>
      <div className="p-5 flex justify-between gap-x-3">
        <div>
          <SideBar />
        </div>
        <div className="bg-amber-600 w-full h-[95vh] rounded-2xl ">
            <Outlet />
          {" "}
          Right Side
        </div>
      </div>
    </>
  )
}

export default RootLayout