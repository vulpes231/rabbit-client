import React from "react";
import { Link } from "react-router-dom";

const Sidelink = ({ icon, title }) => {
  return (
    <Link className="flex gap-4 items-center cursor-pointer font-normal">
      <span className="text-red-500">{icon}</span>
      {title}
    </Link>
  );
};

export default Sidelink;
