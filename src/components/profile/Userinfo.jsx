import React from "react";
import { MdVerifiedUser } from "react-icons/md";
import { CgMail, CgUser } from "react-icons/cg";
import Container from "./Container";
import { useSelector } from "react-redux";
const Userinfo = () => {
  const { user } = useSelector((state) => state.signin);
  console.log(user);
  return (
    <Container icon={<MdVerifiedUser />} title={"user info:"}>
      <p className="flex items-center gap-1 p-2 font-thin text-slate-400">
        <span>
          <CgUser />
        </span>
        {user.username}
      </p>
      <p className="flex items-center gap-1 p-2 font-thin text-slate-400">
        <span>
          <CgMail />
        </span>
        {user.email}
      </p>
    </Container>
  );
};

export default Userinfo;
