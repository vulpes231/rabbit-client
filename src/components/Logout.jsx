import React from "react";
import Sidelink from "./Sidelink";
import { MdLogout } from "react-icons/md";

const Logout = ({ resetClick, handleLogout }) => {
  return (
    <span
      onClick={() => {
        handleLogout();
        resetClick();
      }}
    >
      <Sidelink icon={<MdLogout />} title={"logout"} />
    </span>
  );
};

export default Logout;
