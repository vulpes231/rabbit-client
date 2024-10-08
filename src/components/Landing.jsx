import React, { useEffect } from "react";
import Navbar from "./Navbar";
import Hero from "./Hero";
import Products from "./Products";
import Section from "./Section";
import { getAccessToken } from "../constants";
import { useNavigate } from "react-router-dom";

const Landing = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      navigate("/dashboard");
    }
  }, [accessToken]);
  return (
    <Section>
      <Navbar />
      <Hero />
      <Products />
    </Section>
  );
};

export default Landing;
