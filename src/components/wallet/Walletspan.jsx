import React from "react";

const Walletspan = ({ src, title, custom }) => {
  return (
    <span className="flex gap-2 items-center">
      <img src={src} alt="" className={custom} />
      <small className="font-medium text-sm">{title}</small>
    </span>
  );
};

export default Walletspan;
