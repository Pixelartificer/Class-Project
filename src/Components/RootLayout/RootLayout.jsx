import { getAuth } from "firebase/auth"; // Importing Firebase authentication functions
import React, { useEffect, useState } from "react"; // Importing necessary React hooks
import SideBar from "../HomeComponents/SideBar"; // Importing the Sidebar component
import { Outlet } from "react-router"; // Importing Outlet to render nested routes
import ValidationError from "../../assets/Pages/Error/ValidationError"; // Importing a component to show an error page

const RootLayout = () => {
  // Firebase Auth instance to check the user's authentication status
  const auth = getAuth();
  
  // State to track if the user has verified their email
  const [isuserVerified, setisuserVerified] = useState(false);

  // Variable to hold the content that will be rendered
  let content = null;

  // useEffect hook that runs when the component mounts or when 'auth.currentUser' changes
  useEffect(() => {
    // Check if there is a logged-in user and verify their email status
    if (auth.currentUser) {
      setisuserVerified(auth.currentUser.emailVerified); // Update the state with the email verification status
    }
  }, [auth.currentUser]); // Dependency array makes sure the effect runs when 'auth.currentUser' changes

  // Conditional rendering based on the user's email verification status
  if (isuserVerified) {
    content = (
      <div className="bg-purple-100 p-5 flex justify-between gap-x-3">
        {/* Sidebar for navigation */}
        <div>
          <SideBar />
        </div>
        {/* Main content area that renders the nested routes (via Outlet) */}
        <div className="w-full h-[95vh] rounded-2xl">
          <Outlet /> {/* This will render the child routes */}
        </div>
      </div>
    );
  } else {
    // If the user hasn't verified their email, show the ValidationError component
    content = <ValidationError />;
  }

  // Log the email verification status to the console (for debugging)
  console.log(auth.currentUser.emailVerified);

  // Return the content (either the layout with sidebar or the validation error)
  return <div>{content}</div>;
};

export default RootLayout;