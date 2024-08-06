import React from "react";

const Button = ({ title, handleClick, customClass }) => {
  return (
    <button
      className={`px-4 py-2.5 bg-red-500 text-white rounded-3xl cursor-pointer capitalize text-xs font-medium whitespace-nowrap ${customClass}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
