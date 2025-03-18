import React from "react";
import { IoEllipsisVerticalSharp, IoSearch } from "react-icons/io5";
import Avatar from "../..//assets/HomeImage/avatar01.gif";

const Friends = () => {
  return (
    <>
      <div
        className="bg-white  w-[31%]
      border-1 border-gray-300 shadow-gray-700 rounded-2xl "
      >
        {/* Group List */}
        <div className="flex justify-between items-center px-[22px] mt-5">
          <h1 className="text-2xl font-bold text-gray-700">
            Friends            
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
             <div className="text-[10px]">
              <p>Today, 8:56pm</p>
             </div>

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

export default Friends;
