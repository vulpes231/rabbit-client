import React from "react";

const LabelIcon = ({ icon, title, iconSize }) => {
  return (
    <div className="flex flex-col gap-2 items-center capitalize">
      <span className={`${iconSize}`}>{icon}</span>
      <span className="text-sm font-medium">{title}</span>
    </div>
  );
};

export default LabelIcon;
