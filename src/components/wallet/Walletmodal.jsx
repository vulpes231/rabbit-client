import React from "react";

const Walletmodal = ({ icon, title }) => {
  return (
    <div className="w-full h-screen fixed flex items-center justify-center top-0 left-0 bg-white bg-opacity-50">
      <div className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 w-full lg:w-[370px] lg:mx-auto shadow rounded-xl p-6 m-4 lg:ml-10 flex flex-col gap-4 text-xl font-bold text-green-500">
        <span>{icon}</span>
        <small>{title}</small>
      </div>
    </div>
  );
};

export default Walletmodal;
