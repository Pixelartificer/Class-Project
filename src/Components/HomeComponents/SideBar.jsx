import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue } from "firebase/database";

const SideBar = () => {
  // Retrieve the current location and navigation hook for routing
  const location = useLocation();
  const db = getDatabase();
  const auth = getAuth();
  const navigate = useNavigate();

  // State to store the user data
  const [userData, setuserData] = useState({});

  // Define the list of navigation icons and paths
  const navigationIcons = [
    { id: 1, path: "/", icon: <IoHomeOutline /> }, // Home
    { id: 2, path: "/message", icon: <TiMessages /> }, // Messages
    { id: 3, path: "/notifecation", icon: <FaRegBell /> }, // Notifications
    { id: 4, path: "/setting", icon: <FaGears /> }, // Settings
    { id: 5, icon: <MdLogout />, isLogout: true }, // Logout
  ];

  // Handle icon click for navigation or logout
  const handleIconClick = (item) => {
    if (item.isLogout) {
      handleLogout();
    } else {
      navigate(item.path); // Navigate to respective path
    }
  };

  // Handle user logout functionality
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/signin"); // Redirect to the sign-in page after logout
      })
      .catch((err) => {
        console.error("Error from signout:", err); // Log any error from sign-out
      });
  };

  // Handle image upload using Cloudinary
  const handleUploadImage = () => {
    cloudinary.openUploadWidget(
      {
        cloudName: "deapu30tb",
        uploadPreset: "Reacr_Chat_Project_02",
        sources: ["local", "url", "image_search", "camera"],
        googleApiKey: "AIzaSyD8NiKh-IRsoREkuiKeO5EAHYi8orgnTI4",
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },
      (error, result) => {
        if (!error) {
          throw new Error("Failed to upload profile picture"); // Handle upload failure
        }
      }
    );
  };

  // Effect to load the Cloudinary script for image upload widget
  useEffect(() => {
    const script = document.createElement("script");
    script.src = `https://upload-widget.cloudinary.com/latest/global/all.js`;
    script.async = true;
    document.body.appendChild(script); // Append script to the document
  }, []);

  // Effect to fetch the user data from Firebase and set it in the state
  useEffect(() => {
    const fetchData = () => {
      const userRef = ref(db, "users/");
      onValue(userRef, (snapshot) => {
        let userblankinfo = null;
        snapshot.forEach((item) => {
          if (item.val().userUid === auth.currentUser.uid) {
            userblankinfo = { ...item.val(), userKey: item.key }; // Set user data
          }
        });
        setuserData(userblankinfo); // Update the state with user data
      });
    };
    fetchData(); // Call fetchData to retrieve user data
  }, []); // Empty dependency array to run only once on component mount

  // Log the user data to inspect its structure (for debugging purposes)
  console.log(userData);

  return (
    <div className="w-[140px] bg-mainColor h-[100vh] rounded-2xl overflow-hidden">
      {/* Profile Picture Section */}
      <div className="flex justify-center">
        <div className="w-[80px] h-[80px] mt-6 rounded-b-full relative cursor-pointer group border-[4px] border-white rounded-full">
          <picture>
            {/* Display user's profile picture or default image */}
            <img
              src={userData ? userData.profile_picture : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
              alt="ProfilePicture"
              className="w-full h-full object-cover rounded-full"
            />
          </picture>
          <span
            onClick={handleUploadImage} // Trigger the upload image function on click
            className="absolute hidden group-hover:block left-1/2 top-1/2 text-white text-3xl -translate-1/2"
          >
            <IoCloudUploadOutline /> {/* Cloud upload icon */}
          </span>
        </div>
      </div>

      {/* Username Section */}
      <div className="flex flex-col items-center justify-center mt-[80px] gap-y-[64px]">
        <div>
          {/* Display user's username or fallback 'missing' */}
          <h1 className="mt-[-70px] text-white">{userData ? userData.username : 'missing'}</h1>
        </div>

        {/* Navigation icons rendering */}
        {navigationIcons.map((item, index) => (
          <div
            key={item.id}
            className={`text-[36px] text-white cursor-pointer ${
              item.isLogout ? "mt-[120px]" : ""
            } ${
              location.pathname === item.path && !item.isLogout ? "active" : ""
            }`}
            onClick={() => handleIconClick(item)} // Trigger the icon click handler
          >
            {item.icon} {/* Render the icon for each navigation item */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;