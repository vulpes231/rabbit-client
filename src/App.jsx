/* eslint-disable no-unused-vars */
import React, { useCallback, useEffect, useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { Authnav, Landing, Sidebar } from "./components";
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
import { logoutUser, resetLogout } from "./features/logoutSlice";
import { resetLogin } from "./features/signinSlice";
import Ticket from "./pages/Ticket";
import Settings from "./pages/Settings";
import Contact from "./pages/Contact";
import LogoutModal from "./components/dash/LogoutModal";
import Completed from "./pages/Completed";
import Payment from "./pages/Payment";
import Successpage from "./components/Successpage";
import { setToggle } from "./features/navSlice";
import ErrorModal from "./components/Errormodal";
import Successmodal from "./components/Successmodal";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [activeLink, setActiveLink] = useState("dash");
  const [error, setError] = useState("");
  const [hasToken, setHasToken] = useState(false);

  const { loading, logoutError, loggedOut } = useSelector(
    (state) => state.logout
  );
  const { toggle } = useSelector((state) => state.nav);

  const handleLogout = () => {
    console.log("Logging out..");
    dispatch(logoutUser());
  };

  const handleToggle = () => {
    dispatch(setToggle());
  };

  useEffect(() => {
    const token = getAccessToken();
    setHasToken(!!token);
  }, []);

  useEffect(() => {
    if (loggedOut) {
      sessionStorage.clear();
      dispatch(resetLogin());
    }
  }, [loggedOut, dispatch]);

  useEffect(() => {
    let timeout;
    if (loggedOut) {
      timeout = setTimeout(() => {
        sessionStorage.clear();
        localStorage.clear();
        dispatch(resetLogout());
        window.location.href = "/signin";
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [loggedOut, dispatch]);

  useEffect(() => {
    if (logoutError) {
      setError(logoutError);
    }
  }, [logoutError, dispatch]);

  useEffect(() => {
    let timeout;
    if (error) {
      timeout = setTimeout(() => {
        dispatch(resetLogout());
      }, 3000);
    }
    return () => clearTimeout(timeout);
  }, [error, dispatch]);

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
      {hasToken ? (
        <Authnav
          activeLink={activeLink}
          handleLinks={setActiveLink}
          handleLogout={handleLogout}
        />
      ) : (
        <Navbar />
      )}
      {/* {!hasToken && } */}
      <div
        className={`${
          toggle && hasToken
            ? "md:ml-[250px] flex-grow flex-col gap-8 font-[Montserrat]"
            : "ml-0 flex-grow flex-col gap-8 font-[Montserrat]"
        } bg-slate-200 dark:bg-slate-800 `}
      >
        <Sidebar
          toggle={toggle}
          handleLinks={setActiveLink}
          activeLink={activeLink}
          handleLogout={handleLogout}
          resetClick={handleToggle}
        />
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
                handleLinks={setActiveLink}
                handleLogout={handleLogout}
              />
            }
          />
          <Route path="/chat" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/channels" element={<Channel />} />
          <Route path="/order" element={<Orders />} />
          <Route path="/tickets" element={<Ticket />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/payment/:transactionId" element={<Payment />} />
          <Route path="/completed" element={<Completed />} />
          <Route path="/success" element={<Successpage />} />
        </Routes>
      </div>
      {loading && <LogoutModal />}
      {error && <ErrorModal error={error} />}
      {loggedOut && <Successmodal success={"Logged out."} />}
    </div>
  );
};

export default App;
