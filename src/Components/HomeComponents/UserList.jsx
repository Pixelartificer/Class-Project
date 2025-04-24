import React, { useEffect, useState } from "react";
import { getDatabase, ref, onValue, off } from "firebase/database";
import { getAuth } from "firebase/auth";

const GroupList = () => {
  const [myGroups, setMyGroups] = useState([]);

  useEffect(() => {
    const auth = getAuth();
    const db = getDatabase();
    const currentUser = auth.currentUser;

    if (!currentUser) return;

    const groupRef = ref(db, "groups");

    const handleData = (snapshot) => {
      const myGroupList = [];
      snapshot.forEach((item) => {
        const groupData = item.val();

        // Check if current user is a member of this group
        const isMember =
          groupData.members &&
          Object.values(groupData.members).includes(currentUser.uid);

        if (isMember) {
          myGroupList.push({ ...groupData, groupId: item.key });
        }
      });
      setMyGroups(myGroupList);
    };

    onValue(groupRef, handleData);

    return () => off(groupRef, "value", handleData);
  }, []);

  return (
    <div className="bg-white w-[31%] border border-gray-300 shadow-md rounded-2xl p-5">
      <h1 className="text-2xl font-bold text-gray-700 mb-4">
        My Groups ({myGroups.length})
      </h1>
      <div className="h-[40vh] overflow-y-auto space-y-4">
        {myGroups.map((group) => (
          <div
            key={group.groupId}
            className="p-3 bg-gray-100 rounded-lg shadow-sm flex flex-col"
          >
            <h2 className="text-lg font-semibold text-purple-700">{group.groupName}</h2>
            <p className="text-sm text-gray-600">{group.groupTagline}</p>
            <p className="text-xs text-gray-500 mt-1">
              Admin: {group.adminName}
            </p>
          </div>
        ))}
        {myGroups.length === 0 && (
          <p className="text-gray-500 text-sm">You haven't joined any group yet.</p>
        )}
      </div>
    </div>
  );
};

export default GroupList;