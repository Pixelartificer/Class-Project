import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { FaPlus, FaMinus } from "react-icons/fa";
import {
  getDatabase,
  ref,
  set,
  onValue,
  off,
  get,
  child,
  push,
} from "firebase/database";
import { getAuth } from "firebase/auth";

const UserList = () => {
  const [userlist, setUserlist] = useState([]);
  const [sentRequests, setSentRequests] = useState([]);
  const [loggedUser, setLoggedUser] = useState({});

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const db = getDatabase();
      const userRef = ref(db, `users/${user.uid}`);
      const userData = {
        userUid: user.uid,
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

  useEffect(() => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const db = getDatabase();
    const userRef = ref(db, "users/");

    const handleData = (snapshot) => {
      const userBlankList = [];
      snapshot.forEach((item) => {
        const userData = item.val();
        if (userData.userUid !== currentUser?.uid) {
          userBlankList.push({ ...userData, userKey: item.key });
        } else {
          const user = Object.assign({ ...userData, userKey: item.key });
          setLoggedUser(user);
        }
      });
      setUserlist(userBlankList);
    };

    onValue(userRef, handleData);
    return () => off(userRef, "value", handleData);
  }, []);

  const handleFriendRequest = (receiver) => {
    const auth = getAuth();
    const currentUser = auth.currentUser;
    const db = getDatabase();

    if (!currentUser || !receiver) return;

    const senderData = {
      uid: currentUser.uid,
      username: currentUser.displayName || "Unknown",
      email: currentUser.email || "",
      profile_picture: currentUser.photoURL || "",
    };

    const requestRef = ref(db, "friendRequests");
    const newRequest = {
      senderUid: senderData.uid,
      senderEmail: senderData.email,
      senderProfilePic: senderData.profile_picture,
      senderUserKey: loggedUser.userKey,
      senderUserName: loggedUser.username,
      receiverUid: receiver.userUid, // Use the receiver's information
      receiverEmail: receiver.email,
      receiverProfilePic: receiver.profile_picture,
      receiverUserKey: receiver.userKey, // Use the receiver's user key
      receiverUserName: receiver.username,
    };

    set(push(requestRef), newRequest).then(() => {
      setSentRequests((prev) => [...prev, receiver.userUid]);
    });
  };

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      {/* 🔝 Header with title and user count badge */}
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 relative flex items-center gap-2">
          User List
          <span className="bg-purple-600 text-white text-[12px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {userlist.length}
          </span>
        </h1>
        <span>
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      {/* 👥 Scrollable user list */}
      <div className="h-[40vh] overflow-y-scroll py-5">
        {userlist.map((user, index) => {
          const requestSent = sentRequests.includes(user.userUid);
          return (
            <div
              key={user.userUid}
              className={
                userlist.length === index + 1
                  ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                  : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
              }
            >
              {/* 👤 User info */}
              <div className="flex gap-5 items-center">
                <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                  <img
                    className="w-[50px] h-[50px] rounded-full object-cover"
                    src={
                      user?.profile_picture?.length > 0
                        ? user.profile_picture
                        : "https://via.placeholder.com/50"
                    }
                    alt={user?.username || "User"}
                  />
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

              {/* ➕ or ➖ Friend Request Button */}
              <button
                onClick={() => handleFriendRequest(user)}
                type="button"
                disabled={requestSent}
                className={`focus:outline-none text-white ${
                  requestSent
                    ? "bg-gray-400"
                    : "bg-purple-700 hover:bg-purple-800"
                } focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 cursor-pointer`}
              >
                {requestSent ? <FaMinus /> : <FaPlus />}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserList;
