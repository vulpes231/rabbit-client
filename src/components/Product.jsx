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
    <div className="border-2 border-white p-4 rounded-lg flex flex-col gap-4 h-[400px] overflow-scroll cursor-pointer ">
      <span className="text-4xl text-white bg-red-500 w-[30px] h-[30px]">
        <span>{icon}</span>
      </span>
      <article className="flex flex-col gap-6">
        <h3 className={`uppercase font-bold text-cyan-500 text-lg`}>{title}</h3>
        <p className="flex flex-col gap-4">{content}</p>
        <p className="flex flex-col gap-2 text-white capitalize font-bold">
          <span className="bg-green-500 bg-opacity-20 p-2 w-[100px] text-center rounded-2xl  text-xs font-bold uppercase">
            price
          </span>
          {price}
        </p>
        <ul className="flex flex-col gap-2 capitalize">
          <span className="bg-red-500 bg-opacity-20 p-2 w-[100px] text-center rounded-2xl text-white text-xs font-bold uppercase">
            features
          </span>
          {features}
        </ul>
        <div className="flex flex-col gap-2  text-[#fff] text-xs  font-thin leading-8">
          {" "}
          <span className="bg-blue-500 bg-opacity-20 p-2 w-[100px] text-center rounded-2xl text-white text-xs font-bold uppercase">
            info
          </span>
          {info}
        </div>
        <div className="flex flex-col gap-2 capitalize">
          {" "}
          <span className="bg-yellow-500 bg-opacity-20 p-2 w-[120px] text-center rounded-2xl text-white text-xs font-bold uppercase">
            requirements
          </span>
          {requirements}
        </div>
      </article>

      <motion.button
        initial={{ backgroundColor: "lightskyeblue" }}
        className="bg-red-500 text-[#fff] p-2 rounded-lg font-semibold"
      >
        Buy now
      </motion.button>
    </div>
  );
};

export default Product;
