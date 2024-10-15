// import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Product = ({ icon, title, content }) => {
  return (
    <div className="border border-slate-700 p-6 rounded-lg shadow-lg flex flex-col gap-4 cursor-pointer transition-transform transform hover:scale-105 justify-between bg-slate-950">
      <article className="flex flex-col gap-4">
        <span className="flex items-center gap-2">
          <span className="text-4xl p-3">{icon}</span>
          <h3 className="text-md font-bold text-slate-200 uppercase font-[Roboto]">
            {title}
          </h3>
        </span>
        <ul className="text-xs text-slate-400 list-disc flex flex-col gap-2">
          {content}
        </ul>
      </article>

      <Link
        to={"/signin"}
        className="flex justify-center items-center font-medium text-sm px-5 py-2 gap-3 w-full rounded-md bg-red-600 text-white hover:bg-red-700"
      >
        Purchase
      </Link>
    </div>
  );
};

export default Product;
