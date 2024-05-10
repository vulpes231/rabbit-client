import React from "react";
import { FaPhone, FaTelegram, FaWhatsapp } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="flex flex-col gap-6 items-center justify-center opacity-50 text-xs">
      <p className="text-center">
        Copyright &copy; 2024,{" "}
        <span className="text-red-500 uppercase font-semibold text-opacity-100">
          Rabbithole4ogs
        </span>
        , <br /> All Rights Reserved.
      </p>
      <span className="flex gap-6 items-center text-xl">
        <FaTelegram />
        <FaWhatsapp />
        <FaPhone />
      </span>
    </footer>
  );
};

export default Footer;
