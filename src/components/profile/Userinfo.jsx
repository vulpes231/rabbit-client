import React from "react";
import { MdMoney, MdVerifiedUser } from "react-icons/md";
import { CgMail, CgUser } from "react-icons/cg";
import Container from "./Container";

const styles = {
  span: "flex items-center font-bold",
};

const Userinfo = ({ user, bal }) => {
  return (
    <Container icon={<MdVerifiedUser />} title={"User Information"}>
      {user ? (
        <div className="text-xs font-normal capitalize flex flex-col gap-5">
          <p className="flex items-center gap-1">
            <span className={styles.span}>
              <CgUser />
              username:
            </span>
            {user?.username}
          </p>
          <p className="flex items-center gap-1">
            <span className={styles.span}>
              <CgMail />
              email:
            </span>
            <span className="lowercase">{user?.email}</span>
          </p>
          <p className="flex items-center gap-1">
            <span className={styles.span}>
              <MdMoney />
              wallet balance:
            </span>
            <span>{bal || 0} USD</span>
          </p>
        </div>
      ) : (
        <p className="p-2 font-thin text-slate-400">
          Unable to load user information.
        </p>
      )}
    </Container>
  );
};

export default Userinfo;
