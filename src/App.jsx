import React from "react";
import SignUp from "../src/assets/Pages/SignUp/SignUp";
import SignIn from "../src/assets/Pages/SignIn/SignIn";

import Landing from "./assets/Pages/Landing/Landing";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import RootLayout from "./Components/RootLayout/RootLayout";
import Home from "./assets/Pages/Home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/message" element={"This is Message page"} />
          <Route path="/notifecation" element={"This is Notifecation page"} />
          <Route path="/setting" element={"This is Setting page"} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;

