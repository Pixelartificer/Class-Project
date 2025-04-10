import React from "react";
import SignUp from "../src/assets/Pages/SignUp/SignUp";
import SignIn from "../src/assets/Pages/SignIn/SignIn";

import Landing from "./assets/Pages/Landing/Landing";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./assets/Pages/Home/Home";
import Notifecation from "./assets/Pages/Notifecation/Notifecation";
import Settings from "./assets/Pages/Settings/Settings";
import ChatUI from "./assets/Pages/ChatUI/ChatUI";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/message" element={<ChatUI />} />
          <Route path="/notifecation" element={<Notifecation />} />
          <Route path="/setting" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

// import React from "react";
// import SignUp from "../src/assets/Pages/SignUp/SignUp";
// import SignIn from "../src/assets/Pages/SignIn/SignIn";
// import Landing from "./assets/Pages/Landing/Landing";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import RootLayout from "./Components/RootLayout/RootLayout";
// import Home from "./assets/Pages/Home/Home";

// const App = () => {
//   return (
//     <BrowserRouter>
//       <Routes>
//         {/* Landing page */}
//         <Route path="/" element={<Landing />} />
        
//         {/* Sign Up page */}
//         <Route path="/signup" element={<SignUp />} />
        
//         {/* Sign In page */}
//         <Route path="/signin" element={<SignIn />} />
        
//         {/* Root layout for main app pages */}
//         <Route path="/dashboard" element={<RootLayout />}>
//           {/* Home page (this will be rendered inside the RootLayout) */}
//           <Route index element={<Home />} />
          
//           {/* Other pages */}
//           <Route path="message" element={"This is the Message page"} />
//           <Route path="notifecation" element={"This is the Notification page"} />
//           <Route path="setting" element={"This is the Setting page"} />
//         </Route>
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


