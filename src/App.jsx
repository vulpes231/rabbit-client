import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Authnav, Landing } from "./components";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dash from "./pages/Dash";
import Navbar from "./components/Navbar";
import { useSelector } from "react-redux";
import Orders from "./pages/Orders";
import Chat from "./pages/Chat";
import Channel from "./pages/Channel";
import Wallet from "./pages/Wallet";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";

const App = () => {
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState(false);
  const [activeLink, setActiveLink] = useState("dash");
  const [darkMode, setDarkMode] = useState(false);

  const handleModeToggle = () => {
    setDarkMode(!darkMode);
  };

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
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, []);

  useEffect(() => {
    // Apply dark mode class to the body
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full pt-16 lg:pt-[calc(theme(space.16)+theme(space.1))]">
      {token || accessToken ? (
        <Authnav
          toggle={toggle}
          handleToggle={handleToggle}
          activeLink={activeLink}
          handleLinks={handleLinks}
          darkMode={darkMode}
          handleModeToggle={handleModeToggle}
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
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/order" element={<Orders />} />
      </Routes>
    </div>
  );
};

export default App;
