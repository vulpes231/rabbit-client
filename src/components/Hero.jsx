import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";

const Hero = () => {
  return (
    <section className="text-white bg-black flex flex-col items-center justify-center p-6">
      <div className="flex flex-col items-center justify-center text-center gap-8">
        <h3 className="text-3xl capitalize leading-10 font-bold">
          Your one stop shop for everything an OG needs.
        </h3>
        <p>💜💜💜💜💜 c:/Bishop.</p>
        <p className="flex items-center justify-center">
          <RiSecurePaymentFill /> we don't keep logs
        </p>
      </div>
    </section>
  );
};

export default Hero;
