import React from "react";
import SideBar from "../../Components/HomeComponents/SideBar";
import { Outlet } from "react-router";
import { IoEllipsisVerticalSharp, IoSearch } from "react-icons/io5";
import Avatar from "../..//assets/HomeImage/avatar01.gif";

const FriendRequest = () => {
  return (
    <>
      <div
        className="bg-white  w-[31%]
      border-1 border-gray-300 shadow-gray-700 rounded-2xl "
      >
       

        {/* Friend Request */}
        <div className="flex justify-between items-center px-[22px] mt-5">
          <h1 className="text-2xl font-bold text-gray-700 relative">
            Group List
                 </h1>
          <span>
            <IoEllipsisVerticalSharp />
          </span>
        </div>

        {/* group Below Part */}
        <div className="h-[40vh]  overflow-y-scroll py-5">
          {[...new Array(10)].map((_, index) => (
            <div
              className={
                10 == index + 1
                  ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                  : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
              }
              key={index}
            >
              <div className="flex gap-5 items-center ">
                <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                  <picture>
                    <img
                      className="w-[50px] h-[50px] rounded-full bg-cover bg-center "
                      src={Avatar}
                      alt={Avatar}
                    />
                  </picture>
                </div>

                {/* Name and Other Text*/}

                <div>
                  <h1 className="text-[14px] font-bold">Friendsd Reunion</h1>
                  <p className="text-[12px]">Hi Guys, Wassup!</p>
                </div>
              </div>
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
              >
                Accept
              </button>

              {/* Name and Other Text*/}
            </div>
          ))}
        </div>

        {/* group Below Part */}

        {/* Group List */}
      </div>
    </>
  );
};

export default FriendRequest;
