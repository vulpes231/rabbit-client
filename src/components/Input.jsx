import React from "react";

const Input = ({ type, placeHolder, name, value, onChange, customClass }) => {
  return (
    <input
      type={type}
      placeholder={placeHolder}
      name={name}
      value={value}
      onChange={onChange}
      className={`z-10 w-full rounded-md text-sm/[1.125rem] bg-white dark:bg-slate-950 text-slate-600 dark:text-slate-200 placeholder:text-slate-400 placeholder:dark:text-slate-500 border-slate-200 dark:border-slate-800 disabled:bg-slate-100 disabled:text-slate-400 focus:border-slate-200 focus:shadow-none focus:outline-none py-2 px-4 border`}
      autoComplete="off"
      autoCapitalize="off"
    />
  );
};

export default Input;
