import React, { useState } from "react";
import { logo } from "../assets";
import { Md123, MdClose, MdMenu } from "react-icons/md";
import { loggedLinks } from "../constants";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdHome, MdComputer, MdSettings } from "react-icons/md";
import User from "./User";
import IconLink from "./IconLink";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";
import { FaBusinessTime } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

const Authnav = () => {
  const [toggle, setToggle] = useState(false);
  const [dropDown, setdropDown] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const showDropdown = () => {
    setdropDown((prev) => !prev);
  };

  const authLinks = loggedLinks.map((link) => {
    return (
      <Link
        key={link.id}
        className="flex gap-3 items-center hover:text-red-500"
      >
        {link.title.includes("Dash") ? (
          <MdHome />
        ) : link.title.includes("RDPs") ? (
          <MdComputer />
        ) : link.title.includes("Products") ? (
          <FaTools />
        ) : link.title.includes("Services") ? (
          <FaBusinessTime />
        ) : link.title.includes("Accounts") ? (
          <Md123 />
        ) : null}
        {link.title}
      </Link>
    );
  });

  return (
    <header className="w-full font-bold ">
      <nav className="flex justify-between items-center">
        <span>
          <img
            src={logo}
            alt=""
            className="w-[30px] rounded-full cursor-pointer"
          />
        </span>
        <div
          className={
            toggle
              ? "absolute top-0 left-0 px-5 z-10 bg-[#fff] bg-opacity-95 w-[60%] h-screen text-[#333] lg:hidden"
              : "hidden lg:flex"
          }
        >
          <h3 className="lg:hidden uppercase font-bold text-lg pt-5 flex items-center gap-2">
            <img src={logo} alt="" className="w-[20px]" /> rabbithole4ogs
          </h3>
          <div className="flex flex-col gap-6 mt-16 lg:flex-row lg:mt-0">
            {authLinks}
          </div>
          <div className="flex flex-col gap-6 mt-6 lg:hidden">
            <IconLink icon={<MdSettings />} title={"Profile"} />
            <IconLink icon={<RiCustomerServiceFill />} title={"Tickets"} />
            <IconLink icon={<MdLogout />} title={"Logout"} />
          </div>
        </div>
        <span className="lg:hidden text-2xl" onClick={handleToggle}>
          {!toggle ? <MdMenu /> : <MdClose />}
        </span>
        <span
          className="hidden lg:flex cursor-pointer hover:text-red-500"
          onClick={showDropdown}
        >
          <FaUser />
          <User dropDown={dropDown} />
        </span>
      </nav>
    </header>
  );
};

export default Authnav;
