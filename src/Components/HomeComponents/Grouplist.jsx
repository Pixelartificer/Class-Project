import React from "react";
import SideBar from "../../Components/HomeComponents/SideBar";
import { Outlet } from "react-router";
import { IoEllipsisVerticalSharp, IoSearch } from "react-icons/io5";
import Avatar from "../..//assets/HomeImage/avatar01.gif";

const GroupList = () => {
  return (
    <>
      <div
        className="w-[30%]
      border-1 border-gray-300 shadow-gray-700 rounded-2xl "
      >
        {/* Search Bar */}
        <div>
          <form className="max-w-md mx-auto ">
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            ></label>
            <div className="relative p-[12px] ">
              <span class="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
                <IoSearch />
              </span>
              <span class="absolute inset-y-0 end-6 flex items-center ps-3 pointer-events-none">
                <IoEllipsisVerticalSharp />
              </span>
              <input
                type="search"
                id="default-search"
                className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[12px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search..."
                required
              />
            </div>
          </form>
        </div>
        {/* Search Bar */}

        {/* Group List */}
        <div className="flex justify-between items-center px-[22px] ">
          <h1 className="relative">
            Group List
            <span className="absolute inset-y-0 start-20  w-8 h-8 p-[4px] flex items-center text-center bg-purple-600 text-white rounded-full">
              {10}
            </span>
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
                Join
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

export default GroupList;
