import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Authnav, Landing } from "./components";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dash from "./pages/Dash";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState(false); // Initially set to false
  const [activeLink, setActiveLink] = useState("dash");

  const { accessToken } = useSelector((state) => state.signin);

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const resetToggle = () => {
    setToggle(false);
  };
  // console.log(token, accessToken);
  useEffect(() => {
    const accessToken = JSON.parse(sessionStorage.getItem("accessToken"));
    if (accessToken) {
      setToken(accessToken); // Set token to true if accessToken exists
    } else {
      setToken(false); // Ensure token is false if accessToken does not exist
    }
  }, []); // Only run once on mount

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full pt-16 lg:pt-[calc(theme(space.16)+theme(space.1))]">
      {token || accessToken ? (
        <Authnav
          toggle={toggle}
          handleToggle={handleToggle}
          activeLink={activeLink}
          handleLinks={handleLinks}
        />
      ) : (
        <Navbar />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route
          path="/dashboard"
          element={
            <Dash
              activeLink={activeLink}
              resetToggle={resetToggle}
              handleLinks={handleLinks}
              toggle={toggle}
            />
          }
        />
      </Routes>
    </div>
  );
};

export default App;
