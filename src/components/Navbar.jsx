import React, { useState } from "react";
import { logo } from "../assets";
import { Link } from "react-router-dom";
import { MdClose, MdHome, MdMenu, MdNote, MdPhone } from "react-icons/md";
import { GrChannel } from "react-icons/gr";
import { FaInstagram, FaTelegram, FaTwitter } from "react-icons/fa";
import { navLinks } from "../constants";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("");
  const [toggle, setToggle] = useState(false);

  const handleLinks = (linkId) => {
    setActiveLink(linkId);
  };

  const handleToggle = () => {
    setToggle((prev) => !prev);
  };

  const links = navLinks.map((link) => (
    <Link
      onClick={() => handleLinks(link.id)}
      key={link.id}
      className={
        activeLink === link.id
          ? "flex items-center gap-2 text-lg border-b-2 border-red-500 uppercase"
          : "flex items-center gap-2 text-lg uppercase"
      }
    >
      {link.title.includes("Home") ? (
        <MdHome />
      ) : link.title.includes("FAQs") ? (
        <MdNote />
      ) : link.title.includes("Channels") ? (
        <GrChannel />
      ) : link.title.includes("Contact") ? (
        <MdPhone />
      ) : null}
      {link.title}
    </Link>
  ));

  return (
    <header className="p-6 bg-black text-white h-[90px]">
      <nav className="flex items-center justify-between w-full lg:max-w-[1200px] mx-auto">
        <span className="flex gap-16 items-center">
          <img src={logo} alt="" className="w-[30px]" />
          <span className="hidden lg:flex gap-8">{links}</span>
        </span>

        <span className="uppercase  flex items-center gap-6">
          <Link
            className="uppercase border-2 border-red-500 py-2 px-5 rounded-lg hover:bg-red-500 hover:text-white lg:font-bold"
            to={"/signin"}
          >
            sign in
          </Link>
          <Link
            className="uppercase border-2 border-red-500 bg-red-500 py-2 px-6 rounded-lg hover:bg-white hover:border-white hover:text-red-500 lg:font-bold"
            to={"/signup"}
          >
            sign up
          </Link>
          <span
            onClick={handleToggle}
            className="cursor-pointer text-2xl lg:hidden "
          >
            {!toggle ? <MdMenu /> : <MdClose />}
          </span>
        </span>

        <div
          className={
            toggle
              ? "fixed top-[90px] right-0 w-[80%] md:w-[50%] bg-[#101010] h-screen p-6 flex flex-col gap-10 text-xl font-black pl-10 md:pl-20 pt-20 "
              : "hidden"
          }
        >
          <div className="flex flex-col gap-10">
            {navLinks.map((lnk) => {
              return <Link key={lnk.id}>{lnk.title}</Link>;
            })}
          </div>
          <span className="hidden md:flex gap-10 mt-[500px]">
            <FaInstagram />
            <FaTwitter />
            <FaTelegram />
          </span>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
