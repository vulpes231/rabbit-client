import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import { CgMail, CgUser } from "react-icons/cg";
const Userinfo = () => {
  return (
    <div className="p-4 bg-slate-500 bg-opacity-20 flex flex-col gap-4">
      <span className="flex items-center gap-1">
        <MdVerifiedUser />
        <h3 className="text-2xl capitalize">user info:</h3>
      </span>
      <p className="flex items-center gap-1 p-2">
        <span>
          <CgUser />
        </span>
        username
      </p>
      <p className="flex items-center gap-1 p-2">
        <span>
          <CgMail />
        </span>
        email
      </p>
    </div>
  );
};

export default Userinfo;
