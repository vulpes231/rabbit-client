import React from "react";

const Sidebar = ({ toggle }) => {
  return <aside className={toggle ? "" : "hidden"}></aside>;
};

export default Sidebar;
