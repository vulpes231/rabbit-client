import React, { useState, useEffect } from "react";
import { MdClose, MdMenu, MdNotifications } from "react-icons/md";
import { loggedLinks } from "../constants";
import { Link } from "react-router-dom";
import { FaMailBulk, FaQuestion, FaUser } from "react-icons/fa";
import { MdHome } from "react-icons/md";

import { FaHeartPulse, FaMoneyBillTrendUp } from "react-icons/fa6";
import Sidebar from "./Sidebar";

const Authnav = () => {
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState("dash");

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const authLinks = loggedLinks.map((link) => {
    return (
      <Link
        key={link.id}
        className={
          activeLink === link.id
            ? "flex gap-3 items-center border-b-2 border-b-red-500 font-thin pb-2"
            : "flex gap-3 items-center font-thin pb-2"
        }
        onClick={() => handleLinks(link.id)}
      >
        {link.title.includes("Dash") ? (
          <MdHome />
        ) : link.title.includes("Invoice") ? (
          <FaMoneyBillTrendUp />
        ) : link.title.includes("Ticket") ? (
          <FaMailBulk />
        ) : link.title.includes("FAQ") ? (
          <FaQuestion />
        ) : link.title.includes("Status") ? (
          <FaHeartPulse />
        ) : null}
        {link.title}
      </Link>
    );
  });

  useEffect(() => {
    document.title = "RH4OGS - Client area";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  return (
    <header className="w-full font-bold bg-black flex flex-col gap-6 lg:px-20 ">
      <div className="flex justify-between w-full items-center mb-5 lg:mb-3">
        <span
          className={
            toggle
              ? "lg:hidden text-2xl z-50 text-black"
              : "lg:hidden text-2xl z-50 text-white"
          }
          onClick={handleToggle}
        >
          {!toggle ? <MdMenu /> : <MdClose />}
        </span>
        <span>
          <h3 className="text-2xl caveat-regular capitalize text-red-500 font-bold">
            rh4ogs
          </h3>
        </span>
        <div className="hidden lg:flex gap-10">{authLinks}</div>
        <span className="flex gap-6">
          <MdNotifications />
          <FaUser />
        </span>
      </div>

      <div className="flex flex-wrap gap-6 justify-center mb-10 md:gap-10 lg:hidden">
        {authLinks}
      </div>
      <Sidebar toggle={toggle} />
    </header>
  );
};

export default Authnav;
