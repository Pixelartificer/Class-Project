import React from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import avatar1 from "../../assets/HomeImage/avatar01.jpg";
import avatar2 from "../../assets/HomeImage/avatar02.jpg";
import avatar3 from "../../assets/HomeImage/avatar03.jpg";
import avatar4 from "../../assets/HomeImage/avatar04.jpg";
import avatar5 from "../../assets/HomeImage/avatar05.jpg";
import avatar6 from "../../assets/HomeImage/avatar06.jpg";
import avatar7 from "../../assets/HomeImage/avatar07.jpg";
import avatar8 from "../../assets/HomeImage/avatar08.jpg";
import avatar9 from "../../assets/HomeImage/avatar09.jpg";
import avatar10 from "../../assets/HomeImage/avatar10.jpg";

const BlockUser = () => {
  // Array of users with their name, message, and avatar image
  const users = [
    { name: "John Doe", message: "Hey there!", avatar: avatar1 },
    { name: "Jane Smith", message: "How's it going?", avatar: avatar2 },
    { name: "Mike Johnson", message: "Let's catch up soon!", avatar: avatar3 },
    { name: "Sara Lee", message: "Hi, long time!", avatar: avatar4 },
    { name: "Chris Brown", message: "What's up?", avatar: avatar5 },
    { name: "Patricia Green", message: "Hello!", avatar: avatar6 },
    { name: "David White", message: "Good morning!", avatar: avatar7 },
    { name: "Sophia Martin", message: "Are you free later?", avatar: avatar8 },
    { name: "William Taylor", message: "See you at the meeting.", avatar: avatar9 },
    { name: "Olivia Harris", message: "How are you?", avatar: avatar10 }
  ];

  return (
    <>
      <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
        {/* Header Section: Title and Ellipsis Icon for options */}
        <div className="flex justify-between items-center px-[22px] mt-5">
          <h1 className="text-2xl font-bold text-gray-700 relative">
            Block User
          </h1>
          <span>
            {/* Ellipsis icon for more options */}
            <IoEllipsisVerticalSharp />
          </span>
        </div>

        {/* Users List Section */}
        <div className="h-[40vh] overflow-y-scroll py-5">
          {/* Map through the users array to display each user's details */}
          {users.map((user, index) => (
            <div
              key={index}
              className={ 
                // Check if it's the last user to avoid border-bottom on last user
                users.length === index + 1
                  ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                  : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
              }
            >
              <div className="flex gap-5 items-center">
                {/* User Avatar */}
                <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                  <img
                    className="w-[50px] h-[50px] rounded-full bg-cover bg-center"
                    src={user.avatar}
                    alt={user.name} // Display the user's avatar
                  />
                </div>

                {/* User's Name and Last Message */}
                <div>
                  <h1 className="text-[14px] font-bold">{user.name}</h1>
                  <p className="text-[12px]">{user.message}</p> {/* Display last message */}
                </div>
              </div>

              {/* Button to unblock user */}
              <button
                type="button"
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
              >
                Unblock {/* Action for unblocking the user */}
              </button>
            </div>
          ))}
        </div>

        {/* End of Blocked Users List Section */}
      </div>
    </>
  );
};

export default BlockUser;