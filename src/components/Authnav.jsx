import React, { useState } from "react";
import { Md123, MdClose, MdMenu, MdNotifications } from "react-icons/md";
import { loggedLinks } from "../constants";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { MdHome, MdComputer } from "react-icons/md";

import { FaBusinessTime } from "react-icons/fa6";
import { FaTools } from "react-icons/fa";

const Authnav = () => {
  const [toggle, setToggle] = useState(false);
  const [activeLink, setActiveLink] = useState("");

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
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
    <header className="w-full font-bold bg-black flex flex-col gap-6">
      <nav className="flex">
        <div className="flex justify-between w-full items-center mb-10">
          <span className="lg:hidden text-2xl" onClick={handleToggle}>
            {!toggle ? <MdMenu /> : <MdClose />}
          </span>
          <span>
            <h3 className="text-2xl">RH4OGS</h3>
          </span>
          <span className="flex gap-6">
            <MdNotifications />
            <FaUser />
          </span>
        </div>
      </nav>
      <div className="flex flex-wrap gap-6 justify-center mb-10">
        {authLinks}
      </div>
    </header>
  );
};

export default Authnav;
