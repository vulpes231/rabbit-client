import React from "react";
import Product from "./Product";
import { FaUsersCog } from "react-icons/fa";
import { products } from "../constants";

const Products = () => {
  const myProducts = products.map((prod) => {
    return (
      <Product
        key={prod.id}
        title={prod.title}
        content={prod.availability.map((av, index) => {
          return (
            <span
              className=" text-white font-semibold text-sm uppercase ml-2"
              key={index}
            >
              {av}
            </span>
          );
        })}
        price={prod.price}
        features={prod.features.map((ft, index) => {
          return (
            <li
              key={index}
              className="text-[#fff] text-xs uppercase font-thin ml-2"
            >
              {ft || "None."}
            </li>
          );
        })}
        info={prod.info || "None."}
        requirements={prod.requirements.map((rq, index) => {
          return (
            <p
              key={index}
              className="text-[#fff] text-xs uppercase font-thin ml-2"
            >
              {rq || "None."}
            </p>
          );
        })}
      />
    );
  });
  return (
    <section className="bg-[#333]">
      <div className="lg:max-w-[1100px] lg:mx-auto p-6 flex flex-col gap-10">
        <h3 className="text-xl lg:text-2xl font-black text-center uppercase text-[#fff] my-20">
          Products
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts}
        </div>
      </div>
    </section>
  );
};

export default Products;
