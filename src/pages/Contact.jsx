import React from "react";
import { goku, naegi, kudo } from "../assets";
import Footer from "../components/Footer";

/* eslint-disable react/prop-types */
const Teambox = ({ img, name, role }) => {
  return (
    <div className="bg-white dark:bg-slate-950 p-6 flex items-center justify-center flex-col w-full md:w-[250px] gap-3 dark:border dark:border-slate-800">
      <figure className="w-[100px] h-[100px] rounded-full">
        <img
          src={img}
          alt=""
          className="bg-contain block w-full h-full rounded-full"
        />
      </figure>

      <div className="text-center">
        <h3 className="font-bold">{name}</h3>
        <small className="text-xs font-light">{role}</small>
      </div>
    </div>
  );
};

const Contact = () => {
  return (
    <section className="font-[Montserrat]">
      <div className="w-full  min-h-screen lg:max-w-[1000px] mx-auto mt-28 sm:mt-16 lg:mt-0 flex flex-col gap-6 items-center pt-10 md:pt-20">
        <h3 className="uppercase font-bold text-3xl text-center py-5">
          Our Team
        </h3>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
          <Teambox name={"Bishop"} role={"Owner"} img={goku} />
          <Teambox name={"Tedbanks"} role={"Admin(Finance)"} img={naegi} />
          <Teambox
            name={"Vulpescode"}
            role={"Admin(Software Dev)"}
            img={kudo}
          />
        </div>
      </div>
      <Footer />
    </section>
  );
};

export default Contact;
