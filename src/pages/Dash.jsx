import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Authnav } from "../components";
import Statistic from "../components/Statistic";
import { FaPlus } from "react-icons/fa";

const Dash = () => {
  const navigate = useNavigate();
  const { accessToken } = useSelector((state) => state.signin);

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  return (
    <section className="bg-[#333] text-white h-screen w-full p-6">
      <div className="flex flex-col lg:max-w-[1000px] mx-auto">
        <Authnav />
        <div className="flex flex-col gap-4 mt-10 lg:flex-row lg:max-w-[900px] lg:mx-auto">
          <article className="flex flex-col gap-4 border-2 border-[#fff] border-t-red-500 border-l-red-500 border-r-green-500 border-b-green-500 p-4 rounded-xl w-full">
            <h3 className="text-xl font-bold">Welcome User</h3>
            <p className="text-sm font-light leading-7 lg:text-md lg:font-extralight">
              If you have any question, suggestion, complaint or request feel
              free to open a ticket
            </p>
            <span className="bg-slate-50 text-[#333] p-2 cursor-pointer rounded-md font-semibold flex items-center w-[150px] justify-center gap-2 hover:text-red-500">
              <FaPlus /> New Ticket
            </span>
          </article>
          <article className="flex flex-col gap-3 border-2 border-[#fff] p-4 rounded-xl w-full lg:justify-center border-b-red-500 border-r-red-500 border-l-green-500 border-t-green-500">
            <Statistic detail={"Balance"} value={"0.00"} title={"Add funds"} />
            <Statistic detail={"Tickets"} value={"0"} title={"View"} />
            <Statistic detail={"Orders"} value={"0"} title={"View"} />
          </article>
          <article className="flex flex-col gap-4 border-2 border-[#fff] p-4 rounded-xl w-full lg:justify-center lg:text-md lg:font-extralight border-t-red-500 border-l-red-500 border-r-green-500 border-b-green-500">
            <p>Available payment methods</p>
            <p>coming soon...</p>
          </article>
        </div>
      </div>
    </section>
  );
};

export default Dash;
