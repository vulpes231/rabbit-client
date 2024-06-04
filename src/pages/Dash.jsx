import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Authnav, Sidebar } from "../components";

import Footer from "../components/Footer";
import { getJoinedTimeAgo } from "../utils/getDate";
import Dashcontent from "../components/Dashcontent";
import Invoices from "./Invoices";
import Ticket from "./Ticket";
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

const Dash = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [toggle, setToggle] = useState(false);

  const { accessToken, user } = useSelector((state) => state.signin);
  // const accessToken = localStorage.getItem("accessToken")

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const resetToggle = () => {
    setToggle(false);
  };

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

  const joinDate = new Date(user?.createdAt);
  const memberSince = getJoinedTimeAgo(joinDate);

  const [activeLink, setActiveLink] = useState("dash");

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  useEffect(() => {
    if (accessToken) {
      console.log("Dispatching get products...");
      dispatch(getProducts());
      dispatch(getServerPlans());
    }
  }, [accessToken, dispatch]);

  return (
    <section className="bg-black text-white min-h-screen w-full p-6 lg:flex ">
      <div
        className={
          toggle
            ? "h-screen w-[60%] md:w-[40%] bg-white text-black absolute top-0 left-0 z-30"
            : "hidden lg:flex w-[250px] z-30"
        }
      >
        <Sidebar
          toggle={toggle}
          handleLinks={handleLinks}
          activeLink={activeLink}
          resetClick={resetToggle}
        />
      </div>
      <div className="flex flex-col w-full ">
        <div>
          <Authnav
            handleLinks={handleLinks}
            activeLink={activeLink}
            toggle={toggle}
            handleToggle={handleToggle}
          />
        </div>
        <div>
          {activeLink === "dash" && (
            <Dashcontent
              formattedDate={formattedDate}
              user={user}
              memberSince={memberSince}
            />
          )}
          {activeLink === "invoice" && <Invoices />}
          {activeLink === "ticket" && <Ticket />}
          {activeLink === "faq" && <Faq />}
          {activeLink === "status" && <Profile />}
          {activeLink === "link" && <Linktool />}
          {activeLink === "rdp" && <Server />}
          {activeLink === "log" && <Log />}
          {activeLink === "resume" && <Resume />}
          {activeLink === "account" && <Account />}
          {activeLink === "service" && <Services />}
          {activeLink === "rat" && <Script />}
          {activeLink === "web3" && <Web3 />}
          {activeLink === "cookie" && <Bypass />}
          {activeLink === "sender" && <Sender />}

          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Dash;
