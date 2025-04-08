import React from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

// Importing avatar images for groups
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

const Group = () => {
  // Array of groups with name, message, and avatar details
  const groups = [
    { name: "React Wizards", message: "Let's build magic!", avatar: avatar1 },
    { name: "Next.js Ninjas", message: "Deploy ready?", avatar: avatar2 },
    { name: "Vue Gang", message: "Vibes with Vue!", avatar: avatar3 },
    { name: "Angular Avengers", message: "Battle bugs today?", avatar: avatar4 },
    { name: "Fullstack Fam", message: "Code & Chill", avatar: avatar5 },
    { name: "UI Artists", message: "Pixel perfect?", avatar: avatar6 },
    { name: "CSS Crusaders", message: "Flexbox flex!", avatar: avatar7 },
    { name: "Backend Beasts", message: "API done!", avatar: avatar8 },
    { name: "Design Dwellers", message: "Figma vibes", avatar: avatar9 },
    { name: "DevOps Squad", message: "Push to prod!", avatar: avatar10 },
  ];

  return (
    <>
      {/* Main container for the Group section */}
      <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
        
        {/* Header section for the Group */}
        <div className="flex justify-between items-center px-[22px] mt-5">
          {/* Title for the Group section */}
          <h1 className="text-2xl font-bold text-gray-700">Group</h1>
          
          {/* Ellipsis icon indicating more options */}
          <span>
            <IoEllipsisVerticalSharp />
          </span>
        </div>

        {/* Container for the group list */}
        <div className="h-[40vh] overflow-y-scroll py-5">
          {/* Mapping through each group in the groups array */}
          {groups.map((group, index) => (
            <div
              // Conditional styling to add bottom border except for the last item
              className={
                groups.length === index + 1
                  ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                  : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
              }
              key={index} // Key for each group item for efficient rendering
            >
              <div className="flex gap-5 items-center">
                {/* Group's avatar image */}
                <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                  <picture>
                    <img
                      className="w-[50px] h-[50px] rounded-full bg-cover bg-center"
                      src={group.avatar} // Avatar image source
                      alt={group.name} // Alt text for accessibility
                    />
                  </picture>
                </div>

                {/* Group's name and message */}
                <div>
                  <h1 className="text-[14px] font-bold">{group.name}</h1>
                  <p className="text-[12px]">{group.message}</p>
                </div>
              </div>

              {/* Displaying the time when the group message was sent */}
              <div className="text-[10px]">
                <p>Today, 8:56pm</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Group;