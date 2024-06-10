import React from "react";

const Article = ({ children }) => {
  return (
    <article className="flex flex-col gap-4 items-center justify-center border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 w-full mx-auto py-8 rounded-md">
      {children}
    </article>
  );
};

export default Article;
