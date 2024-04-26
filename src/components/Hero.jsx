import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="text-[#fff] bg-black flex flex-col items-center justify-center p-6 h-screen md:h-auto">
      <div className="flex flex-col items-center justify-center text-center gap-8">
        <h3 className="text-3xl leading-loose font-bold tracking-wider">
          Your One Stop <br /> Shop for Everything <br /> an OG needs.
        </h3>
        <p className="font-extralight text-xs">💜💜💜💜💜 c:/Bishop.</p>
        <p className="flex items-center gap-2 font-extralight bg-[#101010] p-4 rounded-2xl text-xl justify-between">
          <RiSecurePaymentFill />
          <small className="text-xs">we don't keep logs</small>
        </p>
      </div>
    </section>
  );
};

export default Hero;
