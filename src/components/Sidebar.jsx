import React from "react";
import Sidelink from "./Sidelink";
import { MdHomeMini } from "react-icons/md";
import { FaHome } from "react-icons/fa";

const Sidebar = ({ toggle }) => {
  return (
    <aside
      className={
        toggle
          ? "h-screen w-[60%] bg-white text-black absolute top-0 left-0"
          : "hidden"
      }
    >
      <div className="mt-20 p-4">
        <Sidelink icon={<FaHome />} title={"Dashboard"} />
      </div>
    </aside>
  );
};

export default Sidebar;
