import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";

const Landing = () => {
  return (
    <section className="min-h-screen w-full bg-[#333]">
      <Navbar />
      <Hero />
    </section>
  );
};

export default Landing;
