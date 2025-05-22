import React from "react";
import { motion } from "framer-motion";
import { MdAccountBalanceWallet } from "react-icons/md";
import Container from "./Container";
import { Link } from "react-router-dom";

const Topup = ({ bal }) => {
  return (
    <Container
      icon={<MdAccountBalanceWallet className="text-green-500" />}
      title="Wallet Top Up"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="flex justify-between items-center p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
          <div>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Available Balance
            </p>
            <p className="text-xl font-bold dark:text-white">${bal || 0} USD</p>
          </div>
          <Link
            to="/wallet"
            className="px-6 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-full text-sm font-medium shadow-md hover:shadow-lg transition-all"
          >
            Deposit
          </Link>
        </div>
      </motion.div>
    </Container>
  );
};

export default Topup;
