import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import Footer from "../components/Footer";
import { getAccessToken } from "../constants";
import Dashcontent from "../components/Dashcontent";
import { getProducts } from "../features/dashSlice";

/* eslint-disable react/prop-types */
const Dash = ({ activeLink }) => {
  const dispatch = useDispatch();

  const accessToken = getAccessToken();

  useEffect(() => {
    if (accessToken) {
      dispatch(getProducts());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    document.title = "RH4OGS - Client area";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  return (
    <section className={` bg-slate-200 dark:bg-slate-800 `}>
      <Dashcontent activeLink={activeLink} />

      <Footer />
    </section>
  );
};

export default Dash;
