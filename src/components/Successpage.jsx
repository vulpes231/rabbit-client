import React from "react";
import { Link } from "react-router-dom";
import { logo } from "../assets";
import { FaInstagram, FaTelegram, FaWhatsapp } from "react-icons/fa";

const styles = {
  link: "underline bg-white hover:shadow-black dark:hover:shadow-slate-500 shadow-lg dark:bg-slate-900 px-4 py-2.5 w-full text-center",
};

const Successpage = () => {
  return (
    <div className="w-full h-screen dark:bg-black bg-slate-100 fixed top-0 left-0 flex items-center justify-center">
      <div className="bg-slate-50 dark:bg-slate-950 rounded-lg flex flex-col items-center justify-center h-[400px] shadow-xl w-full md:w-[450px] gap-6 ">
        <div className="flex items-center gap-2">
          <img src={logo} alt="" className="w-[30px]" />
          <h1 className="uppercase font-bold text-3xl">RH4OGs</h1>
        </div>
        <h4 className="text-green-500 uppercase font-bold my-3">
          Your order is processing.
        </h4>
        <div className="flex flex-col gap-3 items-center justify-center uppercase text-xs font-medium w-full px-6">
          <Link to={"/dashboard"} className={styles.link}>
            🌐 back to store 🌐
          </Link>
          <Link to={"/order"} className={styles.link}>
            🛍️ go to orders 🛍️
          </Link>
          <Link
            to={"https://t.me/Rabbithole4og_bot"}
            target="_blank"
            className={styles.link}
          >
            🤖 shop online in telegram bot 🤖
          </Link>
        </div>
        <div className="flex items-center gap-1 mt-4">
          <small>Contact us:</small>
          <FaTelegram className="md:text-2xl hover:text-blue-600" />
          <FaWhatsapp className="md:text-2xl hover:text-green-600" />
          <FaInstagram className="md:text-2xl hover:text-pink-600" />
        </div>
      </div>
    </div>
  );
};

export default Successpage;
