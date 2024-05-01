import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Products from "./Products";

const Landing = () => {
  return (
    <section className="min-h-screen w-full bg-[#333]">
      <Navbar />
      <Hero />
      <Products />
    </section>
  );
};

export default Landing;
