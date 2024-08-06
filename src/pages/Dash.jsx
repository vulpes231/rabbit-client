import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Sidebar } from "../components";
import { logoutUser } from "../features/logoutSlice";
import Footer from "../components/Footer";
import { getAccessToken } from "../utils/getDate";
import Dashcontent from "../components/Dashcontent";

import { getProducts } from "../features/dashSlice";
import LogoutModal from "../components/dash/LogoutModal";

const Dash = ({ handleLinks, activeLink, toggle, resetToggle }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();

  const { loading, error, success } = useSelector((state) => state.logout);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  useEffect(() => {
    if (accessToken) {
      dispatch(getProducts());
    }
  }, [accessToken, dispatch]);

  useEffect(() => {
    if (success) {
      // Clear cookies
      document.cookie.split(";").forEach((c) => {
        document.cookie = c
          .replace(/^ +/, "")
          .replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`);
      });
      localStorage.clear();
      sessionStorage.clear();
      window.location.reload();
    }
  }, [success]);

  useEffect(() => {
    document.title = "RH4OGS - Client area";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  return (
    <section
      className="relative p-6 py-20 sm:py-7 font-[Montserrat]"
      style={{ scrollMarginTop: "var(--topbar-height, 69px)" }}
    >
      <div className="flex overflow-hidden min-h-screen">
        <Sidebar
          toggle={toggle}
          handleLinks={handleLinks}
          activeLink={activeLink}
          resetClick={resetToggle}
          handleLogout={handleLogout}
        />

        <>
          <Dashcontent
            toggle={toggle}
            activeLink={activeLink}
            handleLinks={handleLinks}
          />
        </>
        {loading && <LogoutModal />}
      </div>
      <Footer />
    </section>
  );
};

export default Dash;
