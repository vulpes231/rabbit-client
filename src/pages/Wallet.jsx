import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { format } from "date-fns";
import { FaBitcoin, FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { MdOutlineAccountBalanceWallet } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { formatNumber, getAccessToken } from "../constants";
import { getTransactions } from "../features/transactionSlice";
import { getUserBalance } from "../features/walletSlice";
import Choosedeposit from "../components/wallet/Choosedeposit";
import { btc, eth, tet } from "../assets";

const Wallet = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const accessToken = getAccessToken();
  const [depositModal, setDepositModal] = useState(false);

  const { transactions } = useSelector((state) => state.transaction);
  const { balance } = useSelector((state) => state.wallet);

  const handleDepositModal = () => setDepositModal(true);
  const closeDepositModal = () => setDepositModal(false);

  useEffect(() => {
    if (!accessToken) navigate("/signin");
    dispatch(getTransactions());
    dispatch(getUserBalance());
    document.title = "RH4OGS - Wallet";
    return () => {
      document.title = "RH4OGS";
    };
  }, [accessToken, navigate, dispatch]);

  const paymentMethods = [
    {
      icon: <FaBitcoin className="text-orange-500 text-xl" />,
      name: "Bitcoin",
    },
    { icon: <SiTether className="text-green-500 text-xl" />, name: "Tether" },
    {
      icon: <FaEthereum className="text-purple-500 text-xl" />,
      name: "Ethereum",
    },
  ];

  return (
    <section className="min-h-screen bg-slate-200 dark:bg-slate-900 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mt-36 sm:mt-20 lg:mt-10">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8"
        >
          <div>
            <h1 className="text-3xl font-bold text-slate-800 dark:text-white">
              Wallet
            </h1>
            <p className="text-slate-500 dark:text-slate-400 mt-1">
              Manage your deposits and transactions
            </p>
          </div>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleDepositModal}
            className="mt-4 md:mt-0 px-6 py-2.5 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg shadow-md font-medium transition-all"
          >
            Make Deposit
          </motion.button>
        </motion.div>

        {/* Balance Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-6 mb-8"
        >
          <div className="flex items-center gap-4 mb-6">
            <div className="p-3 bg-red-100 dark:bg-red-900/20 rounded-full text-red-500 dark:text-red-400">
              <MdOutlineAccountBalanceWallet className="text-2xl" />
            </div>
            <div>
              <p className="text-sm text-slate-500 dark:text-slate-400">
                Available Balance
              </p>
              <p className="text-3xl font-bold dark:text-white">
                ${balance || "0.00"}
              </p>
            </div>
          </div>

          <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-3">
              Accepted Payment Methods
            </p>
            <div className="flex gap-4">
              {paymentMethods.map((method, index) => (
                <motion.div
                  key={index}
                  whileHover={{ y: -5 }}
                  className="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-slate-700 rounded-lg"
                >
                  {method.icon}
                  <span className="text-sm font-medium dark:text-white">
                    {method.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Transactions Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden"
        >
          <div className="overflow-x-auto">
            {transactions?.transactions?.length > 0 ? (
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-50 dark:bg-slate-700">
                  <tr>
                    {["Date", "Currency", "Network", "Amount", "Status"].map(
                      (header) => (
                        <th
                          key={header}
                          className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase tracking-wider"
                        >
                          {header}
                        </th>
                      )
                    )}
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                  {transactions.transactions.map((trnx, index) => (
                    <tr
                      key={index}
                      className="hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors text-[14px]"
                    >
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">
                        <span className="flex flex-col">
                          <h3>
                            {" "}
                            {format(new Date(trnx.date), "MMM dd, yyyy")}{" "}
                          </h3>
                          <h6 className="text-[10px] lg:text-[12px] text-[#979797]">
                            {" "}
                            {format(new Date(trnx.date), "hh:mm a")}{" "}
                          </h6>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">
                        <span className="flex items-center gap-2 capitalize">
                          <figure>
                            {trnx.currency === "bitcoin" ? (
                              <img src={btc} className="w-[18px] h-[18px]" />
                            ) : trnx.currency === "ethereum" ? (
                              <img src={eth} className="w-[18px] h-[18px]" />
                            ) : trnx.currency === "tether" ? (
                              <img src={tet} className="w-[18px] h-[18px]" />
                            ) : null}
                          </figure>
                          <h6>{trnx.currency}</h6>
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-200">
                        {trnx.network.toUpperCase()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium dark:text-white">
                        {formatNumber(trnx.amount, {
                          style: "currency",
                          currency: "USD",
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full capitalize ${
                            trnx.status === "completed"
                              ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                              : trnx.status === "failed"
                              ? "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400"
                              : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                          }`}
                        >
                          {trnx.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="p-12 text-center">
                <div className="mx-auto h-24 w-24 text-slate-400 dark:text-slate-500 mb-4">
                  <MdOutlineAccountBalanceWallet className="w-full h-full" />
                </div>
                <h3 className="text-lg font-medium text-slate-700 dark:text-slate-300">
                  No transactions yet
                </h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                  Your transaction history will appear here
                </p>
                <button
                  onClick={handleDepositModal}
                  className="mt-4 px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md text-sm font-medium transition-colors"
                >
                  Make your first deposit
                </button>
              </div>
            )}
          </div>
        </motion.div>

        {/* Deposit Modal */}
        <AnimatePresence>
          {depositModal && (
            <Choosedeposit closeDepositModal={closeDepositModal} />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Wallet;
