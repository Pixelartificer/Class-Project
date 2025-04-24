import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, off, remove } from "firebase/database";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const BlockUser = () => {
  const [blockedUsers, setBlockedUsers] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    const blockRef = ref(db, "blockList");
    const handleBlockData = (snapshot) => {
      const blockArray = [];
      snapshot.forEach((item) => {
        const block = item.val();
        if (block.blockedByUid === user.uid) {
          blockArray.push({ ...block, blockId: item.key });
        }
      });
      setBlockedUsers(blockArray);
    };

    onValue(blockRef, handleBlockData);
    return () => off(blockRef, "value", handleBlockData);
  }, []);

  const handleUnblock = (blockId) => {
    remove(ref(db, `blockList/${blockId}`));
  };

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 relative flex items-center gap-2">
          Blocked Users
          <span className="bg-red-600 text-white text-[12px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {blockedUsers.length}
          </span>
        </h1>
        <span>
          <IoEllipsisVerticalSharp />
        </span>
      </div>

      <div className="h-[40vh] overflow-y-scroll py-5">
        {blockedUsers.map((user) => (
          <div
            key={user.blockId}
            className="flex items-center justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700 cursor-pointer"
          >
            <div className="flex gap-5 items-center">
              <img
                className="w-[50px] h-[50px] rounded-full object-cover"
                src={
                  user.blockedUserPic?.length > 0
                    ? user.blockedUserPic
                    : "https://via.placeholder.com/50"
                }
                alt={user.blockedUserName}
              />
              <div>
                <h1 className="text-[14px] font-bold">
                  {user.blockedUserName || "Unknown"}
                </h1>
                <p className="text-[12px] text-gray-600">{user.blockedUserEmail}</p>
              </div>
            </div>

            <button
              onClick={() => handleUnblock(user.blockId)}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold px-4 py-2 rounded-lg text-sm"
            >
              Unblock
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlockUser;