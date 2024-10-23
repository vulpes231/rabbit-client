import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAccessToken } from "../constants";
import { Walletspan } from "../components";
import { eth, btc, tet } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { getTransactions } from "../features/transactionSlice";
import { format } from "date-fns";
import { getUserBalance } from "../features/walletSlice";
import Choosedeposit from "../components/wallet/Choosedeposit";

const Wallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();

  const [depositModal, setDepositModal] = useState(false);

  const { transactions } = useSelector((state) => state.transaction);
  const { balance } = useSelector((state) => state.wallet);

  const handleDepositModal = () => {
    setDepositModal(true);
  };

  const closeDepositModal = () => {
    setDepositModal(false);
  };

  const mytrnx = transactions?.transactions?.map((trnx, index) => {
    // console.log(trnx);
    return (
      <tr
        key={index}
        className={`${
          index % 2 !== 0
            ? "bg-slate-200 dark:bg-slate-800"
            : "bg-white dark:bg-slate-950"
        } border-b dark:border-slate-700 text-xs font-normal capitalize p-4`}
      >
        <td className="py-4 px-6">
          {format(new Date(trnx.date), "dd/MM/yyyy")}
        </td>
        <td className="py-4 px-6">{trnx.currency}</td>
        <td className="py-4 px-6">{trnx.network}</td>
        <td className="py-4 px-6">${trnx.amount}</td>
        <td className="py-4 px-6">
          <span
            className={`py-2 px-4 rounded-lg capitalize ${
              trnx.status === "completed"
                ? "text-green-500 bg-green-100"
                : trnx.status === "failed"
                ? "text-red-500 bg-red-100"
                : "text-yellow-500 bg-yellow-100"
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
  }, [accessToken, navigate]);

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
    <section className="font-[Montserrat]">
      <div className="w-full p-4 min-h-screen flex flex-col gap-6 lg:max-w-[1000px] mx-auto mt-28 sm:mt-16 lg:mt-0">
        <div className="flex flex-col gap-2 md:flex-row md:justify-between md:items-center">
          <h3 className="uppercase font-semibold text-xl">
            manage your wallet
          </h3>
          <span>
            <button
              onClick={handleDepositModal}
              className="inline-flex font-medium text-sm bg-red-600 text-white hover:bg-red-800 transition-all px-5 py-2 rounded-full"
            >
              deposit
            </button>
          </span>
        </div>

        <div className=" bg-white dark:bg-slate-950 p-6 rounded-xl shadow">
          <div className="flex flex-col gap-4 ">
            <h4 className="font-semibold">
              Wallet balance: {balance || 0} USD
            </h4>
            <small className="text-xs text-slate-500">
              We currently accept the following payment methods.
            </small>
            <div className="flex gap-4 items-center">
              <Walletspan src={btc} title={"Bitcoin"} custom={"w-[25px]"} />
              <Walletspan src={tet} title={"Tether"} custom={"w-[25px]"} />
              <Walletspan src={eth} title={"Ethereum"} custom={"w-[15px]"} />
            </div>
          </div>
        </div>

        <div className="overflow-auto mt-5 text-xs font-medium">
          <div className="">
            <table className="min-w-full bg-white dark:bg-slate-900 dark:text-slate-200 text-xs font-medium">
              <thead>
                <tr className="bg-red-500 dark:bg-slate-80 text-white uppercase">
                  <th className="text-left py-2 px-4">Date</th>
                  <th className="text-left py-2 px-4">Currency</th>
                  <th className="text-left py-2 px-4">Network</th>
                  <th className="text-left py-2 px-4">Amount</th>
                  <th className="text-left py-2 px-4">Status</th>
                </tr>
              </thead>
              {transactions ? (
                <tbody className="min-w-full">{mytrnx}</tbody>
              ) : (
                <div>No recent transactions</div>
              )}
            </table>
          </div>
          {depositModal && (
            <Choosedeposit closeDepositModal={closeDepositModal} />
          )}
        </div>
      </div>
    </section>
  );
};

export default Wallet;
