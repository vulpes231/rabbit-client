import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
// import Section from "./Section";

const Hero = () => {
  return (
    <section className="py-32 bg-black">
      <div className="container px-3 ">
        <div className="flex justify-center -mx-3 flex-col items-center">
          <h3 className="text-3xl leading-tight font-bold tracking-wider text-center inline-flex font-[Montserrat] text-gradient">
            Your one stop shop for <br />
            everything an OG needs
          </h3>
          <p className="font-extralight text-xs py-2">💜💜💜💜💜 c:/Bishop.</p>
          <p className="flex items-center gap-2 font-extralight p-4 rounded-2xl text-xl justify-between py-2 dark:bg-slate-800 dark:text-slate-200 text-slate-900 bg-white">
            <RiSecurePaymentFill />
            <small className="text-xs font-medium ">
              we don&apos;t keep logs
            </small>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
