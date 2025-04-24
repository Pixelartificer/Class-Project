import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp, IoSearch } from "react-icons/io5";
import { getDatabase, ref, onValue } from "firebase/database";

const GroupList = () => {
  // State to hold the list of groups fetched from Firebase
  const [groups, setGroups] = useState([]);
  
  // Firebase database reference
  const db = getDatabase();

  // useEffect hook to fetch group data from Firebase on component mount
  useEffect(() => {
    const groupRef = ref(db, "groups/"); // Reference to the 'groups' node in Firebase
    onValue(groupRef, (snapshot) => {
      let groupArray = [];
      snapshot.forEach((item) => {
        // Push each group's data into the array with its key
        groupArray.push({ ...item.val(), groupKey: item.key });
      });
      // Set the fetched groups into state
      setGroups(groupArray);
    });
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      {/* Search Bar Section */}
      <div>
        <form className="max-w-md mx-auto">
          {/* Hidden label for accessibility (for screen readers) */}
          <label htmlFor="default-search" className="sr-only"></label>
          <div className="relative p-[12px]">
            {/* Search Icon on the left */}
            <span className="absolute inset-y-0 start-4 flex items-center ps-3 pointer-events-none">
              <IoSearch />
            </span>
            {/* Ellipsis Icon on the right (for more options) */}
            <span className="absolute inset-y-0 end-6 flex items-center ps-3 pointer-events-none">
              <IoEllipsisVerticalSharp />
            </span>
            {/* Search input field */}
            <input
              type="search"
              id="default-search"
              className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-[12px] bg-gray-50 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Search..."
              required
            />
          </div>
        </form>
      </div>

      {/* Group List Header */}
      <div className="flex justify-between items-center px-[22px] mt-3">
        {/* Title and count badge in the same row */}
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
          Group List
          <span className="bg-purple-600 text-white text-[12px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {groups.length}
          </span>
        </h1>
        <span>
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      {/* Group List Section */}
      <div className="h-[40vh] overflow-y-scroll py-5">
        {/* Map through the 'groups' array and display each group's data */}
        {groups.map((group, index) => (
          <div
            // Conditional styling to add a bottom border except for the last item
            className={
              groups.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
            key={group.groupKey} // Unique key for each group
          >
            <div className="flex gap-5 items-center">
              {/* Group's Avatar: Display a default placeholder image if groupPhoto is unavailable */}
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <picture>
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={
                      group?.groupPhoto && group.groupPhoto.length > 0
                        ? group.groupPhoto // Use group photo if available
                        : "https://via.placeholder.com/50" // Default placeholder image
                    }
                    alt={group?.groupName || "Group"} // Use group name for alt text
                  />
                </picture>
              </div>

              <div>
                {/* Group Name */}
                <h1 className="text-[14px] font-bold">
                  {group?.groupName || "Unnamed Group"}
                </h1>
                {/* Group Description */}
                <p className="text-[12px] text-gray-600">
                  {group?.description || "Welcome to the group!"}
                </p>
              </div>
            </div>
            {/* Button to join the group */}
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
            >
              Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GroupList;