import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Authnav, Sidebar } from "../components";

import Footer from "../components/Footer";
import { getJoinedTimeAgo } from "../utils/getDate";
import Dashcontent from "../components/Dashcontent";
import Invoices from "./Invoices";
import Ticket from "./Ticket";
import Faq from "./Faq";
import Profile from "./Profile";

const Dash = () => {
  const navigate = useNavigate();
  const { accessToken, user } = useSelector((state) => state.signin);

  // console.log(user);

  const [toggle, setToggle] = useState(false);

  const handleToggle = () => {
    setToggle((prev) => !prev);
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

  return (
    <section className="bg-black text-white min-h-screen w-full p-6 lg:flex ">
      <div
        className={
          toggle
            ? "h-screen w-[60%] bg-white text-black absolute top-0 left-0"
            : "hidden lg:flex w-[250px]"
        }
      >
        <Sidebar toggle={toggle} />
      </div>
      <div className="flex flex-col w-full">
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

          <Footer />
        </div>
      </div>
    </section>
  );
};

export default Dash;
