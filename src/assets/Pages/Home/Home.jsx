import React from "react";
import GroupList from "../../../Components/HomeComponents/Grouplist";
import Friends from "../../../Components/HomeComponents/Friends";
import UserList from "../../../Components/HomeComponents/UserList";
import FriendRequest from "../../../Components/HomeComponents/FriendRequest";
import Group from "../../../Components/HomeComponents/Group";
import BlockUser from "../../../Components/HomeComponents/BlockUser";

const Home = () => {
  return (
    <div className="flex gap-5 flex-wrap justify-center h-fit overflow-hidden">
      <GroupList />
      <Friends />
      <UserList />
      <FriendRequest />
      <Group />
      <BlockUser />
    </div>
  );
};

export default Home;
