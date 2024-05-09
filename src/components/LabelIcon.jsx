import React from "react";

const LabelIcon = ({ icon, title }) => {
  return (
    <div className="flex gap-2 items-center">
      <span>{icon}</span>
      <p>{title}</p>
    </div>
  );
};

export default LabelIcon;
