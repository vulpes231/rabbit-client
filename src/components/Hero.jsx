import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import Section from "./Section";

const Hero = () => {
  return (
    <Section>
      <div className="container px-3">
        <div className="flex justify-center -mx-3 flex-col items-center">
          <h3 className="text-3xl leading-tight font-bold tracking-wider text-center inline-flex font-[Montserrat] text-gradient">
            Your one stop shop for <br />
            everything an OG needs
          </h3>
          <p className="font-extralight text-xs py-2">💜💜💜💜💜 c:/Bishop.</p>
          <p className="flex items-center gap-2 font-extralight p-4 rounded-2xl text-xl justify-between py-2 bg-slate-900 text-slate-200 dark:text-slate-900 dark:bg-slate-200">
            <RiSecurePaymentFill />
            <small className="text-xs font-medium ">we don't keep logs</small>
          </p>
        </div>
      </div>
    </Section>
  );
};

export default Hero;
