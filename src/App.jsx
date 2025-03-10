import React from "react";
import SignUp from "../src/assets/Pages/SignUp/SignUp";
import SignIn from "../src/assets/Pages/SignIn/SignIn";
import Home from "../src/assets/Pages/Home/Home";
import Landing from "./assets/Pages/Landing/Landing";
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"; 

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
