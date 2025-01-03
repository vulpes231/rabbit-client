import React, { useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
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
import { resetLogin } from "./features/signinSlice";
import Ticket from "./pages/Ticket";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import LogoutModal from "./components/dash/LogoutModal";
import Completed from "./pages/Completed";
import Payment from "./pages/Payment";
import Successpage from "./components/Successpage";

const App = () => {
  const dispatch = useDispatch();
  const [toggle, setToggle] = useState(false);
  const [token, setToken] = useState(false);
  const [activeLink, setActiveLink] = useState("dash");
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  const handleModeToggle = () => {
    console.log("clicked");
    setDarkMode((prev) => !prev);
  };

  const accessToken = getAccessToken();

  const { loading, error, success } = useSelector((state) => state.logout);

  const handleLogout = () => {
    console.log("Logging out..");
    dispatch(logoutUser());
  };

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
  }, [accessToken, navigate]);

  useEffect(() => {
    if (success) {
      sessionStorage.clear();
      dispatch(resetLogin());
    }
  }, [success, dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
    } else {
      document.documentElement.classList.add("dark");
    }
  }, [darkMode]);

  useEffect(() => {
    if (success) {
      window.location.href = "/signin";
    }
  }, [success, dispatch]);

  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible") {
        navigator.serviceWorker.getRegistration().then((reg) => {
          if (reg) {
            reg.update();
          }
        });
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden max-w-full pt-16">
      {token ? (
        <Authnav
          toggle={toggle}
          handleToggle={handleToggle}
          activeLink={activeLink}
          handleLinks={handleLinks}
          darkMode={darkMode}
          handleModeToggle={handleModeToggle}
          handleLogout={handleLogout}
        />
      ) : (
        <Navbar
          darkMode={darkMode}
          handleDarkMode={handleModeToggle}
          toggle={toggle}
          handleToggle={handleToggle}
        />
      )}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/team" element={<Contact />} />
        <Route
          path="/dashboard"
          element={
            <Dash
              activeLink={activeLink}
              resetToggle={resetToggle}
              handleLinks={handleLinks}
              toggle={toggle}
              handleLogout={handleLogout}
            />
          }
        />
        <Route path="/chat" element={<Chat />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/faq" element={<Faq />} />
        <Route path="/wallet" element={<Wallet />} />
        <Route path="/channel" element={<Channel />} />
        <Route path="/order" element={<Orders />} />
        <Route path="/tickets" element={<Ticket />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/payment/:transactionId" element={<Payment />} />
        <Route path="/completed" element={<Completed />} />
        <Route path="/success" element={<Successpage />} />
      </Routes>
      {loading && <LogoutModal />}
    </div>
  );
};

export default App;
