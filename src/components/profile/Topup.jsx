import React from "react";
import { MdMoney } from "react-icons/md";
import Container from "./Container";
import { Link } from "react-router-dom";

const Topup = ({ bal }) => {
  return (
    <Container icon={<MdMoney />} title={"top up"}>
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-1 text-xs font-normal">
          Wallet Balance: {bal || 0} USD
        </p>
        <Link
          to={"/wallet"}
          className="px-4 py-2.5 bg-red-500 text-white rounded-3xl cursor-pointer capitalize text-xs font-medium whitespace-nowrap"
        >
          Deposit
        </Link>
      </div>
    </Container>
  );
};

export default Topup;
