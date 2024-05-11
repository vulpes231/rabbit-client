import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { construct } from "../assets";
import Construction from "../components/Construction";

const Faq = () => {
  const { accessToken } = useSelector((state) => state.signin);
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/signin");
  //   }
  // }, [accessToken]);
  return (
    <section className="min-h-screen w-full bg-slate-700 bg-opacity-30 rounded-xl">
      <div>
        <span>
          <h3 className="uppercase font-semibold text-xl text-center pt-10">
            FAQs
          </h3>
        </span>
        <Construction />
      </div>
    </section>
  );
};

export default Faq;
