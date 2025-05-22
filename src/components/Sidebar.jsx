/* eslint-disable react/prop-types */
import React, { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { getAccessToken } from "../constants";
import { getProducts } from "../features/dashSlice";
import {
  MdArchive,
  MdSend,
  MdHome,
  MdAttachMoney,
  MdCode,
  MdCameraAlt,
  MdEmail,
  MdDescription,
  MdSchool,
  MdCloudUpload,
  // MdDns,
  MdSecurity,
  MdPeople,
  MdCloud,
  MdStorage,
  MdShare,
} from "react-icons/md";
import { FaSignature, FaServer, FaMoneyBillWave } from "react-icons/fa";

const Sidebar = ({ toggle, handleLinks, activeLink, resetClick }) => {
  const dispatch = useDispatch();
  const { products } = useSelector((state) => state.products);
  const accessToken = getAccessToken();

  const categories = [
    ...new Set(products?.products?.map((prd) => prd.category)),
  ];

  useEffect(() => {
    if (accessToken) {
      dispatch(getProducts());
    }
  }, [accessToken, dispatch]);

  const getIconForCategory = (category) => {
    const icons = {
      financial: <MdAttachMoney className="text-lg" />,
      developer: <MdCode className="text-lg" />,
      cookie: <FaSignature className="text-lg" />,
      bank: <FaMoneyBillWave className="text-lg" />,
      video: <MdCameraAlt className="text-lg" />,
      malware: <FaServer className="text-lg" />,
      office: <MdDescription className="text-lg" />,
      sender: <MdEmail className="text-lg" />,
      resume: <MdDescription className="text-lg" />,
      drainer: <MdArchive className="text-lg" />,
      social: <MdPeople className="text-lg" />,
      redirect: <MdCloud className="text-lg" />,
      extractor: <MdSend className="text-lg" />,
      rdp: <MdStorage className="text-lg" />,
      "2fa": <MdSecurity className="text-lg" />,
      tutorial: <MdSchool className="text-lg" />,
      attachment: <MdCloudUpload className="text-lg" />,
      leads: <MdEmail className="text-lg" />,
      smtp: <MdShare className="text-lg" />,
    };

    return icons[category.toLowerCase()] || <MdHome className="text-lg" />;
  };

  const getCategoryName = (category) => {
    const names = {
      financial: "Financial Services",
      developer: "Developer Tools",
      cookie: "Cookie Tools",
      bank: "Bank Services",
      video: "Deep Fake Video",
      malware: "Malware Tools",
      office: "Office Logs",
      sender: "Email Senders",
      resume: "Resume Tools",
      drainer: "Crypto Drainer",
      social: "Social Media",
      redirect: "Redirect Tools",
      extractor: "Extractor + Sorter",
      rdp: "RDP Services",
      "2fa": "2FA Bypass",
      tutorial: "Tutorials",
      attachment: "Offline Attachment",
      leads: "Leads",
      smtp: "SMTP Services",
    };

    return names[category.toLowerCase()] || category;
  };

  return (
    <AnimatePresence>
      <motion.aside
        initial={{ x: -300, opacity: 0 }}
        animate={{
          x: toggle ? 0 : -300,
          opacity: toggle ? 1 : 0,
          width: toggle ? "250px" : "100px",
        }}
        exit={{ x: -300, opacity: 0 }}
        transition={{ type: "spring", damping: 25 }}
        className={`fixed h-full top-[100px] left-0 z-[1000] border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900  overflow-y-auto max-h-[calc(100vh-58px)] ${
          toggle ? "flex" : "hidden"
        }`}
      >
        <div className="px-4 gap-2 flex flex-col h-full ">
          <motion.div
            whileHover={{ x: 5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              handleLinks("dash");
              resetClick();
            }}
            className="my-4"
          >
            <SidebarLink
              title="Dashboard"
              icon={<MdHome />}
              active={activeLink === "dash"}
            />
          </motion.div>

          <h3 className="text-xs uppercase font-semibold text-slate-500 dark:text-slate-400 mb-2 px-2">
            Categories
          </h3>

          <div className="flex flex-col gap-1 pb-20">
            {categories &&
              categories.map((category, index) => (
                <motion.div
                  key={index}
                  whileHover={{ x: 5 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => {
                    handleLinks(category);
                    resetClick();
                  }}
                >
                  <SidebarLink
                    title={getCategoryName(category)}
                    icon={getIconForCategory(category)}
                    active={activeLink === category}
                  />
                </motion.div>
              ))}
          </div>
        </div>
      </motion.aside>
    </AnimatePresence>
  );
};

const SidebarLink = ({ title, icon, active }) => {
  return (
    <div
      className={`flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors ${
        active
          ? "bg-red-50 text-red-600 dark:bg-red-900/20 dark:text-red-400"
          : "text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
      }`}
    >
      <span className={`${active ? "text-red-500" : "text-slate-500"}`}>
        {icon}
      </span>
      <span className="font-medium text-sm">{title}</span>
    </div>
  );
};

export default Sidebar;
