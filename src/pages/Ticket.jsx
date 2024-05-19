import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Content from "../components/ticket/Content";
import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

const Ticket = () => {
  const { accessToken } = useSelector((state) => state.signin);
  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <section className="min-h-screen w-full  bg-slate-700 bg-opacity-30 rounded-xl p-6">
      <div>
        <span>
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            tickets
          </h3>
        </span>
        <Content />
      </div>
    </section>
  );
};

export default Ticket;
