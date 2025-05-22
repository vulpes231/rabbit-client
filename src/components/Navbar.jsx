/* eslint-disable no-unused-vars */
import PropTypes from "prop-types";
import React, { useEffect, useState } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  MdClose,
  MdHome,
  MdMenu,
  MdNote,
  MdPhone,
  MdSunny,
  MdNightlightRound,
  MdGroup,
} from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { FaInstagram, FaTelegram, FaTwitter, FaDiscord } from "react-icons/fa";
import { RiShieldKeyholeLine } from "react-icons/ri";
import { navLinks } from "../constants";
import { useDispatch, useSelector } from "react-redux";
import { setDarkMode, setToggle } from "../features/navSlice";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("home");
  const [hoveredLink, setHoveredLink] = useState(null);

  const { toggle, darkMode } = useSelector((state) => state.nav);
  const dispatch = useDispatch();

  const handleLink = (linkId) => {
    setActiveLink(linkId);
    dispatch(setToggle());
  };

  const links = navLinks.map((link) => (
    <motion.div
      key={link.id}
      onHoverStart={() => setHoveredLink(link.id)}
      onHoverEnd={() => setHoveredLink(null)}
      className="relative"
    >
      <Link
        to={link.path}
        onClick={() => handleLink(link.id)}
        className={`flex items-center gap-2 uppercase text-xs font-medium p-2 transition-colors ${
          activeLink === link.id
            ? "text-red-500 dark:text-red-400"
            : "text-slate-700 hover:text-slate-900 dark:text-slate-300 dark:hover:text-slate-100"
        }`}
      >
        {link.title.includes("Home") ? (
          <MdHome className="text-lg" />
        ) : link.title.includes("FAQs") ? (
          <MdNote className="text-lg" />
        ) : link.title.includes("Channels") ? (
          <GrChannel className="text-lg" />
        ) : link.title.includes("Contact") ? (
          <MdPhone className="text-lg" />
        ) : null}
        {link.title}
      </Link>

      {hoveredLink === link.id && (
        <motion.div
          layoutId="navHover"
          className="absolute bottom-0 left-0 w-full h-0.5 bg-red-500 dark:bg-red-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ type: "spring", bounce: 0.25 }}
        />
      )}
    </motion.div>
  ));

  const mobileLinks = navLinks.map((link) => (
    <motion.div key={link.id} whileHover={{ x: 5 }} whileTap={{ scale: 0.95 }}>
      <Link
        to={link.path}
        onClick={() => handleLink(link.id)}
        className={`flex items-center gap-3 py-3 px-4 text-sm font-medium rounded-lg transition-colors ${
          activeLink === link.id
            ? "bg-red-500/10 text-red-500 dark:text-red-400"
            : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
        }`}
      >
        {link.title.includes("Home") ? (
          <MdHome className="text-xl" />
        ) : link.title.includes("FAQs") ? (
          <MdNote className="text-xl" />
        ) : link.title.includes("Channels") ? (
          <GrChannel className="text-xl" />
        ) : link.title.includes("Team") ? (
          <MdGroup className="text-xl" />
        ) : null}
        {link.title}
      </Link>
    </motion.div>
  ));

  const socialIcons = [
    { icon: <FaInstagram />, color: "bg-pink-600" },
    { icon: <FaTwitter />, color: "bg-blue-400" },
    { icon: <FaTelegram />, color: "bg-blue-500" },
    { icon: <FaDiscord />, color: "bg-indigo-600" },
  ];

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const handleToggle = () => {
    dispatch(setToggle());
  };

  const handleDarkMode = () => {
    dispatch(setDarkMode());
  };

  return (
    <header className="fixed top-0 left-0 w-full py-3 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900 z-10 px-4">
      <div className="max-w-7xl mx-auto">
        <nav className="flex items-center justify-between">
          {/* Logo and Desktop Links */}
          <div className="flex items-center gap-12">
            <motion.a
              href="/"
              whileHover={{ rotate: 10 }}
              whileTap={{ scale: 0.9 }}
            >
              <img src={logo} alt="Logo" className="w-8 h-8" />
            </motion.a>

            <div className="hidden lg:flex gap-6">{links}</div>
          </div>

          {/* Right Side - Auth Buttons and Dark Mode Toggle */}
          <div className="flex items-center gap-4">
            <div className="hidden lg:flex items-center gap-3">
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/signin"
                  className="flex items-center gap-2 font-medium text-sm bg-transparent text-slate-700 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors px-4 py-2 rounded-lg"
                >
                  <RiShieldKeyholeLine className="text-lg" />
                  Sign In
                </Link>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                initial={{ scale: 1 }}
                animate={{
                  scale: [1, 1.05, 1],
                  transition: { repeat: Infinity, duration: 2 },
                }}
              >
                <Link
                  to="/signup"
                  className="font-medium text-sm bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 transition-all px-6 py-2 rounded-lg shadow-lg shadow-red-500/20"
                >
                  Sign Up
                </Link>
              </motion.div>
            </div>

            {/* Dark Mode Toggle */}
            <motion.button
              onClick={handleDarkMode}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="inline-flex items-center justify-center h-9 w-9 rounded-full transition-all text-slate-400 hover:text-red-500 hover:bg-slate-200 dark:text-slate-300 dark:hover:text-red-400 dark:hover:bg-slate-800"
            >
              {!darkMode ? <MdSunny /> : <MdNightlightRound />}
            </motion.button>

            {/* Mobile Menu Button */}
            <motion.button
              onClick={handleToggle}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-full overflow-hidden transition-all text-slate-400 hover:bg-slate-200 hover:dark:bg-slate-800 hover:text-slate-600 hover:dark:text-slate-200"
            >
              {!toggle ? <MdMenu /> : <MdClose />}
            </motion.button>
          </div>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {toggle && (
          <motion.div
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed lg:hidden inset-0 top-[63px] z-40 w-64  border-r border-slate-200 dark:border-slate-800 shadow-xl"
          >
            <div className="flex flex-col p-4 space-y-2 bg-white dark:bg-slate-950 shadow-xl">
              {mobileLinks}

              <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-col gap-4">
                <motion.div
                  className="flex items-center gap-4"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <Link
                    className="w-full bg-red-500 text-white h-[38px] rounded-[5px] flex items-center justify-center text-[14px] font-semibold"
                    to={"/signin"}
                    onClick={handleToggle}
                  >
                    Sign In
                  </Link>
                  <Link
                    className="w-full bg-red-500 text-white h-[38px] rounded-[5px] flex items-center justify-center text-[14px] font-semibold"
                    to={"/signup"}
                    onClick={handleToggle}
                  >
                    Sign Up
                  </Link>
                </motion.div>
                <div className="flex justify-center gap-6">
                  {socialIcons.map((social, index) => (
                    <motion.a
                      key={index}
                      href="#"
                      whileHover={{ y: -5, scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`flex items-center justify-center h-10 w-10 rounded-full ${social.color} text-white text-lg`}
                    >
                      {social.icon}
                    </motion.a>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
