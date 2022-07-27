import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./components/Home/Home";
import Navbar from "./components/Navbar";
import Owner from "./components/Owner/Owner";
import Shop from "./components/Shop/Shop";
import Profile from "./components/Profile/Profile";
import Play from "./components/Play/Play";

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/owner" element={<Owner />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/myProfile" element={<Profile />} />
          <Route path="/play" element={<Play />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
