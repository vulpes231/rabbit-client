import React, { useState } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import {
  MdClose,
  MdHome,
  MdMenu,
  MdNote,
  MdPhone,
  MdSunny,
  MdNightlightRound,
} from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import { navLinks } from "../constants";

/* eslint-disable react/prop-types */
const Navbar = ({ darkMode, handleDarkMode, toggle, handleToggle }) => {
  const [activeLink, setActiveLink] = useState("home");

  const handleLink = (linkId) => {
    setActiveLink(linkId);
  };

  console.log(darkMode);

  const links = navLinks.map((link) => {
    console.log(activeLink);
    return (
      <Link
        to={link.path}
        key={link.id}
        onClick={() => handleLink(link.id)}
        className={`flex items-center gap-1 uppercase text-xs font-medium border-b-2 p-2 ${
          activeLink === link.id ? "border-red-500" : "border-none"
        }`}
      >
        {link.title.includes("Home") ? (
          <MdHome />
        ) : link.title.includes("FAQs") ? (
          <MdNote />
        ) : link.title.includes("Channels") ? (
          <GrChannel />
        ) : link.title.includes("Contact") ? (
          <MdPhone />
        ) : null}
        {link.title}
      </Link>
    );
  });

  return (
    <header className="isolate fixed top-0 start-0 w-full py-4 xl:py-3 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-black z-[1020] px-3">
      <div className="container px-3">
        <nav className="flex items-center w-100 justify-between">
          <span className="flex gap-16 items-center">
            <img src={logo} alt="" className="w-[25px]" />
            <span className="hidden lg:flex gap-8">{links}</span>
          </span>

          <span className="uppercase  flex items-center gap-6">
            <div className="flex items-center gap-x-3 lg:gap-x-5">
              <Link
                className="inline-flex font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full"
                to={"/signin"}
              >
                sign in
              </Link>
              <Link
                className="inline-flex font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full"
                to={"/signup"}
              >
                sign up
              </Link>
            </div>

            <div className="flex items-center gap-x-3 lg:gap-x-5">
              <button
                onClick={handleDarkMode}
                className="inline-flex items-center justify-center h-8 w-8 rounded-full transition-all text-slate-400 hover:text-red-600 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800"
              >
                {!darkMode ? <MdSunny /> : <MdNightlightRound />}
              </button>

              <div className="xl:hidden -ms-1.">
                <button
                  onClick={handleToggle}
                  className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200"
                >
                  {!toggle ? <MdMenu /> : <MdClose />}
                </button>
              </div>
            </div>
          </span>

          <div
            className={
              toggle
                ? "flex flex-col py-4 xl:py-0 w-64 xl:w-auto fixed xl:transition-none xl:static start-0 top-0 border-e dark:border-slate-800 xl:border-e-0 bg-white dark:bg-slate-950 z-[1020] h-screen xl:h-auto flex-shrink-0 xl:translate-x-0 transition-all -translate-x-full "
                : "hidden"
            }
          >
            <div className="flex flex-col xl:flex-row xl:items-center gap-x-6 px-4 menu-base">
              {navLinks.map((lnk) => {
                return <Link key={lnk.id}>{lnk.title}</Link>;
              })}
            </div>
            <span className="hidden md:flex gap-10 mt-[500px]">
              <FaInstagram />
              <FaTwitter />
              <FaTelegram />
            </span>
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
