import React from "react";

const Button = ({ title, handleClick, customClass }) => {
  return (
    <button
      className={`p-2 bg-red-500 text-white rounded-sm cursor-pointer capitalize text-xs font-thin ${customClass}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
