import { getAuth } from "firebase/auth";
import React, { useEffect, useState } from "react";
import SideBar from "../HomeComponents/SideBar";
import { Outlet } from "react-router";
import ValidationError from "../../assets/Pages/Error/ValidationError";

const RootLayout = () => {
  const auth = getAuth();
  const [isuserVerified, setisuserVerified] = useState(false);
  let content = null;

  useEffect(() => {
    if (auth.currentUser) {
      setisuserVerified(auth.currentUser.emailVerified);
    }
  }, [auth.currentUser]);

  if (isuserVerified) {
    content = (
      <div className="bg-purple-100 p-5 flex justify-between gap-x-3">
        <div>
          <SideBar />
        </div>
        <div className="w-full h-[95vh] rounded-2xl">
          <Outlet />
        </div>
      </div>
    );
  } else {
    content = <ValidationError />;
  }

  console.log(auth.currentUser.emailVerified)

  return <div>{content}</div>;
};

export default RootLayout;