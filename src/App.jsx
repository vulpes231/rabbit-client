import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import { Authnav, Landing } from "./components";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Dash from "./pages/Dash";
import Navbar from "./components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./pages/Orders";
import Chat from "./pages/Chat";
import Channel from "./pages/Channel";
import Wallet from "./pages/Wallet";
import Faq from "./pages/Faq";
import Profile from "./pages/Profile";
import { getAccessToken } from "./constants";
import { logoutUser } from "./features/logoutSlice";

const App = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState(false);
  const [activeLink, setActiveLink] = useState("dash");
  const [darkMode, setDarkMode] = useState(false);

  const handleModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const accessToken = getAccessToken();

  const { loading, error, success } = useSelector((state) => state.logout);

  const handleLogout = (e) => {
    console.log("Logging out..");
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (success) {
      window.location.href = "/signin";
    }
  }, [success, dispatch]);

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const resetToggle = () => {
    setToggle(false);
  };

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    } else {
      setToken(false);
    }
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full pt-16 lg:pt-[calc(theme(space.16)+theme(space.1))]">
      {token ? (
        <Authnav
          toggle={toggle}
          handleToggle={handleToggle}
          activeLink={activeLink}
          handleLinks={handleLinks}
          darkMode={darkMode}
          handleModeToggle={handleModeToggle}
          handleLogout={handleLogout}
          logoutLoad={loading}
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
