import React from "react";
import { MdMoney, MdVerifiedUser } from "react-icons/md";
import { CgMail, CgUser } from "react-icons/cg";
import Button from "./Button";
import Container from "./Container";
const Topup = () => {
  return (
    <Container icon={<MdMoney />} title={"top up:"}>
      <span className="flex items-center justify-between">
        <p className="flex items-center gap-1 text-xs text-slate-400 font-extralight">
          Current balance: $0
        </p>
        <Button title={"Top up wallet"} />
      </span>
    </Container>
  );
};

export default Topup;
