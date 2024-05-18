import React from "react";

const Button = ({ title, handleClick }) => {
  return (
    <button
      className="p-2 border border-slate-400 text-slate-400 rounded-sm cursor-pointer"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
