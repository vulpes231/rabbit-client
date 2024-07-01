import React, { useState } from "react";
import { profile } from "../assets";
import { Link } from "react-router-dom";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BsGear, BsTicket } from "react-icons/bs";
import { MdLogout } from "react-icons/md";

const Usermenu = ({ handleLinks }) => {
  const [menu, setShowMenu] = useState(false);

  const showMenu = () => {
    setShowMenu((prev) => !prev);
  };

  const resetMenu = () => {
    setShowMenu(false);
  };

  return (
    <div>
      <figure
        onClick={showMenu}
        className="hover:border rounded-full p-0.3 border-red-500 cursor-pointer"
      >
        <img src={profile} alt="" className="w-[28px]" />
      </figure>
      <ul
        className={
          menu
            ? "fixed top-[50px] right-[50px] bg-white dark:bg-slate-950 dark:text-slate-200 p-6 rounded-md  capitalize text-sm font-medium flex flex-col gap-3 shadow"
            : "hidden"
        }
      >
        <li
          onClick={() => {
            handleLinks("order");
            resetMenu();
          }}
          className="flex items-center gap-3 text-xs"
        >
          <BiPurchaseTagAlt />
          <Link>orders</Link>
        </li>
        <li className="flex items-center gap-3 text-xs">
          <BsTicket />
          <Link>tickets</Link>
        </li>
        <li className="flex items-center gap-3 text-xs">
          <BsGear />
          <Link>settings</Link>
        </li>
        <li className="flex items-center gap-3 text-xs">
          <MdLogout />
          <Link>logout</Link>
        </li>
      </ul>
    </div>
  );
};

export default Usermenu;
