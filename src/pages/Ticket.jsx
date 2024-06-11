import React, { useEffect } from "react";
import Content from "../components/ticket/Content";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";

const Ticket = () => {
  const navigate = useNavigate();
  const accessToken = getAccessToken();
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
