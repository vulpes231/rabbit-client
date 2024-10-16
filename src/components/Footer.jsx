import React from "react";
import { FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-6 items-center justify-center text-xs mt-10 py-10 bg-white dark:bg-black font-[Roboto]">
      <p className="text-center">
        Copyright &copy; 2024,{" "}
        <span className="text-red-500 uppercase font-semibold text-opacity-100">
          Rabbithole4ogs
        </span>
        , <br /> All Rights Reserved.
      </p>
      <span className="flex gap-6 items-center text-xl">
        <FaTelegram className="text-blue-400 text-2xl cursor-pointer" />
        <FaWhatsapp className="text-green-500 text-2xl cursor-pointer" />
        <FaPhone className="text-slate-400 text-2xl cursor-pointer" />
      </span>
    </footer>
  );
};

export default Footer;
