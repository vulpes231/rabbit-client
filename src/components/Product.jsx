import { motion } from "framer-motion";
import React from "react";

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
    <div className="border-2 border-white p-4 rounded-lg flex flex-col gap-4 h-[400px] overflow-scroll cursor-pointer text-xs ">
      <span className="text-4xl  bg-red-500 w-[30px] h-[30px]">
        <span>{icon}</span>
      </span>
      <article className="flex flex-col gap-6">
        <h3 className={`uppercase text-red-500  font-medium`}>{title}</h3>
        <p className="flex flex-col gap-4 font-normal">{content}</p>
        <p className="flex flex-col gap-2 capitalize font-bold">
          <span className="bg-green-500 bg-opacity-20 p-2 w-[100px] text-center rounded-2xl font-bold uppercase">
            price
          </span>
          {price}
        </p>
        <div className="flex flex-col gap-2 font-normal">
          <span className="bg-red-500 bg-opacity-20 p-2 w-[100px] text-center rounded-2xl font-bold uppercase">
            features
          </span>
          {features}
        </div>
        <div className="flex flex-col gap-2 font-thin leading-5">
          <span className="bg-blue-500 bg-opacity-20 p-2 w-[100px] text-center rounded-2xl font-bold uppercase">
            info
          </span>
          {info}
        </div>
        <div className="flex flex-col gap-2">
          {" "}
          <span className="bg-yellow-500 bg-opacity-20 p-2 w-[120px] text-center rounded-2xl  font-bold uppercase">
            requirements
          </span>
          {requirements}
        </div>
      </article>

      <motion.button
        initial={{ backgroundColor: "lightskyeblue" }}
        className="inline-flex justify-center items-center font-medium transition-all text-sm px-5 py-2 gap-3 w-full rounded-md bg-red-600 text-white hover:bg-red-800"
      >
        Buy now
      </motion.button>
    </div>
  );
};

export default Product;
