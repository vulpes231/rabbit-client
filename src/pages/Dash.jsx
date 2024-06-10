import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Authnav, Sidebar, Section } from "../components";

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

const Dash = ({ handleLinks, activeLink, toggle, resetToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.signin);

  let accessToken;
  const storedAccessToken = localStorage.getItem("accessToken");
  accessToken = JSON.parse(storedAccessToken);

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
    <section
      className="relative py-10  pt-20 sm:pt-16 lg:pt-2"
      style={{ scrollMarginTop: "var(--topbar-height, 69px)" }}
    >
      <div className="flex">
        <Sidebar
          toggle={toggle}
          handleLinks={handleLinks}
          activeLink={activeLink}
          resetClick={resetToggle}
        />

        <>
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
        </>
      </div>
      <Footer />
    </section>
  );
};

export default Dash;
