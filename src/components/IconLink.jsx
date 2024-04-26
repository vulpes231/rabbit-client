import React from "react";
import { Link } from "react-router-dom";

const IconLink = ({ icon, title, path }) => {
  return (
    <Link className="flex items-center gap-2 hover:text-red-500" to={path}>
      {icon}
      {title}
    </Link>
  );
};

export default IconLink;
