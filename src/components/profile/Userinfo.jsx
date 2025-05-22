/* eslint-disable react/prop-types */
import React from "react";
import { motion } from "framer-motion";
import { MdVerified, MdAccountBalanceWallet } from "react-icons/md";
import { FiMail, FiUser } from "react-icons/fi";
import Container from "./Container";

const UserInfo = ({ user, bal }) => {
  return (
    <Container
      icon={<MdVerified className="text-red-500" />}
      title="User Information"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        {user ? (
          <>
            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-full text-red-500 dark:text-red-400">
                <FiUser className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Username
                </p>
                <p className="font-medium dark:text-white">{user?.username}</p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-full text-blue-500 dark:text-blue-400">
                <FiMail className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Email
                </p>
                <p className="font-medium dark:text-white lowercase">
                  {user?.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-full text-green-500 dark:text-green-400">
                <MdAccountBalanceWallet className="text-lg" />
              </div>
              <div>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Wallet Balance
                </p>
                <p className="font-medium dark:text-white">${bal || 0} USD</p>
              </div>
            </div>
          </>
        ) : (
          <div className="p-4 text-center text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-800 rounded-lg">
            Unable to load user information
          </div>
        )}
      </motion.div>
    </Container>
  );
};

export default UserInfo;
