import React from "react";
import { Link } from "react-router-dom";

const Sidelink = ({ icon, title }) => {
  return (
    <Link className="flex gap-4 items-center cursor-pointer capitalize text-xs font-extralight hover:text-red-500">
      <span className="text-slate-800 lg:text-slate-600">{icon}</span>
      <span className="whitespace-nowrap">{title}</span>
    </Link>
  );
};

export default Sidelink;
