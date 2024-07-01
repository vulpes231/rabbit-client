import React from "react";
import { Link } from "react-router-dom";

const List = ({ icon, channelName, link }) => {
  return (
    <div className="flex flex-col gap-4 justify-center items-center bg-white p-6 shadow rounded-xl dark:text-slate-200 dark:bg-slate-950">
      <span className="text-5xl">{icon}</span>
      <div className="uppercase font-normal text-xs text-center whitespace-nowrap">
        {channelName}
      </div>
      <Link
        className="bg-red-500 hover:bg-red-600 text-white py-2 px-8 capitalize font-medium text-xs inline-flex rounded-lg"
        to={link}
        target="_blank"
      >
        open channel
      </Link>
    </div>
  );
};

export default List;
