import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Sidebar } from "../components";
import Footer from "../components/Footer";
import { getAccessToken } from "../constants";
import Dashcontent from "../components/Dashcontent";
import { getProducts } from "../features/dashSlice";

/* eslint-disable react/prop-types */
const Dash = ({
  handleLinks,
  activeLink,
  toggle,
  resetToggle,
  handleLogout,
}) => {
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
    <section
      className={
        toggle
          ? "md:ml-[40%] flex-grow flex-col gap-8 font-[Montserrat] px-2"
          : "ml-0 lg:ml-[250px] flex-grow flex-col gap-8 font-[Montserrat] px-2"
      }
    >
      <div className="flex min-h-screen overflow-auto">
        <Sidebar
          toggle={toggle}
          handleLinks={handleLinks}
          activeLink={activeLink}
          resetClick={resetToggle}
          handleLogout={handleLogout}
        />

        <>
          <Dashcontent activeLink={activeLink} />
        </>
      </div>
      <Footer />
    </section>
  );
};

export default Dash;
