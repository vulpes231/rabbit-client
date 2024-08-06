import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import { CgMail, CgUser } from "react-icons/cg";
import Container from "./Container";

const Userinfo = () => {
  // Retrieve and parse the user information from sessionStorage
  const storedUser = sessionStorage.getItem("userInfo");
  const user = storedUser ? JSON.parse(storedUser) : null;

  return (
    <Container icon={<MdVerifiedUser />} title={"User Info:"}>
      {user ? (
        <div className="text-xs font-thin text-slate-400">
          <p className="flex items-center gap-1">
            <span>
              <CgUser />
            </span>
            {user.username}
          </p>
          <p className="flex items-center gap-1">
            <span>
              <CgMail />
            </span>
            {user.email}
          </p>
        </div>
      ) : (
        <p className="p-2 font-thin text-slate-400">
          No user information found.
        </p>
      )}
    </Container>
  );
};

export default Userinfo;
