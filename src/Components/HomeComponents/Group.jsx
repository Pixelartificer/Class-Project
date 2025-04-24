import React, { useEffect, useState } from "react";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, onValue, push, set } from "firebase/database";
import { IoEllipsisVerticalSharp } from "react-icons/io5";

const Group = () => {
  const [groupList, setGroupList] = useState([]);
  const [joinedGroups, setJoinedGroups] = useState([]);
  const auth = getAuth();
  const db = getDatabase();

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) return;

    // Fetch all groups
    const groupRef = ref(db, "groups");
    onValue(groupRef, (snapshot) => {
      const arr = [];
      snapshot.forEach((item) => {
        arr.push({ ...item.val(), groupId: item.key });
      });
      setGroupList(arr);
    });

    // Fetch joined groups
    const joinRef = ref(db, "groupMembers");
    onValue(joinRef, (snapshot) => {
      const joined = [];
      snapshot.forEach((item) => {
        if (item.val().userUid === user.uid) {
          joined.push(item.val().groupId);
        }
      });
      setJoinedGroups(joined);
    });
  }, []);

  const handleJoinGroup = (group) => {
    const user = auth.currentUser;
    if (!user) return;

    const memberRef = ref(db, "groupMembers");
    const newMember = {
      groupId: group.groupId,
      groupName: group.groupName,
      userUid: user.uid,
      userName: user.displayName,
    };

    set(push(memberRef), newMember).then(() => {
      setJoinedGroups((prev) => [...prev, group.groupId]);
    });
  };

  return (
    <div className="bg-white w-[31%] border-1 border-gray-300 shadow-gray-700 rounded-2xl">
      <div className="flex justify-between items-center px-[22px] mt-5">
        <h1 className="text-2xl font-bold text-gray-700 flex items-center gap-2">
          Groups
          <span className="bg-purple-600 text-white text-[12px] font-semibold w-5 h-5 rounded-full flex items-center justify-center">
            {groupList.length}
          </span>
        </h1>
        <IoEllipsisVerticalSharp />
      </div>

      <div className="h-[40vh] overflow-y-scroll py-5">
        {groupList.map((group, index) => {
          const isJoined = joinedGroups.includes(group.groupId);
          return (
            <div
              key={group.groupId}
              className={
                groupList.length === index + 1
                  ? "flex justify-between mx-[22px] pt-[20px] pb-[12px]"
                  : "flex justify-between mx-[22px] pt-[20px] pb-[12px] border-b-2 border-gray-700"
              }
            >
              <div>
                <h1 className="text-[14px] font-bold text-gray-800">
                  {group.groupName}
                </h1>
                <p className="text-[12px] text-gray-600">{group.groupDesc}</p>
                <p className="text-[10px] text-gray-500 italic">
                  Created by: {group.adminName}
                </p>
              </div>

              <button
                onClick={() => handleJoinGroup(group)}
                disabled={isJoined}
                className={`text-white font-medium rounded-lg text-sm px-5 py-2 ${
                  isJoined
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-purple-600 hover:bg-purple-700"
                }`}
              >
                {isJoined ? "Joined" : "Join"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Group;