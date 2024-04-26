import React from "react";
import { Route, Routes } from "react-router-dom";
import { Landing } from "./components";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dash from "./pages/Dash";

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/dashboard" element={<Dash />} />
      </Routes>
    </div>
  );
};

export default App;
