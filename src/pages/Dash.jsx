import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dash = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.signin);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <section className="bg-[#333] text-white font-bold h-screen w-full flex items-center justify-center p-6 text-center">
      This page is under contruction. <br /> Please check back later.
    </section>
  );
};

export default Dash;
