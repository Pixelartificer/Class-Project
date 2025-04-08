import React from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const FriendRequest = () => {
  // Array of friend requests with user details: name, message, and avatar
  const requestList = [
    { name: "Charlotte Gray", message: "Let's be friends!", avatar: "https://randomuser.me/api/portraits/women/40.jpg" },
    { name: "Jackson Reed", message: "Wanna connect?", avatar: "https://randomuser.me/api/portraits/men/42.jpg" },
    { name: "Mia Brooks", message: "Hi there!", avatar: "https://randomuser.me/api/portraits/women/26.jpg" },
    { name: "Lucas Rivera", message: "Hope we can chat soon.", avatar: "https://randomuser.me/api/portraits/men/34.jpg" },
    { name: "Aria Watson", message: "Nice to meet you!", avatar: "https://randomuser.me/api/portraits/women/37.jpg" },
    { name: "Henry Cooper", message: "Please accept my request.", avatar: "https://randomuser.me/api/portraits/men/11.jpg" },
    { name: "Luna Morgan", message: "Wanna hang out?", avatar: "https://randomuser.me/api/portraits/women/21.jpg" },
    { name: "Sebastian Cox", message: "Hello there!", avatar: "https://randomuser.me/api/portraits/men/22.jpg" },
    { name: "Grace Foster", message: "Let's be friends!", avatar: "https://randomuser.me/api/portraits/women/50.jpg" },
    { name: "Ethan Hayes", message: "How are you?", avatar: "https://randomuser.me/api/portraits/men/18.jpg" },
  ];

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      {/* Header Section: Displays title and ellipsis for options */}
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 relative">Friend Request</h1>
        <span>
          {/* Ellipsis icon represents more options */}
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      {/* Request List Section: Displays the list of friend requests */}
      <div className="h-[40vh] overflow-y-scroll py-5">
        {/* Map through the requestList and render each user with their info */}
        {requestList.map((user, index) => (
          <div
            className={ 
              // Check if it's the last user to avoid a bottom border
              requestList.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
            key={index} // Unique key for each mapped item
          >
            <div className="flex gap-5 items-center">
              {/* User's avatar */}
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <picture>
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={user.avatar} // Avatar image from the user object
                    alt={user.name} // Alt text using the user's name
                  />
                </picture>
              </div>

              <div>
                {/* User's name and the message sent */}
                <h1 className="text-[14px] font-bold">{user.name}</h1>
                <p className="text-[12px]">{user.message}</p>
              </div>
            </div>

            {/* Accept Button */}
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
            >
              Accept {/* Action to accept the friend request */}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;