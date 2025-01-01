import React from "react";
import { RiSecurePaymentFill } from "react-icons/ri";
import { balloon } from "../assets";
import { motion } from "framer-motion";
// import Section from "./Section";
motion;

const Hero = () => {
  return (
    <section className="py-32 bg-black relative">
      <div className="container px-3 ">
        <div className="flex justify-center -mx-3 flex-col items-center">
          <h3 className="text-3xl leading-tight font-bold tracking-wider text-center inline-flex font-[Montserrat] text-gradient">
            Your one stop shop for <br />
            everything an OG needs
          </h3>
          <p className="font-extralight text-xs py-2">
            💜💜💜💜💜 c:/Bishop.&apos;
          </p>
          <p className="flex items-center gap-2 font-extralight p-4 rounded-2xl text-xl justify-between py-2 dark:bg-slate-800 dark:text-slate-200 text-slate-900 bg-white">
            <RiSecurePaymentFill />
            <small className="text-xs font-medium ">
              we don&apos;t keep logs
            </small>
          </p>
        </div>
      </div>
      <motion.div
        className="absolute right-0 flex flex-col items-center justify-center top-1/2 transform -translate-y-1/2 z-50"
        initial={{ opacity: 0, y: 50 }} // Start off-screen and invisible
        animate={{
          opacity: 1,
          y: -800,
        }}
        exit={{ opacity: 0, y: -700 }}
        transition={{
          duration: 15,
          ease: "easeOut",
        }}
      >
        <img src={balloon} alt="Balloon" className="w-[180px]" />
        <span className="text-center flex flex-col bg-red-600 p-6 rounded-md bg-opacity-80 font-[Montserrat]">
          <h1 className="text-3xl">Happy New Year OG&apos;s</h1>
          <small className="font-light ">
            Greetings from Rabbithole4Ogs✨🎉
          </small>
          <small className="font-light ">
            Cheers to another successful year ahead🥂
          </small>
        </span>
      </motion.div>
    </section>
  );
};

export default Hero;
