import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Section from "./Section";
import { getAccessToken } from "../constants";
import { useNavigate } from "react-router-dom";
import Footer from "./Footer";

const Landing = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken]);
  return (
    <section>
      <Navbar />
      <Hero />
      <Products />
      <Footer />
    </section>
  );
};

export default Landing;
