import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import TabContainer from "./TabContainer";
import { useSelector } from "react-redux";
import { RiHomeOfficeLine } from "react-icons/ri";
import { TbBrandOffice } from "react-icons/tb";
import { PiSignpostLight } from "react-icons/pi";
import { FaChalkboardTeacher } from "react-icons/fa";

/* eslint-disable react/prop-types */
const Lecture = ({ name, price, desc, icon }) => {
  return (
    <div className="w-full bg-white dark:bg-slate-950 p-6 flex flex-col gap-6 dark:border border-slate-800 rounded-lg shadow-md">
      <span className="flex gap-3 items-center">
        <span className="text-xl md:text-3xl">{icon}</span>
        <h3 className="font-bold capitalize">{name}</h3>
      </span>

      <span className="text-xs font-light cursor-pointer underline">
        {desc}
      </span>
      <span>
        Fee:{" "}
        <span className="text-white font-bold text-lg md:text-xl p-2 rounded-xl">
          ${price}
        </span>
      </span>
      <button className="bg-red-500 text-white p-2">Order</button>
    </div>
  );
};

const Tutorial = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
  const { products } = useSelector((state) => state.products);

  const tutorials = products?.products?.filter(
    (prd) => prd.category.toLowerCase() === "tutorial"
  );

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken, navigate]);

  return (
    <TabContainer>
      <h3 className="text-xl lg:text-2xl font-semibold mt-5 capitalize px-2">
        Tutorials
      </h3>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {tutorials?.map((tut) => {
          const icon = tut.name.includes("0365") ? (
            <RiHomeOfficeLine />
          ) : tut.name.includes("employment") ? (
            <TbBrandOffice />
          ) : tut.name.includes("mentorship") ? (
            <FaChalkboardTeacher />
          ) : tut.name.includes("SMS") ? (
            <PiSignpostLight />
          ) : null;
          return (
            <Lecture
              icon={icon}
              key={tut._id}
              name={tut.name}
              price={tut.price}
              desc={tut.descriptions.map((tt, index) => {
                return (
                  <Link to={tt} key={index} target="_blank">
                    {tt}
                  </Link>
                );
              })}
            />
          );
        })}
      </div>
    </TabContainer>
  );
};

export default Tutorial;
