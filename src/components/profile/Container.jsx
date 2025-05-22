import React from "react";

const Container = ({ children, icon, title }) => {
  return (
    <div className="flex flex-col gap-4 dark:border-slate-800 bg-white text-[#333] dark:text-[#fff] dark:bg-slate-900 rounded-xl w-full p-6 shadow-xl">
      <span className="flex items-center gap-1">
        {icon}
        <h3 className="text-lg lg:text-lg capitalize">{title}</h3>
      </span>
      {children}
    </div>
  );
};

export default Container;
