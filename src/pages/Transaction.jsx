import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import Construction from "../components/Construction";

const Transaction = () => {
  const { accessToken } = useSelector((state) => state.signin);
  // useEffect(() => {
  //   if (!accessToken) {
  //     navigate("/signin");
  //   }
  // }, [accessToken]);
  return (
    <section className="min-h-screen w-full bg-slate-700 bg-opacity-30 rounded-xl p-6">
      <div>
        <span>
          <h3 className="uppercase font-semibold text-xl  text-center pt-10">
            Transactions
          </h3>
        </span>
        <Construction />
      </div>
    </section>
  );
};

export default Transaction;
