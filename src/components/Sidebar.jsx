import React from "react";
import Sidelink from "./Sidelink";

import { FaCookie, FaHome, FaRibbon, FaServer, FaTools } from "react-icons/fa";
import { sidebarLinks } from "../constants";
import { FaCoins, FaGear, FaGears } from "react-icons/fa6";
import Logout from "./Logout";
import { MdAccountBox, MdArchive, MdMail, MdSend } from "react-icons/md";

const Sidebar = ({
  toggle,
  handleLinks,
  activeLink,
  resetClick,
  handleLogout,
}) => {
  const sidebarMenus = sidebarLinks.map((link) => {
    return (
      <span
        key={link.id}
        className={
          activeLink === link.id
            ? " font-thin pb-2  text-red-500"
            : " font-thin pb-2"
        }
        onClick={() => {
          handleLinks(link.id);
          resetClick();
        }}
      >
        {link.id.includes("dash") ? (
          <Sidelink icon={<FaHome />} title={link.title} />
        ) : link.id.includes("resume") ? (
          <Sidelink icon={<MdArchive />} title={link.title} />
        ) : link.id.includes("link") ? (
          <Sidelink icon={<FaTools />} title={link.title} />
        ) : link.id.includes("rdp") ? (
          <Sidelink icon={<FaServer />} title={link.title} />
        ) : link.id.includes("log") ? (
          <Sidelink icon={<MdMail />} title={link.title} />
        ) : link.id.includes("sender") ? (
          <Sidelink icon={<MdSend />} title={link.title} />
        ) : link.id.includes("account") ? (
          <Sidelink icon={<MdAccountBox />} title={link.title} />
        ) : link.id.includes("rat") ? (
          <Sidelink icon={<FaGears />} title={link.title} />
        ) : link.id.includes("web3") ? (
          <Sidelink icon={<FaCoins />} title={link.title} />
        ) : link.id.includes("cookie") ? (
          <Sidelink icon={<FaCookie />} title={link.title} />
        ) : link.id.includes("service") ? (
          <Sidelink icon={<FaRibbon />} title={link.title} />
        ) : null}
      </span>
    );
  });

  return (
    <aside
      className={
        toggle
          ? "fixed h-full w-[60%] md:w-[40%] top-[130px] left-0 z-30 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-5"
          : "hidden lg:flex fixed h-full w-[250px] top-[58px] left-0 z-30 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 pt-5"
      }
    >
      <div className="p-4 flex flex-col gap-4 h-full">
        {sidebarMenus}
        <Logout resetClick={resetClick} handleLogout={handleLogout} />
      </div>
    </aside>
  );
};

export default Sidebar;
