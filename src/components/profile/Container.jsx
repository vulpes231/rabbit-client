import React from "react";

const Container = ({ children, icon, title }) => {
  return (
    <div className="p-6 bg-slate-500 bg-opacity-20 flex flex-col gap-4">
      <span className="flex items-center gap-1">
        {icon}
        <h3 className="text-2xl capitalize">{title}</h3>
      </span>
      {children}
    </div>
  );
};

export default Container;
