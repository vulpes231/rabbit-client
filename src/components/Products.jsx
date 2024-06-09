import React from "react";
import Product from "./Product";
import { FaUsersCog } from "react-icons/fa";
import { products } from "../constants";
import Section from "./Section";

const Products = () => {
  const myProducts = products.map((prod) => {
    return (
      <Product
        key={prod.id}
        title={prod.title}
        content={prod.availability.map((av, index) => {
          return (
            <span
              className="  font-semibold text-sm uppercase ml-2"
              key={index}
            >
              {av}
            </span>
          );
        })}
        price={prod.price}
        features={prod.features.map((ft, index) => {
          return (
            <li key={index} className=" text-xs uppercase font-thin ml-2">
              {ft || "None."}
            </li>
          );
        })}
        info={prod.info || "None."}
        requirements={prod.requirements.map((rq, index) => {
          return (
            <p key={index} className=" text-xs uppercase font-thin ml-2">
              {rq || "None."}
            </p>
          );
        })}
      />
    );
  });
  return (
    <Section>
      <div className="container px-3 font-[Montserrat]">
        <h3 className="text-xl lg:text-2xl font-black text-center uppercase my-10">
          Products
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {myProducts}
        </div>
      </div>
    </Section>
  );
};

export default Products;
