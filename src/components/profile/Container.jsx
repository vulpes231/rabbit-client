import React from "react";

const Container = ({ children, icon, title }) => {
  return (
    <div className="flex flex-col gap-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 rounded-md w-full xs:w-1/2 lg:w-1/4 p-4">
      <span className="flex items-center gap-1">
        {icon}
        <h3 className="text-xl lg:text-lg capitalize">{title}</h3>
      </span>
      {children}
    </div>
  );
};

export default Container;
