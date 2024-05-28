import React from "react";

const FaqComp = ({ title, icon }) => {
  return (
    <div className="flex items-center gap-2">
      {icon}
      {title}
    </div>
  );
};

export default FaqComp;
