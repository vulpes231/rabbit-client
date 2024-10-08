import React, { useEffect, useState } from "react";
import { profile } from "../assets";
import { Link, useNavigate } from "react-router-dom";
import { BiPurchaseTagAlt } from "react-icons/bi";
import { BsGear, BsTicket } from "react-icons/bs";
import { MdLogout } from "react-icons/md";
import { useDispatch } from "react-redux";

const Usermenu = ({ handleLogout }) => {
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
        <li className="flex items-center gap-3 text-xs">
          <BiPurchaseTagAlt />
          <Link to={"/order"}>orders</Link>
        </li>
        <li className="flex items-center gap-3 text-xs">
          <BsTicket />
          <Link to={"/tickets"}>tickets</Link>
        </li>
        <li className="flex items-center gap-3 text-xs">
          <BsGear />
          <Link to={"/settings"}>settings</Link>
        </li>
        <li className="flex items-center gap-3 text-xs cursor-pointer">
          <MdLogout />
          <span onClick={handleLogout}>{"logout"}</span>
        </li>
      </ul>
    </div>
  );
};

export default Usermenu;
