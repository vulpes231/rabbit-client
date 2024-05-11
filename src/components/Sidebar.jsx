import React from "react";
import Sidelink from "./Sidelink";
import { MdHomeMini } from "react-icons/md";
import {
  FaExchangeAlt,
  FaHome,
  FaMoneyBill,
  FaRibbon,
  FaServer,
  FaToolbox,
  FaTools,
} from "react-icons/fa";
import { sidebarLinks } from "../constants";
import { FaGear } from "react-icons/fa6";

const Sidebar = ({ toggle, handleLinks, activeLink }) => {
  const sidebarMenus = sidebarLinks.map((link) => {
    return (
      <span
        key={link.id}
        className={
          activeLink === link.id ? " font-thin pb-2" : " font-thin pb-2"
        }
        onClick={() => handleLinks(link.id)}
      >
        {link.id.includes("dash") ? (
          <Sidelink icon={<FaHome />} title={link.title} />
        ) : link.title.includes("Services") ? (
          <Sidelink icon={<FaExchangeAlt />} title={link.title} />
        ) : link.title.includes("Tools") ? (
          <Sidelink icon={<FaTools />} title={link.title} />
        ) : link.title.includes("RDPs") ? (
          <Sidelink icon={<FaServer />} title={link.title} />
        ) : link.title.includes("Transactions") ? (
          <Sidelink icon={<FaMoneyBill />} title={link.title} />
        ) : link.title.includes("Settings") ? (
          <Sidelink icon={<FaGear />} title={link.title} />
        ) : link.title.includes("Referral") ? (
          <Sidelink icon={<FaRibbon />} title={link.title} />
        ) : null}
      </span>
    );
  });
  return (
    <aside>
      <h3 className="lg:pl-6 text-2xl caveat-regular capitalize text-red-500 font-bold">
        rh4ogs
      </h3>
      <div className="mt-20 p-4 flex flex-col gap-4">{sidebarMenus}</div>
    </aside>
  );
};

export default Sidebar;
