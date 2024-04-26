import React from "react";

const Input = ({ type, placeHolder, name, value, onChange, customClass }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      name={name}
      value={value}
      onChange={onChange}
      className={`w-full bg-[#333] bg-opacity-10 px-4 py-3 font-bold ${customClass} outline-red-500`}
      autoComplete="off"
      autoCapitalize="off"
    />
  );
};

export default Input;
