import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import { CgMail, CgUser } from "react-icons/cg";
import Container from "./Container";
const Userinfo = () => {
  return (
    <Container icon={<MdVerifiedUser />} title={"user info:"}>
      <p className="flex items-center gap-1 p-2 font-thin text-slate-400">
        <span>
          <CgUser />
        </span>
        username
      </p>
      <p className="flex items-center gap-1 p-2 font-thin text-slate-400">
        <span>
          <CgMail />
        </span>
        email
      </p>
    </Container>
  );
};

export default Userinfo;
