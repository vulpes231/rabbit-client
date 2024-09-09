import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import { Walletspan } from "../components";
import { eth, btc, tet } from "../assets";
import Depositmodal from "../components/wallet/Depositmodal";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../features/transactionSlice";

import { format } from "date-fns";

import { getUserBalance } from "../features/walletSlice";

const Wallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const accessToken = getAccessToken();

  const { transactions } = useSelector((state) => state.transaction);
  const { balance } = useSelector((state) => state.wallet);

  const [depositModal, setDepositModal] = useState(false);

  const handleDepositModal = () => {
    setDepositModal((prev) => !prev);
  };

  const closeDepositModal = () => {
    setDepositModal(false);
  };

  const mytrnx = transactions?.transactions?.map((trnx, index) => {
    // console.log(trnx);
    return (
      <tr
        key={index}
        className="border-b dark:border-slate-700 text-xs font-thin capitalize p-4"
      >
        <td className="py-3 px-4">
          {format(new Date(trnx.date), "dd/mm/yyyy")}
        </td>
        <td className="py-3 px-4">{trnx.method}</td>
        <td className="py-3 px-4">${trnx.amount}</td>
        <td className="py-3 px-4">
          <span
            className={`py-2 px-4 rounded-lg capitalize ${
              trnx.status === "completed"
                ? "text-green-500 bg-green-50"
                : trnx.status === "failed"
                ? "text-red-500 bg-red-50"
                : "text-yellow-500 bg-yellow-50"
            }`}
          >
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
    dispatch(getUserBalance());
  }, [dispatch]);

  useEffect(() => {
    document.title = "RH4OGS - Wallet";
    return () => {
      document.title = "RH4OGS";
    };
  }, []);

  return (
    <section>
      <div className="w-full py-6 min-h-screen lg:px-10 flex flex-col gap-6 lg:max-w-[1000px] mx-auto ">
        <div className=" bg-white dark:bg-slate-950 p-6 rounded-xl shadow">
          <div className="flex justify-between">
            <h4 className="font-bold text-md">Wallet balance: {balance} USD</h4>
            <button
              onClick={handleDepositModal}
              className="inline-flex font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full"
            >
              deposit
            </button>
          </div>

          <div className="flex flex-col gap-2 ">
            <small>We currently accept the following payment methods.</small>
            <div className="flex gap-4 items-center">
              <Walletspan src={btc} title={"Bitcoin"} custom={"w-[25px]"} />
              <Walletspan src={tet} title={"Tether"} custom={"w-[25px]"} />
              <Walletspan src={eth} title={"Ethereum"} custom={"w-[15px]"} />
            </div>
          </div>
        </div>

        <div className="overflow-hidden mt-5 text-xs font-medium">
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-medium">
              <thead>
                <tr className="bg-red-500 dark:bg-slate-80 text-white uppercase">
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Payment Method</th>
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Status</th>
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
    </section>
  );
};

export default Wallet;
