import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import { getDatabase, ref, onValue } from "firebase/database";

const UserList = () => {
  // State to hold the list of users fetched from Firebase
  const [userlist, setuserlist] = useState([]);

  // Firebase database reference
  const db = getDatabase();

  // useEffect hook to load the Cloudinary upload widget script
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`; // Cloudinary widget script for image uploads
    script.async = true;
    document.body.appendChild(script); // Append the script to the body for asynchronous loading
  }, []); // Empty dependency array ensures this effect runs only once when the component mounts

  // useEffect hook to fetch user data from Firebase
  useEffect(() => {
    const userRef = ref(db, "users/"); // Reference to the 'users' node in Firebase Realtime Database
    onValue(userRef, (snapshot) => {
      let userblanklist = [];
      snapshot.forEach((item) => {
        // Push each user's data into the array with its key
        userblanklist.push({ ...item.val(), userKey: item.key });
      });
      // Update the state with the fetched user list
      setuserlist(userblanklist);
    });
  }, []); // Empty dependency array means this effect runs only once when the component mounts

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      {/* User List Header */}
      <div className="flex justify-between items-center px-[22px] mt-5">
        {/* Title of the User List */}
        <h1 className="text-2xl font-bold text-gray-700 relative">
          User List
        </h1>
        {/* More options icon (ellipsis) */}
        <span>
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      {/* User List Section */}
      <div className="h-[40vh] overflow-y-scroll py-5">
        {/* Map through the 'userlist' array and display each user's information */}
        {userlist.map((user, index) => (
          <div
            // Conditional class to add a bottom border except for the last user
            className={
              userlist.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
            key={user.userKey} // Unique key for each user
          >
            <div className="flex gap-5 items-center">
              {/* User's Avatar: Display a default placeholder image if no profile picture is available */}
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <picture>
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={
                      user?.profile_picture && user.profile_picture.length > 0
                        ? user.profile_picture // Use the profile picture if available
                        : "https://via.placeholder.com/50" // Default placeholder image
                    }
                    alt={user?.username || "User"} // Use username for alt text if available
                  />
                </picture>
              </div>

              <div>
                {/* User's Username */}
                <h1 className="text-[14px] font-bold">
                  {user?.username || "Unknown User"}
                </h1>
                {/* User's Status Message */}
                <p className="text-[12px] text-gray-600">
                  {user?.status || "Hey there! I'm using ChatApp"}
                </p>
              </div>
            </div>
            {/* Button to add the user */}
            <button
              type="button"
              className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer"
            >
              <FaPlus />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserList;