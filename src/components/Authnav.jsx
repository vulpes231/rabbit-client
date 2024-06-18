import React, { useState, useEffect } from "react";
import { MdClose, MdMenu, MdNightlightRound, MdSunny } from "react-icons/md";
import { loggedLinks } from "../constants";
import { Link } from "react-router-dom";
import { FaMailBulk, FaQuestion, FaUser, FaUserCog } from "react-icons/fa";
import { MdHome } from "react-icons/md";

import { FaMoneyBillTrendUp } from "react-icons/fa6";

const Authnav = ({ handleLinks, activeLink, toggle, handleToggle }) => {
  const [darkMode, setDarkMode] = useState(false);
  const handleModeToggle = () => {
    setDarkMode(!darkMode);
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
        // to={link.path}
      >
        {link.title.includes("Dash") ? (
          <MdHome />
        ) : link.title.includes("Channels") ? (
          <FaMoneyBillTrendUp />
        ) : link.title.includes("Wallet") ? (
          <FaMailBulk />
        ) : link.title.includes("FAQ") ? (
          <FaQuestion />
        ) : link.title.includes("Profile") ? (
          <FaUserCog />
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

  useEffect(() => {
    // Apply dark mode class to the body
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="isolate fixed top-0 start-0 w-full py-4 xl:py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 z-[1020] px-3">
      <div className="flex items-center w-100 justify-between">
        <h3 className="text-2xl caveat-regular capitalize text-red-500 font-bold hidden lg:flex">
          rh4ogs
        </h3>
        <div className="lg:hidden -ms-1.">
          <button
            onClick={handleToggle}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200"
          >
            {!toggle ? <MdMenu /> : <MdClose />}
          </button>
        </div>

        <span className="lg:hidden">
          <h3 className="text-2xl caveat-regular capitalize text-red-500 font-bold ">
            rh4ogs
          </h3>
        </span>

        <div className="hidden lg:flex gap-6 text-xs font-medium">
          {authLinks}
        </div>

        <div className="flex gap-3 items-center">
          <span onClick={handleModeToggle} className="inline-flex relative">
            <button className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              {darkMode ? <MdNightlightRound /> : <MdSunny />}
            </button>
          </span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:gap-10 lg:hidden pt-2 text-xs font-medium">
        {authLinks}
      </div>
    </header>
  );
};

export default Authnav;
