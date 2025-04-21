import React, { useEffect, useState } from "react";
import { FaRegBell } from "react-icons/fa";
import { FaGears } from "react-icons/fa6";
import { IoCloudUploadOutline, IoHomeOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import { TiMessages } from "react-icons/ti";
import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import { getDatabase, ref, onValue, off, update } from "firebase/database";

const SideBar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const auth = getAuth();
  const db = getDatabase();

  const [userData, setuserData] = useState({});
  const [isCloudinaryReady, setIsCloudinaryReady] = useState(false);

  const navigationIcons = [
    { id: 1, path: "/", icon: <IoHomeOutline /> },
    { id: 2, path: "/message", icon: <TiMessages /> },
    { id: 3, path: "/notifecation", icon: <FaRegBell /> },
    { id: 4, path: "/setting", icon: <FaGears /> },
    { id: 5, icon: <MdLogout />, isLogout: true },
  ];

  const handleIconClick = (item) => {
    if (item.isLogout) {
      signOut(auth)
        .then(() => navigate("/signin"))
        .catch((err) => console.error("Signout error:", err));
    } else {
      navigate(item.path);
    }
  };


 
  const handleUploadImage = () => {
    if (!isCloudinaryReady || !window.cloudinary || !userData.userKey) return;

    window.cloudinary.openUploadWidget(
      {
        cloudName: "deapu30tb",
        uploadPreset: "Reacr_Chat_Project_02",
        sources: [
          "local",
          "url",
          "image_search",
          "camera",
          "unsplash",
          "google_drive",
        ],
        googleApiKey: "AIzaSyD8NiKh-IRsoREkuiKeO5EAHYi8orgnTI4",  
        searchBySites: ["all", "cloudinary.com"],
        searchByRights: true,
      },
      (error, result) => {
        if (error) {
          console.error("Upload Error:", error);
          return;
        }

        if (result?.event === "success") {
          update(ref(db, `users/${userData.userKey}`), {
            profile_picture: result?.info?.secure_url,
          });
        }
      }
    );
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://upload-widget.cloudinary.com/latest/global/all.js";
    script.async = true;
    script.onload = () => setIsCloudinaryReady(true);
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  useEffect(() => {
    if (!auth.currentUser) return;

    const userRef = ref(db, "users/");
    const listener = onValue(userRef, (snapshot) => {
      snapshot.forEach((item) => {
        const user = item.val();
        if (user.userUid === auth.currentUser.uid) {
          setuserData({ ...user, userKey: item.key });
        }
      });
    });

    return () => off(userRef, "value", listener);
  }, [auth.currentUser]);

  return (
    <div className="w-[140px] bg-mainColor h-[100vh] rounded-2xl overflow-hidden">
      {/* Profile Picture */}
      <div className="flex justify-center">
        <div className="w-[80px] h-[80px] mt-6 rounded-b-full relative cursor-pointer group border-[4px] border-white rounded-full">
          <picture>
            <img
              src={
                userData?.profile_picture?.length > 0
                  ? userData.profile_picture
                  : "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=987&auto=format&fit=crop&ixlib=rb-4.0.3"
              }
              alt="Profile"
              className="w-full h-full object-cover rounded-full"
            />
          </picture>
          <span
            onClick={handleUploadImage}
            className="absolute hidden group-hover:block left-1/2 top-1/2 text-white text-3xl -translate-x-1/2 -translate-y-1/2"
          >
            <IoCloudUploadOutline />
          </span>
        </div>
      </div>

      {/* Username */}
      <div className="flex flex-col items-center justify-center mt-[80px] gap-y-[64px]">
        <h1 className="mt-[-70px] text-white">
          {userData?.username || "missing"}
        </h1>

        {/* Navigation */}
        {navigationIcons.map((item) => (
          <div
            key={item.id}
            onClick={() => handleIconClick(item)}
            className={`text-[36px] text-white cursor-pointer ${
              item.isLogout ? "mt-[120px]" : ""
            } ${
              location.pathname === item.path && !item.isLogout ? "active" : ""
            }`}
          >
            {item.icon}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;