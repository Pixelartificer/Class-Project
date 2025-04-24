import React, { useEffect, useState } from "react";
import { IoEllipsisVerticalSharp } from "react-icons/io5";
import { getDatabase, ref, onValue, remove, set, push } from "firebase/database";
import { getAuth } from "firebase/auth";
import moment from "moment";

const FriendRequest = () => {
  const [requestList, setRequestList] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const currentUser = auth.currentUser;
    const requestRef = ref(db, "friendRequests");

    const handleData = (snapshot) => {
      const requests = [];
      snapshot.forEach((item) => {
        const data = item.val();
        if (data.receiverUid === currentUser?.uid) {
          requests.push({ ...data, key: item.key });
        }
      });
      setRequestList(requests);
    };

    onValue(requestRef, handleData);
    return () => {
      onValue(requestRef, handleData);
    };
  }, []);

  const handleAccept = (request) => {
    const newFriendRef = ref(db, "friends");
    const newFriend = {
      user1: {
        uid: request.senderUid,
        username: request.senderUserName,
        email: request.senderEmail,
        profile_picture: request.senderProfilePic,
      },
      user2: {
        uid: request.receiverUid,
        username: request.receiverUserName,
        email: request.receiverEmail,
        profile_picture: request.receiverProfilePic,
      },
      connectedAt: new Date().toISOString(),
    };

    // Add to "friends" list and remove from "friendRequests"
    set(push(newFriendRef), newFriend).then(() => {
      remove(ref(db, `friendRequests/${request.key}`));
    });
  };

  const handleDeny = (requestKey) => {
    remove(ref(db, `friendRequests/${requestKey}`));
  };

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 relative">Friend Request</h1>
        <span><IoEllipsisVerticalSharp /></span>
      </div>

      <div className="h-[40vh] overflow-y-scroll py-5">
        {requestList.map((user, index) => (
          <div
            className={
              requestList.length === index + 1
                ? "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] cursor-pointer"
                : "flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
            }
            key={user.key}
          >
            <div className="flex gap-5 items-center">
              <div className="w-[50px] h-[50px] rounded-full bg-cover bg-center">
                <img
                  className="w-[50px] h-[50px] rounded-full object-cover"
                  src={user.senderProfilePic || "https://via.placeholder.com/50"}
                  alt={user.senderUserName}
                />
              </div>

              <div>
                <h1 className="text-[14px] font-bold">{user.senderUserName}</h1>
                <p className="text-[12px] text-gray-600">Sent {moment(user.timestamp).fromNow()}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => handleAccept(user)}
                className="focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
              >
                Accept
              </button>
              <button
                onClick={() => handleDeny(user.key)}
                className="focus:outline-none text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2.5 cursor-pointer"
              >
                Deny
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequest;