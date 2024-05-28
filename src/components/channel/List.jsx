import React from "react";

const List = ({ children }) => {
  return (
    <li className="hover:bg-white hover:text-red-500 rounded-lg px-4 w-[250px] whitespace-nowrap">
      {children}
    </li>
  );
};

export default List;
