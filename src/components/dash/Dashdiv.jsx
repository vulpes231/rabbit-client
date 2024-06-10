import React from "react";

const Dashdiv = ({ children }) => {
  return (
    <div className="flex flex-col gap-5 border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 p-4 rounded-md ">
      {children}
    </div>
  );
};

export default Dashdiv;
