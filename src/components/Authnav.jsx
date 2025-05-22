/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { MdClose, MdMenu, MdNightlightRound, MdSunny } from "react-icons/md";
import { loggedLinks } from "../constants";
import { Link, useNavigate } from "react-router-dom";
import { FaMailBulk, FaQuestion, FaUserCog } from "react-icons/fa";
import { MdHome } from "react-icons/md";
import { FaMoneyBillTrendUp } from "react-icons/fa6";
import Usermenu from "./Usermenu";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setToggle } from "../features/navSlice";
import { motion } from "framer-motion";

// motion

const Authnav = ({ handleLinks, handleLogout, activeLink }) => {
  const { toggle, darkMode } = useSelector((state) => state.nav);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // console.log(activeLink);

  const authLinks = loggedLinks.map((link) => (
    <motion.div
      key={link.id}
      whileHover={{ x: 5 }}
      whileTap={{ scale: 0.95 }}
      className="relative"
    >
      <div
        onClick={() => {
          handleLinks(link.id);
          if (link.id !== "dash") {
            navigate(link.path);
          } else {
            navigate(link.path);
          }
        }}
        className={`flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors cursor-pointer ${
          activeLink === link.id
            ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }`}
      >
        <span className="text-lg">
          {link.title.includes("Dash") ? (
            <MdHome />
          ) : link.title.includes("Channel") ? (
            <FaMoneyBillTrendUp />
          ) : link.title.includes("Wallet") ? (
            <FaMailBulk />
          ) : link.title.includes("FAQ") ? (
            <FaQuestion />
          ) : link.title.includes("Profile") ? (
            <FaUserCog />
          ) : null}
        </span>
        <span className="font-medium text-sm">{link.title}</span>
        {activeLink === link.id && (
          <motion.div
            layoutId="activeNavIndicator"
            className="absolute left-0 top-0 h-full w-1 bg-red-500 dark:bg-red-400 rounded-r"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ type: "spring", bounce: 0.25 }}
          />
        )}
      </div>
    </motion.div>
  ));

  const handleToggle = () => {
    dispatch(setToggle());
  };

  const handleDarkMode = () => {
    dispatch(setDarkMode());
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  return (
    <header className="isolate fixed top-0 start-0 w-full border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 z-[50] flex flex-col gap-6">
      <div className="flex items-center w-100 justify-between p-4">
        {/* <h3 className="text-2xl caveat-regular capitalize text-red-500 font-bold hidden lg:flex">
          rh4ogs
        </h3> */}
        <div className="-ms-1.">
          <button
            onClick={handleToggle}
            className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200 ui-open:bg-slate-200 ui-open:dark:bg-slate-800 ui-open:text-slate-600 ui-open:dark:text-slate-200"
          >
            {!toggle ? (
              <MdMenu className="lg:w-10 lg:h-10" />
            ) : (
              <MdClose className="lg:w-10 lg:h-10" />
            )}
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
          <span onClick={handleDarkMode} className="inline-flex relative">
            <button className="inline-flex items-center justify-center h-8 w-8 rounded-full overflow-hidden transition-all text-slate-400 hover:text-slate-600 hover:bg-slate-200 dark:text-slate-300 dark:bg-slate-800">
              {darkMode ? <MdNightlightRound /> : <MdSunny />}
            </button>
          </span>
          <Usermenu handleLogout={handleLogout} />
        </div>
      </div>

      <div className="flex flex-wrap gap-2 justify-center md:gap-10 lg:hidden p-4 text-xs font-medium bg-slate-50 dark:bg-slate-900">
        {authLinks}
      </div>
    </header>
  );
};

export default Authnav;
