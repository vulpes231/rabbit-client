import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../utils/getDate";
import { Walletspan } from "../components";
import { eth, btc, tet } from "../assets";
import Depositmodal from "../components/wallet/Depositmodal";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../features/transactionSlice";

import { format } from "date-fns";

const Ticket = ({ toggle, userBal }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const { transactions } = useSelector((state) => state.transaction);

  const [depositModal, setDepositModal] = useState(false);

  const handleDepositModal = () => {
    setDepositModal((prev) => !prev);
  };

  const closeDepositModal = () => {
    setDepositModal(false);
  };

  // console.log("mytrnx", transactions);

  const mytrnx = transactions?.transactions?.map((trnx) => {
    return (
      <tr
        key={transactions.transactions._id}
        className="text-center capitalize text-xs font-medium"
      >
        <td className="border border-slate-300 px-4 py-2">
          {format(new Date(trnx.date), "dd/mm/yyyy")}
        </td>
        <td className="border border-slate-300 px-4 py-2">{trnx.method}</td>
        <td className="border border-slate-300 px-4 py-2">{trnx.amount}</td>
        <td className="border border-slate-300 px-4 py-2">
          <span className="text-green-600 bg-green-200 px-3 py-1 rounded-xl ">
            {trnx.status}
          </span>
        </td>
      </tr>
    );
  });

  useEffect(() => {
    if (!accessToken) {
      navigate("/signin");
    }
  }, [accessToken]);

  useEffect(() => {
    dispatch(getTransactions());
  }, [dispatch]);

  return (
    <div
      className={
        toggle
          ? "ml-[60%] md:ml-[40%]"
          : "ml-0 lg:ml-[250px] flex-grow overflow-hidden"
      }
    >
      <div className="w-full py-6 min-h-screen lg:px-10 flex flex-col gap-6">
        <div className="flex justify-between">
          <div>
            <h4 className="font-bold text-md">
              Wallet balance: ${userBal.toFixed(2)}
            </h4>
          </div>
          <button
            onClick={handleDepositModal}
            className="inline-flex font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full"
          >
            deposit
          </button>
        </div>
        <div className="flex flex-col gap-2">
          <small>We currently accept the following payment methods.</small>
          <div className="flex gap-4 items-center">
            <Walletspan src={btc} title={"Bitcoin"} custom={"w-[25px]"} />
            <Walletspan src={tet} title={"Tether"} custom={"w-[25px]"} />
            <Walletspan src={eth} title={"Ethereum"} custom={"w-[15px]"} />
          </div>
        </div>
        <div className="overflow-hidden mt-5 text-xs font-medium">
          <div className="overflow-x-scroll lg:overflow-x-hidden">
            <table className="min-w-full  border-collapse border border-slate-300">
              <thead>
                <tr className="dark:bg-slate-200 text-slate-200 dark:text-slate-950 bg-slate-950">
                  <th className="border border-slate-300 px-4 py-2">Date</th>
                  <th className="border border-slate-300 px-4 py-2">
                    Payment Method
                  </th>
                  <th className="border border-slate-300 px-4 py-2">Amount</th>
                  <th className="border border-slate-300 px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>{mytrnx}</tbody>
            </table>
          </div>
          {depositModal && (
            <Depositmodal closeDepositModal={closeDepositModal} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Ticket;
