import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  get,
  child,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const [userlist, setuserlist] = useState([]);

  // Save current user data once
  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      const userData = {
        userUid: user.uid, // IMPORTANT: include UID to compare later
        username: user.displayName || "Unknown",
        email: user.email || "",
        profile_picture: user.photoURL || "",
        status: "Hey there! I'm using ChatApp",
      };

      get(child(ref(db), `users/${user.uid}`)).then((snapshot) => {
        if (!snapshot.exists()) {
          set(userRef, userData);
        }
      });
    }
  }, []);

  // Fetch all users from Firebase
  useEffect(() => {
    const auth = getAuth(); // ✅ define auth here too
    const currentUser = auth.currentUser;

    const db = getDatabase();
    const userRef = ref(db, "users/");

    const handleData = (snapshot) => {
      const userblanklist = [];

      snapshot.forEach((item) => {
        const userData = item.val();

        // ✅ Show only other users (not the logged-in user)
        if (userData.userUid !== currentUser?.uid) {
          userblanklist.push({ ...userData, userKey: item.key });
        }
      });

      setuserlist(userblanklist);
    };

    // CLeanup Function

    onValue(userRef, handleData);
    return () => off(userRef, "value", handleData);
  }, []);

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 relative">User List</h1>
        <span>
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      <div className="h-[40vh] overflow-y-scroll py-5">
        {userlist.map((user, index) => (
          <div
            key={user.userUid}
            className={
              userlist.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
          >
            <div className="flex gap-5 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <picture>
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={
                      user?.profile_picture?.length > 0
                        ? user.profile_picture
                        : "https://via.placeholder.com/50"
                    }
                    alt={user?.username || "User"}
                  />
                </picture>
              </div>

              <div>
                <h1 className="text-[14px] font-bold">
                  {user?.username || "Unknown User"}
                </h1>
                <p className="text-[12px] text-gray-600">
                  {user?.status || "Hey there! I'm using ChatApp"}
                </p>
              </div>
            </div>

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