import React from "react";
import { FaUserAlt } from "react-icons/fa";
import IconLink from "./IconLink";
import { RiCustomerServiceFill } from "react-icons/ri";
import { MdLogout } from "react-icons/md";

const User = ({ dropDown }) => {
  return (
    <div
      className={
        dropDown
          ? "absolute bg-[#fff] text-[#333] top-[65px] p-4 right-30 flex flex-col rounded-lg gap-2 font-normal text-xs"
          : "hidden"
      }
    >
      <IconLink icon={<FaUserAlt />} title={"Profile"} />
      <IconLink icon={<RiCustomerServiceFill />} title={"Tickets"} />
      <IconLink icon={<MdLogout />} title={"Logout"} />
    </div>
  );
};

export default User;
