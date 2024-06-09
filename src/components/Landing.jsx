import React from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Section from "./Section";

const Landing = () => {
  return (
    <Section>
      <Navbar />
      <Hero />
      <Products />
    </Section>
  );
};

export default Landing;
