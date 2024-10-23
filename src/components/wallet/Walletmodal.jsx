import React from "react";

/* eslint-disable react/prop-types */
const Walletmodal = ({ icon, title }) => {
  return (
    <div className="flex flex-col rounded-xl bg-white dark:bg-slate-950 p-6 gap-4 absolute top-[150px] md:top-[100px] right-10 md:right-5 w-[250px] items-center justify-center text-green-500">
      <span>{icon}</span>
      <h3 className="font-bold">{title}</h3>
    </div>
  );
};

export default Walletmodal;
