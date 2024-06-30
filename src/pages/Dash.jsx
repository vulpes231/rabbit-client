import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components";
import { logoutUser } from "../features/logoutSlice";
import Footer from "../components/Footer";
import { getAccessToken } from "../utils/getDate";
import Dashcontent from "../components/Dashcontent";
import Invoices from "./Channel";
import Wallet from "./Wallet";
import Faq from "./Faq";
import Profile from "./Profile";
import Linktool from "./Linktool";
import Resume from "./Resume";
import Server from "./Server";
import Services from "./Services";
import Script from "./Script";
import Log from "./Log";
import Account from "./Account";
import Bypass from "./Bypass";
import Sender from "./Sender";
import Web3 from "./Web3";
import { getProducts } from "../features/dashSlice";
import { getServerPlans } from "../features/serverSlice";
import LogoutModal from "../components/dash/LogoutModal";
import { getTransactions } from "../features/transactionSlice";
import { getUserBalance } from "../features/walletSlice";
import { format } from "date-fns";
import { getUser } from "../features/userSlice";

const Dash = ({ handleLinks, activeLink, toggle, resetToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userBal, setUserBal] = useState(0);
  const [joinDate, setJoinDate] = useState(0);
  const accessToken = getAccessToken();

  const { user } = useSelector((state) => state.user);
  const { loading, error, success } = useSelector((state) => state.logout);
  const { balance } = useSelector((state) => state.wallet);

  // console.log("bal:", balance);

  const lastLogin = new Date();
  const formattedDate = lastLogin.toLocaleString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });

  // console.log(joinDate);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getUser());
      dispatch(getProducts());
      dispatch(getServerPlans());
      // dispatch(getTransactions());
      dispatch(getUserBalance());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (success) {
      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  }, [success]);

  useEffect(() => {
    if (balance && user) {
      setUserBal(balance);
      const myDate = user?.createdAt;
      const joinDate = format(new Date(myDate), "dd/mm/yyyy");
      setJoinDate(joinDate);
    }
  }, [balance, user]);

  return (
    <section
      className="relative p-6 py-10 pt-20"
      style={{ scrollMarginTop: "var(--topbar-height, 69px)" }}
    >
      <div className="flex overflow-hidden min-h-screen">
        <Sidebar
          toggle={toggle}
          handleLinks={handleLinks}
          activeLink={activeLink}
          resetClick={resetToggle}
          handleLogout={handleLogout}
        />

        <>
          {activeLink === "dash" && (
            <Dashcontent
              formattedDate={formattedDate}
              user={user}
              memberSince={joinDate}
              userBal={userBal}
            />
          )}
          {activeLink === "invoice" && <Invoices />}
          {activeLink === "wallet" && <Wallet userBal={userBal} />}
          {activeLink === "faq" && <Faq />}
          {activeLink === "status" && <Profile />}
          {activeLink === "link" && <Linktool toggle={toggle} />}
          {activeLink === "rdp" && <Server toggle={toggle} />}
          {activeLink === "spammed logs" && <Log toggle={toggle} />}
          {activeLink === "resume" && <Resume toggle={toggle} />}
          {activeLink === "social account" && <Account toggle={toggle} />}
          {activeLink === "service" && <Services toggle={toggle} />}
          {activeLink === "custom" && <Script toggle={toggle} />}
          {activeLink === "drainer" && <Web3 toggle={toggle} />}
          {activeLink === "2fa" && <Bypass toggle={toggle} />}
          {activeLink === "sender" && <Sender toggle={toggle} />}
        </>
        {loading && <LogoutModal />}
      </div>
      <Footer />
    </section>
  );
};

export default Dash;
