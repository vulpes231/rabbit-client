import React from "react";
import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
const Article = ({ children, path }) => {
  return (
    <Link
      to={path}
      className="flex flex-col gap-4 items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 w-full mx-auto py-8 rounded-md"
    >
      {children}
    </Link>
  );
};

export default Article;
