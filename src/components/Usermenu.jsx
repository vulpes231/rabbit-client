import React, { useState, useRef } from "react";
import { profile } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BsGear, BsTicket } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { motion, AnimatePresence } from "framer-motion";
// import { useDispatch } from "react-redux";
import { useOnClickOutside } from "./hooks/useOnClickOutside";
// Custom hook for outside clicks

const Usermenu = ({ handleLogout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef();

  // Close menu when clicking outside
  useOnClickOutside(menuRef, () => setIsOpen(false));

  const menuItems = [
    {
      icon: <BiPurchaseTagAlt className="text-lg" />,
      label: "Orders",
      path: "/orders",
    },
    {
      icon: <BsTicket className="text-lg" />,
      label: "Tickets",
      path: "/tickets",
    },
    {
      icon: <BsGear className="text-lg" />,
      label: "Settings",
      path: "/settings",
    },
    {
      icon: <MdLogout className="text-lg" />,
      label: "Logout",
      action: handleLogout,
    },
  ];

  return (
    <div className="relative" ref={menuRef}>
      {/* Profile Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-8 h-8 rounded-full overflow-hidden border-2 border-transparent hover:border-red-500 transition-colors"
      >
        <img
          src={profile}
          alt="User profile"
          className="w-full h-full object-cover"
        />
      </motion.button>

      {/* Dropdown Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 top-12 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-xl z-50 overflow-hidden border border-slate-100 dark:border-slate-700"
          >
            {menuItems.map((item, index) => (
              <motion.li
                key={index}
                whileHover={{ backgroundColor: "#f3f4f6" }}
                whileTap={{ scale: 0.98 }}
                className="border-b border-slate-100 dark:border-slate-700 last:border-b-0"
              >
                {item.path ? (
                  <Link
                    to={item.path}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200"
                    onClick={() => setIsOpen(false)}
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </Link>
                ) : (
                  <button
                    onClick={() => {
                      item.action();
                      setIsOpen(false);
                    }}
                    className="flex items-center gap-3 px-4 py-3 text-sm font-medium text-slate-700 dark:text-slate-200 w-full text-left"
                  >
                    {item.icon}
                    <span>{item.label}</span>
                  </button>
                )}
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Usermenu;
