import React from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const Friends = () => {
  // Array of friends with details: name, message, time, and avatar
  const friendsList = [
    {
      name: "Emma Johnson",
      message: "Hey! Long time no see!",
      time: "Today, 8:45pm",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    },
    {
      name: "Liam Smith",
      message: "What’s up buddy?",
      time: "Today, 7:30pm",
      avatar: "https://randomuser.me/api/portraits/men/33.jpg",
    },
    {
      name: "Olivia Brown",
      message: "Let's catch up soon!",
      time: "Today, 6:00pm",
      avatar: "https://randomuser.me/api/portraits/women/65.jpg",
    },
    {
      name: "Noah Davis",
      message: "Did you watch the game?",
      time: "Today, 5:20pm",
      avatar: "https://randomuser.me/api/portraits/men/54.jpg",
    },
    {
      name: "Ava Miller",
      message: "I just got a new puppy!",
      time: "Today, 4:15pm",
      avatar: "https://randomuser.me/api/portraits/women/31.jpg",
    },
    {
      name: "Elijah Wilson",
      message: "Let's hang out tomorrow.",
      time: "Today, 3:05pm",
      avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    },
    {
      name: "Sophia Moore",
      message: "Check out this link!",
      time: "Today, 1:50pm",
      avatar: "https://randomuser.me/api/portraits/women/73.jpg",
    },
    {
      name: "James Taylor",
      message: "Call me when you're free.",
      time: "Today, 12:10pm",
      avatar: "https://randomuser.me/api/portraits/men/12.jpg",
    },
    {
      name: "Isabella Anderson",
      message: "Got the tickets!",
      time: "Today, 10:45am",
      avatar: "https://randomuser.me/api/portraits/women/22.jpg",
    },
    {
      name: "Benjamin Thomas",
      message: "All set for the trip?",
      time: "Today, 9:15am",
      avatar: "https://randomuser.me/api/portraits/men/29.jpg",
    },
  ];

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      {/* Friends Section Header */}
      <div className="flex justify-between items-center px-[22px] mt-5">
        {/* Title for Friends section */}
        <h1 className="text-2xl font-bold text-gray-700">Friends</h1>
        <span>
          {/* Ellipsis icon indicating more options */}
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      {/* Friends List Section */}
      <div className="h-[40vh] overflow-y-scroll py-5">
        {/* Iterate over friendsList array to display each friend */}
        {friendsList.map((friend, index) => (
          <div
            className={ 
              // If it's the last item, don't apply the bottom border
              friendsList.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
            key={index} // Provide a unique key for each item in the list
          >
            <div className="flex gap-5 items-center">
              {/* Friend's avatar */}
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <picture>
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={friend.avatar} // Avatar image from the friend object
                    alt={friend.name} // Alt text using the friend's name for accessibility
                  />
                </picture>
              </div>

              <div>
                {/* Friend's name */}
                <h1 className="text-[14px] font-bold">{friend.name}</h1>
                {/* Friend's message */}
                <p className="text-[12px] text-gray-600">{friend.message}</p>
              </div>
            </div>

            {/* Time when the message was sent */}
            <div className="text-[10px] text-gray-500">{friend.time}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;