import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { getDatabase, ref, onValue } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const Friends = () => {
  const [friendList, setFriendList] = useState([]);
  const db = getDatabase();
  const auth = getAuth();

  useEffect(() => {
    const currentUser = auth.currentUser;
    const friendsRef = ref(db, "friends");

    const handleData = (snapshot) => {
      const friends = [];
      snapshot.forEach((item) => {
        const data = item.val();

        // Check if current user is part of the friendship
        if (data.user1.uid === currentUser.uid || data.user2.uid === currentUser.uid) {
          const friend =
            data.user1.uid === currentUser.uid ? data.user2 : data.user1;

          friends.push({
            ...friend,
            connectedAt: data.connectedAt,
            key: item.key,
          });
        }
      });
      setFriendList(friends);
    };

    onValue(friendsRef, handleData);
    return () => onValue(friendsRef, handleData);
  }, []);

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      {/* 🔝 Header with title and friend count badge */}
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 relative flex items-center gap-2">
          Friends
          <span className="bg-purple-700 text-white text-[12px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {friendList.length}
          </span>
        </h1>
        <span>
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      {/* 👥 Friend List */}
      <div className="h-[40vh] overflow-y-scroll py-5">
        {friendList.map((friend, index) => (
          <div
            key={friend.key}
            className={
              friendList.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
          >
            {/* Friend Avatar and Info */}
            <div className="flex gap-5 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  src={friend.profile_picture || "https://via.placeholder.com/50"}
                  alt={friend.username}
                />
              </div>
              <div>
                <h1 className="text-[14px] font-bold">{friend.username}</h1>
                <p className="text-[12px] text-gray-600">
                  Friends since {moment(friend.connectedAt).fromNow()}
                </p>
              </div>
            </div>
            {/* Optional future button: Message or Unfriend */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Friends;