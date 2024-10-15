import { motion } from "framer-motion";
import React from "react";
import { Link } from "react-router-dom";

const Product = ({
  icon,
  title,
  content,
  price,
  features,
  info,
  requirements,
}) => {
  return (
    <div className="border border-slate-700 p-6 rounded-lg shadow-lg flex flex-col gap-4 cursor-pointer transition-transform transform hover:scale-105 justify-between">
      {/* <span className="text-5xl text-red-500">{icon}</span> */}
      <article className="flex flex-col gap-4">
        <h3 className="text-md font-bold text-slate-200 uppercase font-[Roboto]">
          {title}
        </h3>
        <small className="text-xs text-slate-400 lowercase">{content}</small>
        <div className="flex text-slate-400 lowercase text-xs">{price}</div>
        <div className="flex flex-col">
          <span className="font-medium capitalize mb-1">Features</span>
          <ul className="list-disc pl-5 text-xs text-slate-400">{features}</ul>
        </div>
        <div className="flex flex-col">
          {/* <span className="font-bold text-blue-600 uppercase mb-1">Info</span> */}
          <p className="text-xs text-gray-600">{info}</p>
        </div>
        {/* <div className="flex flex-col">
          <span className="font-bold text-yellow-600 uppercase mb-1">
            Requirements
          </span>
          <div className="text-xs text-gray-600">{requirements}</div>
        </div> */}
      </article>

      <Link
        to={"/signin"}
        className="flex justify-center items-center font-medium text-sm px-5 py-2 gap-3 w-full rounded-md bg-slate-400 text-white hover:bg-slate-500"
      >
        Purchase
      </Link>
    </div>
  );
};

export default Product;
